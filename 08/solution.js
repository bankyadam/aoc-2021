const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 26);
console.log(partOne(input));

assert.equal(partTwo(example), 61229);
console.log(partTwo(input));

function partOne(input) {
  return input.reduce((c, rows) =>
    c + rows[1].reduce((c, digit) =>
      c + ([2, 4, 3, 7].includes(digit.length) ? 1 : 0), 0), 0)
}

function partTwo(input) {
  return input.map(row => {
    const removeDigitsFrom = function(originalDigit, digit) {
      map[digit].split('').map(digit => originalDigit = originalDigit.replace(digit, ''));
      return originalDigit;
    };

    const removeFromArray = function(array, number) {
      return array.filter(v => v !== map[number])
    }

    const map = new Array(10).fill('');
    const digits = row[0].sort((a, b) => a.length < b.length ? -1 : 1);
    map[1] = digits[0];
    map[7] = digits[1];
    map[4] = digits[2];
    map[8] = digits[9];

    let fiveDigits = digits.slice(3, 6);
    let sixDigits = digits.slice(6, 9);
    map[6] = sixDigits.find(digit => removeDigitsFrom(digit, 1).length === 5);
    sixDigits = removeFromArray(sixDigits, 6);
    map[9] = sixDigits.find(digit => removeDigitsFrom(digit, 4).length === 2);
    sixDigits = removeFromArray(sixDigits, 9);
    map[0] = sixDigits[0];
    map[3] = fiveDigits.find(digit => removeDigitsFrom(digit, 7).length === 2);
    fiveDigits = removeFromArray(fiveDigits, 3);
    map[5] = fiveDigits.find(digit => removeDigitsFrom(digit, 6).length === 0);
    fiveDigits = removeFromArray(fiveDigits, 5);
    map[2] = fiveDigits[0];

    const reverseMap = {};
    map.map((v, i) => reverseMap[v] = i);

    return +row[1].reduce((c, v) => c + reverseMap[v], '');
  }).reduce((c, v) => c + v, 0);
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/)
    .map(row => row.split(/\s+\|\s+/)
      .map(v => v.split(/\s+/)
        .map(digit => digit.split('').sort().join(''))
      )
    );
}
