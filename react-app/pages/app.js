/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState } from 'react';

import Header from './header.js';
import Search from './bricks/search.js';
import SelectedBrick from './bricks/scrolling/selectedBrick.js';
import ScrollContent from './bricks/scrolling/scrollContent.js';
import AccessibleContent from './bricks/static/static.js';
import Footer from './footer.js';

export const defaultBrick = {
    Panel_Number: 20,
    Row_Number: 16,
    Col_Number: 11
}

export default function BrickRoadSite() {
    // this state is used to show extra info about a brick. It takes an object from the db.json file or the default brick shown above
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    // this state is used to show which bricks are red versus grey. It is either one of the sections, a donor, or "all"
    const [highlight, setHighlight] = useState("all");

    const [display, setDisplay] = useState("scroll");

    // if window starts out small, make it static
    if (window.innerWidth < 1000 && display != "static") {
        setDisplay("static");
    }
    // if window becomes small, make it static
    window.onresize = function() {
        if (window.innerWidth < 1000) {
            setDisplay("static");
            setCurrentBrick(defaultBrick);
            document.getElementById("selectedBrickPageCover").style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    return <>
        <Header display={display} setDisplay={setDisplay}/>
        <Search highlight={highlight} setHighlight={setHighlight} display={display} setDisplay={setDisplay}/>
        
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick}/>
        {display == "scroll" ? 
            <ScrollContent highlight={highlight} currentBrick = {currentBrick}/> : 
            <AccessibleContent highlight={highlight} />
        }
        <Footer/>
        
    </>
}