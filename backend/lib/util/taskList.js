// This approach is fundamentally dumb
//
// The better approach is simply:
//
// - have a database with reminders
// - have each reminder store its frequency and when it should run next
// - have the worker simply wake up every minute, run a query to see which things it should run next, run them all, update them all. Done.

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

function insertTime(upcomingTimes, hour, reminderId) {
  upcomingTimes.push({ time: hour, reminderId, taskId: uuid.v4() });
  return _.sortBy(upcomingTimes, time => {
    return _.toInteger(time.time)
  });
}

function getTimes(filename) {
  try {
    // return _.split(fs.readFileSync(filename, 'utf8'), '\n');
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch(e) {
    if (e.code === 'ENOENT') {
      return [];
    }
    throw e;
  }
}

function addTime(filename, hour, reminderId) {
  const upcomingTimes = getTimes(filename);
  const upcomingTimesWithNewTimeInserted = insertTime(upcomingTimes, hour, reminderId);
  writeTimesToFile(filename, upcomingTimesWithNewTimeInserted);
}

function writeTimesToFile(filename, times) {
  const stringified = JSON.stringify(times);
  fs.writeFileSync(filename, stringified);
}

function removeAlreadyRunTasks(upcomingTimes, taskIds) {
  return _.reject(upcomingTimes, upcomingTime => _.includes(taskIds, upcomingTime.taskId));
}

function removeTimes(filename, taskIds) {
  const upcomingTimes = getTimes(filename);
  const remainingTimes = removeAlreadyRunTasks(upcomingTimes, taskIds);
  writeTimesToFile(filename, remainingTimes);
}

module.exports = {
  insertTime,
  addTime,
  getTimes,
  removeAlreadyRunTasks,
};
