'use strict';

const assert = require('assert');
const util = require('util');

const numberUtils = require('../src/number-utils');

describe('Number Utils', () => {
  it('is module that exposes helpers', () => {
    assert.ok(util.isObject(numberUtils));
    assert.strictEqual(Object.keys(numberUtils).length, 3);
  });
  describe('getRandomNumberIncInc()', () => {
    it('is Function', () => {
      assert.ok(util.isFunction(numberUtils.getRandomNumberIncInc));
    });
    it('has two arguments (min, numberUtils)', () => {
      assert.strictEqual(numberUtils.getRandomNumberIncInc.length, 2);
    });
    it('can generate random number', () => {
      const number = numberUtils.getRandomNumberIncInc(1, 4);
      assert.ok(util.isNumber(number));
    });
    it('can generate random in range [min, max]', () => {
      let ones = 0;
      let twos = 0;
      let number = null;
      let max = 1000;

      for (let i = 0; i < max; i++) {
        number = numberUtils.getRandomNumberIncInc(1, 4);
        ones += Number(number === 1);
        twos += Number(number === 2);
      }

      assert.ok(ones > 0);
      assert.ok(twos > 0);
    });
    it('can generate random number following normal distribution', () => {
      let ones = 0;
      let twos = 0;
      let threes = 0;
      let fours = 0;
      let number = null;
      let margin = 0.05;
      let max = 1000;

      for (let i = 0; i < max; i++) {
        number = numberUtils.getRandomNumberIncInc(1, 4);
        ones += Number(number === 1);
        twos += Number(number === 2);
        threes += Number(number === 3);
        fours += Number(number === 4);
      }

      assert.strictEqual(ones + twos + threes + fours, max);
      assert.ok(ones > max / 4 - max * margin);
      assert.ok(ones < max / 4 + max * margin);
      assert.ok(twos > max / 4 - max * margin);
      assert.ok(twos < max / 4 + max * margin);
      assert.ok(threes > max / 4 - max * margin);
      assert.ok(threes < max / 4 + max * margin);
      assert.ok(fours > max / 4 - max * margin);
      assert.ok(fours < max / 4 + max * margin);
    });
  });
  describe('getRangesWithExclusionsIncInc()', () => {
    it('is Function', () => {
      assert.ok(util.isFunction(numberUtils.getRangesWithExclusionsIncInc));
    });
    it('has three arguments (min, max, exclusions)', () => {
      assert.strictEqual(numberUtils.getRangesWithExclusionsIncInc.length, 3);
    });
    it('can generate range with exclusions', () => {
      const min = 1;
      const max = 4;
      const exclusions = [2];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 2);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 1);
      assert.strictEqual(ranges[0][1], 1);
      assert.ok(util.isArray(ranges[1]));
      assert.strictEqual(ranges[1].length, 2);
      assert.strictEqual(ranges[1][0], 3);
      assert.strictEqual(ranges[1][1], 4);
    });
    it('can generate range with exclusions containing x == min', () => {
      const min = 1;
      const max = 4;
      const exclusions = [1, 2];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 1);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 3);
      assert.strictEqual(ranges[0][1], 4);
    });
    it('can generate range with exclusions containing x < min', () => {
      const min = 1;
      const max = 4;
      const exclusions = [0, 2];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 2);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 1);
      assert.strictEqual(ranges[0][1], 1);
      assert.ok(util.isArray(ranges[1]));
      assert.strictEqual(ranges[1].length, 2);
      assert.strictEqual(ranges[1][0], 3);
      assert.strictEqual(ranges[1][1], 4);
    });
    it('can generate range with exclusions containing x == max', () => {
      const min = 1;
      const max = 4;
      const exclusions = [3, 4];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 1);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 1);
      assert.strictEqual(ranges[0][1], 2);
    });
    it('can generate range with exclusions containing x > max', () => {
      const min = 1;
      const max = 4;
      const exclusions = [3, 5];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 2);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 1);
      assert.strictEqual(ranges[0][1], 2);
      assert.ok(util.isArray(ranges[1]));
      assert.strictEqual(ranges[1].length, 2);
      assert.strictEqual(ranges[1][0], 4);
      assert.strictEqual(ranges[1][1], 4);
    });
    it('can generate range with exclusions containing x == min and x == max', () => {
      const min = 1;
      const max = 4;
      const exclusions = [1, 4];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 1);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 2);
      assert.strictEqual(ranges[0][1], 3);
    });
    it('can generate empty ranges', () => {
      const min = 1;
      const max = 4;
      const exclusions = [1, 2, 3, 4];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 0);
    });
    it('can generate range with exclusions containing duplicates', () => {
      const min = 1;
      const max = 4;
      const exclusions = [2, 2, 2];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 2);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 1);
      assert.strictEqual(ranges[0][1], 1);
      assert.ok(util.isArray(ranges[1]));
      assert.strictEqual(ranges[1].length, 2);
      assert.strictEqual(ranges[1][0], 3);
      assert.strictEqual(ranges[1][1], 4);
    });
    it('can generate range with exclusions containing x == min, x < min, x == max, x > max and duplicates', () => {
      const min = 1;
      const max = 8;
      const exclusions = [0, 1, 3, 3, 3, 8, 10];
      const ranges = numberUtils.getRangesWithExclusionsIncInc(min, max, exclusions);

      assert.ok(util.isArray(ranges));
      assert.strictEqual(ranges.length, 2);
      assert.ok(util.isArray(ranges[0]));
      assert.strictEqual(ranges[0].length, 2);
      assert.strictEqual(ranges[0][0], 2);
      assert.strictEqual(ranges[0][1], 2);
      assert.ok(util.isArray(ranges[1]));
      assert.strictEqual(ranges[1].length, 2);
      assert.strictEqual(ranges[1][0], 4);
      assert.strictEqual(ranges[1][1], 7);
    });
  });
  describe('randomNumberIncIncWithExclusions()', () => {
    it('is Function', () => {
      assert.ok(util.isFunction(numberUtils.randomNumberIncIncWithExclusions));
    });
    it('has three arguments (min, max, exclusions)', () => {
      assert.strictEqual(numberUtils.randomNumberIncIncWithExclusions.length, 3);
    });
    it('can generate random in range [min, max] with exclusions', () => {
      let ones = 0;
      let threes = 0;
      let fours = 0;
      let number = null;
      let max = 1000;

      for (let i = 0; i < max; i++) {
        number = numberUtils.randomNumberIncIncWithExclusions(1, 4, [2]);
        ones += Number(number === 1);
        threes += Number(number === 3);
        fours += Number(number === 4);
      }

      assert.strictEqual(ones + threes + fours, max);
      assert.ok(ones > 0);
      assert.ok(threes > 0);
      assert.ok(fours > 0);
    });
  });
});
