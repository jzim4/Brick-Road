/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout.js';

import Search from './bricks/search.js';
import SelectedBrick from './bricks/selectedBrick.js';
import ScrollContent from './bricks/scrolling/scrollContent.js';
import VertScrollContent from './bricks/vertScrolling/vertScrollContent.js';
import ListContent from './bricks/static/static.js';
import ViewToggle from './bricks/viewToggle.js';

export const defaultBrick = {
    Panel_Number: 20,
    Row_Number: 16,
    Col_Number: 11
}

export default function BrickRoadSite() {

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [currentBrick, setCurrentBrick] = useState(defaultBrick);
    const [highlight, setHighlight] = useState("all");
    const [highlightType, setHighlightType] = useState("all"); // can be "all", "section", or "donor"

    const [viewMode, setViewMode] = useState("scroll"); // 'scroll' or 'list'
    const [isWide, setIsWide] = useState(true);

    const [bricks, setBricks] = useState([]);

    const [displayedBricks, setDisplayedBricks] = useState(bricks);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${serverUrl}/bricks`)
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
        
        setDisplayedBricks(getDisplayedBricks());
    }, [bricks, highlight])

    useEffect(() => {
        const handleResize = () => {
            setIsWide(window.innerWidth > 700);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (currentBrick && currentBrick.Panel_Number !== 20) {
            const modal = document.getElementById("selectedBrickPageCover");
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = 'hidden';
            }
        }
    }, [currentBrick]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return <Layout>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <Search highlight={highlight} setHighlight={setHighlight} viewMode={viewMode} setViewMode={setViewMode} bricks={bricks} isWide={isWide} />
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick} />
        
        {viewMode === 'list' ? (
            <ListContent highlight={highlight} bricks={displayedBricks} setCurrentBrick={setCurrentBrick} loading={loading} />
        ) : isWide ? (
            <ScrollContent highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} loading={loading} />
        ) : (
            <div className="vertPathContainer">
                <VertScrollContent highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} isWide={isWide} loading={loading} />
            </div>
        )}
    </Layout>
}
