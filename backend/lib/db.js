const _ = require('lodash');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'track';

const db = {};
(async function initializeDB() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const dbName = 'track';
  _.extend(db, client.db(dbName));
  const collection = db.collection('reminders');
  const res = await collection.insertOne({ a: 3 });
})();

module.exports = db;
