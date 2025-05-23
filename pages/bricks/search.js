/* 
Author: Jonah Zimmer

This single component holds the search bar and includes all functionality for buttons within search bar
*/

import data from '../../db.json';
import React from 'react';

export default function Search({ highlight, setHighlight, display, setDisplay }) {

    // hide search section
    function collapseSearch() {
        const dropdown = document.getElementsByClassName("searchDropdown")[0];
        const btn = document.getElementsByClassName("accordion")[0];
        btn.classList.remove("active");
        dropdown.style.height = "0px";
        dropdown.style.paddingBottom = "5px";
    }

    // collapse search section if click outside of search
    document.addEventListener("click", (e) => {
        const panel = document.getElementsByClassName("searchDropdown")[0];
        if (panel && !panel.contains(e.target) && !e.target.classList.contains("accordion")) {
            collapseSearch();
        }
    })

    // either open or close search section when "filter" button is clicked
    function handleDropdownClick(e) {
        const clicked = e.target;
        clicked.classList.toggle("active");
        const panel = document.getElementsByClassName("searchDropdown")[0];
        if (panel.style.height != "0px") {
            collapseSearch();
        }
        else {
            panel.style.height = "400px";
        }
    }

    function toggleDisplay() {
        if (display == "scroll") {
            setDisplay("static");
        }
        else if (display == "static") {
            setDisplay("scroll");
        }
    }

    // takes text field input then sets the highlight value to update other components
    function searchButton({ setHighlight }) {
        let val = document.getElementById("fname").value;
        if (display == "scroll") { collapseSearch(); }
        setHighlight(val);
    }

    // takes section name then sets the highlight value to update other components
    function handleSectionSearch(section) {
        if (display == "scroll") { collapseSearch(); }
        setHighlight(section);
    }

    // Component that labels the red brick in the key
    function Label({ section }) {
        const sections = ["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"];

        let num = 0;
        for (let b of data) {
            if (typeof (b.Panel_Number) == "number") {
                let highlightMatch = b.Purchaser_Name.toLowerCase().includes(highlight.toLowerCase());
                if (highlight == "all" || b.Paver_Assigned_Section == highlight || highlightMatch) {
                    num++;
                }
            }
        }
        let countPhrase = "[" + num + " bricks]";
        if (num == 1) {
            countPhrase = "[1 brick]";
        }

        if (section == "all") {
            return <span>All purchased bricks {countPhrase}</span>
        }
        else if (sections.includes(section)) {
            return <span>Bricks in the section {section} {countPhrase}</span>
        }
        else {
            return <span>Bricks purchased by {section} {countPhrase}</span>
        }
    }


    function SearchBox() {
        return <div id="searchContainer">
            <div id="sectionSearchContainer">
                <span>Search by section:</span>
                <div id="sectionSearchButtons">
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
                    <br></br>
                    <input type="text" id="fname" name="fname"></input>
                    <button id="submitSearch" onClick={() => searchButton({ setHighlight })}>Search</button>
                </div>
            </div>

            <button id="clearSearch" className="sectionSearchButton" onClick={() => handleSectionSearch("all")}>Clear all filters</button>

        </div>
    }

    if (display == "scroll") {
        return <>
            <div id="searchHeader">
                <button id="displayToggle" className="headerButton" onClick={toggleDisplay}>{display == "scroll" ? "Show brick list" : "Show scrolling path"}</button>

                <div id="keysContainer">
                    <div className="keyContainer">
                        <div id="redKeyBox" className="keyBox"></div>
                        <div id="redKeyText"><Label section={highlight} /></div> <button onClick={handleDropdownClick} tabIndex={0} className="accordion">Filter</button>
                    </div>
                    <div className="keyContainer">
                        <div id="greyKeyBox" className="keyBox"></div>
                        <div id="greyKeyText">All other bricks</div>
                    </div>
                </div>

                <div className="searchDropdown" style={{ height: 0 + "px" }}>
                    <SearchBox />
                </div>
            </div>
            <p className="datasetNote">The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to reach out to Katie Frye: katie@rcodemn.org</p>

        </>
    }
    else {
        return <>
            <div id="customizeButtons">
                <button id="displayToggle" className="headerButton" onClick={toggleDisplay}>{display == "scroll" ? "Show brick list" : "Show scrolling path"}</button>
            </div>
            <SearchBox />
            <p className="datasetNote">The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to reach out to Katie Frye: katie@rcodemn.org</p>

            <div id="staticSearchLabel">
                <Label section={highlight} />
            </div>

        </>
    }
}