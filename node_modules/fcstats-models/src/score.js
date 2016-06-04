"use strict";

var Backbone = require('backbone'),
  ResultEnum = require('./result');

var Score = Backbone.Model.extend({
  defaults: {
    home: 0,
    away: 0,
    result: ResultEnum.Draw
  },

  calculateResult: function () {
    var home = this.get('home');
    var away = this.get('away');
    var result = ResultEnum.Draw;

    if (home > away) {
      result = ResultEnum.Home;
    } else if (home < away) {
      result = ResultEnum.Away;
    }

    this.set({result: result});
  },

  initialize: function () {
    if (this.attributes.home > this.attributes.away) {
      this.attributes.result = ResultEnum.Home;
    } else if (this.attributes.home < this.attributes.away) {
      this.attributes.result = ResultEnum.Away;
    }

    this.bind("change:home", this.calculateResult);
    this.bind("change:away", this.calculateResult);
  }
});

module.exports = Score;
