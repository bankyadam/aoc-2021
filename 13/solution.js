const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 17);
console.log(partOne(input));

// console.log(partTwo(example)); // This outputs garbage
console.log(partTwo(input));


function partOne(input) {
  let paper = makePaper(input);
  input.dots.forEach(([x, y]) => paper[y][x] = 1);
  const instructions = input.instructions.slice(0, 1);
  instructions.forEach(fold => paper = foldIt(paper, fold[0], Number(fold[1])));
  return paper.reduce((c, r) => c + r.reduce((c, d) => c + d), 0);
}

function partTwo(input) {
  let paper = makePaper(input);
  // Needed this hack for final input because first "y" fold :/
  paper.push(paper[0].fill(0));
  paper.push(paper[0].fill(0));
  input.dots.forEach(([x, y]) => paper[y][x] = 1);
  const instructions = input.instructions;
  instructions.forEach(fold => paper = foldIt(paper, fold[0], Number(fold[1])));
  return paper.map(row => row.join('').replaceAll('0', ' ').replaceAll('1', '#')).join('\n');
}


// HELPERS
function getInputFromFilePath(path) {
  const content = readFileSync(path).toString('utf8').split(/\n/);

  const folding = content.splice(content.findIndex(v => v === ''));

  return {
    dots: content.filter(Boolean).map(l => l.split(',').map(Number)),
    instructions: folding.filter(Boolean).map(l => l.match(/fold along ([xy])=(\d+)/).slice(1, 3))
  };
}


function makePaper(input) {
  const mapSize = input.dots.reduce(([mX, mY], c) => [Math.max(mX, c[0]), Math.max(mY, c[1])], [0, 0]);
  let paper = [];
  for (let y = 0; y <= mapSize[1]; y++) {
    paper[y] = [];
    for (let x = 0; x <= mapSize[0]; x++) {
      paper[y][x] = 0;
    }
  }
  return paper;
}


function foldIt(paper, direction, position) {
  if (direction === 'y') {
    const foldHalf = paper.slice(0, position);
    const foldUp = paper.slice(-position).reverse();
    return foldHalf.map((row, rI) => composeRow(row, foldUp[rI]));
  }
  if (direction === 'x') {
    return paper.map(row => {
      const foldHalf = row.slice(0, position);
      const foldLeft = row.slice(-position).reverse();
      return composeRow(foldHalf, foldLeft);
    });
  }
}

function composeRow(base, fold) {
  return base.map((v, i) => v || fold[i] ? 1 : 0);
}
