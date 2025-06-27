import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

const getBricks = async () => {
    const { data: brick, error } = await supabase.from('brick').select('*');
    if (error) {
        console.error(error);
        return [];
    }
    console.log("Bricks fetched from Supabase:", brick);
    return brick;
}

export { getBricks };