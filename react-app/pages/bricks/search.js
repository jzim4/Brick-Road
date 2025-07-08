/* 
Author: Jonah Zimmer

This single component holds the search bar and includes all functionality for buttons within search bar
*/

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Search = React.memo(function Search({ highlight, setHighlight, display, setDisplay, bricks }) {

    const [section, setSection] = useState("");
    const [searchValue, setSearchValue] = useState("");
    
    // Stable input change handler
    const handleSearchInputChange = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);
    
    // hide search section
    const collapseSearch = useCallback(() => {
        const dropdown = document.getElementsByClassName("searchDropdown")[0];
        const btn = document.getElementsByClassName("accordion")[0];
        btn.classList.remove("active");
        dropdown.style.height = "0px";
        dropdown.style.paddingBottom = "5px";
    }, []);

    // collapse search section if click outside of search
    useEffect(() => {
        const handleClickOutside = (e) => {
            const panel = document.getElementsByClassName("searchDropdown")[0];
            if (panel && !panel.contains(e.target) && !e.target.classList.contains("accordion")) {
                collapseSearch();
            }
        };

        document.addEventListener("click", handleClickOutside);
        
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [collapseSearch]);

    // either open or close search section when "filter" button is clicked
    const handleDropdownClick = useCallback((e) => {
        const clicked = e.target;
        clicked.classList.toggle("active");
        const panel = document.getElementsByClassName("searchDropdown")[0];
        if (panel.style.height != "0px") {
            collapseSearch();
        }
        else {
            panel.style.height = "400px";
        }
    }, [collapseSearch]);

    const toggleDisplay = useCallback(() => {
        if (display == "scroll") {
            setDisplay("static");
        }
        else if (display == "static") {
            setDisplay("scroll");
        }
    }, [display, setDisplay]);

    // takes text field input then sets the highlight value to update other components
    const searchButton = useCallback(() => {
        if (display == "scroll") { 
            collapseSearch(); 
        }
        setHighlight(searchValue);
    }, [display, collapseSearch, searchValue, setHighlight]);

    // takes section name then sets the highlight value to update other components
    const handleSectionSearch = useCallback((section) => {
        setSection(section);
        if (section === "all") {
            setSearchValue(""); // Clear search input when clearing all filters
        }
        if (display == "scroll") { collapseSearch(); }
        setHighlight(section);
    }, [display, collapseSearch, setHighlight]);

    // Component that labels the red brick in the key
    const Label = useMemo(() => {
        return ({ section }) => {
            const sections = ["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"];

            let num = 0;
            for (let b of bricks) {
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
        };
    }, [bricks, highlight]);


    const SearchBox = useMemo(() => (
        <div id="searchContainer">
            <div id="sectionSearchDropdown">
                <label htmlFor="sectionSelect">Search by section:</label>
                <select 
                    id="sectionSelect" 
                    onChange={(e) => handleSectionSearch(e.target.value)}
                    value={section}
                >
                    <option value="all">Select a section...</option>
                    <option value="Centenarian">Century Club</option>
                    <option value="Heroes">Heroes</option>
                    <option value="Golden Women">Golden Women of Rondo</option>
                    <option value="Family/Friends">Family/Friends</option>
                    <option value="Businesses/Organizations">Businesses/Organizations</option>
                </select>
            </div>

            <div id="searchInputsContainer">
                <label htmlFor="fname">Search by name of donor:</label>
                <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <button id="submitSearch" onClick={searchButton}>Search</button>
            </div>

            <button id="clearSearch" onClick={() => handleSectionSearch("all")}>Clear all filters</button>
        </div>
    ), [section, searchValue, handleSectionSearch, searchButton, handleSearchInputChange]);

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
                    {SearchBox}
                </div>
            </div>
            <p className="datasetNote">The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to <Link to={"/report"}>let us know!</Link></p>
        </>
    }
    else {
        return <>
            <div id="customizeButtons">
                <button id="displayToggle" className="headerButton" onClick={toggleDisplay}>{display == "scroll" ? "Show brick list" : "Show scrolling path"}</button>
            </div>
            {SearchBox}
            <p className="datasetNote">The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to <Link to={"/report"}>let us know!</Link></p>
                
            <div id="staticSearchLabel">
                <Label section={highlight} />
            </div>

        </>
    }
});

export default Search;