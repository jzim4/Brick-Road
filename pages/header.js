/* 
Author: Jonah Zimmer

This single component holds the header
*/
import React from 'react';

export default function Header({display, setDisplay}) {

    

    return <header>
        <div width="100"></div>
        <h1>Rondo Commemorative Plaza</h1>
        <button className="headerButton">About</button>
    </header>
}