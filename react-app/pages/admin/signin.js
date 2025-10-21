import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../layout.js";
import { useAuth } from "../../auth/AuthContext.js";
import '../../styles/signin.css';
import {supabase} from '../../auth/supabaseClient.js';

export default function Signin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const { signIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin/dashboard";
    const [pendingRedirect, setPendingRedirect] = useState(null);

    console.log(formData.password);

    useEffect(() => {
        if (pendingRedirect && isAuthenticated) {
            navigate(pendingRedirect, { replace: true });
        }
    }, [pendingRedirect, isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateInput = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error('Please enter a valid email address');
        if (email.length > 254) throw new Error('Email address is too long');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long');
        if (password.length > 128) throw new Error('Password is too long');
        const dangerousPatterns = [/'|"|;|--|\/\*|\*\/|xp_|sp_/i];
        if (dangerousPatterns.some(pattern => email.match(pattern) || password.match(pattern))) {
            throw new Error('Invalid characters detected');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        try {
            validateInput(formData.email, formData.password);

            setSubmitting(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            });

            if (error) {
                alert("Sign in failed: " + error.message);
                console.error(error);
            } else {
                signIn(null, data.session); // store the session in auth context
                setPendingRedirect(from);
            }
        } catch (validationError) {
            alert("Validation error: " + validationError.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="signin-container">
                <div className="signin-form">
                    <h1>Admin Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="on"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="signin-button" disabled={submitting} aria-busy={submitting}>
                            {submitting ? "Signing in…" : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
