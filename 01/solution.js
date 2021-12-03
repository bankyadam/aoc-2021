const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 7);
console.log(partOne(input));

assert.equal(partTwo(example), 5);
console.log(partTwo(input));

function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').split(/\n/).map(v => parseInt(v));
}

function partOne(input) {
  return input
    .map((_, i, a) => a[i - 1] && a[i] > a[i - 1] ? 1 : 0)
    .reduce((v, c) => v + c, 0);
}

function partTwo(input) {
  return input
    .map((_, i, a) => a[i] + a[i + 1] + a[i + 2])
    .map((_, i, a) => a[i] && a[i] > a[i - 1] ? 1 : 0)
    .reduce((v, c) => v + c, 0);
}
