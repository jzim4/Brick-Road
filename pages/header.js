/* 
Author: Jonah Zimmer

This single component holds the header
*/
import React from 'react';

export default function Header({display, setDisplay}) {

    function toggleDisplay() {
        if (display == "scroll") {
            setDisplay("static");
        }
        else if (display == "static") {
            setDisplay("scroll");
        }
    }

    return <header>
        <button id="headerSpaceHolder" onClick={toggleDisplay}>Toggle Accessible Mode</button>
        <h1>Rondo Commemorative Plaza</h1>
        <a>About</a>
    </header>
}