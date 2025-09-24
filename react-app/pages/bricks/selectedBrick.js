/* 
Author: Jonah Zimmer

This component is for when a user clicks on a brick on the path. It includes a click event listener to choose the selected brick
*/

import React from 'react';
import { defaultBrick } from '../app.js';
import '../../styles/selectedBrick.css';

function closeBrick(setCurrentBrick) {
    setCurrentBrick(defaultBrick);
    document.getElementById("selectedBrickPageCover").style.display = "none";
    document.body.style.overflow = 'auto';
    const scrollContainer = document.getElementById("scrollContainer");
    if (scrollContainer) {
        scrollContainer.style.overflowX = 'scroll';
    }
}

function getPanelNumber(num) {
    if (num < 1) {
        return "Left of panels"
    }
    else if (num > 13) {
        return "Right of panels"
    }
    else {
        return num
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
            <div className="description-grid">
                <p data-label="Purchaser Name:">{brick.Purchaser_Name}</p>
                <p data-label="Naming Year:">{brick.Naming_Year}</p>
                {brick.Paver_Assigned_Section ? <p data-label="Section:">{brick.Paver_Assigned_Section}</p> : ""}
            </div>

            <div className="location-grid">
                <div className="location-item">
                    <span>Panel</span>
                    <strong>{getPanelNumber(brick.Panel_Number)}</strong>
                </div>
                <div className="location-item">
                    <span>Row</span>
                    <strong>{brick.Row_Number}</strong>
                </div>
                <div className="location-item">
                    <span>Col</span>
                    <strong>{brick.Col_Number}</strong>
                </div>
                
            </div>

            {brick.link && (
                <a href={brick.link} target="_blank" rel="noopener noreferrer" className="brick-link-button">
                    Learn More
                </a>
            )}
        </div>
    </div>
    </div>
}
