'use strict';

const ALPHA = {
  $or: [{
    $range: {
      from: 'a',
      to: 'z'
    }
  }, {
    $range: {
      from: 'A',
      to: 'Z'
    }
  }]
};

const DIGIT = {
  $range: {
    from: '0',
    to: '9'
  }
};

const HEXDIG = {
  $or: [{
    $token: DIGIT
  }, {
    $literal: 'A'
  }, {
    $literal: 'B'
  }, {
    $literal: 'C'
  }, {
    $literal: 'D'
  }, {
    $literal: 'E'
  }, {
    $literal: 'F'
  }]
};

module.exports = {
  ALPHA,
  DIGIT,
  HEXDIG
};
