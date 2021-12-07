const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 37);
console.log(partOne(input));

assert.equal(partTwo(example), 168);
console.log(partTwo(input));

function partOne(input) {
  const max = Math.max.apply(null, input);
  let minFuel = Number.MAX_SAFE_INTEGER;
  for (let fuel = 2; fuel < max; fuel++) {
    minFuel = Math.min(minFuel, input.reduce((c, h) => c + Math.abs(h - fuel), 0));
  }
  return minFuel;
}

function partTwo(input) {
  const sumOfNumbers = i => (i * (i + 1)) / 2;
  const max = Math.max.apply(null, input);
  let minFuel = Number.MAX_SAFE_INTEGER;
  for (let fuel = 2; fuel < max; fuel++) {
    minFuel = Math.min(minFuel, input.reduce((c, h) => c + sumOfNumbers(Math.abs(h - fuel)), 0));
  }
  return minFuel;
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(',').map(v => parseInt(v, 10));
}
