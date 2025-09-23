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
    const [pendingSignIn, setPendingSignIn] = useState(false);

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

    // No global event wiring — keep auth simple and local.
    // Listen for global signout events (dispatched by authHelpers.handleAuthError)
    useEffect(() => {
        const handler = () => {
            setUser(null);
            setIsAuthenticated(false);
        };
        if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            window.addEventListener('app:signout', handler);
        }
        return () => {
            if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
                window.removeEventListener('app:signout', handler);
            }
        };
    }, []);

    // Sign in function
    const signIn = (userData, sessionData) => {
        try {
            setPendingSignIn(true);
            // Only store the access token and its expiry
            const accessToken = sessionData?.access_token;
            let expiresAt = sessionData?.expires_at; // Could be epoch seconds or ISO string

            if (!accessToken || !expiresAt) {
                throw new Error('Invalid session data');
            }

            // If expiresAt is a string and not a number, try to parse as ISO, else as epoch seconds
            let expiryDate;
            if (typeof expiresAt === 'number') {
                expiryDate = new Date(expiresAt * 1000);
            } else if (!isNaN(Number(expiresAt))) {
                expiryDate = new Date(Number(expiresAt) * 1000);
            } else {
                expiryDate = new Date(expiresAt);
            }

            // If expiry is invalid or in the past, fail sign-in
            if (!(expiryDate instanceof Date) || isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
                throw new Error('Session expiry is invalid or expired');
            }

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('authTokenExpiry', expiryDate.toISOString());


            setUser(null); // We are not persisting user client-side
            setIsAuthenticated(true);
            setPendingSignIn(false);
            return true;
        } catch (error) {
                setPendingSignIn(false);
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
    // keep it simple: local clear only
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
    pendingSignIn,
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