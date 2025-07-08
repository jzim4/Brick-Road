import { useAuth } from '../../contexts/AuthContext.js';
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader({ page }) {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
    };
    
    return <div className="admin-header">
        <h1>{page}</h1> 
        <Link to="/admin/dashboard" className="admin-link">Return to Dashboard</Link>
        <div className="admin-user-info">
            <span>Welcome, {user?.email} </span>
            <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
            </button>
        </div>
    </div>
}