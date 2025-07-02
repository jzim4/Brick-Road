import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../layout.js";
import { useAuth } from "../../contexts/AuthContext.js";
import axios from "axios";

export default function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the page they were trying to visit, or default to dashboard
    const from = location.state?.from?.pathname || "/admin/dashboard";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateInput = (email, password) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Length validation
        if (email.length > 254) {
            throw new Error('Email address is too long');
        }
        
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        
        if (password.length > 128) {
            throw new Error('Password is too long');
        }
        
        // Basic security check - prevent obvious injection attempts
        const dangerousPatterns = [/'|"|;|--|\/\*|\*\/|xp_|sp_/i];
        if (dangerousPatterns.some(pattern => email.match(pattern) || password.match(pattern))) {
            throw new Error('Invalid characters detected');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
            // Client-side validation
            validateInput(formData.email, formData.password);
            
            console.log("Sign in attempted with:", { email: formData.email, password: "[REDACTED]" });
            
            // Sanitize email input
            const sanitizedData = {
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            };
            
            axios.post("http://localhost:8000/signin", sanitizedData)
                .then(res => {
                    console.log("Sign in response:", res.data);
                    if (res.data.success) {
                        // Store authentication data using the auth context
                        const success = signIn(res.data.user, res.data.session);
                        
                        if (success) {
                            console.log("Successfully authenticated, redirecting to:", from);
                            navigate(from, { replace: true });
                        } else {
                            alert("Error storing authentication data");
                        }
                    } else {
                        alert("Sign in failed: " + res.data.message);
                    }
                })
                .catch(err => {
                    console.log("Sign in error:", err);
                    const errorMessage = err.response?.data?.message || "Network error occurred";
                    alert("Sign in failed: " + errorMessage);
                });
        } catch (validationError) {
            alert("Validation error: " + validationError.message);
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
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="signin-button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
        </Layout>
    );
}