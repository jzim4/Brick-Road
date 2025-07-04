import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);


export async function signInWithEmail(email, password) {
    try {
        // Input validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('Invalid input types');
        }
        
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        
        // Prevent excessively long inputs
        if (email.length > 254 || password.length > 128) {
            throw new Error('Input too long');
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password,
        });
        
        if (error) {
            throw error;
        }
        
        return {
            success: true,
            user: data.user,
            session: data.session
        };
    } catch (error) {
        console.error('Sign in error:', error);
        throw {
            success: false,
            message: error.message || 'Sign in failed'
        };
    }
}