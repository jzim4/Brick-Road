/* 
Author: Jonah Zimmer

This component is for when a user clicks on a brick on the path. It includes a click event listener to choose the selected brick
*/

import React from 'react';
import { defaultBrick } from '../../app.js';
import data from '../../../public/db.json';

function closeBrick(setCurrentBrick) {
    setCurrentBrick(defaultBrick);
    document.getElementById("selectedBrickPageCover").style.display = "none";
    document.body.style.overflow = 'auto';
    document.getElementById("scrollContainer").style.overflowX = 'scroll';
}

// content within selected brick
export default function SelectedBrick({ brick, setCurrentBrick }) {

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
            let col = Array.prototype.indexOf.call(clicked.parentElement.children, clicked) - 7; // minus seven due to eight-brick offset
            const row = Array.prototype.indexOf.call(clicked.parentElement.parentElement.children, clicked.parentElement) + 1;
            const pan = Math.floor(col / 10) + 1;
            col = col - ((pan - 1) * 10);
            const b = getBrick(row, col, pan);
            setCurrentBrick(b);
            document.getElementById("selectedBrickPageCover").style.display = "block";
            document.body.style.overflow = 'hidden';
            document.getElementById("scrollContainer").style.overflow = 'hidden';
        }
        document.getElementById('fname').value = "";
    })

    return <div id="selectedBrickPageCover">
        <div id="selectedBrickContainer">
        <button id="selectedCloseButton" onClick={() => closeBrick(setCurrentBrick)}>Close</button>
        <div id="selectedBrick">
            {brick.Inscription_Line_1 ? <p>{brick.Inscription_Line_1}</p> : ""}
            {brick.Inscription_Line_2 ? <p>{brick.Inscription_Line_2}</p> : ""}
            {brick.Inscription_Line_3 ? <p>{brick.Inscription_Line_3}</p> : ""}
        </div>
        <div id="selectedBrickDescr">
            <p>Naming Year: {brick.Naming_Year}</p>
            <p>Purchaser Name: {brick.Purchaser_Name}</p>
            {brick.Paver_Assigned_Section ? <p>Section: {brick.Paver_Assigned_Section}</p> : <p></p>}
            {brick.link ? <p>{brick.link}</p> : ""}
        </div>
    </div>
    </div>
}