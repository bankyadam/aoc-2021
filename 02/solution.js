const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 150);
console.log(partOne(input));

assert.equal(partTwo(example), 900);
console.log(partTwo(input));

function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').split(/\n/)
    .map(v => {
      const parts = v.split(/\s+/);
      return [parts[0], parseInt(parts[1])];
    });
}

function partOne(input) {
  return input
    .reduce((v, c) => {
      switch (c[0]) {
        case 'forward':
          v[0] += c[1];
          break;
        case 'up':
          v[1] -= c[1];
          break;
        case 'down':
          v[1] += c[1];
          break;
        default:
      }
      return v;
    }, [0, 0])
    .reduce((v, c) => v * c, 1);
}

function partTwo(input) {
  return input
    .reduce((v, c) => {
      switch (c[0]) {
        case 'forward':
          v[0] += c[1];
          v[1] += (c[1] * v[2]);
          break;
        case 'up':
          v[2] -= c[1];
          break;
        case 'down':
          v[2] += c[1];
          break;
        default:
      }
      return v;
    }, [0, 0, 0]) // calculate horizontal, vertical, aim
    .splice(0, 2) // we only need horizontal, vertical
    .reduce((v, c) => v * c, 1); // result
}
