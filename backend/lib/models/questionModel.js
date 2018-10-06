const db = require('../db');
let collection;

async function add(question) {
  collection = collection || (await db()).collection('questions');
  return await collection.insertOne(question);
}

async function query(query) {
  collection = collection || (await db()).collection('questions');
  return await collection.find(query).toArray();
}

async function remove(_id) {
  collection = collection || (await db()).collection('questions');
  return await collection.deleteOne({ _id });
}

async function updateFields(_id, fields) {
  collection = collection || (await db()).collection('questions');
  return await collection.updateOne({ _id }, { $set: fields });
}

module.exports = {
  add,
  query,
  remove,
  updateFields,
};
