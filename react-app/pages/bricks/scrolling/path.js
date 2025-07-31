/* 
Author: Jonah Zimmer

This component is all of the content in the scrollable path. It takes into account which bricks should be which color.

*/

import React from 'react';

export default function Path({ highlight, currentBrick, setCurrentBrick, bricks }) {
  const numRows = 15;
  const numCols = 170;
  const bricksPerPanel = 10;

  function handleBrickClick(brickData) {
    console.log("clicked brick", brickData);
    setCurrentBrick(brickData);
    document.getElementById("selectedBrickPageCover").style.display = "block";
    document.body.style.overflow = 'hidden';
  }

  /* this component determines if the brick should be highlighted or shown as the selected brick to determine 
    class names and conditionally add the pop-up
  */
  function Brick({ rowIndex, colIndex }) {
    let bData = null;
    // find selected brick
    for (let b of bricks) {
      const col = 8 + (b.Panel_Number - 1) * bricksPerPanel + b.Col_Number;
      let highlightMatch = b.Purchaser_Name.toLowerCase().includes(highlight.toLowerCase());
      if (highlight == "all" || b.Paver_Assigned_Section == highlight || highlightMatch) {
        if (b.Row_Number == rowIndex + 1 && col == colIndex + 1) {
          bData = b;
          break;
        }
      }
    }
    // if brick should be highlighted, either return the existing or clicked format
    if (bData) {
      const col = (bData.Panel_Number - 1) * bricksPerPanel + bData.Col_Number;
      return <div className={'existingBrick brick ' + (bData == currentBrick ? "clickedBrick" : "")} key={100 * rowIndex + colIndex}
      onClick={() => handleBrickClick(bData)}
      >
        <span className={"popupText " + (col < 3 ? "popupTextLeft" : col > numCols - 4 ? "popupTextRight" : "")}>
          {bData.Inscription_Line_1}<br></br>
          {bData.Inscription_Line_2}<br></br>
          {bData.Inscription_Line_3}<br></br>
          Click for more info!
        </span>
      </div>
    }
    // otherwise just return default brick
    else {
      return <div className='brick' key={100 * rowIndex + colIndex}></div>
    }
  }
  
  // this component is the entire path with every other row offset in the opposite direction
  return <div id="path">
    {Array(numRows).fill(0).map((_, rowIndex) => (
      <div className={rowIndex % 2 == 0 ? 'brickRow leftShiftRow' : 'brickRow rightShiftRow'} key={"row" + rowIndex}>
        {Array(numCols).fill(0).map((_, colIndex) => (
          <Brick rowIndex={rowIndex} colIndex={colIndex} key={"row"+rowIndex+"col"+colIndex}/>
        ))}
      </div>
    ))}
  </div>
}
