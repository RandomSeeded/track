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

// TODO (nw): verify this is an orphaned route and delete it
app.post('/',
  ensureAuthenticated,
  expressValidation({
    body: {
      nextTime: Joi.number().required(),
      frequency: Joi.number().required(),
    },
  }),
  async function(req, res, next) {
    const user = req.user;
    const { nextTime, frequency } = req.body;
    const reminderId = uuid.v4();
    await reminderModel.add({ _id: reminderId, nextTime, frequency, user });
    res.sendStatus(200);
  });

module.exports = app;
