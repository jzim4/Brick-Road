/* 
Author: Jonah Zimmer

This single component shows the selected brick
*/
import React from 'react';
import { defaultBrick } from './brickRoadSite.js';

function closeBrick(setCurrentBrick) {
    setCurrentBrick(defaultBrick);
    document.getElementById("selectedBrickContainer").style.visibility = "hidden";
}

export default function SelectedBrick( {brick, setCurrentBrick} ) {
    return <div id="selectedBrickContainer">
        <button onClick={() => closeBrick(setCurrentBrick)}>Close</button>
        <SelectedBrickContent brick = {brick}/>
    </div>
}

function SelectedBrickContent({brick}) {
    return <>
            <p>Naming Year: {brick.Naming_Year}</p>
            <p>Purchaser Name: {brick.Purchaser_Name}</p>
            <p>Section: {brick.Paver_Assigned_Section}</p>
            <InscriptionLine1 brick = {brick}/>
            <InscriptionLine2 brick = {brick}/>
            <InscriptionLine3 brick = {brick}/>
            <Link />
        </>
    
}
function InscriptionLine1({brick}) {
    if (brick.Inscription_Line_1) {
        return <p>{brick.Inscription_Line_1}</p>
    }
}
function InscriptionLine2({brick}) {
    if (brick.Inscription_Line_2) {
        return <p>{brick.Inscription_Line_2}</p>
    }
}
function InscriptionLine3({brick}) {
    if (brick.Inscription_Line_3) {
        return <p>{brick.Inscription_Line_3}</p>
    }
}
function Link(brick) {
    if (brick.link) {
        return <p>{brick.link}</p>
    }
}