const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 5);
console.log(partOne(input));

assert.equal(partTwo(example), 12);
console.log(partTwo(input));

function partOne(input) {
  const map = createMap(input);
  input.map(([x1, y1, x2, y2]) => {
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        map[y][x1]++;
      }
    } else if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        map[y1][x]++;
      }
    }
  });

  return getIntersectFromMap(map);
}

function partTwo(input) {
  function getDirection(a, b) {
    return a === b ? 0 : (a - b > 0 ? -1 : 1);
  }

  const map = createMap(input);
  input.map(([x1, y1, x2, y2]) => {
      if (x1 === x2 || y1 === y2 || Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const xDirection = getDirection(x1, x2);
        const yDirection = getDirection(y1, y2);
        const maxDimension = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
        for (let step = 0; step <= maxDimension; step++) {
          map[y1 + (step * yDirection)][x1 + (step * xDirection)]++;
        }
      }
    }
  );

  return getIntersectFromMap(map);
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n+/)
    .map(row => row.split(/\D+/).map(v => parseInt(v, 10)));
}

function createMap(input) {
  const w = input.reduce((c, [x1, , x2]) => Math.max(c, x1, x2), 0) + 1;
  const h = input.reduce((c, [, y1, , y2]) => Math.max(c, y1, y2), 0) + 1;

  const map = [];
  for (let y = 0; y < h; y++) {
    map[y] = [];
    for (let x = 0; x < w; x++) {
      map[y][x] = 0;
    }
  }
  return map;
}

function getIntersectFromMap(map) {
  return map
    .flat()
    .reduce((c, v) => c + (v >= 2), 0);
}
