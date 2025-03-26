/* 
Author: Jonah Zimmer

This single component holds the header
*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    return <header>
        <h1>Rondo Commemorative Plaza</h1>
        <Link className="headerButton" to={"/"}>Home</Link>
        <Link to={"/about"} className="headerButton">About</Link>
    </header>
}