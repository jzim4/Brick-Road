/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState } from 'react';

import Header from './header.js';
import Search from './search.js';
import SelectedBrick from './selectedBrick.js';
import ScrollContent from './scrollContent.js';
import AcessibleContent from './accessibleContent.js';


export const defaultBrick = {
    Panel_Number: 14,
    Row_Number: 16,
    Col_Number: 11
}

export default function BrickRoadSite() {
    // this state is used to show extra info about a brick. It takes an object from the db.json file or the default brick shown above
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    // this state is used to show which bricks are red versus grey. It is either one of the sections, a donor, or "all"
    const [highlight, setHighlight] = useState("all");

    const [display, setDisplay] = useState("scroll");

    return <>
        <Header display={display} setDisplay={setDisplay}/>
        <Search highlight={highlight} setHighlight={setHighlight} display={display}/>
        
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick}/>
        {display == "scroll" ? 
            <ScrollContent highlight={highlight} currentBrick = {currentBrick}/> : 
            <AcessibleContent highlight={highlight} />
        }
        
    </>
}