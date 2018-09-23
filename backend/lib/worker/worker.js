// What does the worker do?
//
// Wake up:
// 1) read the task list
// 2) check to see if there's any tasks that need doing
// 3) If so, do them
// 4) calculate their next time and put that time on the task list

const _ = require('lodash');
const moment = require('moment');

const { TASK_LIST_FILENAME } = require('../definitions/tasklist');
const taskList = require('../util/taskList');

async function run() {
  console.log('running worker');
  const upcomingTimes = taskList.getTimes(TASK_LIST_FILENAME);
  // Which to run? Ones with a provided time < the current time
  const currentTime = Date.now();
  const tasksToRun = _.filter(upcomingTimes, upcomingTime => upcomingTime < Date.now());
  _.each(tasksToRun, task => {
    console.log('task', task);
    // What do we need to do for the task? Obviously we will need more than just the hour - we need to know who to send something to. 
    // So a reminder on the task list needs to have:
    // - a time
    // - a reminderId in the database
    //
    // The reminderId in the database needs to have:
    // - a userId (who to send the reminder to)
    // - the question that we're tracking

    // (call out to do the thing here)
  });
  const newTimes = _.map(tasksToRun, task => {
    return moment(task).add(24, 'hours').valueOf();
  });

  // Now replace old times with new times
  console.log('newTimes', newTimes);
  console.log('upcomingTimes', upcomingTimes);
}

run();
setInterval(() => {
  run();
}, 60000);

module.exports = {
  // For test only
  run,
};
