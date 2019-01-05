// What does the worker do?
//
// Wake up:
// 1) read the task list
// 2) check to see if there's any tasks that need doing
// 3) If so, do them
// 4) calculate their next time and put that time on the task list

const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid');

const { TASK_LIST_FILENAME } = require('../definitions/tasklist');
const taskList = require('../util/taskList');
const reminderModel = require('../models/reminderModel');
const questionModel = require('../models/questionModel');
const userModel = require('../models/userModel');
const twilio = require('../external/twilio');

const TEN_MINUTES = 10 * 60 * 1000;
const { PORT, FRIENDLY_URL } = require('../config');

async function sendAlert(task) {
  const { user } = task;
  const userForAlert = _.first(await userModel.query(user));
  twilio.sendSMS(`Fill out your questions! ${FRIENDLY_URL}`, userForAlert.phoneNumber);
}

async function run() {
  const tasksToRun = await reminderModel.query({ nextTime: { $lt: Date.now() }});
  const tasksWithNewTimes = _.map(tasksToRun, task => {
    return _.defaults({
      nextTime: moment(task.nextTime).add(24, 'hours').valueOf(),
      attempt: 0,
      maxRetries: 0,
      retryTimeout: 0,
      _id: uuid.v4(),
    }, task);
  });
  console.log(`${moment().format()}: Sending ${_.size(tasksWithNewTimes)} alerts`);
  _.each(tasksWithNewTimes, sendAlert);

  await Promise.all(_.map(tasksWithNewTimes, task => reminderModel.add(task)));
  await Promise.all(_.map(tasksToRun, task => reminderModel.remove(task._id)));
}

run();
setInterval(() => {
  run();
}, TEN_MINUTES);

module.exports = {
  // For test only
  run,
};
