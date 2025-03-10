/* 
Author: Jonah Zimmer

This file draws the brick path, setting class names of existing and selected bricks
*/

import React from 'react';
import Panels from './panels.js';
import Path from './path.js';


function scrollButtonFunction(goLeft) {
  const scroll = document.getElementById("scrollContainer");
  let dist = scroll.scrollLeft + 436;
  if (goLeft) {
    dist = scroll.scrollLeft - 436;
  }
  scroll.scroll({
    left: dist,
    top: 0,
    behavior: "smooth"
  })
}

export default function ScrollContent({ highlight, currentBrick }) {
  const bricksPerPanel = 10;

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
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(true)} tabIndex={0} className="scrollButton" id="leftScroll"> &#8679; </button>
    </div>

    <div id="scrollContainer">
      <Panels />
      <Path highlight={highlight}/>
    </div>
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(false)} tabIndex={0} className="scrollButton" id="rightScroll"> &#8679; </button>
    </div>
  </div>
}


