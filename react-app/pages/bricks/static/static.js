/* 
Author: Jonah Zimmer

This is the static version of the site which does not have the scrolling bricks, 
making it accessible for screen readers and phone compatible.
*/
import React from 'react';
import '../../../styles/listDisplay.css';

export default function AccessibleContent({ bricks }) {
    return <div id="accessibleBricksContainer">
        {bricks.map((brick) => {
            if (typeof(brick.Panel_Number) == "number" && typeof(brick.Row_Number) == "number" && typeof(brick.Col_Number) == "number") {
                return <Brick brick={brick} key={"p" + brick.Panel_Number.toString() + "r" +  brick.Row_Number.toString() + "c" +  brick.Col_Number.toString()}/>
            }
        }
        )}
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