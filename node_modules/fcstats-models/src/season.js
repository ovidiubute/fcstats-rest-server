"use strict";

var Backbone = require('backbone');
var Match = require('./match');

var SeasonMatches = Backbone.Collection.extend({
  model: Match,

  modelId: function (attrs) {
    return attrs.matchId
  }
});

var Season = Backbone.Model.extend({
  defaults: {
    yearStart: 1900,
    yearEnd: 1901,
    leagueName: null
  }
});

module.exports = {
  Season: Season,
  SeasonMatches: SeasonMatches
};
