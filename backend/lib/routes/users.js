const _ = require('lodash');
const express = require('express');
const app = express();
const expressValidation = require('express-validation');
const Joi = require('joi');
const libPhoneNumber = require('libphonenumber-js');

const { ensureAuthenticated } = require('../util/authUtils');
const userController = require('../controllers/userController');
const reminderModel = require('../models/reminderModel');
const userModel = require('../models/userModel');

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
    const formattedPhoneNumber = (phoneNumber => {
      if (_.first(phoneNumber) === '+') {
        return libPhoneNumber.parsePhoneNumber(phoneNumber).number;
      }
      return libPhoneNumber.parsePhoneNumber(phoneNumber, 'US').number;
    })(phoneNumber);
    userController.addOrUpdatePhoneNumber(user, formattedPhoneNumber);
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

app.get('/phone-number',
  ensureAuthenticated,
  async (req, res) => {
    const user = _.first(await userModel.query(req.user));
    const { phoneNumber } = user;
    res.send({ phoneNumber });
  });

module.exports = app;
