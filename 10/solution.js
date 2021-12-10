const { readFileSync } = require('fs');
const assert = require('assert');

const legalPairs = {
  '<': '>',
  '{': '}',
  '[': ']',
  '(': ')'
};

const syntaxErrorScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const autoCompleteScore = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

class InvalidClosing extends Error { constructor(char) { super(); this.char = char; } }

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 26397);
console.log(partOne(input));

assert.equal(partTwo(example), 288957);
console.log(partTwo(input));

function parsePairs(chars, opens) {
  const char = chars.shift();
  if (Object.keys(legalPairs).indexOf(char) !== -1) {
    opens.push(char);
  } else {
    if (legalPairs[opens.pop()] !== char) {
      throw new InvalidClosing(char);
    }
  }
  if (chars.length > 0) {
    parsePairs(chars, opens);
  }
  return opens;
}

function partOne(input) {
  return input.map(line => {
    try {
      parsePairs(line.split(''), []);
    } catch (e) {
      return e.char;
    }
  })
    .filter(v => v)
    .reduce((c, v) => c + syntaxErrorScore[v], 0);
}

function partTwo(input) {
  const scores = input.map(line => {
    try {
      return parsePairs(line.split(''), [])
        .reduceRight((c, v) => c + legalPairs[v], '');
    } catch (e) {
    }
  })
    .filter(v => v)
    .map(line => line.split('')
      .reduce((c, v) => (c * 5) + autoCompleteScore[v], 0))
    .sort((a, b) => a - b);

  return scores[Math.ceil(scores.length / 2) - 1];
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/);
}
