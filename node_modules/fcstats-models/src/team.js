"use strict";

var Backbone = require('backbone')

var Team = Backbone.Model.extend({
  defaults: {
    name: 'F.C. Fake node.js Team'
  }
});

module.exports = Team;
