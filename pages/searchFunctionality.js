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
    console.log(selected);
    const bricksPerPanel = 10;
    const numRows = document.getElementsByClassName("brickRow").length;
    const numCols = document.getElementsByClassName("brickRow")[0].children.length;
    // clear all formatting
    for (let b of data) {
        /* nth-child is 1-indexed, so use col_number instead of col_number - 1 */
        const col = (b.Panel_Number - 1) * bricksPerPanel + (b.Col_Number);
        let cell = document.querySelectorAll(`.brick:nth-child(${col}`)[b.Row_Number - 1];
        cell.classList.remove("existingBrick");
    }

    // highlight selected bricks
    for (let b of selected) {
        console.log(b);
        const col = (b.Panel_Number - 1) * bricksPerPanel + b.Col_Number;
        let cell = document.querySelectorAll(`.brick:nth-child(${col}`)[b.Row_Number - 1];
        cell.classList.add("existingBrick");
    }
}

// takes text field input, and finds which bricks match that name
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

// takes section name as input, and finds which bricks are in that section
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