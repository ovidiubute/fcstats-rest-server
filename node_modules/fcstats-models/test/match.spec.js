"use strict";

var assert = require('assert');
var MatchModel = require('../src/match');
var ResultEnum = require('../src/result');

describe('Match Model', function () {
  describe('#constructor', function () {
    it('should return a goal-less match by default', function () {
      var match = new MatchModel();
      assert(match.get('matchId') === null);
      assert(match.get('homeTeam') === null);
      assert(match.get('awayTeam') === null);
      assert(match.get('date') === null);
      assert(match.get('league') === null);
      assert(match.get('season') === null);
      assert(match.get('score').get('result') === ResultEnum.Draw);
    });
  });
});
