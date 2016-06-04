"use strict";

var assert = require('assert');
var SeasonModel = require('../src/season').Season;
var Match = require('../src/match');
var SeasonMatches = require('../src/season').SeasonMatches;

describe('Season Model', function () {
  describe('#constructor', function () {
    it('should return a no league start of century season by default', function () {
      var season = new SeasonModel();
      assert(season.get('yearStart') === 1900);
      assert(season.get('yearEnd') === 1901);
      assert(season.get('leagueName') === null);
    });
  });
});

describe('SeasonMatches Collection', function () {
  describe('#constructor', function () {
    it('should return a matchless Collection by default', function () {
      var seasonMatches = new SeasonMatches();
      assert(seasonMatches.size() === 0);
    });

    it('should return a Collection of Match models', function () {
      var matches = [
        new Match({matchId: 1}),
        new Match({matchId: 2})
      ];
      var seasonMatches = new SeasonMatches(matches);
      assert(seasonMatches.size() === 2);
    });
  })
});
