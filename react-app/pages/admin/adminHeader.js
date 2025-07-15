import { useAuth } from '../../contexts/AuthContext.js';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/admin.css';

export default function AdminHeader({ page }) {
    const { signOut } = useAuth();
    const path = useLocation();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };
    
    return <div className="admin-header">
        <h1>{page}</h1> 
        <div className="admin-header-buttons">
            <Link to="/admin/dashboard" className={`headerButton ${path.pathname === "/admin/dashboard" ? "activeNav" : ""}`}>Dashboard</Link>
            <Link to="/admin/create-brick" className={`headerButton ${path.pathname === "/admin/create-brick" ? "activeNav" : ""}`}>Create Brick</Link>
            <Link to="/admin/requests" className={`headerButton ${path.pathname === "/admin/requests" ? "activeNav" : ""}`}>Requests</Link>
            <button onClick={handleSignOut} className="headerButton">
                Sign Out
            </button>
        </div>
    </div>
}