import React from 'react';
import { Cell } from './Grid.styled';

function Grid({ grid, currentCell }) {
  // let color = '#e43e3c';
  // if (currentCell) {
  //   color = currentCell.row === i && currentCell.col === k ? '#00ffee' : '#e43e3c';
  // }

  const styler = (i, k) => {
    if (grid[i][k] === 'x') return '#194782';
    if (grid[i][k] === '!') return '#010101';
    return '#000000';
  };

  return (
    <div
      style={{
        margin: '10px',
        display: 'grid',
        gridTemplateColumns: `repeat(${grid ? grid.length : 0}, 40px)`,
        fontSize: '25px',
        gap: '2px'
      }}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          // grid[i][k]
          <Cell
            // pass this arg
            color={currentCell && currentCell.row === i && currentCell.col === k ? '#fff' : styler(i, k)}
            //
            onClick={() => {
              // use immmer to not mutate state
              // const newGrid = produce(grid, gridCopy => {
              //   // toggle
              //   gridCopy[i][k] = gridCopy[i][k] ? 0 : 1;
              // });
              console.log(i, k);

              // const clonedGrid = JSON.parse(JSON.stringify(grid));
              // populateCell('-', 5, 5, clonedGrid);
              // console.log(clonedGrid);
              // setGrid(clonedGrid);
              // console.log('gridOl', grid);
            }}
            // setGrid(newGrid);
            key={`${i}-${k}`}
            // style={{
            //   width: 20,
            //   height: 20,
            //   backgroundColor: grid[i][k] ? 'pink' : '#f0f0f0',
            //   border: 'solid 1px black'
            // }}
          >
            {
              grid[i][k]
              //`${i}${k}`
            }
          </Cell>
        ))
      )}
    </div>
  );
}

export default Grid;
