/* 
Author: Jonah Zimmer

This single component holds the header
*/
import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

export default function Header() {

    console.log(useLocation().pathname);
    return <header>
        <h1 id="title">Rondo Commemorative Plaza</h1>
        <div id="navLinks">
            <Link className={"headerButton " + (useLocation().pathname == "/" ? "activeNav" : "")} to={"/"}>Home</Link>
            <Link to={"/about"} className={"headerButton " + (useLocation().pathname == "/about" ? "activeNav" : "")}>About</Link>
        </div>
    </header>
}