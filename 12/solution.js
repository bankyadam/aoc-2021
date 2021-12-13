const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example), 10);
console.log(partOne(input));

assert.equal(partTwo(example), 36);
console.log(partTwo(input));

function partOne(input) {
  const caves = buildCaveGraph(input);

  function getLeaves(currentEntityId, currentPath) {
    return caves[currentEntityId].connections.filter(c => caves[c].isBig || !currentPath.includes(c));
  }

  return walk('start', caves, [], getLeaves).length;
}

function partTwo(input) {
  const caves = buildCaveGraph(input);

  function getLeaves(currentEntityId, currentPath) {
    const hasAnyTwoTimes = currentPath.some(c => !caves[c].isBig && currentPath.filter(p => p === c).length === 2);
    return caves[currentEntityId].connections.filter(c =>
      caves[c].isBig ||
      (hasAnyTwoTimes && !currentPath.includes(c)) ||
      !hasAnyTwoTimes
    );
  }

  return walk('start', caves, [], getLeaves).length;
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n/)
    .map(row => row.split('-'));
}


function buildCaveGraph(input) {
  const caves = {};
  input.forEach(([a, b]) => {
    addCave(a, caves);
    addCave(b, caves);

    addConnection(a, b, caves);
    addConnection(b, a, caves);
  });
  return caves;
}

function addCave(id, caves) {
  if (id in caves) {
    return;
  }
  caves[id] = { id, isBig: /^[A-Z]+$/.test(id), connections: [] };
}

function addConnection(a, b, caves) {
  if (!caves[a].connections.includes(b) && b !== 'start' && a !== 'end') {
    caves[a].connections.push(b);
  }
}

function walk(entryId, caves, path, getLeaves) {
  path.push(entryId);

  if (entryId === 'end') {
    return [path];
  }

  const newPath = [];
  getLeaves(entryId, path).forEach(c => newPath.push(...walk(c, caves, path.concat([]), getLeaves)));
  return newPath;
}
