"use strict";

var Backbone = require('backbone'),
  ScoreModel = require('./score'),
  TeamModel = require('./team'),
  LeagueModel = require('./league'),
  SeasonModel = require('./season').Season;

var Match = Backbone.Model.extend({
  defaults: {
    matchId: null,
    homeTeam: null,
    awayTeam: null,
    score: new ScoreModel(),
    league: null,
    date: null,
    season: null
  }
});

module.exports = Match;
