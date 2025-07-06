import { useAuth } from '../../contexts/AuthContext.js';
import React from 'react';


export default function AdminHeader() {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
    };
    
    return <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user?.email} </span>
                        <button onClick={handleSignOut} className="sign-out-button">
                            Sign Out
                        </button>
                    </div>
                </div>
}