const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 198);
console.log(partOne(input));

assert.equal(partTwo(example), 230);
console.log(partTwo(input));

function partOne(input) {
  let gamma = 0;
  let epsilon = 0;
  rotate(input).map(v => {
    gamma <<= 1;
    epsilon <<= 1;
    if (mostCommon(v) === 1) {
      gamma += 1;
    } else {
      epsilon += 1;
    }
  });
  return gamma * epsilon;
}

function partTwo(input) {
  function doTheMath(input, check) {
    for (let i = 0; i < input[0].length; i++) {
      const checkInput = rotate(input);
      const checkBit = mostCommon(checkInput[i]).toString();
      input = input.filter(v => check(checkBit, v[i]));
      if (input.length === 1) {
        return parseInt(input[0], 2);
      }
    }
  }

  const oxygen = doTheMath(input, (a, b) => a === b);
  const co2 = doTheMath(input, (a, b) => a !== b);

  return oxygen * co2;
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').replace(/^\s+|\s+$/g, '').split(/\n/)
}

function rotate(input) {
  const rotated = [];

  input.map(v => {
    if (!v) {
      return;
    }
    v.split('').map((bit, i) => {
      rotated[i] ||= [];
      rotated[i].push(bit);
    });
  });
  return rotated.map(v => v.sort()).map(v => v.join(''));
}

function mostCommon(input) {
  return input.indexOf('1') <= Math.floor(input.length / 2) ? 1 : 0;
}
