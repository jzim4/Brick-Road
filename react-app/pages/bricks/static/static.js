/* 
Author: Jonah Zimmer

This is the static version of the site which does not have the scrolling bricks, 
making it accessible for screen readers and phone compatible.
*/
import React from 'react';

export default function AccessibleContent({ bricks }) {
    
    return <div id="accessibleBricksContainer">
        {Array(bricks.length).fill(0).map((_, b) => (
            <Brick brick={bricks[b]} key={"p" + bricks[b].Panel_Number.toString() + "r" +  bricks[b].Row_Number.toString() + "c" +  bricks[b].Col_Number.toString()}/>
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