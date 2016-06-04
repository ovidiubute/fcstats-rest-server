"use strict";

const _ = require('lodash');

function Season (collection) {
  this.coll = collection;
}

Season.prototype.findByLeague = function (leagueName) {
  let matches = this.coll.find({
    'season.leagueName': {'$eq': leagueName}
  });

  if (!matches.length) {
    return [];
  }

  return _.sortBy(
    _.uniqWith(matches.map((match) => {
      return match.season;
    }), _.isEqual), (season) => {
      return -season.yearStart;
    }
  );
}

module.exports = {
  get: (collection) => {
    return new Season(collection);
  }
}
