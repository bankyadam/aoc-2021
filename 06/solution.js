const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 5934);
console.log(partOne(input));

assert.equal(partTwo(example), 26984457539);
console.log(partTwo(input));

function partOne(input) {
  const fishes = input.concat([]);
  for (let day = 1; day <= 80; day++) {
    fishes.map((_, i) => {
      fishes[i]--;
      if (fishes[i] === -1) {
        fishes.push(8);
        fishes[i] = 6;
      }
    });
  }
  return fishes.length;
}

function partTwo(input) {
  const fishes = input.reduce((c, fish) => (c[fish]++, c), new Array(9).fill(0))
  let day = 256;
  while (day--) {
    let spawn = fishes.shift();
    fishes[6] += spawn;
    fishes[8] = spawn;
  }
  return fishes.reduce((c, v) => c + v, 0);
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\D+/).map(v => parseInt(v, 10));
}
