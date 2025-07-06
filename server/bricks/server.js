const getBricks = async (supabase) => {
    const { data: brick, error } = await supabase.from('brick').select('*');
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks: ${error.message}`);
    }
    console.log("Bricks fetched from Supabase:", brick);
    return brick;
}

export { getBricks };