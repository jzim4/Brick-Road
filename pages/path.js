import React from 'react';

export default function Path({bricks}) {
    const numRows = 15;
    const numCols = 130;

    function brickExists(rowIndex, colIndex) {
        for (let b of bricks) {
            if (b[0] == rowIndex && b[1] == colIndex) {
                return true;
            }
        }
        return false;
    }

    return <div id="path">
      {Array(numRows).fill(0).map((_, rowIndex) => (
        <div className={rowIndex % 2 == 0 ? 'brickRow leftShiftRow' : 'brickRow rightShiftRow'} key={"row"+rowIndex}>
          {Array(numCols).fill(0).map((_, colIndex) => (
            <div className={brickExists(rowIndex + 1, colIndex + 1) ? 'existingBrick brick' : 'brick'} key={100*rowIndex + colIndex}>
            </div>
          ))}
        </div>
      ))}
    </div>
}
