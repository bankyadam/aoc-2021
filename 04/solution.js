const { readFileSync } = require('fs');
const assert = require('assert');

const example = getInputFromFilePath('./example.txt');
const input = getInputFromFilePath('./input.txt');

assert.equal(partOne(example.concat([])), 4512);
console.log(partOne(input.concat([])));

assert.equal(partTwo(example.concat([])), 1924);
console.log(partTwo(input.concat([])));

function partOne(input) {
  const draw = getDrawNumbers(input);
  let boards = getBoards(input);

  for (let i = 0; i < draw.length; i++) {
    const n = draw[i];
    boards = boards.map(board => markDrawNumber(board, n));
    let winnerBoardIndex = getWinnerBoard(boards);
    if (winnerBoardIndex !== -1) {
      return getBoardSum(boards[winnerBoardIndex]) * n;
    }
  }
}

function partTwo(input) {
  const draw = getDrawNumbers(input);
  let boards = getBoards(input);

  let lastWinnerBoard = null;
  let lastWinnerNumber = null;

  do {
    for (let i = 0; i < draw.length; i++) {
      const n = draw[i];
      boards = boards.map(board => markDrawNumber(board, n));
      let winnerBoardIndex = getWinnerBoard(boards);
      if (winnerBoardIndex !== -1) {
        lastWinnerBoard = boards[winnerBoardIndex];
        lastWinnerNumber = n;

        boards.splice(winnerBoardIndex, 1);
        break;
      }
    }
  } while (boards.length > 0);

  return getBoardSum(lastWinnerBoard) * lastWinnerNumber;
}


// HELPERS
function getInputFromFilePath(path) {
  return readFileSync(path).toString('utf8').trim().split(/\n+/);
}

function getDrawNumbers(input) {
  return input.splice(0, 1)[0].split(/\D+/).map(v => parseInt(v, 10));
}

function getBoards(input) {
  const boards = [];
  do {
    boards.push(input.splice(0, 5).map(r => r.trim().split(/\s+/).map(v => parseInt(v, 10))));
  } while (input.length > 0);
  return boards;
}

function markDrawNumber(board, number) {
  return board.map(row => row.map(n => n === number ? null : n));
}

function getWinnerBoard(boards) {
  let winnerBoard = boards.findIndex(board => board.findIndex(row => row.findIndex(v => v !== null) === -1) !== -1);
  if (winnerBoard !== -1) {
    return winnerBoard;
  }
  return boards.findIndex(board => {
    for (let i = 0; i < board[0].length; i++) {
      if (board.map(row => row[i]).findIndex(v => v !== null) === -1) {
        return board;
      }
    }
  });
}

function getBoardSum(board) {
  return board.reduce((boardSum, row) => {
    const rowSum = row.reduce((rowSum, cell) => {
      return rowSum + cell;
    }, 0);
    return boardSum + rowSum;
  }, 0);
}
