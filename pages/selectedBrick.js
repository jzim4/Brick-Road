/* 
Author: Jonah Zimmer

This component shows the selected brick, and includes a click event listener to choose the selected brick
*/
import React from 'react';
import { defaultBrick } from './brickRoadSite.js';
import data from '../db.json';

function closeBrick(setCurrentBrick) {
    setCurrentBrick(defaultBrick);
    document.getElementById("selectedBrickContainer").style.visibility = "hidden";
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

    return <div id="selectedBrickContainer">
        <button onClick={() => closeBrick(setCurrentBrick)}>Close</button>
        <p>Naming Year: {brick.Naming_Year}</p>
        <p>Purchaser Name: {brick.Purchaser_Name}</p>
        <p>Section: {brick.Paver_Assigned_Section}</p>
        {brick.Inscription_Line_1 ? <p>{brick.Inscription_Line_1}</p> : ""}
        {brick.Inscription_Line_2 ? <p>{brick.Inscription_Line_2}</p> : ""}
        {brick.Inscription_Line_3 ? <p>{brick.Inscription_Line_3}</p> : ""}
        {brick.link ? <p>{brick.link}</p> : ""}
    </div>
}