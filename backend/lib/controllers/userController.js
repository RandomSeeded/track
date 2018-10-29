const _ = require('lodash');

const userModel = require('../models/userModel');

// Add a 'add phone number to user' method which either adds a new user object or updates
async function addOrUpdatePhoneNumber(user, phoneNumber) {
  const userInDB = !_.isEmpty(await userModel.query(user));
  // TODO (nw): format phone numbers according to E.164 standard (use Twilio lookup API)
  if (userInDB) {
    return userModel.updatePhoneNumber(user, phoneNumber);
  }
  return userModel.addUserWithPhoneNumber(user, phoneNumber);
}

module.exports = {
  addOrUpdatePhoneNumber,
}
