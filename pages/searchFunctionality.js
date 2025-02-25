/* 
Author: Jonah Zimmer

This file handles two ways to search for brick: search bar and click
It then sets the current brick state, which is on the file brickRoadSite
*/

import data from '../brickData.json';
import defaultBrick from './brickRoadSite.js'

// Handles clicking on bricks
export function ClickOnBrick({setCurrentBrick}) {

    // Finds and returns data from brickData about brick at coordinates
    function getBrick(row, col) {
        for (let b of data) {
            if (b.row == row && b.col == col) {
                return b;
            }
        }
    }

    // Click event handler that determines the location of the selected brick and changes state if it exists
    document.addEventListener("click", (e) => {
        const clicked = e.target;
        let col = Array.prototype.indexOf.call(clicked.parentElement.children, clicked);
        let row = Array.prototype.indexOf.call(clicked.parentElement.parentElement.children, clicked.parentElement) - 1;
        if (clicked.classList.contains("existingBrick")) {
            document.getElementById("selectedBrickContainer").style.visibility = "visible";
            console.log(getBrick(row,col))
            setCurrentBrick(getBrick(row,col));
        }
        document.getElementById('fname').value = "";
    })
}

// takes input, and changes state to either be default or highlight the searched-for brick
export function submitButton(setCurrentBrick) {
    // default brick
    let brick = defaultBrick;
    let val = document.getElementById("fname").value;
    for (let i in data) {
        if (val == data[i].name) {
            brick = data[i];
        }
    }
    setCurrentBrick(brick);
}