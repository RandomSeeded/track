const _ = require('lodash');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dbName = 'track';

const { MONGO_HOST } = require('./secrets');

let connection;
async function db() {
  if (connection) {
    return connection;
  }
  const client = await MongoClient.connect(MONGO_HOST);
  const dbName = 'track';
  connection = client.db(dbName);
  return connection;
}

module.exports = db;
