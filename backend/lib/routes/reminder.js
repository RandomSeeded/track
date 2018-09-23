const _ = require('lodash');
const express = require('express');
const app = express();
const expressValidation = require('express-validation');
const Joi = require('joi');
const path = require('path');
const uuid = require('uuid');

const db = require('../db');
const taskList = require('../util/taskList');
const { TASK_LIST_FILENAME } = require('../definitions/tasklist');

app.post('/',
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

    const collection = db.collection('reminders');
    const reminderId = uuid.v4();
    await collection.insertOne({ _id: reminderId, hour });

    taskList.addTime(TASK_LIST_FILENAME, hour, reminderId);
    res.send(200);
  });

module.exports = app;
