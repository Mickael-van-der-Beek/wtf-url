'use stict';

const generatorUtils = require('./generator-utils');
const grammarUtils = require('./grammar-utils');
const numberUtils = require('./number-utils');

const routeAndOperatorToken = function *(grammar, token) {
  const generators = token.$and.map(childToken => () => routeToken(grammar, childToken));
  const generator = generatorUtils.generatorProduct(generators);
  let next = null;

  while ((next = generator.next()).done === false) {
    yield next.value;
  }
};

const routeOrOperatorToken = function *(grammar, token) {
  let generator = null;
  let next = null;

  for (let i = 0, ilen = token.$or.length; i < ilen; i++) {
    generator = routeToken(grammar, token.$or[i]);

    while ((next = generator.next()).done === false) {
      yield next.value;
    }
  }
};

const routeReferenceToken = function *(grammar, token) {
  const generator = routeToken(grammar, token.$token);
  let next = null;

  while ((next = generator.next()).done === false) {
    yield next.value;
  }
};

const routeLiteralToken = function *(grammar, token) {
  yield token.$literal;
};

const routeRangeToken = function *(grammar, token) {
  const i = numberUtils.getRandomNumberIncInc(
    token.$range.from.charCodeAt(0),
    token.$range.to.charCodeAt(0)
  );

  yield String.fromCharCode(i);
};

const routeToken = function *(grammar, token) {
  const normalisedQuantifier = grammarUtils.normaliseQuantifier(token.$quantifier, 17);
  const repetitions = numberUtils.getRandomNumberIncInc(normalisedQuantifier[0], normalisedQuantifier[1]);

  const routers = {
    $and: routeAndOperatorToken,
    $or: routeOrOperatorToken,
    $token: routeReferenceToken,
    $literal: routeLiteralToken,
    $range: routeRangeToken
  };
  const routerName = Object.keys(routers).filter(key => key in token)[0];
  const router = routers[routerName];

  const generator = router(grammar, token);
  let next = null;

  while ((next = generator.next()).done === false) {
    yield new Array(repetitions).fill(next.value).join('');
  }
};

module.exports = {
  routeAndOperatorToken,
  routeOrOperatorToken,
  routeReferenceToken,
  routeLiteralToken,
  routeRangeToken,
  routeToken
};
