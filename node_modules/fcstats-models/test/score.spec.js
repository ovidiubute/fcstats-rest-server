"use strict";

var ScoreModel = require('../src/score');
var ResultEnum = require('../src/result');
var assert = require('assert');

describe('Score Model', function () {
  describe('#constructor', function () {
    it('should return a goal-less draw by default', function () {
      var draw = new ScoreModel();
      assert(draw.get('home') === 0);
      assert(draw.get('away') === 0);
      assert(draw.get('result') === ResultEnum.Draw);
    });
  });

  describe('#initialize', function () {
    it('should set the correct result even if not specified', function () {
      var homeWin = new ScoreModel({home: 5, away: 0});
      assert(homeWin.get('result') === ResultEnum.Home);
    });
  });

  describe('#set', function () {
    it('should set the result field after home or away fields are changed', function () {
      var draw = new ScoreModel();
      draw.set({home: 3});

      assert(draw.get('home') === 3);
      assert(draw.get('away') === 0);
      assert(draw.get('result') === ResultEnum.Home);

      draw.set({away: 3});
      assert(draw.get('home') === 3);
      assert(draw.get('away') === 3);
      assert(draw.get('result') === ResultEnum.Draw);

      draw.set({away: 4});
      assert(draw.get('home') === 3);
      assert(draw.get('away') === 4);
      assert(draw.get('result') === ResultEnum.Away);
    });
  });
});
