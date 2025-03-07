/* 
Author: Jonah Zimmer

This file draws the brick path, setting class names of existing and selected bricks
*/

import React from 'react';
import data from '../db.json';
import Panels from './panels.js';
import Path from './path.js';

function saveAllBricks() {
  const bricksPerPanel = 10;

  let bricks = [];
  for (let brick of data) {
    bricks.push([brick.Row_Number, (brick.Panel_Number-1) * bricksPerPanel + brick.Col_Number])
  }
  return bricks;
}

export default function ScrollContent({ currentBrick }) {
  const bricksPerPanel = 10;
  const allBricks = saveAllBricks();

  const bricks = document.getElementsByClassName('brick');
  for (let i of bricks) {
    i.classList.remove("selectedBrick");
  }

  if (currentBrick.Panel_Number < 13) {
    const col = (currentBrick.Panel_Number-1) * bricksPerPanel + currentBrick.Col_Number;
    let cell = document.querySelectorAll(`.brick:nth-child(${col}`)[currentBrick.Row_Number - 1];
    cell.classList.add("selectedBrick");
  }

  return <div id="fullPathContainer">
    <div className="scrollButton" id="leftScroll"> Left </div>

    <div id="scrollContainer">
      <Panels />
      <Path bricks={allBricks} />
    </div>
    <div className="scrollButton" id="rightScroll">Right </div>
  </div>
}


