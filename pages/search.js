/* 
Author: Jonah Zimmer

This single component holds the search bar
*/

import React from 'react';
import { submitButton, selectSection } from './searchFunctionality.js';

export default function Search({ setCurrentBrick, highlight, setHighlight }) {

    function handleDropdownClick(e) {
        const clicked = e.target;
        clicked.classList.toggle("active");
        var panel = clicked.parentElement.nextElementSibling;
        console.log(panel);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingBottom = "5px";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.paddingBottom = "25px";
        }
    }

    function handleSectionClick(section) {
        const dropdown = document.getElementsByClassName("searchDropdown")[0];
        const btn = document.getElementsByClassName("accordion")[0];
        btn.classList.toggle("active");
        dropdown.style.maxHeight = null;
        dropdown.style.paddingBottom = "5px";
        
        setHighlight(section);
        selectSection(section);
    }

    function Label({section}) {
        if (section == "all") {
            return <span>All purchased bricks</span>
        }
        else if (section == "Centenarian") {
            return <span>Bricks in the section Centenarian</span>
        }
        else if (section == "Heroes") {
            return <span>Bricks in the section Heroes</span>
        }
        else if (section == "Golden Women") {
            return <span>Bricks in the section Golden Women</span>
        }
        else if (section == "Family/Friends") {
            return <span>Bricks in the section Family/Friends</span>
        }
        else if (section == "Businesses/Organizations") {
            return <span>Bricks in the section Family/Friends</span>
        }
        else {
            return <span>Bricks purchased by abc</span>
        }
    }

    return <>
        <div id="searchHeader">
            <div id="keysContainer">
                <div className="keyContainer">
                    <div id="redKeyBox" className="keyBox"></div>
                    <div id="redKeyText"><Label section={highlight} /></div>
                </div>
                <div className="keyContainer">
                    <div id="greyKeyBox" className="keyBox"></div>
                    <div id="greyKeyText">All other bricks</div>
                </div>
            </div>
            <button onClick={handleDropdownClick} className="accordion">Filter</button>
        </div>
        <div className="searchDropdown">
            <div id="searchContainer">
                <div id="sectionSearchContainer">
                    <div id="sectionSearchButtons">
                        Search by section:
                        <button id="century" className="sectionSearchButton" onClick={() => handleSectionClick("Centenarian")}>Century Club</button>
                        <button id="heros" className="sectionSearchButton" onClick={() => handleSectionClick("Heroes")}>Heroes</button>
                        <button id="women" className="sectionSearchButton" onClick={() => handleSectionClick("Golden Women")}>Golden Women of Rondo</button>
                        <button id="friends" className="sectionSearchButton" onClick={() => handleSectionClick("Family/Friends")}>Family/Friends</button>
                        <button id="businesses" className="sectionSearchButton" onClick={() => handleSectionClick("Businesses/Organizations")}>Businesses/Organizations</button>
                    </div>
                </div>

                <div id="nameSearchContainer">
                    <div id="searchInputsContainer">
                        <label htmlFor="fname">Search by name of donor:</label>
                        <input type="text" id="fname" name="fname"></input>
                        <button id="submitSearch" onClick={() => submitButton({ setCurrentBrick })}>Search</button>
                    </div>
                </div>

                <button id="businesses" className="sectionSearchButton" onClick={() => handleSectionClick("all")}>Clear all filters</button>

            </div>
        </div>
    </>
}