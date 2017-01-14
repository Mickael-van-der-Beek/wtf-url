'use strict';

const getRandomNumberIncInc = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRangesWithExclusionsIncInc = (min, max, exclusions) => {
  const ranges = [[min]];

  exclusions = exclusions
    .filter(exclusion => exclusion >= min)
    .filter(exclusion => exclusion <= max)
    .sort((exclusionA, exclusionB) => exclusionA - exclusionB);

  for (let i = 0, ilen = exclusions.length; i < ilen; i++) {
    if (ranges[ranges.length - 1][0] === exclusions[i]) {
      ranges[ranges.length - 1][0] += 1;
    } else if (ranges[ranges.length - 1][0] < exclusions[i]) {
      ranges[ranges.length - 1][1] = exclusions[i] - 1;
      ranges.push([]);
      ranges[ranges.length - 1][0] = exclusions[i] + 1;
    }
  }

  if (ranges[ranges.length - 1][0] > max) {
    ranges.pop();
  } else {
    ranges[ranges.length - 1][1] = max;
  }

  return ranges;
};

const randomNumberIncIncWithExclusions = (min, max, exclusions) => {
  const ranges = getRangesWithExclusionsIncInc(min, max, exclusions);
  const randomRange = getRandomNumberIncInc(0, ranges.length - 1);
  const randomValue = getRandomNumberIncInc(ranges[randomRange][0], ranges[randomRange][1]);
  return randomValue;
};

module.exports = {
  getRandomNumberIncInc,
  getRangesWithExclusionsIncInc,
  randomNumberIncIncWithExclusions
};
