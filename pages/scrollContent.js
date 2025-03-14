/* 
Author: Jonah Zimmer

This component contains the content that is scrollable as well as the buttons to scroll.
It imports the path and panel subcomponents
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
  return <div id="fullPathContainer">
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(true)} tabIndex={0} className="scrollButton" id="leftScroll"> &#8679; </button>
    </div>

    <div id="scrollContainer">
      <Panels />
      <Path highlight={highlight} currentBrick={currentBrick}/>
    </div>
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(false)} tabIndex={0} className="scrollButton" id="rightScroll"> &#8679; </button>
    </div>
  </div>
}


