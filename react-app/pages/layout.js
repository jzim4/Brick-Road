import React from "react";
import { Link, BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

export default function Layout({ children }) {
    return <>
        <Header />
        {children}
        <Footer />
    </>
}

function Header() {
    const { isAuthenticated, user, signOut } = useAuth();
    const location = useLocation();
    
    const handleSignOut = () => {
        signOut();
    };
    
    return <header>
        <h1 id="title">Rondo Commemorative Plaza</h1>
        <div id="navLinks">
            <Link className={"button-primary " + (location.pathname == "/" ? " activeNav" : "")} to={"/"}>Home</Link>
            <Link to={"/about"} className={"button-primary " + (location.pathname == "/about" ? " activeNav" : "")}>About</Link>
            <Link to={"/report"} className={"button-primary " + (location.pathname == "/report" ? " activeNav" : "")}>Report an Error</Link>
            
            {isAuthenticated ? (
                <>
                    <Link to={"/admin/dashboard"} className={"button-primary " + (location.pathname.includes("/admin") ? " activeNav" : "")}>Admin</Link>
                </>
            ) : (
                    <Link to={"/admin/signin"} className={"button-primary " + (location.pathname.includes("/admin") ? " activeNav" : "")}>Admin</Link>

            )}
        </div>
    </header>
}

function Footer() {
    return <footer>
        <div className="footerCol">
            <h2>Contact</h2>
            <p>Email: <a href="mailto:info@rondocommemorativeplaza.org">info@rondocommemorativeplaza.org</a></p>
            <p>Phone: <a href="tel:+1234567890">(218) 726-8666</a></p>
            <p>Address: 123 Main St, Minneapolis, MN 55403</p>
        </div>
    </footer>
}