const _ = require('lodash');

const db = require('../db');
let collection;

async function query(query) {
  collection = collection || (await db()).collection('users');
  return await collection.find(query).toArray();
}

async function addUserWithPhoneNumber(user, phoneNumber) {
  collection = collection || (await db()).collection('users');
  const userWithPhoneNumber = _.extend({ phoneNumber }, user);
  return await collection.insertOne(userWithPhoneNumber);
}

async function updatePhoneNumber(user, phoneNumber) {
  collection = collection || (await db()).collection('users');
  return await collection.updateOne(user, { $set: { phoneNumber, } });
}

module.exports = {
  addUserWithPhoneNumber,
  updatePhoneNumber,
  query,
};
