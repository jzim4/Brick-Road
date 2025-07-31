/* 
Author: Jonah Zimmer

This is the main file. It holds the state changes, and brings together the components
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout.js';

import Search from './bricks/search.js';
import SelectedBrick from './bricks/scrolling/selectedBrick.js';
import ScrollContent from './bricks/scrolling/scrollContent.js';
import VertScrollContent from './bricks/vertScrolling/vertScrollContent.js';
import AccessibleContent from './bricks/static/static.js';

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

    if (loading) {
        return <div className="loading-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (bricks.length === 0) {
        return <div>No bricks found</div>;
    }

    const searchComponent = <Search 
                                highlight={highlight} 
                                setHighlight={setHighlight} 
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                bricks={bricks} 
                                isWide={isWide}
                            />;

    return <Layout>
        {viewMode === 'list' || isWide ? searchComponent : null}
        
        <SelectedBrick brick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} />
        
        {viewMode === 'list' ? (
            <AccessibleContent highlight={highlight} bricks={displayedBricks} />
        ) : isWide ? (
            <ScrollContent highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} />
        ) : (
            <div className="vertPathContainer">
                {searchComponent}
                <VertScrollContent highlight={highlight} currentBrick={currentBrick} setCurrentBrick={setCurrentBrick} bricks={displayedBricks} isWide={isWide} />
            </div>
        )}
    </Layout>
}
