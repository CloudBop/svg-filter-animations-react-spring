import GameValidator from './Grid.game.validator';
// careful, string-literal
const strPuzzle1 = `
0   1 11
   3    
13 5 4  
 2   31 
  332  0
     1  
 1 0 1  
        `;

const strPuzzle = `
          
 345  531 
 2      2 
 1 2222 4 
   2  2   
   2  2   
 4 2222 1 
 2      2 
 124  124 
          `;

const unknownCell = -1;
const mine = -2;
const empty = -3;

export const cellToString = val => {
  if (val === unknownCell) return '';
  if (val === mine) return '!';
  if (val === empty) return 'x';
  return val;
};

export class CellLocation {
  constructor(row = -1, column = -1, mineCount = null) {
    this.col = column;
    this.row = row;
    this.value = mineCount;
    this.isUnused = row === -1 && column === -1;
  }
}

export class Game {
  constructor() {
    this._cells = [];
    this.numberOfRows = null;
    this.numberOfCols = null;
    this.unknownCell = -1;
  }
  cellContents(col, row) {
    //
    const cell = this._cells[col][row];
    // console.log('cell', typeof cell, cell);
    switch (cell) {
      case unknownCell:
        return '';
      case mine:
        return '!';
      case empty:
        return 'x';
      // must be int
      default:
        return cell;
    }
  }
  generateGameGrid = () => {
    // split string using \n (line break) seperator
    const rows = strPuzzle.split('\n');
    // '/n' before pusszle string start on ``
    if (rows[0] === '') rows.shift();
    this.numberOfRows = rows.length;
    // loop over chars in new array and split by char (including spaces, persistsed via ES6 ``)
    const grid = rows.map(row => row.split(''));
    this.numberOfCols = grid.length;
    // create grid
    this._cells = grid.map(row => {
      return row.map(cell => {
        // if empty string, place a -1
        return cell === ' ' ? this.unknownCell : parseInt(cell);
      });
    });
    // console.log('gameArray', gameArray);
    return JSON.parse(JSON.stringify(this._cells));
  };
  //
  solve() {
    let solution = this.methodOne();
    //
    if (solution === null) {
      solution = this.methodTwo();
    }
    //
    if (solution === null) {
      solution = this.methodThree();
    }
    if (solution === null) {
      solution = this.methodFour();
    }

    //
    if (solution === null) return null;
    //
    return solution;
  }
  methodOne() {
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        // int:
        const mineCount = this.cellContainsMineCount(row, col);
        // (false >= 0) === true - ?avascript
        if (mineCount >= 0) {
          const neighboursWithMines = this.neighboursWithMines(row, col);
          const neighboursWhichAreUnknown = this.neighboursWhichAreUnknown(row, col);
          //
          const minesLeftToPlace = mineCount - neighboursWithMines.length;
          // const minesLeftToPlace = mineCount - this.minesLeftToPlace(row, col);
          if (minesLeftToPlace === 0 && neighboursWhichAreUnknown.length > 0) {
            neighboursWhichAreUnknown.forEach(cell => {
              const { row, col } = cell;
              this._cells[row][col] = empty;
            });
            return new Solution(
              new CellLocation(row, col, mineCount),
              neighboursWhichAreUnknown,
              `zero mines to place around cell[${row}],[${col}]`
            );
          }
        }
        //
      }
    }
    return null;
  }
  methodTwo() {
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        // int:
        const mineCount = this.cellContainsMineCount(row, col);
        // (false >= 0) === true - ?avascript
        if (mineCount >= 0) {
          const neighboursWithMines = this.neighboursWithMines(row, col);
          const neighboursWhichAreUnknown = this.neighboursWhichAreUnknown(row, col);
          //
          const minesLeftToPlace = mineCount - neighboursWithMines.length;

          if (minesLeftToPlace > 0 && minesLeftToPlace === neighboursWhichAreUnknown.length) {
            neighboursWhichAreUnknown.forEach(cell => {
              const { row, col } = cell;
              this._cells[row][col] = mine;
            });
            // console.log('this._cells', this._cells);
            return new Solution(
              new CellLocation(row, col, mineCount),
              neighboursWhichAreUnknown,
              `remaining neighbours ${neighboursWhichAreUnknown.map(
                cell => `[${cell.row}, ${cell.col}]`
              )} around cell[${row}][${col}] must be mine`
            );
          }
        }
        //
      }
    }
    return null;
  }
  methodThree() {
    // initiate new validator for current play
    const Validator = new GameValidator();
    // iterate board
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        //
        if (this._cells[row][col] === unknownCell) {
          // place empty
          this._cells[row][col] = empty;
          // track moves
          const movesToUndo = [];
          //
          let solution;
          do {
            //
            solution = this.methodOne();
            if (solution === null) {
              solution = this.methodTwo();
            }
            // typeof null === 'object'
            if (solution !== null && typeof solution === 'object') {
              // track updated cells
              movesToUndo.push(...solution.solvedCells);
              // has to be entire object
              const isValidResult = Validator.validateBoard(this);
              // console.log(isValidResult);
              //
              if (!isValidResult.isValid) {
                //
                this._cells[row][col] = mine;
                // reset the moves
                movesToUndo.forEach(cell => (this._cells[cell.row][cell.col] = unknownCell));
                //
                return new Solution(
                  isValidResult.cellOfInterest,
                  [ new CellLocation(row, col) ],
                  `cell[${row}][${col}] must contain a mine!`
                );
              }
            }
          } while (solution !== null && typeof solution === 'object');

          // no solution found
          movesToUndo.forEach(cell => {
            this._cells[cell.row][cell.col] = unknownCell;
          });
          // this cell still unknown
          this._cells[row][col] = unknownCell;
        }
      }
    }
    return null;
  }
  methodFour() {
    // initiate new validator for current play
    const Validator = new GameValidator();
    // iterate board
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        //
        if (this._cells[row][col] === unknownCell) {
          // place empty
          this._cells[row][col] = mine;
          // track moves
          const movesToUndo = [];
          //
          let solution;
          do {
            //
            solution = this.methodOne();
            if (solution === null) {
              solution = this.methodTwo();
            }
            // typeof null === 'object'
            if (solution !== null && typeof solution === 'object') {
              // track updated cells
              movesToUndo.push(...solution.solvedCells);
              // has to be entire object
              const isValidResult = Validator.validateBoard(this);
              // console.log(isValidResult);
              //
              if (!isValidResult.isValid) {
                //
                this._cells[row][col] = empty;
                // reset the moves
                movesToUndo.forEach(cell => (this._cells[cell.row][cell.col] = unknownCell));
                //
                return new Solution(
                  isValidResult.cellOfInterest,
                  [ new CellLocation(row, col) ],
                  `cell [${row}][${col}] cannot contain a mine!`
                );
              }
            }
          } while (solution !== null && typeof solution === 'object');

          // no solution found
          movesToUndo.forEach(cell => {
            this._cells[cell.row][cell.col] = unknownCell;
          });
          // this cell still unknown
          this._cells[row][col] = unknownCell;
        }
      }
    }
    return null;
  }
  cellContainsMineCount(row, col) {
    if (this._cells[row][col] >= 0) {
      return this._cells[row][col];
    }
    return NaN;
  }
  neighboursWithMines = (row, col) => {
    //
    const neighbours = this.getNeighbours(row, col);
    return neighbours.filter(cell => this._cells[cell.row][cell.col] === mine);
  };
  neighboursWhichAreUnknown = (row, col) => {
    //
    const neighbours = this.getNeighbours(row, col);

    return neighbours.filter(cell => this._cells[cell.row][cell.col] === unknownCell);
  };
  getNeighbours(row, col) {
    const neighbours = [];
    /**
     * 123
     * 4 5
     * 678
     */

    if (row > 0 && col > 0) neighbours.push(new CellLocation(row - 1, col - 1));
    if (row > 0) neighbours.push(new CellLocation(row - 1, col));
    if (row > 0 && this.numberOfCols - 1 > col) neighbours.push(new CellLocation(row - 1, col + 1));
    //
    if (col > 0) neighbours.push(new CellLocation(row, col - 1));
    if (this.numberOfRows > row) neighbours.push(new CellLocation(row, col + 1));
    //
    if (row < this.numberOfRows - 1 && col > 0) neighbours.push(new CellLocation(row + 1, col - 1));
    if (row < this.numberOfRows - 1) neighbours.push(new CellLocation(row + 1, col));
    if (row < this.numberOfRows - 1 && col < this.numberOfCols - 1) neighbours.push(new CellLocation(row + 1, col + 1));

    // console.log('neighbours', neighbours);
    return neighbours;
  }
  // recursive tree
  bruteForce() {
    //
    const validator = new GameValidator();
    //
    const nextEmptyCell = this.getNextUnknownCell();
    // there are no more empty cells
    if (nextEmptyCell.isUnused) return this._cells;
    //
    this._cells[nextEmptyCell.row][nextEmptyCell.col] = mine;
    //
    if (validator.validateBoard(this).isValid) {
      //
      const result = this.bruteForce();
      if (result) return true;
    }
    this._cells[nextEmptyCell.row][nextEmptyCell.col] = empty;
    //
    if (validator.validateBoard(this).isValid) {
      //
      const result = this.bruteForce();
      if (result) return true;
    }
    //
    this._cells[nextEmptyCell.row][nextEmptyCell.col] = unknownCell;
    return false;
  }
  getNextUnknownCell() {
    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfCols; col++) {
        if (this._cells[row][col] === unknownCell) {
          return new CellLocation(row, col);
        }
      }
    }
    const test = new CellLocation();
    console.log('test', test);
    return new CellLocation();
  }
}

export class Solution {
  constructor(cell = null, solvedCells = [], description = 'nothing') {
    this.description = description;
    this.cellOfInterest = cell;
    this.solvedCells = solvedCells;
  }
}
