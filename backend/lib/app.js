'use strict';

require('./util/exceptionHandlers');

const _ = require('lodash');
const express = require('express');
const fs = require('fs');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const moment = require('moment');
const passport = require('passport');
const util = require('util');

const { ensureAuthenticated } = require('./util/authUtils');

const {
  GOOGLE_CONSUMER_SECRET,
  GOOGLE_CONSUMER_KEY,
  expressSessionSecret,
} = require('./secrets');
const worker = require('./worker/worker');

const PORT = 17792;

const app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: expressSessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('body-parser').json());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new googleStrategy({
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: 'http://localhost:17792/auth/google/callback'
}, function(token, tokenSecret, profile, done) {
  done(null, { googleId: profile.id });
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    return res.redirect('/');
  });

app.get('/',
  ensureAuthenticated,
  (req, res) => {
    const user = req.user;
    console.log('user', user);
    res.send('hello world');
  });

app.use('/api/reminder', require('./routes/reminder'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/answers', require('./routes/answers'));
app.listen(PORT);
console.log(`app listening on ${PORT}`);
