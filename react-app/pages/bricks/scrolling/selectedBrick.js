/* 
Author: Jonah Zimmer

This component is for when a user clicks on a brick on the path. It includes a click event listener to choose the selected brick
*/

import React from 'react';
import { defaultBrick } from '../../app.js';
import '../../../styles/selectedBrick.css';

function closeBrick(setCurrentBrick) {
    setCurrentBrick(defaultBrick);
    document.getElementById("selectedBrickPageCover").style.display = "none";
    document.body.style.overflow = 'auto';
    const scrollContainer = document.getElementById("scrollContainer");
    if (scrollContainer) {
        scrollContainer.style.overflowX = 'scroll';
    }
}

// content within selected brick
export default function SelectedBrick({ brick, setCurrentBrick }) {
    return <div id="selectedBrickPageCover">
        <div id="selectedBrickContainer">
        <button id="selectedCloseButton" aria-label="Close selected brick" title="Close selected brick" onClick={() => closeBrick(setCurrentBrick)}>&times;</button>
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
