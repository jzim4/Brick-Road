/* 
Author: Jonah Zimmer

This component contains the content that is scrollable as well as the buttons to scroll.
It imports the path and panel subcomponents
*/

import React from 'react';
import VertPanels from './vertPanels.js';
import VertPath from './vertPath.js';
import '../../../styles/vertScrollDisplay.css';

function scrollButtonFunction(goUp) {
  const scroll = document.getElementById("vertScrollContainer");
  let dist = scroll.scrollTop + 436;
  if (goUp) {
    dist = scroll.scrollTop - 436;
  }
  scroll.scroll({
    top: dist,
    left: 0,
    behavior: "smooth"
  })
}

export default function VertScrollContent({ highlight, currentBrick, setCurrentBrick, bricks, isWide, loading }) {
  return <div id="vertFullPathContainer">
    <div id="vertScrollContainer">
      {loading ? <div className="loading-container"><div className="loader"></div></div> :
        <>
          <VertPath highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={bricks} isWide={isWide} />
          <VertPanels />
        </>
      }
    </div>
  </div>
}
