import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication status
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '50vh',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '1.2em'
            }}>
                Checking authentication...
            </div>
        );
    }

    // Redirect to signin if not authenticated
    if (!isAuthenticated) {
        // Save the attempted location so we can redirect back after login
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // User is authenticated, render the protected component
    return children;
};

export default ProtectedRoute; 