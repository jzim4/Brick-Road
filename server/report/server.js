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
    const { data: reports, error } = await supabase
        .from('report')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch reports: ${error.message}`);
    }
    return reports;
}

export async function updateReport(supabase, reportId, isFixed) {
    const { data, error } = await supabase
        .from('report')
        .update({ isFixed: isFixed })
        .eq('id', reportId)
        .select('*')

    if (error) {
        console.error("Supabase update error:", error);
        throw new Error(`Failed to update report: ${error.message}`);
    }
    if (data.length == 0) {
        throw new Error("Report not found");
    }
    console.log("Report updated:", data);
    return data;
}