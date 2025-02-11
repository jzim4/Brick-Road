import React from 'react';

export default function BrickPath({ row, col }) {
  const numRows = 40;
  const numCols = 10;
  const bricks = document.getElementsByTagName('td');
  for (let i of bricks) {
    i.style.backgroundColor = "white";
  }



  if (row <= numRows && col <= numCols) {
      let cell = document.querySelectorAll(`tr td:nth-child(${col}`)[row];
      cell.style.backgroundColor = "red";
  }

  return <table> <tbody>
    {Array(numCols).fill(0).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array(numRows).fill(0).map((_, colIndex) => (
          <td key={colIndex}></td>
        ))}
      </tr>
    ))}
  </tbody>
  </table>
}