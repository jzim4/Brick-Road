/* 
Author: Jonah Zimmer

This file draws the brick path, setting class names of existing and selected bricks
*/

import React from 'react';
import data from '../brickData.json';
import Panels from './panels.js';

function saveAllBricks() {
  let bricks = [];
  for (let brick of data) {
    bricks.push([brick.row, brick.col])
  }
  return bricks;
}

export default function BrickPath({ row, col }) {
  const allBricks = saveAllBricks();

  const numRows = 15;
  const numCols = 134;
  const bricks = document.getElementsByClassName('brick');
  for (let i of bricks) {
    i.classList.remove("selectedBrick");
  }

  if (row <= numRows && col <= numCols) {
    let cell = document.querySelectorAll(`.brick:nth-child(${col + 1}`)[row];
    cell.classList.add("selectedBrick");
  }

  function brickExists(brick) {
    return allBricks.some(i => JSON.stringify(i) === JSON.stringify(brick));
  }

  return <div id="fullPathContainer">
  <div className = "scrollButton" id="leftScroll"> Left </div>

  <div id="scrollContainer">
    <Panels />
      {Array(numRows).fill(0).map((_, rowIndex) => (
        <div className={rowIndex % 2 == 0 ? 'brickRow offsetBrickRow' : 'brickRow'} key={rowIndex}>
          {Array(numCols).fill(0).map((_, colIndex) => (
            <div className={brickExists([rowIndex, colIndex]) ? 'existingBrick brick' : 'brick'} key={100*rowIndex + colIndex}>
            </div>
          ))}
        </div>
      ))}
  </div>
  <div className = "scrollButton" id="rightScroll">Right </div>
  </div>
}