import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lzfktclkqtxqzrlsldja.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Zmt0Y2xrcXR4cXpybHNsZGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDc2NDAsImV4cCI6MjA2NjUyMzY0MH0.KhrS4xDVBb4x-c4aRaJg2EmEKYl_p8-yZlKlSVPUa1A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
