const _ = require('lodash');
const express = require('express');
const app = express();

app.post('/phone-number',
  ensureAuthenticated,
  expressValidation({
    body: {
      phoneNumber: Joi.number().required(),
    },
  }),
  async (req, res) => {
    const user = req.user;
    const { phoneNumber } = req.body;
    // TODO (nw): stopping point here
  });
