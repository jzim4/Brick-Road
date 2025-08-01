/* 
Author: Jonah Zimmer

This single component holds the search bar and includes all functionality for buttons within search bar
*/
import "../../styles/search.css";
import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Search = React.memo(function Search({ highlight, setHighlight, viewMode, setViewMode, bricks }) {

    const [section, setSection] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleSearchInputChange = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const toggleDisplay = useCallback(() => {
        setViewMode(prevMode => prevMode === 'scroll' ? 'list' : 'scroll');
    }, [setViewMode]);

    const handleSearch = useCallback(() => {
        setHighlight(searchValue);
        closeModal();
    }, [searchValue, setHighlight, closeModal]);

    const handleSectionSearch = useCallback((newSection) => {
        setSection(newSection);
        setHighlight(newSection);
        if (newSection === "all") {
            setSearchValue("");
        }
        closeModal();
    }, [setHighlight, closeModal]);

    const Label = useMemo(() => {
        return ({ section }) => {
            const sections = ["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"];
            let num = bricks.filter(b => {
                if (typeof(b.Panel_Number) !== "number") return false;
                const highlightMatch = b.Purchaser_Name.toLowerCase().includes(highlight.toLowerCase());
                return highlight === "all" || b.Paver_Assigned_Section === highlight || highlightMatch;
            }).length;

            let countPhrase = `[${num} brick${num !== 1 ? 's' : ''}]`;
            if (section === "all") return <span>All purchased bricks {countPhrase}</span>;
            if (sections.includes(section)) return <span>Bricks in the section {section} {countPhrase}</span>;
            return <span>Bricks purchased by {section} {countPhrase}</span>;
        };
    }, [bricks, highlight]);

    const SearchBox = useMemo(() => (
        <div id="searchContainer">
            <div id="sectionSearchDropdown">
                <label htmlFor="sectionSelect">Search by section:</label>
                <select id="sectionSelect" onChange={(e) => handleSectionSearch(e.target.value)} value={section}>
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
                <input type="text" id="fname" name="fname" value={searchValue} onChange={handleSearchInputChange} />
                <button id="submitSearch" onClick={handleSearch}>Search</button>
            </div>
            <button id="clearSearch" onClick={() => handleSectionSearch("all")}>Clear all filters</button>
        </div>
    ), [section, searchValue, handleSectionSearch, handleSearch, handleSearchInputChange]);

    const FilterModal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;
        return (
            <div className="filter-modal-overlay" onClick={onClose}>
                <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
                    <button className="close-modal-button" onClick={onClose}>&times;</button>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <>
            <div id="searchHeader">
                <button id="displayToggle" className="headerButton" onClick={toggleDisplay}>
                    {viewMode === 'scroll' ? 'Show Brick List' : 'Show Scrolling Path'}
                </button>
                {viewMode === 'scroll' && (
                    <div id="keysContainer">
                        <div className="keyContainer">
                            <div id="redKeyBox" className="keyBox"></div>
                            <div id="redKeyText"><Label section={highlight} /></div> 
                            <button onClick={openModal} tabIndex={0} className="accordion">Filter</button>
                        </div>
                        <div className="keyContainer">
                            <div id="greyKeyBox" className="keyBox"></div>
                            <div id="greyKeyText">All other bricks</div>
                        </div>
                    </div>
                )}
                 {viewMode === 'list' && (
                    <div id="customizeButtons">
                         <button onClick={openModal} tabIndex={0} className="accordion">Search & Filter</button>
                    </div>
                )}
            </div>

            <FilterModal isOpen={isModalOpen} onClose={closeModal}>
                {SearchBox}
            </FilterModal>
            
            <p className="datasetNote">
                The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to <Link to={"/report"}>let us know!</Link>
            </p>

            {viewMode === 'list' && (
                <div id="staticSearchLabel">
                    <Label section={highlight} />
                </div>
            )}
        </>
    );
});

export default Search;
