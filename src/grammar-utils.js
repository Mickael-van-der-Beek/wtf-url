'use strict';

const mergeGrammars = grammars => {
  let mergedGrammar = {};

  for (let i = 0, ilen = grammars.length; i < ilen; i++) {
    for (let tokenName in grammars[i]) {
      if (tokenName in mergedGrammar === false) {
        mergedGrammar[tokenName] = grammars[i][tokenName];
      }
    }
  }

  return mergedGrammar;
};

const normaliseQuantifier = (quantifier, maxRepetition) => {
  let min = null;
  let max = null;

  if (quantifier === undefined) {
    min = 1;
    max = 1;
  } else if (quantifier === '+') {
    min = 1;
    max = maxRepetition;
  } else if (quantifier === '*') {
    min = 0;
    max = maxRepetition;
  } else if (quantifier === '?') {
    min = 0;
    max = 1;
  } else if (quantifier.indexOf('*') !== -1) {
    const components = quantifier.split('*');

    min = components[0] === '' ? 0 : parseInt(components[0], 10);
    max = components[1] === '' ? maxRepetition : parseInt(components[1], 10);
  } else {
    min = parseInt(quantifier, 10);
    max = min;
  }

  if (typeof min !== 'number' || isNaN(min)) {
    throw new TypeError(min);
  }

  if (typeof max !== 'number' || isNaN(max)) {
    throw new TypeError(max);
  }

  if (max < min) {
    throw new RangeError(`${max} < ${min}`);
  }

  return [min, max];
};

module.exports = {
  mergeGrammars,
  normaliseQuantifier
};
