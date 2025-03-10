/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/


import React, { useState } from 'react';

import Header from './header.js';
import Search from './search.js';
import SelectedBrick from './selectedBrick.js';
import ScrollContent from './scrollContent.js';
import { ClickOnBrick } from './searchFunctionality.js';

export const defaultBrick = {
    Panel_Number: 14,
    Row_Number: 16,
    Col_Number: 11
}

export default function BrickRoadSite() {
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    const [highlight, setHighlight] = useState("all");

    return <>
        <ClickOnBrick setCurrentBrick={setCurrentBrick}/>

        <Header/>
        <Search setCurrentBrick={setCurrentBrick} highlight={highlight} setHighlight={setHighlight}/>
        
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick}/>
        <ScrollContent highlight={highlight} currentBrick = {currentBrick}/>
    </>
}