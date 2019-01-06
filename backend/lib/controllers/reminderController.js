'use strict';

const _ = require('lodash');

const reminderModel = require('../models/reminderModel');

async function ensureReminderForUser(user, maxRetries, retryTimeout, nextTime) {
  const reminderInDB = _.first(await reminderModel.query({ user }));
  console.log('reminderInDB', reminderInDB);
  if (reminderInDB) {
    return reminderModel.update(reminderInDB._id, {
      user,
      maxRetries,
      retryTimeout,
      nextTime,
    });
  }

  reminderModel.add({
    user,
    maxRetries,
    retryTimeout,
    nextTime, // TODO (nw): use better nextTimes than this
  });
}

module.exports = {
  ensureReminderForUser,
};
