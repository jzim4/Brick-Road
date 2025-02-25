/* 
Author: Jonah Zimmer

This single component holds the search bar
*/

import React from 'react';
import { submitButton } from './searchFunctionality.js';

export default function Search({ setCurrentBrick }) {

    return <div id="searchContainer">
        <div id="sectionSearchContainer">
            Search by section:
            <div id="sectionSearchButtons">
            <button id="century" className="sectionSearchButton">Century Club</button>
            <button id="heros" className="sectionSearchButton">Heroes</button>
            <button id="women" className="sectionSearchButton">Golden Women of Rondo</button>
            <button id="friends" className="sectionSearchButton">Family/Friends</button>
            <button id="businesses" className="sectionSearchButton">Businesses/Organizations</button>
            </div>
        </div>

        <div id="nameSearchContainer">
            <label htmlFor="fname">Search by name of donor:</label>
            <div id="searchInputsContainer">
            <input type="text" id="fname" name="fname"></input>
            <button id="submitSearch" onClick={() => submitButton( {setCurrentBrick} )}>Search</button>
            </div>
        </div>
    </div>
}