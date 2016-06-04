"use strict";

var assert = require('assert');
var r = require('../src/result');

describe('Result Enum', function () {
  describe('#constructor', function () {
    it('should have three fields', function () {
      assert(Object.getOwnPropertyNames(r).length === 3);
    });

    it('should have a Home field with value 2', function () {
      assert(r.Home === 2);
    });

    it('should have a Draw field with value 0', function () {
      assert(r.Draw === 0);
    });

    it('should have a Away field with value 1', function () {
      assert(r.Away === 1);
    });

    it('should always return the same instance', function () {
      var r2 = require('../src/result');
      assert(r === r2);
    });
  })
});
