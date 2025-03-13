/* 
Author: Jonah Zimmer

This file handles two ways to search for brick: search bar and click
It then sets the current brick state, which is on the file brickRoadSite
*/

import data from '../db.json';
import { defaultBrick } from './brickRoadSite.js'

// Handles clicking on bricks: sets pop-up brick and changes selected brick color
export function ClickOnBrick({ setCurrentBrick }) {

    // Finds and returns data from brickData about brick at coordinates
    function getBrick(row, col, pan) {
        for (let b of data) {
            if (b.Row_Number == row && b.Col_Number == col && b.Panel_Number == pan) {
                return b;
            }
        }
        return defaultBrick;
    }

    // Click event handler that determines the location of the selected brick and changes state if it exists
    document.addEventListener("click", (e) => {
        let clicked = e.target;
        if (clicked.classList.contains("popupText")) {
            clicked = clicked.parentElement;
        }
        if (clicked.classList.contains("existingBrick")) {
            let col = Array.prototype.indexOf.call(clicked.parentElement.children, clicked) + 1;
            const row = Array.prototype.indexOf.call(clicked.parentElement.parentElement.children, clicked.parentElement) + 1;
            const pan = Math.floor(col / 10) + 1;
            col = col - ((pan - 1) * 10);
            const b = getBrick(row, col, pan);
            setCurrentBrick(b);
            document.getElementById("selectedBrickContainer").style.visibility = "visible";
        }
        document.getElementById('fname').value = "";
    })
}