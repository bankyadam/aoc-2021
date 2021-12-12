const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

// assert.equal(partOne(example), 204);
assert.equal(partOne(example), 1656);
console.log(partOne(input));

assert.equal(partTwo(example), 195);
console.log(partTwo(input));

function tick(grid, rowWidth) {
  let flashCount = 0;
  const flashed = new Set();

  function tryToIncreaseEnergyLevel(i) {
    if (grid[i] === undefined) {
      return;
    }
    if (flashed.has(i)) {
      return;
    }
    grid[i]++;
    if (grid[i] > 9) {
      grid[i] = 0;
      flashCount++;
      flashed.add(i);
      if (i % rowWidth !== 0) {
        tryToIncreaseEnergyLevel(i - rowWidth - 1);
        tryToIncreaseEnergyLevel(i - 1);
        tryToIncreaseEnergyLevel(i + rowWidth - 1);
      }
      tryToIncreaseEnergyLevel(i - rowWidth);
      tryToIncreaseEnergyLevel(i + rowWidth);
      if (i % rowWidth !== 9) {
        tryToIncreaseEnergyLevel(i - rowWidth + 1);
        tryToIncreaseEnergyLevel(i + 1);
        tryToIncreaseEnergyLevel(i + rowWidth + 1);
      }
    }
  }

  grid.forEach((_, i) => tryToIncreaseEnergyLevel(i));
  return flashCount;
}

function partOne(input) {
  const grid = input.flat();
  const rowWidth = input[0].length;
  let flashCount = 0;

  for (let step = 1; step <= 100; step++) {
    flashCount += tick(grid, rowWidth);
  }
  return flashCount;
}

function partTwo(input) {
  const grid = input.flat();
  const rowWidth = input[0].length;
  let step = 0;
  do {
    step++;

  } while(tick(grid, rowWidth) !== 100)
  return step;
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/)
    .map(row => row.split('').map(v => parseInt(v, 10)));
}
