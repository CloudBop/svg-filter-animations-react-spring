import React, { useState, useEffect } from 'react';
// import { generateGameGrid, populateCell } from './Grid.helpers';
import Grid from './Grid';
import Desc from './Desc';
import { Game } from './grid.game';
// const set
const Board = new Game();
//
function GridParent() {
  // 2d array [rows, cols]
  const [ solution, setPuzzle ] = useState(null);
  // description
  const [ desc, setDesc ] = useState('');
  // currentCell to be analysed.
  const [ currentCell, setCurrentCell ] = useState(null);
  // call this when this component is initiated
  useEffect(() => {
    // clone of game._cells
    const newGame = [ ...Board.generateGameGrid() ];
    //
    for (let i = 0; i < Board.numberOfCols; i++) {
      for (let j = 0; j < Board.numberOfRows; j++) {
        // returns string instead of interger in gamestate
        newGame[i][j] = Board.cellContents(i, j);
      }
    }
    // newGame.forEach(cell => {
    //   newGame[cell.col][cell.row] = Board.cellContents(cell.col, cell.row);
    // });
    setPuzzle(newGame);
  }, []);
  // redraw
  const iterate = () => {
    const res = Board.solve();
    // console.log(res);
    if (res !== null) {
      // cloned grid, don't want to mutate
      const clonedGrid = JSON.parse(JSON.stringify(solution));
      //
      const cell = res.cellOfInterest !== undefined ? res.cellOfInterest : 'notapplicable';
      setDesc(res.description);
      setCurrentCell(cell);
      for (let i = 0; i < Board.numberOfCols; i++) {
        for (let j = 0; j < Board.numberOfRows; j++) {
          // console.log('object', cellToString(newGame[i][j]));
          clonedGrid[i][j] = Board.cellContents(i, j);
        }
      }
      // debugger;
      console.log('res', res);
      res.solvedCells.forEach(cell => {
        clonedGrid[cell.col][cell.row] = Board.cellContents(cell.col, cell.row);
      });
      //
      setPuzzle(clonedGrid);
    }
  };
  //
  const bruteForce = () => {
    console.log('brute force');
    const res = Board.bruteForce();
    if (res) {
      const clonedGrid = JSON.parse(JSON.stringify(solution));
      for (let i = 0; i < Board.numberOfCols; i++) {
        for (let j = 0; j < Board.numberOfRows; j++) {
          // console.log('object', cellToString(newGame[i][j]));
          clonedGrid[i][j] = Board.cellContents(i, j);
        }
      }
      setPuzzle(clonedGrid);
    }
  };
  //
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '1em', padding: '1em' }}>
      <div>
        <button onClick={() => iterate()}>Solve a cell!</button>
        <button onClick={() => bruteForce()}>Brute Force!</button>
        <Desc desc={desc} />
      </div>
      {solution && <Grid grid={solution} currentCell={currentCell} />}
    </div>
  );
}
GridParent.defaultProps = {
  numRows: 8,
  numCols: 8
};
export default GridParent;
