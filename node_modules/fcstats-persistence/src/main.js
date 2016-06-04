"use strict";

var q = require('promised-io/promise');
var fs = require('fs');
var loki = require('lokijs');
var path = require('path');
var MatchModel = require('fcstats-models').MatchModel;

function createTable(db, tableName, options) {
  return db.addCollection(tableName, options);
}

function loadDatabase(dbFile) {
  var deferred = q.defer();

  fs.readFile(path.resolve(dbFile), (err, data) => {
    if (err) {
      deferred.reject(err);
    } else {
      let db = new loki(path.basename(dbFile));
      let jsonData = JSON.parse(data.toString('utf8'));
      db.loadJSONObject(jsonData);
      deferred.resolve(db);
    }
  });

  return deferred.promise;
}

function newDatabase(dbName) {
  return new loki(dbName);
}

function getTable(db, tableName) {
  return db.getCollection(tableName);
}

function insert(table, model) {
  return table.insert(model.attributes);
}

module.exports = {
  createTable: createTable,
  insert: insert,
  loadDatabase: loadDatabase,
  getTable: getTable,
  newDatabase: newDatabase
};
