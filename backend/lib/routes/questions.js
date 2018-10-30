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
      tags: Joi.array().items(Joi.string()).optional(),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const text = req.body.text;
    const type = req.body.type;
    // Known minor bug - could add tags to non-values question. NBD.
    const tags = req.body.tags;
    const _id = uuid.v4();
    questionModel.add({ _id, user, text, type, tags });
    res.send({ _id });
  });

app.post('/:id',
  ensureAuthenticated,
  expressValidation({
    body: {
      text: Joi.string().required(),
      type: Joi.string().valid(
        QuestionTypes.VALUES,
      ),
      tags: Joi.array().items(Joi.string()).optional(),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const questionId = req.params.id;
    const text = req.body.text;
    const type = req.body.type;
    const tags = req.body.tags;
    const questions = await questionModel.query({ user, _id: questionId });
    assert(_.size(questions) === 1, `Unable to update ${questionId} - matched ${questions}`);
    const fieldUpdates = _.omitBy({ text, type, tags }, _.isUndefined);
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
