const _ = require('lodash');
const fs = require('fs');

function insertTime(upcomingTimes, hour) {
  upcomingTimes.push(hour);
  return _.sortBy(upcomingTimes, _.toInteger);
}

function addTime(filename, hour) {
  const upcomingTimes = _.split(fs.readFileSync(filename, 'utf8'), '\n');
  const upcomingTimesWithNewTimeInserted = insertTime(upcomingTimes, hour);
  fs.writeFileSync(filename, _.join(upcomingTimesWithNewTimeInserted, '\n'));
}

module.exports = {
  insertTime,
  addTime,
};
