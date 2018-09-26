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
const questionModel = require('../models/questionModel');
const { ensureAuthenticated } = require('../util/authUtils');

app.get('/',
  ensureAuthenticated,
  async function(req, res, next) {
    const user = req.user;
    const questions = await questionModel.query({ user });
    res.send(questions);
  });

module.exports = app;
