/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState } from 'react';

import Search from './search.js';
import SelectedBrick from './selectedBrick.js';
import BrickPath from './brickPath.js';
import { ClickOnBrick, submitButton } from './searchFunctionality.js';

export default function BrickRoadSite() {
    const defaultBrick = {
        name: "none",
        message: "none",
        row: 50,
        col: 50
    }
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);

    return <>
        <ClickOnBrick setCurrentBrick={setCurrentBrick}/>
        <Search/>
        <button onClick={() => submitButton(setCurrentBrick)}>Search</button>
        <SelectedBrick brick={currentBrick}/>
        <BrickPath col={currentBrick.col} row={currentBrick.row}/>
    </>
}