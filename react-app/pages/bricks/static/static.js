/* 
Author: Jonah Zimmer

This is the static version of the site which does not have the scrolling bricks, 
making it accessible for screen readers and phone compatible.
*/
import React from 'react';
import '../../../styles/listDisplay.css';

export default function ListContent({ bricks, setCurrentBrick }) {

    const handleBrickClick = (brick) => {
        console.log("brick in static", brick);
        setCurrentBrick(brick);
    };

    bricks.sort((a, b) => {
        if (a.Panel_Number === b.Panel_Number) {
            if (a.Col_Number === b.Col_Number) {
                return a.Row_Number - b.Row_Number;
            }
            return a.Col_Number - b.Col_Number;
        }
        return a.Panel_Number - b.Panel_Number;
    });

    return (
        <div id="accessibleBricksContainer">
            {bricks.map((brick) => {
                if (typeof(brick.Panel_Number) === "number" && typeof(brick.Row_Number) === "number" && typeof(brick.Col_Number) === "number") {
                    return <Brick brick={brick} onClick={() => handleBrickClick(brick)} key={"p" + brick.Panel_Number.toString() + "r" +  brick.Row_Number.toString() + "c" +  brick.Col_Number.toString()}/>
                }
                return null;
            })}
        </div>
    );
}

function Brick({ brick, onClick }) {
    return (
        <div className="accessibleBrickContainer" onClick={onClick}>
            <div className="accessibleBrick">
                {brick.Inscription_Line_1 && <p>{brick.Inscription_Line_1}</p>}
                {brick.Inscription_Line_2 && <p>{brick.Inscription_Line_2}</p>}
                {brick.Inscription_Line_3 && <p>{brick.Inscription_Line_3}</p>}
            </div>
        </div>
    );
}
