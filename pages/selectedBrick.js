import React from 'react';

export default function SelectedBrick({brick}) {
    if (brick == null) {
        return <div id="selectedBrickContainer">
        <p></p>
        <p></p>
    </div>
    }

    return <div id="selectedBrickContainer">
        <p>Name: {brick.name}</p>
        <p>Message: {brick.message}</p>
    </div>
}