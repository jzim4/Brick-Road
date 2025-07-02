import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const getBricks = async () => {
    const { data: brick, error } = await supabase.from('brick').select('*');
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks: ${error.message}`);
    }
    console.log("Bricks fetched from Supabase:", brick);
    return brick;
}

const getBricksBySection = async (section) => {
    // Input validation and sanitization
    if (!section || typeof section !== 'string') {
        throw new Error('Invalid section parameter');
    }
    
    // Sanitize input - remove potentially dangerous characters
    const sanitizedSection = section.replace(/[%_\\]/g, '\\$&');
    
    // Use Supabase's safe parameter binding
    const { data: brick, error } = await supabase
        .from('brick')
        .select('*')
        .ilike('Paver_Assigned_Section', `%${sanitizedSection}%`);
        
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks by section: ${error.message}`);
    }
    return brick;
}

const getBricksByPurchaser = async (purchaser) => {
    // Input validation
    if (!purchaser || typeof purchaser !== 'string') {
        throw new Error('Invalid purchaser parameter');
    }
    
    // Additional length check to prevent excessively long inputs
    if (purchaser.length > 100) {
        throw new Error('Purchaser name too long');
    }
    
    const { data: brick, error } = await supabase
        .from('brick')
        .select('*')
        .eq('Purchaser_Name', purchaser);
        
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks by purchaser: ${error.message}`);
    }
    return brick;
}

export { getBricks, getBricksBySection, getBricksByPurchaser };