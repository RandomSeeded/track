'use strict';

const _ = require('lodash');
const express = require('express');
const expressValidation = require('express-validation');
const fs = require('fs');
const Joi = require('joi');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const moment = require('moment');
const passport = require('passport');
const {
  GOOGLE_CONSUMER_SECRET,
  GOOGLE_CONSUMER_KEY,
  expressSessionSecret,
} = require('./secrets');
const util = require('util');
const TASK_LIST_FILENAME = 'tasklist';
const taskList = require('./util/taskList');

let db;

const PORT = 17792;

const app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: expressSessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('body-parser').json());

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

app.post('/api/reminder',
  // ensureAuthenticated,
  expressValidation({
    body: {
      // nextTime: Joi.number().required(),
      hour: Joi.number().required(),
      // timezone: Joi.string().required(), // this is required kinda otherwise it will break with DST and stuff. Screw that not MVP.
    },
  }),
  async function(req, res, next) {
    const userId = _.get(req.user, 'profileId');
    // const nextTime = req.body.nextTime; // assume frequency is 24 hours for now
    const hour = req.body.hour; // just assume hour is in UTC for now I guess. Obviously shit but can be improved later.
    // const timezone = _.get(req.body, 'timezone');


    // Things we need to do:
    // 1) add the next time to the task list (along with the userId);
    // 2) save the time (which hour per day) to the database

    const collection = db.collection('reminders');
    await collection.insertOne({ hour });

    // (Still need to add the next time to the task list when such a task list exists...right?)
    // How would such a task list work? It would need to be a shared data structure between the two processes, which is not ideal.
    // In Erlang world you'd send a message to another process.
    // Here our shared data structure could/should probably just be a file. Only questionable part is: can two things read from a file simultaneously? Yeah but could be wonky if we write while the daemon reads. Oh well. MVP.
    taskList.addTime(hour);
    res.send(200);
  });

app.listen(PORT);
console.log(`app listening on ${PORT}`);

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'track';

process.on('uncaughtException', e => {
  console.log('e', e);
});
process.on('unhandledRejection', e => {
  console.log('e', e);
});

(async function initializeDB() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const dbName = 'track';
  db = client.db(dbName);
  const collection = db.collection('reminders');
  const res = await collection.insertOne({ a: 3 });
})();
