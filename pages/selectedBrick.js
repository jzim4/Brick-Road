/* 
Author: Jonah Zimmer

This single component shows the selected brick
*/
import React from 'react';
import {defaultBrick} from './brickRoadSite.js';

export default function SelectedBrick({brick, setCurrentBrick}) {

    function closeBrick() {
        setCurrentBrick(defaultBrick);
        document.getElementById("selectedBrickContainer").style.visibility = "hidden";
    }

    if (brick.col == 50) {
        return <div id="selectedBrickContainer">
            <button onClick={ closeBrick }>Close</button>
            <p></p>
    </div>
    }
    else if (brick.col == 100) {
        return <div id="selectedBrickContainer">
            <button onClick={ closeBrick }>Close</button>
            <p>There is not a brick that corresponds with that name.</p>
    </div>
    }
    return <div id="selectedBrickContainer">
        <button onClick={ closeBrick }>Close</button>
        <p>Name: {brick.name}</p>
        <p>Message: {brick.message}</p>
    </div>
}