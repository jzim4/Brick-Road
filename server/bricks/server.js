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
    const { data: brick, error } = await supabase.from('brick').select('*').ilike('Paver_Assigned_Section', `%${section}%`);
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks by section: ${error.message}`);
    }
    return brick;
}

const getBricksByPurchaser = async (purchaser) => {
    const { data: brick, error } = await supabase.from('brick').select('*').eq('Purchaser_Name', purchaser);
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks by purchaser: ${error.message}`);
    }
    return brick;
}

export { getBricks, getBricksBySection, getBricksByPurchaser };