const _ = require('lodash');
const fs = require('fs');

function insertTime(upcomingTimes, hour) {
  upcomingTimes.push(hour);
  return _.sortBy(upcomingTimes, _.toInteger);
}

function addTime(filename, hour) {
  const upcomingTimes = (filename => {
    try {
      return _.split(fs.readFileSync(filename, 'utf8'), '\n');
    } catch(e) {
      if (e.code === 'ENOENT') {
        return [];
      }
      throw e;
    }
  })(filename);
  const upcomingTimesWithNewTimeInserted = insertTime(upcomingTimes, hour);
  fs.writeFileSync(filename, _.join(upcomingTimesWithNewTimeInserted, '\n'));
}

module.exports = {
  insertTime,
  addTime,
};
