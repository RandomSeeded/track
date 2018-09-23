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

function removeTimes(filename, taskIds) {
  const upcomingTimes = getTimes(filename);
  const remainingTimes = _.reject(upcomingTimes, upcomingTime => _.includes(taskIds, upcomingTime.taskId));
}

module.exports = {
  insertTime,
  addTime,
  getTimes,
};
