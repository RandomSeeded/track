const db = require('../db');
let collection;

async function add(reminder) {
  collection = collection || (await db()).collection('reminders');
  return await collection.insertOne(reminder);
}

async function query(query) {
  collection = collection || (await db()).collection('reminders');
  return await collection.find(query).toArray();
}

async function remove(id) {
  collection = collection || (await db()).collection('reminders');
  return await collection.deleteOne({ _id: id });
}

async function update(id, body) {
  return await collection.updateOne({ _id: id }, { $set: body });
}

module.exports = {
  add,
  query,
  remove,
  update,
};
