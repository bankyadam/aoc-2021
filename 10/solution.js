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
  const errs = input.map(line => {
    try {
      parsePairs(line.split(''), []);
    } catch (e) {
      return e.char;
    }
  }).filter(v => v);

  return errs.reduce((c, v) => c + syntaxErrorScore[v], 0);
}

function partTwo(input) {
  const autocompletes = input.map(line => {
    try {
      const leftOpens = parsePairs(line.split(''), []);
      let openChar;
      let ret = '';
      while (openChar = leftOpens.pop()) {
        ret += legalPairs[openChar];
      }
      return ret;
    } catch (e) {
    }
  }).filter(v => v);

  const scores = autocompletes
    .map(line => line.split('')
      .reduce((c, v) => (c * 5) + autoCompleteScore[v], 0))
    .sort((a, b) => a - b);

  return scores[Math.ceil(scores.length / 2) - 1];
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/);
}
