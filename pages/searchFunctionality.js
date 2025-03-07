/* 
Author: Jonah Zimmer

This file handles two ways to search for brick: search bar and click
It then sets the current brick state, which is on the file brickRoadSite
*/

// TODO: THE QUERY SELECTORS ARE WONKY, SO WHEN YOU CLICK IT HIGHLIHGTS THE WRONG THING AND THEN
// SECTION SELECTION JUST DOESN'T DO ANYTHING

import data from '../db.json';
import { defaultBrick } from './brickRoadSite.js'

// Handles clicking on bricks
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
        const clicked = e.target;

        if (clicked.classList.contains("existingBrick")) {
            let col = Array.prototype.indexOf.call(clicked.parentElement.children, clicked) + 1;
            const row = Array.prototype.indexOf.call(clicked.parentElement.parentElement.children, clicked.parentElement) + 1;
            const pan = Math.floor(col / 10) + 1;
            col = col - ((pan - 1) * 10);
            setCurrentBrick(getBrick(row, col, pan));
            document.getElementById("selectedBrickContainer").style.visibility = "visible";
        }
        document.getElementById('fname').value = "";
    })
}

// takes list of brick objects and changes color of those bricks
function highlightSelectedElements(selected) {
    const bricksPerPanel = 10;
    const numRows = document.getElementsByClassName("brickRow").length;
    const numCols = document.getElementsByClassName("brickRow")[0].children.length;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            let cell = document.querySelectorAll(`.brick:nth-child(${c + 1}`)[r];
            cell.classList.remove("existingBrick");
        }
    }

    for (let b of selected) {
        let cell = document.querySelectorAll(`.brick:nth-child(${(b.Panel_Number - 1) * bricksPerPanel + b.Col_Number}`)[b.Row_Number - 1];
        cell.classList.add("existingBrick");
    }
}

// takes input, and finds which bricks match that name
export function submitButton() {
    let selected = [];
    let val = document.getElementById("fname").value;
    for (let b of data) {
        if (val == b.Purchaser_Name) {
            selected.push(b);
        }
    }
    highlightSelectedElements(selected);
}

export function selectSection(section) {
    let selected = [];
    if (section == "all") {
        selected = data;
    }
    else {
        for (let b of data) {
            if (b.Paver_Assigned_Section == section) {
                selected.push(b);
            }
        }
    }
    highlightSelectedElements(selected);
}