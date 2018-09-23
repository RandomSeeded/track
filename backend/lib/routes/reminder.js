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
const reminderModel = require('../models/reminderModel');
const { ensureAuthenticated } = require('../util/authUtils');

app.post('/',
  ensureAuthenticated,
  expressValidation({
    body: {
      nextTime: Joi.number().required(),
      frequency: Joi.number().required(),
      // TODO (nw): how do you want to store reminders?
      // For now - basically you have one set of questions per user
      // whenever they go to that page they're presented with those questions
      // So, for now, reminders are purely to send you texts
      // And questions you can fill out whenever
    },
  }),
  async function(req, res, next) {
    const userId = _.get(req.user, 'profileId');
    const { nextTime, frequency } = req.body;
    const reminderId = uuid.v4();
    await reminderModel.add({ _id: reminderId, nextTime, frequency });
    res.send(200);
  });

module.exports = app;
