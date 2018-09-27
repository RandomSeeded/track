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
const answerModel = require('../models/answerModel');
const { ensureAuthenticated } = require('../util/authUtils');

app.post('/',
  ensureAuthenticated,
  expressValidation({
    body: {
      questionId: Joi.string().guid().required(),
      answer: Joi.string().required(),
    },
  }),
  async function(req, res, next) {
    const user = req.user;
    const { questionId, answer } = req.body;
    await answerModel.add({
      _id: uuid.v4(),
      questionId,
      answer,
      answeredAt: Date.now(),
    });
    res.sendStatus(200);
  });

module.exports = app;
