//
const strPuzzle = `
0   1 11
   3    
13 5 4  
 2   31 
  332  0
     1  
 1 0 1  
        `;

// export class Solution {
//   constructor() {
//     this.description = 'something';
//     this.cellOfInterest = 0;
//     this.solvedCells = [];
//   }
// }
export const generateEmptyGrid = (numRows, numCols) => {
  //
  const rows = [];
  //
  for (let i = 0; i < numRows; i++) {
    //
    rows.push(Array.from(Array(numCols), () => '-'));
  }
  return rows;
  //
  // React.useState(Array.from({length: ROWS}).map(() => Array.from({length: COLUMNS}).fill(0)))
  // Array(numCols).fill(0) would also work
};

export const populateCell = (str, x, y, grid) => {
  grid[x][y] = str;
};

//
export const gridSolve = grid => {
  // loop over cols
  for (let column = 0; column < grid[0].length; column++) {
    // loop over rows
    for (let row = 0; row < grid.length; row++) {
      //
      if (tryDoesCellContainMineCount(column, row)) {
        //
        const neighboursWithMines = neighboursWithMines(column, row);
        const neighboursWhichAreUnknown = neighboursWhichAreUnknown(column, row);
        // const minesLeftToPlace = mineCount - neighboursWithMines.length;

        // if (minesLeftToPlace === 0) {
        //   neighboursWhichAreUnknown.forEach(cell => {
        //     // cells[cell.]
        //   });
        // }
      }
    }
  }
  return 'something';
};
//
export const solveCell = (x, y, grid) => {};

export const tryDoesCellContainMineCount = (x, y, grid) => {
  // make sure parses to number
  const value = parseInt(typeof grid[x[y]]);
  if (value === 'number') {
    return true;
  } else {
    return false;
  }
};
//
export const neighboursWhichAreUnknown = (x, y) => {
  //
  const result = [];
};
export const neighboursWithMines = (x, y) => {
  //
  const result = [];
};
// export const neighboursWhichAreUnknown = (x,y) => {
//   //
//   const result = [];
// };
const operations = [ [ 0, 1 ], [ 0, -1 ], [ 1, -1 ], [ -1, 1 ], [ 1, 1 ], [ -1, -1 ], [ 1, 0 ], [ -1, 0 ] ];
export const getNeighbours = (x, y) => {
  const neighbours = [];
};
//
// const generateRandomGrid = () => {
//   const rows = [];
//   const prob = 0.5;
//   for (let i = 0; i < numRows; i++) {
//     //
//     rows.push(Array.from(Array(numCols), () => (Math.random() > prob ? 1 : 0)));
//   }
//   return rows;
// };
