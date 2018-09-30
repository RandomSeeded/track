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
const questionModel = require('../models/questionModel');
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
      user,
    });
    res.sendStatus(200);
  });

app.get('/full',
  ensureAuthenticated,
  async (req, res, next) => {
    const user = req.user;
    const answers = await answerModel.query({ user });
    const questionIds = _(answers).map('questionId').uniq().value();
    const questions = await questionModel.query({ _id: { $in: questionIds }});
    const answersByQuestionId = _.groupBy(answers, 'questionId');
    const questionsWithAnswers = _.map(questions, question =>
      _.extend(question, { answers: answersByQuestionId[question._id] })
    );
    res.send(questionsWithAnswers);
  });

module.exports = app;
