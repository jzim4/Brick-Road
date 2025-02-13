/* 
Author: Jonah Zimmer

This file draws the brick path, setting class names of existing and selected bricks
*/

import React from 'react';
import data from '../brickData.json';

function saveAllBricks() {
  let bricks = [];
  for (let brick of data) {
    bricks.push([brick.row, brick.col])
  }
  return bricks;
}

export default function BrickPath({ row, col }) {
  const allBricks = saveAllBricks();

  const numRows = 10;
  const numCols = 40;
  const bricks = document.getElementsByTagName('td');
  for (let i of bricks) {
    i.classList.remove("selectedBrick");
  }

  if (row <= numRows && col <= numCols) {
      let cell = document.querySelectorAll(`tr td:nth-child(${col + 1}`)[row];
      cell.classList.add("selectedBrick");
  }

  function brickExists(brick) {
    return allBricks.some(i => JSON.stringify(i) === JSON.stringify(brick));
  }

  return <table> <tbody>
    {Array(numRows).fill(0).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array(numCols).fill(0).map((_, colIndex) => (
          <td className={brickExists([rowIndex,colIndex]) ? 'existingBrick' : ''} key={colIndex}>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
  </table>
}