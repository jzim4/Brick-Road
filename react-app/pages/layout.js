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
            <Link className={"headerButton " + (location.pathname == "/" ? "activeNav" : "")} to={"/"}>Home</Link>
            <Link to={"/about"} className={"headerButton " + (location.pathname == "/about" ? "activeNav" : "")}>About</Link>
            <Link to={"/report"} className={"headerButton " + (location.pathname == "/report" ? "activeNav" : "")}>Report an Error</Link>
            
            {isAuthenticated ? (
                <>
                    <Link to={"/admin/dashboard"} className={"headerButton " + (location.pathname.includes("/admin/dashboard") ? "activeNav" : "")}>Dashboard</Link>
                    <span className="headerButton user-info">
                        {user?.email}
                    </span>
                    <button onClick={handleSignOut} className="headerButton sign-out">
                        Sign Out
                    </button>
                </>
            ) : (
                <Link to={"/admin/signin"} className={"headerButton " + (location.pathname.includes("/admin/signin") ? "activeNav" : "")}>Admin</Link>
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