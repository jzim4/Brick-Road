import React from 'react';
import Header from './header.js';

export default function About() {
    return <>
    <Header />
    <h2>About</h2>
    <TheSite />
    </>
}

function TheSite() {
    return <div className="aboutComponent">
        <h3 className="aboutHeader">How to Navigate the Site</h3>

    </div>
}

function OtherStuff() {
    
}