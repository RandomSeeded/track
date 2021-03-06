const _ = require('lodash');

const userModel = require('../models/userModel');

async function addOrUpdatePhoneNumber(user, phoneNumber) {
  const userInDB = !_.isEmpty(await userModel.query(user));
  if (userInDB) {
    return userModel.updatePhoneNumber(user, phoneNumber);
  }
  return userModel.addUserWithPhoneNumber(user, phoneNumber);
}

module.exports = {
  addOrUpdatePhoneNumber,
}
