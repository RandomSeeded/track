const _ = require('lodash');
const express = require('express');
const app = express();
const expressValidation = require('express-validation');
const assert = require('assert');
const Joi = require('joi');
const path = require('path');
const uuid = require('uuid');

const db = require('../db');
const taskList = require('../util/taskList');
const { TASK_LIST_FILENAME } = require('../definitions/tasklist');
const questionModel = require('../models/questionModel');
const { ensureAuthenticated } = require('../util/authUtils');
const QuestionTypes = require('../definitions/QuestionTypes');

app.get('/',
  ensureAuthenticated,
  async (req, res) => {
    const user = req.user;
    const questions = await questionModel.query({ user });
    return res.send(questions);
  });

app.post('/',
  ensureAuthenticated,
  expressValidation({
    body: {
      text: Joi.string().required(),
      type: Joi.string().valid(
        QuestionTypes.VALUES,
      ),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const text = req.body.text;
    const type = req.body.type;
    questionModel.add({ _id: uuid.v4(), user, text, type });
    res.sendStatus(200);
  });

app.post('/:id',
  ensureAuthenticated,
  expressValidation({
    body: {
      text: Joi.string().required(),
      type: Joi.string().valid(
        QuestionTypes.VALUES,
      ),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const questionId = req.params.id;
    const text = req.body.text;
    const type = req.body.type;
    const questions = await questionModel.query({ user, _id: questionId });
    assert(_.size(questions) === 1, `Unable to update ${questionId} - matched ${questions}`);
    const fieldUpdates = { text, type};
    questionModel.updateFields(questionId, fieldUpdates);
    res.sendStatus(200);
  });

app.delete('/:id',
  ensureAuthenticated,
  async (req, res) => {
    const user = req.user;
    const questionId = req.params.id;
    const questions = await questionModel.query({ user, _id: questionId });
    assert(_.size(questions) === 1, `Unable to update ${questionId} - matched ${questions}`);
    questionModel.remove(questionId);
    res.sendStatus(200);
  });


module.exports = app;
