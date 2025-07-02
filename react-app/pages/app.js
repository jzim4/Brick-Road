/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    const [highlight, setHighlight] = useState("all");
    const [highlightType, setHighlightType] = useState("all"); // can be "all", "section", or "donor"

    const [display, setDisplay] = useState("scroll");
    const [bricks, setBricks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/bricks")
            .then(response => {
                setBricks(response.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs only once on mount

    const displayedBricks = React.useMemo(() => {
        if (highlightType === "all") {
            return bricks;
        }
        if (highlightType === "section") {
            return bricks.filter(brick => brick.Paver_Assigned_Section === highlight);
        }
        if (highlightType === "donor") {
            return bricks.filter(brick => brick.Purchaser_Name === highlight);
        }
        return bricks;
    }, [bricks, highlight, highlightType]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setDisplay("static");
                setCurrentBrick(defaultBrick);
                const cover = document.getElementById("selectedBrickPageCover");
                if (cover) {
                    cover.style.display = "none";
                }
                document.body.style.overflow = 'auto';
            }
        };

        if (window.innerWidth < 1000 && display !== "static") {
            handleResize();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [display]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    console.log(bricks);
    if (bricks.length === 0) {
        return <div>No bricks found</div>;
    }

    return <>
        <Header display={display} setDisplay={setDisplay} />
        <Search highlight={highlight} setHighlight={setHighlight} setHighlightType={setHighlightType} display={display} setDisplay={setDisplay} bricks={bricks} />

        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} />
        {display === "scroll" ?
            <ScrollContent highlight={highlight} currentBrick={currentBrick} bricks={displayedBricks} /> :
            <AccessibleContent highlight={highlight} bricks={displayedBricks} />
        }
        <Footer />
    </>
}