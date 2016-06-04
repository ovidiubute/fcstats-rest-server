"use strict";

const assert = require('assert');
const main = require('../src/main');
const MatchModel = require('fcstats-models').MatchModel;

describe('main', function () {
  describe('#loadDatabase', function () {
    it('should load database from file', function () {
      return main.loadDatabase('test/f.json').then((db) => {
        let table = main.getTable(db, 'matches');
        let matches = table.find();
        assert.equal(matches.length, 1);
      });
    });
  });

  describe('#createTable', function () {
    it('should create a collection inside a DB', function () {
      return main.loadDatabase('test/f.json').then(function (db) {
        let collection = main.createTable(db, 'seasons');

        assert.equal(collection.name, 'seasons');
        assert.deepEqual(collection.data, []);
      });
    });
  });

  describe('#insert', function () {
    it('should add a Model to a collection inside a DB', function () {
      return main.loadDatabase('test/f.json').then(function (db) {
        let collection = main.createTable(db, 'matches');

        let result = main.insert(collection, new MatchModel({
          matchId: 3004,
          name: 'Joi'
        }));

        assert.equal(result.$loki, 1);
        assert.equal(result.name, 'Joi');
        assert.equal(result.matchId, 3004);
      });
    });
  });
});
