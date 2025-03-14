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
        else if (sections.includes(highlight) && b.Paver_Assigned_Section == highlight) {
            bricks.push(b);
        }
        else if (b.Purchaser_Name == highlight) {
            bricks.push(b);
        }
    }
    console.log(bricks);

    return <div id="accessibleBricksContainer">
        {Array(bricks.length).fill(0).map((_, b) => (
            <Brick brick={bricks[b]} key={bricks[b].Panel_Number.toString() +  bricks[b].Row_Number.toString() + bricks[b].Col_Number.toString()}/>
        ))}
    </div>
}

function Brick({brick}) {
    return <div className="accessibleBrick">
        <p>Naming Year: {brick.Naming_Year}</p>
        <p>Purchaser Name: {brick.Purchaser_Name}</p>
        <p>Section: {brick.Paver_Assigned_Section}</p>
        <p>Located in front of panel {brick.Panel_Number} in row {brick.Row_Number}</p>
        {brick.Inscription_Line_1 ? <p>{brick.Inscription_Line_1}</p> : ""}
        {brick.Inscription_Line_2 ? <p>{brick.Inscription_Line_2}</p> : ""}
        {brick.Inscription_Line_3 ? <p>{brick.Inscription_Line_3}</p> : ""}
        {brick.link ? <p>{brick.link}</p> : ""}
    </div>
}