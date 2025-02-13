import React, { useState } from 'react';

import data from '../brickData.json';
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

    function brickExists(brick) {
        let bricks = [];
        for (let b of data) {
            if (b.row == brick.row && b.col == brick.col) {
                return brick;
            }
        }
        return null;
    }

    function ClickBrick() {
        document.addEventListener("click", (e) => {
            const clicked = e.target;
            let col = Array.prototype.indexOf.call(clicked.parentElement.children, clicked);
            let row = Array.prototype.indexOf.call(clicked.parentElement.parentElement.children, clicked.parentElement);
            console.log(col);
            const brick = brickExists([row, col]);
            if (brick) {
                setCurrentBrick(brick);
            }
        })
    }

    return <>
        <ClickBrick/>
        <Search/>
        <button onClick={submitSearch}>Search</button>
        <SelectedBrick brick={currentBrick}/>
        <BrickPath col={currentBrick.col} row={currentBrick.row}/>
    </>
}