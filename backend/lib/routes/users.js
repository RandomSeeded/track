const _ = require('lodash');
const express = require('express');
const app = express();
const expressValidation = require('express-validation');
const Joi = require('joi');

const { ensureAuthenticated } = require('../util/authUtils');
const userController = require('../controllers/userController');
const reminderModel = require('../models/reminderModel');

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
    /*
     * TODO (nw): make reminders more customizeable
     * In current state, just add a reminder whenever a phone number is added.
     */
    reminderModel.add({
      user,
      nextTime: Date.now(), // TODO (nw): put a better nextTime here
    });
    res.sendStatus(200);
  });

module.exports = app;
