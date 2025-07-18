import React from "react";
import { Link, BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

export default function Layout({ children }) {
    return <div className="page-container">
        <Header />
        {children}
        <Footer />
    </div>
}

function Header() {
    const { isAuthenticated, user, signOut } = useAuth();
    const location = useLocation();
    const [isNavVisible, setIsNavVisible] = React.useState(false);
    
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };
    
    return <header>
        <h1 id="title">Rondo Commemorative Plaza</h1>
        <button id="hamburger-menu" onClick={toggleNav}>
            &#9776;
        </button>
        <div id="navLinks" className={isNavVisible ? "show-nav" : ""}>
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
        <div className="footer-content">
            <div className="footer-section">
                <h3>Rondo Commemorative Plaza</h3>
                <p>Honoring the legacy of the Rondo community and preserving its rich history for future generations.</p>
            </div>
            
            <div className="footer-section">
                <h3>Contact Information</h3>
                <div className="contact-item">
                    <strong>Email:</strong> <a href="mailto:email@sample.com">email@sample.com</a>
                </div>
                <div className="contact-item">
                    <strong>Phone:</strong> <a href="tel:+1234567890">(123)-456-7890</a>
                </div>
                <div className="contact-item">
                    <strong>Address:</strong> 123 Address St, City, State 12345
                </div>
            </div>
            
            <div className="footer-section">
                <h3>Hours</h3>
                <div className="hours-item">
                    <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM
                </div>
                <div className="hours-item">
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                </div>
                <div className="hours-item">
                    <strong>Sunday:</strong> Closed
                </div>
            </div>
        </div>
        
        <div className="footer-bottom">
            <p>2025 Rondo Commemorative Plaza.</p>
        </div>
    </footer>
}