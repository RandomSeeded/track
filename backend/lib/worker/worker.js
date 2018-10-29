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
const twilio = require('../external/twilio');

async function sendAlert(task) {
  // You actually don't even need the question for now. Just send them a link to the home page. Bam. Done. The home page will be responsible for figuring out what the questions are.
  twilio.sendSMS('A link to the service would go here', '+18456610558');
}

async function run() {
  const tasksToRun = await reminderModel.query({ nextTime: { $lt: Date.now() }});
  const tasksWithNewTimes = _.map(tasksToRun, task => {
    return _.defaults({
      nextTime: moment(task.nextTime).add(24, 'hours').valueOf(),
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
}, 60000);

module.exports = {
  // For test only
  run,
};
