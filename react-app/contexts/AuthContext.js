import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing authentication on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const token = localStorage.getItem('authToken');
                const tokenExpiryRaw = localStorage.getItem('authTokenExpiry');

                if (token && tokenExpiryRaw) {
                    const expiryDate = new Date(tokenExpiryRaw);
                    const now = new Date();

                    if (expiryDate > now) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('authTokenExpiry');
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('authTokenExpiry');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Sign in function
    const signIn = (userData, sessionData) => {
        try {
            // Only store the access token and its expiry
            const accessToken = sessionData?.access_token;
            const expiresAt = sessionData?.expires_at; // Could be epoch seconds or ISO string

            if (!accessToken || !expiresAt) {
                throw new Error('Invalid session data');
            }

            const expiryDate = typeof expiresAt === 'number'
                ? new Date(expiresAt * 1000)
                : new Date(expiresAt);

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('authTokenExpiry', expiryDate.toISOString());

            setUser(null); // We are not persisting user client-side
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Error storing auth token:', error);
            return false;
        }
    };

    // Sign out function
    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        
        // Clear stored authentication token
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiry');
    };

    // Get current session from storage
    const getToken = () => {
        try {
            const token = localStorage.getItem('authToken');
            const expiry = localStorage.getItem('authTokenExpiry');
            if (!token || !expiry) return null;
            if (new Date(expiry) <= new Date()) return null;
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        signIn,
        signOut,
        getToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 