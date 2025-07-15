export async function saveReport(supabase, purchaserName, reporterEmail, panel, errorExplanation, comment) {
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

export async function getReports(supabase) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    console.log(user);

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const { data: reports, error } = await supabase
        .from('report')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch reports: ${error.message}`);
    }
    return reports;
}