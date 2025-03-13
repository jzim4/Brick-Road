/* 
Author: Jonah Zimmer

This single component holds the search bar and includes all functionality for buttons within search bar
*/

import data from '../db.json';
import React from 'react';

export function collapseSearch() {
    const dropdown = document.getElementsByClassName("searchDropdown")[0];
    const btn = document.getElementsByClassName("accordion")[0];
    btn.classList.remove("active");
    dropdown.style.height = "0px";
    dropdown.style.paddingBottom = "5px";
}

export default function Search({ highlight, setHighlight }) {

    // collapse search if click outside of search
    document.addEventListener("click", (e) => {
        const panel = document.getElementsByClassName("searchDropdown")[0];
        if (!panel.contains(e.target) && !e.target.classList.contains("accordion")) {
            collapseSearch();
        }
    })

    function handleDropdownClick(e) {
        const clicked = e.target;
        clicked.classList.toggle("active");
        const panel = document.getElementsByClassName("searchDropdown")[0];
        if (panel.style.height != "0px") {
            collapseSearch();
        }
        else {
            panel.style.height = "200px";
        }
    }
    // takes text field input, and finds which bricks match that name
    function searchButton({setHighlight}) {
        console.log(setHighlight);
        let val = document.getElementById("fname").value;
        collapseSearch();
        setHighlight(val);
    }

    function handleSectionSearch(section) {
        collapseSearch();
        setHighlight(section);
        selectSection(section);
    }

    function Label({ section }) {
        let num = 0;
        for (let b of data) {
            if (highlight == "all" || b.Paver_Assigned_Section == highlight || b.Purchaser_Name == highlight) {
                num ++;
            }
        }
        let countPhrase = "[" + num + " bricks]";
        if (num == 1) {
            countPhrase = "[1 brick]";
        }

        if (section == "all") {
            return <span>All purchased bricks {countPhrase}</span>
        }
        else if (section == "Centenarian") {
            return <span>Bricks in the section Centenarian {countPhrase}</span>
        }
        else if (section == "Heroes") {
            return <span>Bricks in the section Heroes {countPhrase}</span>
        }
        else if (section == "Golden Women") {
            return <span>Bricks in the section Golden Women {countPhrase}</span>
        }
        else if (section == "Family/Friends") {
            return <span>Bricks in the section Family/Friends {countPhrase}</span>
        }
        else if (section == "Businesses/Organizations") {
            return <span>Bricks in the section Family/Friends {countPhrase}</span>
        }
        else {
            return <span>Bricks purchased by {section} {countPhrase}</span>
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
            <button onClick={handleDropdownClick} tabIndex={0} className="accordion">Filter</button>
            <div className="searchDropdown" style={{ height: 0 + "px" }}>
                <div id="searchContainer">
                    <div id="sectionSearchContainer">
                        <div id="sectionSearchButtons">
                            Search by section:
                            <button id="century" className="sectionSearchButton" onClick={() => handleSectionSearch("Centenarian")}>Century Club</button>
                            <button id="heros" className="sectionSearchButton" onClick={() => handleSectionSearch("Heroes")}>Heroes</button>
                            <button id="women" className="sectionSearchButton" onClick={() => handleSectionSearch("Golden Women")}>Golden Women of Rondo</button>
                            <button id="friends" className="sectionSearchButton" onClick={() => handleSectionSearch("Family/Friends")}>Family/Friends</button>
                            <button id="businesses" className="sectionSearchButton" onClick={() => handleSectionSearch("Businesses/Organizations")}>Businesses/Organizations</button>
                        </div>
                    </div>

                    <div id="nameSearchContainer">
                        <div id="searchInputsContainer">
                            <label htmlFor="fname">Search by name of donor:</label>
                            <input type="text" id="fname" name="fname"></input>
                            <button id="submitSearch" onClick={() => searchButton( {setHighlight} )}>Search</button>
                        </div>
                    </div>

                    <button id="businesses" className="sectionSearchButton" onClick={() => handleSectionSearch("all")}>Clear all filters</button>

                </div>
            </div>
        </div>
    </>
}