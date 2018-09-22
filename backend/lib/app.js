'use strict';

const express = require('express');
const app = express();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {
  GOOGLE_CONSUMER_SECRET,
  GOOGLE_CONSUMER_KEY,
  expressSessionSecret,
} = require('./secrets');

const PORT = 17792;

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: expressSessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// TODO (nw): what do these do?
// Among other things: they cause req.isAuthenticated() to return true
// Also: we have a req.user object, so that's nice
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/google');
}

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    return res.redirect('/');
  });

app.get('/',
  ensureAuthenticated,
  function(req, res) {
    return res.send('hello world');
  });

app.listen(PORT);
console.log(`app listening on ${PORT}`);
