import React from 'react';
import data from '../db.json';

export default function Path({ highlight, currentBrick }) {
  const numRows = 15;
  const numCols = 130;
  const bricksPerPanel = 10;

  // this component determines if the brick should be highlighted or shown as the selected brick to determine 
  // class names and conditionally add the pop-up
  function Brick({ rowIndex, colIndex }) {
    let bData = null;
    for (let b of data) {
      const col = (b.Panel_Number - 1) * bricksPerPanel + b.Col_Number;

      if (highlight == "all" || b.Paver_Assigned_Section == highlight || b.Purchaser_Name == highlight) {
        if (b.Row_Number == rowIndex + 1 && col == colIndex + 1) {
          bData = b;
          break;
        }
      }
    }
    // if brick should be highlighted, either return the existing or clicked format
    if (bData) {
      const col = (bData.Panel_Number - 1) * bricksPerPanel + bData.Col_Number;
      return <div className={'existingBrick brick ' + (bData == currentBrick ? "clickedBrick" : "")} key={100 * rowIndex + colIndex}>
        <span className={"popupText " + (col < 3 ? "popupTextLeft" : col > numCols - 4 ? "popupTextRight" : "")}>
          Donor: {bData.Purchaser_Name}<br></br>
          Year: {bData.Naming_Year}<br></br>
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
          <Brick rowIndex={rowIndex} colIndex={colIndex} />
        ))}
      </div>
    ))}
  </div>
}
