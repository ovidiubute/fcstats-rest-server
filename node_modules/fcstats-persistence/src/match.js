"use strict";

const util = require('util');
const lokijs = require('lokijs');

function Match (collection) {
  this.coll = collection;
}

Match.prototype.findByYearAndLeague = function (year, leagueName) {
  return this.coll.find({
    'league.name': {'$eq': leagueName}
  }).filter((match) => {
    return match.season.yearStart === year && match.season.yearEnd === year + 1;
  });
}

module.exports = {
  get: (collection) => {
    return new Match(collection);
  }
}
