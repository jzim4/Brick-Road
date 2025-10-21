// src/utils/apiClient.js
import axios from 'axios';
import { supabase } from './supabaseClient';

// Create a new axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Attach token before each request
apiClient.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
