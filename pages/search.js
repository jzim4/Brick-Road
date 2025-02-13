/* 
Author: Jonah Zimmer

This single component holds the search bar
*/

import React from 'react';

export default function Search() {
    return <>
    <label htmlFor="fname">Name of donor: </label>
    <input type="text" id="fname" name="fname"></input>
    </>
}