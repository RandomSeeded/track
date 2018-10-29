const _ = require('lodash');
const express = require('express');
const app = express();
const expressValidation = require('express-validation');
const Joi = require('joi');

const { ensureAuthenticated } = require('../util/authUtils');
const userController = require('../controllers/userController');

app.post('/phone-number',
  ensureAuthenticated,
  expressValidation({
    body: {
      phoneNumber: Joi.string().required(),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const { phoneNumber } = req.body;
    userController.addOrUpdatePhoneNumber(user, phoneNumber);
    res.sendStatus(200);
  });

module.exports = app;
