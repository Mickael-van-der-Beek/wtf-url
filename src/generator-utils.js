'use strict';

const generatorProduct = function *(generatorArray) {
  if (generatorArray.length === 0) {
    yield '';
  } else {
    let generatorX = generatorArray[0]();
    let generatorY = null;
    let nextY = null;
    let nextX = null;

    while ((nextX = generatorX.next()).done === false) {
      generatorY = generatorProduct(generatorArray.slice(1));

      while ((nextY = generatorY.next()).done === false) {
        yield nextX.value + nextY.value;
      }
    }
  }
};

module.exports = {
  generatorProduct
};
