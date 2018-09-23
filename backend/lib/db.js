const _ = require('lodash');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'track';

let connection;
async function db() {
  if (connection) {
    return connection;
  }
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const dbName = 'track';
  connection = client.db(dbName);
  return connection;
}

module.exports = db;
