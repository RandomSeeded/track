'use strict';

const express = require('express');
const app = express();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuthStrategy;
const {
  GOOGLE_CONSUMER_SECRET,
  GOOGLE_CONSUMER_KEY,
} = require('./secrets');

passport.use(new googleStrategy({
  consumerKey: GOOGLE_CONSUMER_KEY,
  consumerSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: "http://www.example.com/auth/google/callback"
}, function(token, tokenSecret, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));


const PORT = 17792;

app.get('/',
  passport.authenticate('twitter'),
  function(req, res) {
  res.send('hello world');
});

app.listen(PORT);
