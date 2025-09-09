/* 
Author: Jonah Zimmer

This single component holds the search bar and includes all functionality for buttons within search bar
*/
import "../../styles/search.css";
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SECTIONS, matchesHighlight } from './filter';
import { Link } from 'react-router-dom';

const SearchBox = React.memo(function SearchBox({ section, donorName, inscription, handleSectionSearch, handleDonorInputChange, handleInscriptionSearch, handleSearch, handleClear, isLoading }) {
    return (
        <div id="searchContainer">
            <div id="sectionSearchDropdown">
                <label htmlFor="sectionSelect">Search by section:</label>
				<select id="sectionSelect" onChange={(e) => handleSectionSearch(e.target.value)} value={section} disabled={isLoading}>
                    <option value="all">Select a section...</option>
                    <option value="Centenarian">Century Club</option>
                    <option value="Heroes">Heroes</option>
                    <option value="Golden Women">Golden Women of Rondo</option>
                    <option value="Family/Friends">Family/Friends</option>
                    <option value="Businesses/Organizations">Businesses/Organizations</option>
                </select>
            </div>
			<div className="searchOr" aria-hidden="true">OR</div>
            <div id="searchInputsContainer">
                <label htmlFor="fname">Search by name of donor:</label>
				<input type="text" className="searchInput" id="fname" name="fname" value={donorName} onChange={handleDonorInputChange} disabled={isLoading} />
            </div>
			<div className="searchOr" aria-hidden="true">OR</div>
            <div id="searchInputsContainer">
                <label htmlFor="inscription">Search by inscription:</label>
				<input type="text" className="searchInput" id="inscription" name="inscription" value={inscription} onChange={handleInscriptionSearch} disabled={isLoading} />
            </div>
			<div id="searchInputsContainer">
				<button id="submitSearch" onClick={handleSearch} disabled={isLoading} className={isLoading ? 'is-loading' : ''}>
					{isLoading && <span className="spinner" aria-hidden="true"></span>}
					<span>{isLoading ? 'Searching…' : 'Search'}</span>
				</button>
			</div>
            <div id="searchInputsContainer">
				<button id="clearSearch" onClick={handleClear} disabled={isLoading}>Clear all filters</button>
            </div>
        </div>
    );
});

const FilterModal = React.memo(function FilterModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="filter-modal-overlay" onClick={onClose}>
            <div className="filter-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-button" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
});

const Label = React.memo(function Label({ highlight, bricks, committedType, isLoading }) {
	if (isLoading && committedType === "inscription") {
		return <span>Searching inscription…</span>;
	}
    const sections = SECTIONS;
    const num = bricks.filter(b => typeof b.Panel_Number === "number" && matchesHighlight(b, highlight)).length;
    const countPhrase = `[${num} brick${num !== 1 ? 's' : ''}]`;
    let labelPhrase = "";
    if (committedType === "section") {
        labelPhrase = `Bricks in the section ${highlight}`;
    }
    if (committedType === "donor") {
        labelPhrase = `Bricks purchased by ${highlight}`;
    }
    if (committedType === "inscription") {
        labelPhrase = `Bricks with inscription "${highlight}"`;
    }
    if (committedType === "all") {
        labelPhrase = "All purchased bricks";
    }
    return <div className="labelContainer">
        <span className="labelText">{labelPhrase}</span>
        <span className="countPhrase">{countPhrase}</span>
    </div>
});


const Search = React.memo(function Search({ highlight, setHighlight, viewMode, bricks }) {

    const [section, setSection] = useState("all");
    const [donorName, setDonorName] = useState("");
    const [inscription, setInscription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
	const [committedType, setCommittedType] = useState("all"); // "all" | "section" | "donor" | "inscription"
	const [isLoading, setIsLoading] = useState(false);
    
    const handleDonorInputChange = useCallback((e) => {
        if (e.target.value !== "") {
            setSection("all");
            setInscription("");
        }
        setDonorName(e.target.value);
    }, []);

    const handleSectionSearch = useCallback((newSection) => {
        if (newSection !== "all") {
            setDonorName("");
            setInscription("");
        }
        setSection(newSection);
    }, [setSection, setDonorName]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

	const handleSearch = useCallback(() => {
        const inscriptionQuery = inscription.trim();
        const donorQuery = donorName.trim();
        if (inscriptionQuery) {
			setIsLoading(true);
			setTimeout(() => {
				setHighlight(inscriptionQuery);
				setCommittedType("inscription");
				closeModal();
			}, 0);
        } else if (donorQuery) {
            setHighlight(donorQuery);
            setCommittedType("donor");
			closeModal();
        } else if (section !== "all") {
            setHighlight(section);
            setCommittedType("section");
			closeModal();
        } else {
            setHighlight("all");
            setCommittedType("all");
			closeModal();
        }
    }, [donorName, inscription, setHighlight, closeModal, section]);

	useEffect(() => {
		if (committedType === "inscription" && highlight && isLoading) {
			const id = setTimeout(() => setIsLoading(false), 800);
			return () => clearTimeout(id);
		}
	}, [highlight, committedType, isLoading]);

    const handleInscriptionSearch = useCallback((e) => {
        if (e.target.value !== "") {
            setSection("all");
            setDonorName("");
        }
        setInscription(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setSection("all");
        setDonorName("");
        setInscription("");
        setHighlight("all");
        setCommittedType("all");
        closeModal();
    }, [setHighlight]);

    return (
        <>
            <div id="searchHeader">
                {viewMode === 'scroll' && (
                    <div id="keysContainer">
                        <div className="keyContainer">
                            <div id="redKeyBox" className="keyBox"></div>
                            <div id="redKeyText"><Label highlight={highlight} bricks={bricks} committedType={committedType} /></div> 
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
                <SearchBox 
                    section={section}
                    donorName={donorName}
                    inscription={inscription}
                    handleSectionSearch={handleSectionSearch}
                    handleDonorInputChange={handleDonorInputChange}
                    handleInscriptionSearch={handleInscriptionSearch}
                    handleSearch={handleSearch}
					handleClear={handleClear}
					isLoading={isLoading}
                />
            </FilterModal>
            
            <p className="datasetNote">
                The dataset used to build this site is incomplete. If you find any missing information or errors, do not hesitate to <Link to={"/report"}>let us know!</Link>
            </p>

				{viewMode === 'list' && (
                <div id="staticSearchLabel">
						<Label highlight={highlight} bricks={bricks} committedType={committedType} isLoading={isLoading} />
                </div>
            )}
        </>
    );
});

export default Search;
