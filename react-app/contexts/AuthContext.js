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
                const storedUser = localStorage.getItem('authUser');
                const storedSession = localStorage.getItem('authSession');
                
                if (storedUser && storedSession) {
                    const userData = JSON.parse(storedUser);
                    const sessionData = JSON.parse(storedSession);
                    
                    // Check if session is still valid (not expired)
                    const sessionExpiry = new Date(sessionData.expires_at);
                    const now = new Date();
                    
                    if (sessionExpiry > now) {
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        // Session expired, clear storage
                        localStorage.removeItem('authUser');
                        localStorage.removeItem('authSession');
                    }
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                // Clear potentially corrupted data
                localStorage.removeItem('authUser');
                localStorage.removeItem('authSession');
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Sign in function
    const signIn = (userData, sessionData) => {
        try {
            setUser(userData);
            setIsAuthenticated(true);
            
            // Store authentication data in localStorage
            localStorage.setItem('authUser', JSON.stringify(userData));
            localStorage.setItem('authSession', JSON.stringify(sessionData));
            
            return true;
        } catch (error) {
            console.error('Error storing auth data:', error);
            return false;
        }
    };

    // Sign out function
    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
        
        // Clear stored authentication data
        localStorage.removeItem('authUser');
        localStorage.removeItem('authSession');
    };

    // Get current session from storage
    const getSession = () => {
        try {
            const storedSession = localStorage.getItem('authSession');
            return storedSession ? JSON.parse(storedSession) : null;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        signIn,
        signOut,
        getSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 