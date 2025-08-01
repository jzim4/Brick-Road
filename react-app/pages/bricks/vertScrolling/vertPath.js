/* 
Author: Jonah Zimmer

This component is all of the content in the scrollable path. It takes into account which bricks should be which color.

*/

import React, { useState } from 'react';

export default function VertPath({ highlight, currentBrick, setCurrentBrick, bricks, isWide }) {
  const numRows = 170;
  const numCols = 15;
  const bricksPerPanel = 10;

  const [previewBrick, setPreviewBrick] = useState(null);
  console.log("previewBrick", previewBrick);

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

  /* this component determines if the brick should be highlighted or shown as the selected brick to determine 
    class names and conditionally add the pop-up
  */
  function Brick({ rowIndex, colIndex }) {
    let bData = null;
    // find selected brick
    for (let b of bricks) {
      const row = 8 + (b.Panel_Number - 1) * bricksPerPanel + b.Col_Number;
      let highlightMatch = b.Purchaser_Name.toLowerCase().includes(highlight.toLowerCase());
      if (highlight == "all" || b.Paver_Assigned_Section == highlight || highlightMatch) {
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
          {bData.Inscription_Line_1}<br></br>
          {bData.Inscription_Line_2}<br></br>
          {bData.Inscription_Line_3}<br></br>
          Click for more info!
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
