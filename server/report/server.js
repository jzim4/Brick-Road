import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveReport(purchaserName, reporterEmail, panel, errorExplanation, comment) {
    const { data, error } = await supabase
        .from('report')
        .insert([
            {
                purchaserName: purchaserName,
                reporterEmail: reporterEmail,
                panel: panel,
                errorExplanation: errorExplanation,
                comment: comment
            },
        ])

    if (error) {
        console.error("Supabase insert error:", error);
        console.error("Supabase insert data:", data);
        throw new Error(`Failed to save report bricks: ${error.message}`);
    }
    console.log("Report saved");
}