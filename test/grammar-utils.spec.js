'use strict';

const assert = require('assert');
const util = require('util');

const grammarUtils = require('../src/grammar-utils');

describe('Grammar Utils', () => {
  it('is module that exposes helpers', () => {
    assert.ok(util.isObject(grammarUtils));
    assert.strictEqual(Object.keys(grammarUtils).length, 2);
  });
  describe('mergeGrammars()', () => {
    it('is Function', () => {
      assert.ok(util.isFunction(grammarUtils.mergeGrammars));
    });
    it('has single argument (grammars)', () => {
      assert.strictEqual(grammarUtils.mergeGrammars.length, 1);
    });
    it('can merge grammars when no conflict', () => {
      const grammar1 = {
        a: 1
      };
      const grammar2 = {
        b: 2
      };
      const mergedGrammar = grammarUtils.mergeGrammars([grammar1, grammar2]);

      assert.ok(util.isObject(mergedGrammar));
      assert.strictEqual(mergedGrammar === grammar1, false);
      assert.strictEqual(mergedGrammar === grammar2, false);
      assert.strictEqual(Object.keys(mergedGrammar).length, 2);
      assert.strictEqual(mergedGrammar.a, 1);
      assert.strictEqual(mergedGrammar.b, 2);
    });
    it('can merge grammars when conflict (no override)', () => {
      const grammar1 = {
        a: 1,
        b: 2
      };
      const grammar2 = {
        b: 4,
        c: 3
      };
      const mergedGrammar = grammarUtils.mergeGrammars([grammar1, grammar2]);

      assert.ok(util.isObject(mergedGrammar));
      assert.strictEqual(mergedGrammar === grammar1, false);
      assert.strictEqual(mergedGrammar === grammar2, false);
      assert.strictEqual(Object.keys(mergedGrammar).length, 3);
      assert.strictEqual(mergedGrammar.a, 1);
      assert.strictEqual(mergedGrammar.b, 2);
      assert.strictEqual(mergedGrammar.c, 3);
    });
  });
  describe('normaliseQuantifier()', () => {
    it('is Function', () => {
      assert.ok(util.isFunction(grammarUtils.normaliseQuantifier));
    });
    it('has single argument (quantifier, maxRepetition)', () => {
      assert.strictEqual(grammarUtils.normaliseQuantifier.length, 2);
    });
    it('can normalise if quantifier is undefined', () => {
      const quantifier = undefined;
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 1);
      assert.strictEqual(normalisedQuantifier[1], 1);
    });
    it('can normalise if quantifier is of form ?', () => {
      const quantifier = '?';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 0);
      assert.strictEqual(normalisedQuantifier[1], 1);
    });
    it('can normalise if quantifier is of form *', () => {
      const quantifier = '*';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 0);
      assert.strictEqual(normalisedQuantifier[1], maxRepetition);
    });
    it('can normalise if quantifier is of form +', () => {
      const quantifier = '+';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 1);
      assert.strictEqual(normalisedQuantifier[1], maxRepetition);
    });
    it('can normalise if quantifier is of form INT', () => {
      const quantifier = '2';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 2);
      assert.strictEqual(normalisedQuantifier[1], 2);
    });
    it('can normalise if quantifier is of form INT*', () => {
      const quantifier = '2*';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 2);
      assert.strictEqual(normalisedQuantifier[1], 15);
    });
    it('can normalise if quantifier is of form *INT', () => {
      const quantifier = '*2';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 0);
      assert.strictEqual(normalisedQuantifier[1], 2);
    });
    it('can normalise if quantifier is of form INT*INT', () => {
      const quantifier = '2*3';
      const maxRepetition = 15;
      const normalisedQuantifier = grammarUtils.normaliseQuantifier(quantifier, maxRepetition);

      assert.ok(util.isArray(normalisedQuantifier));
      assert.strictEqual(normalisedQuantifier.length, 2);
      assert.strictEqual(normalisedQuantifier[0], 2);
      assert.strictEqual(normalisedQuantifier[1], 3);
    });
    it('throws if quantifier has invalid min', () => {
      const quantifier = 'Z*2';
      const maxRepetition = 15;

      assert.throws(() => grammarUtils.normaliseQuantifier(quantifier, maxRepetition), TypeError);
    });
    it('throws if quantifier has invalid max', () => {
      const quantifier = '2*Z';
      const maxRepetition = 15;

      assert.throws(() => grammarUtils.normaliseQuantifier(quantifier, maxRepetition), TypeError);
    });
    it('throws if quantifier max < min', () => {
      const quantifier = '3*2';
      const maxRepetition = 15;

      assert.throws(() => grammarUtils.normaliseQuantifier(quantifier, maxRepetition), RangeError);
    });
  });
});
