/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState } from 'react';

import Header from './header.js';
import Search from './search.js';
import SelectedBrick from './selectedBrick.js';
import BrickPath from './brickPath.js';
import { ClickOnBrick } from './searchFunctionality.js';

export const defaultBrick = {
    name: "none",
    message: "none",
    row: 50,
    col: 50
}

export default function BrickRoadSite() {
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);

    return <>
        <ClickOnBrick setCurrentBrick={setCurrentBrick}/>

        <Header/>
        <Search setCurrentBrick={setCurrentBrick}/>
        
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick}/>
        <BrickPath col={currentBrick.col} row={currentBrick.row}/>
    </>
}