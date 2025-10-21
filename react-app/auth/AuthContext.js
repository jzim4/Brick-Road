// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Make sure this points to your client file

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session:', error);
      setUser(data.session?.user ?? null);
      setToken(data.session?.access_token ?? null);
      setLoading(false);
    };

    initAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setToken(session?.access_token ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
    setUser(data.user);
    setToken(data.session.access_token);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};