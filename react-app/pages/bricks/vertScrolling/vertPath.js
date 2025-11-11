/* 
Author: Jonah Zimmer

This component is all of the content in the scrollable path. It takes into account which bricks should be which color.

*/

import React, { useState } from 'react';
import { matchesHighlight } from '../filter';

export default function VertPath({ highlight, currentBrick, setCurrentBrick, bricks, isWide }) {
  const numRows = 170;
  const numCols = 15;
  const bricksPerPanel = 10;

  const [previewBrick, setPreviewBrick] = useState(null);

  function handleBrickClick(brickData) {
    if (previewBrick && previewBrick.id === brickData.id) {
      setCurrentBrick(brickData);
      setPreviewBrick(null);
      document.getElementById("selectedBrickPageCover").style.display = "block";
      document.body.style.overflow = 'hidden';
    } else {
      setPreviewBrick(brickData);
    }
  }

  function closePreview() {
    setPreviewBrick(null);
  }

  /* this component determines if the brick should be highlighted or shown as the selected brick to determine 
    class names and conditionally add the pop-up
  */
  function Brick({ rowIndex, colIndex }) {
    let bData = null;
    // find selected brick
    for (let b of bricks) {
      const row = b.Col_Number;
      if (matchesHighlight(b, highlight)) {
        if (b.Row_Number == numCols - colIndex && row == rowIndex + 1) {
          bData = b;
          break;
        }
      }
    }
    // if brick should be highlighted, either return the existing or clicked format
    if (bData) {
        const row = (bData.Panel_Number - 1) * bricksPerPanel + bData.Col_Number;
        const isClicked = currentBrick === bData;
  
        let brickClassName = 'existingBrick vertBrick';
        if (isClicked) {
            brickClassName += ' clickedBrick';
        }
      return <div className={brickClassName  + (previewBrick && previewBrick.id === bData.id ? " previewing" : "")} key={100 * rowIndex + colIndex} onClick={() => handleBrickClick(bData)}>
        <span className={"popupTextVert " + (row < 3 ? "popupTextVertTop" : row > numRows - 4 ? "popupTextVertBottom" : "")}>
          {previewBrick && previewBrick.id === bData.id && (
            <button 
              className="closePreviewBtn" 
              onClick={(e) => { e.stopPropagation(); closePreview(); }}
              aria-label="Close preview"
            >
              ✕
            </button>
          )}
          {bData.Inscription_Line_1}<br></br>
          {bData.Inscription_Line_2}<br></br>
          {bData.Inscription_Line_3}<br></br>
          {!previewBrick || previewBrick.id !== bData.id ? "Click for more info!" : "Click again for full details"}
        </span>
      </div>
    }
    // otherwise just return default brick
    else {
      return <div className='vertBrick' key={100 * rowIndex + colIndex}></div>
    }
  }
  
  // this component is the entire path with every other col offset in the opposite direction
  return <div id="vertPath">
    <div className="vertPathGutter">

    </div>
    {Array(numCols).fill(0).map((_, colIndex) => (
      <div className={colIndex % 2 === 0 ? 'vertBrickColumn topShiftColumn' : 'vertBrickColumn bottomShiftColumn'} key={"col" + colIndex}>
        {Array(numRows).fill(0).map((_, rowIndex) => (
          <Brick rowIndex={rowIndex} colIndex={colIndex} key={"row"+rowIndex+"col"+colIndex}/>
        ))}
      </div>
    ))}
    <div className="vertPathGutter">

    </div>
  </div>
}
