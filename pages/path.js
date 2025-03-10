import React from 'react';
import data from '../db.json';

export default function Path({ highlight }) {
  const numRows = 15;
  const numCols = 130;
  const bricksPerPanel = 10;

  function Brick({ rowIndex, colIndex }) {
    let bData = null;
    for (let b of data) {
      const col = (b.Panel_Number - 1) * bricksPerPanel + b.Col_Number;
      const sections = ["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"];

      if (!sections.includes(highlight) || b.Paver_Assigned_Section == highlight) {
        if (b.Row_Number == rowIndex + 1 && col == colIndex + 1) {
          bData = b;
          break;
        }
      }
    }
    if (bData) {
      const col = (bData.Panel_Number - 1) * bricksPerPanel + bData.Col_Number;
      return <div className='existingBrick brick' key={100 * rowIndex + colIndex}>
        <span className={"popupText " + (col < 3 ? "popupTextLeft" : col > numCols - 4 ? "popupTextRight" : "")}>
          Donor: {bData.Purchaser_Name}<br></br>
          Year: {bData.Naming_Year}<br></br>
          Click on brick for more info!
        </span>
      </div>
    }
    else {
      return <div className='brick' key={100 * rowIndex + colIndex}></div>
    }
  }

  console.log("rebuild path");
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
