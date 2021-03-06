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
      answeredAt: Joi.date().required(),
    },
  }),
  async function(req, res, next) {
    const user = req.user;
    const { questionId, answer, answeredAt } = req.body;
    await answerModel.add({
      _id: uuid.v4(),
      questionId,
      answer,
      answeredAt: Number(answeredAt),
      user,
    });
    res.sendStatus(200);
  });

// TODO (nw): do you want to patch (diff) or put (update entirely?)
// Probably just replace entirely
app.patch('/:id',
  ensureAuthenticated,
  expressValidation({
    body: {
      questionId: Joi.string().guid().required(),
      answer: Joi.string().required(),
      answeredAt: Joi.date().required(),
    },
  }),
  async function(req, res, next) {
    // TODO (nw): this
    res.sendStatus(200);
  });

app.get('/by-date',
  ensureAuthenticated,
  async (req, res, next) => {
    const user = req.user;
    const answers = await answerModel.query({ user });
    const questionIds = _(answers).map('questionId').uniq().value();
    const questions = await questionModel.query({ _id: { $in: questionIds }});
    const questionsById = _.keyBy(questions, '_id');
    const answersWithCorrespondingQuestions = _.filter(answers, answer => questionsById[answer.questionId]);
    const answersWithQuestions = _.map(answersWithCorrespondingQuestions, answer => {
      return _.extend({},
        answer,
        { question: questionsById[answer.questionId] },
      );
    });
    const answersWithQuestionsByDate = _.groupBy(answersWithQuestions, 'answeredAt');
    res.send(answersWithQuestionsByDate);
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
