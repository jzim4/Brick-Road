/* 
Author: Jonah Zimmer

This version of the site does not have the scrolling bricks, making it accessible for screen readers and phone compatible.
*/
import React from 'react';
import data from '../db.json';

export default function AcessibleContent({ highlight }) {
    const sections = ["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"];
    let bricks = []
    for (let b of data) {
        if (highlight == "all") {
            bricks.push(b);
        }
        else if (b.Purchaser_Name.toLowerCase().includes(highlight.toLowerCase())) {
            console.log(b.Purchaser_Name.toLowerCase());
            bricks.push(b);
        }
        else if (sections.includes(highlight) && b.Paver_Assigned_Section == highlight) {
            bricks.push(b);
        }
    }

    return <div id="accessibleBricksContainer">
        {Array(bricks.length).fill(0).map((_, b) => (
            <Brick brick={bricks[b]} key={bricks[b].Panel_Number.toString() +  bricks[b].Row_Number.toString() + bricks[b].Col_Number.toString()}/>
        ))}
    </div>
}

function Brick({brick}) {
    return <div className="accessibleBrickContainer">
        <div className="accessibleBrick">
            {brick.Inscription_Line_1 ? <p>{brick.Inscription_Line_1}</p> : ""}
            {brick.Inscription_Line_2 ? <p>{brick.Inscription_Line_2}</p> : ""}
            {brick.Inscription_Line_3 ? <p>{brick.Inscription_Line_3}</p> : ""}
        </div>
        <p className="brickDataText">Naming Year: {brick.Naming_Year}</p>
        <p className="brickDataText">Purchaser:<br></br>&nbsp;&nbsp;&nbsp;{brick.Purchaser_Name}</p>
        <p className="brickDataText">Section: {brick.Paver_Assigned_Section}</p>
        <p className="brickDataText">In front of panel {brick.Panel_Number}</p>
        {brick.link ? <p>{brick.link}</p> : ""}
    </div>
}