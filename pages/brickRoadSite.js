import React, { useState } from 'react';

import Search from './search.js';
import SelectedBrick from './selectedBrick.js';
import BrickPath from './brickPath.js';
import searchFunctionality from './searchFunctionality.js';

export default function BrickRoadSite() {
    const [currentBrick, setCurrentBrick] = useState({
        name: "none",
        message: "none",
        row: 50,
        col: 50
    });

    function submitSearch() {
        let brick = searchFunctionality();
        setCurrentBrick(brick);
    }

    return <>
        <Search/>
        <button onClick={submitSearch}>Search</button>
        <SelectedBrick brick={currentBrick}/>
        <BrickPath col={currentBrick.col} row={currentBrick.row}/>
    </>
}