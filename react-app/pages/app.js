/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/
import "../styles/global.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout.js';

import Search from './bricks/search.js';
import SelectedBrick from './bricks/scrolling/selectedBrick.js';
import ScrollContent from './bricks/scrolling/scrollContent.js';
import AccessibleContent from './bricks/static/static.js';

export const defaultBrick = {
    Panel_Number: 20,
    Row_Number: 16,
    Col_Number: 11
}

export default function BrickRoadSite() {
    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    const [highlight, setHighlight] = useState("all");
    const [highlightType, setHighlightType] = useState("all"); // can be "all", "section", or "donor"

    const [displayType, setDisplayType] = useState("scroll");

    const [bricks, setBricks] = useState([]);

    const [displayedBricks, setDisplayedBricks] = useState(bricks);
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

    useEffect(() => {
        function getDisplayedBricks() {
            if (highlight === "all") {
                return bricks;
            }
            if (["Centenarian", "Heroes", "Golden Women", "Family/Friends", "Businesses/Organizations"].includes(highlight)) {
                return bricks.filter(brick => brick.Paver_Assigned_Section === highlight);
            }
            if (highlightType === "donor") {
                return bricks.filter(brick => brick.Purchaser_Name === highlight);
            }
            return bricks;
        }

        console.log("highlightType:", highlightType);
        console.log("highlight:", highlight);
        console.log("sample brick section:", bricks[0]?.Paver_Assigned_Section);

        setDisplayedBricks(getDisplayedBricks());
    }, [bricks, displayType, highlight])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setDisplayType("static");
                setCurrentBrick(defaultBrick);
                const cover = document.getElementById("selectedBrickPageCover");
                if (cover) {
                    cover.style.display = "none";
                }
                document.body.style.overflow = 'auto';
            }
        };

        if (window.innerWidth < 1000 && displayType !== "static") {
            handleResize();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [displayType]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (bricks.length === 0) {
        return <div>No bricks found</div>;
    }

    return <Layout>
        <Search highlight={highlight} setHighlight={setHighlight} display={displayType} setDisplay={setDisplayType} bricks={bricks} />

        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} />
        {displayType === "scroll" ?
            <ScrollContent highlight={highlight} currentBrick={currentBrick} bricks={displayedBricks} /> :
            <AccessibleContent highlight={highlight} bricks={displayedBricks} />
        }
    </Layout>
}