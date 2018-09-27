const db = require('../db');
let collection;

async function add(answer) {
  collection = collection || (await db()).collection('answers');
  return await collection.insertOne(answer);
}

async function query(query) {
  collection = collection || (await db()).collection('answers');
  return await collection.find(query).toArray();
}

async function remove(id) {
  collection = collection || (await db()).collection('answers');
  return await collection.deleteOne({_id: id });
}

module.exports = {
  add,
  query,
  remove,
};
