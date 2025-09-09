/* 
Author: Jonah Zimmer

This component contains the content that is scrollable as well as the buttons to scroll.
It imports the path and panel subcomponents
*/

import React from 'react';
import Panels from './panels.js';
import Path from './path.js';
import '../../../styles/scrollDisplay.css';

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

export default function ScrollContent({ highlight, currentBrick, setCurrentBrick, bricks, loading }) {
  return <div id="fullPathContainer">
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(true)} title="Scroll path left" tabIndex={0} className="scrollButton" id="leftScroll" aria-label={"Scroll path left"}> &#8679; </button>
    </div>


    <div id="scrollContainer">
      {loading ? <div className="loading-container"><div className="loader"></div></div> :
        <>
          <Panels />
          <Path highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={bricks} />
        </>
      }
    </div>
    <div className="scrollButtonContainer">
      <button onClick={() => scrollButtonFunction(false)} title="Scroll path right" tabIndex={0} className="scrollButton" id="rightScroll" aria-label={"Scroll path right"}> &#8679; </button>
    </div>
  </div>
}


