const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 15);
console.log(partOne(input));

assert.equal(partTwo(example), 1134);
console.log(partTwo(input));

function partOne(input) {
  const lowPoints = getLowPoints(input);
  return lowPoints.reduce((c, p) => c + p.v + 1, 0);
}

function partTwo(input) {
  const getBasin = function(input, x, y, result) {
    const newBasinPoints = getNeighbours(input, x, y)
      .filter(n => n.v !== 9)
      .filter(n => !result.some(p => p.x === n.x && p.y === n.y));

    result = result.concat(newBasinPoints);
    newBasinPoints.forEach(n => result = getBasin(input, n.x, n.y, result));
    return result;
  };

  const lowPoints = getLowPoints(input);
  const basins = lowPoints.map(p => getBasin(input, p.x, p.y, [p]));
  const basinSizes = basins.map(b => b.length).sort((a, b) => a > b ? 1 : -1);

  return basinSizes.slice(-3).reduce((c, v) => c*v, 1);
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/)
    .map(row => row.split('')
      .map(v => parseInt(v, 10)));
}

function getNeighbours(input, x, y) {
  const ret = [];
  if (y > 0) {
    ret.push({ x, y: y - 1, v: input[y - 1][x] });
  }
  if (y + 1 < input.length) {
    ret.push({ x, y: y + 1, v: input[y + 1][x] });
  }
  if (x > 0) {
    ret.push({ x: x - 1, y, v: input[y][x - 1] });
  }
  if (x + 1 < input[y].length) {
    ret.push({ x: x + 1, y, v: input[y][x + 1] });
  }
  return ret;
}

function getLowPoints(input) {
  const lowPoints = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const currentPoint = input[y][x];
      const neighbours = getNeighbours(input, x, y);
      const found = neighbours.find(n => n.v <= currentPoint);
      if (found === undefined) {
        lowPoints.push({ x, y, v: input[y][x] });
      }
    }
  }
  return lowPoints;
}
