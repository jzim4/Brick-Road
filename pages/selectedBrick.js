/* 
Author: Jonah Zimmer

This single component shows the selected brick
*/
import React from 'react';

export default function SelectedBrick({brick}) {
    if (brick.col == 50) {
        return <div id="selectedBrickContainer">
            <p></p>
    </div>
    }
    else if (brick.col == 100) {
        return <div id="selectedBrickContainer">
            <p>There is not a brick that corresponds with that name.</p>
    </div>
    }
    return <div id="selectedBrickContainer">
        <p>Name: {brick.name}</p>
        <p>Message: {brick.message}</p>
    </div>
}