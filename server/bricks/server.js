const getBricks = async (supabase) => {
    const { data: brick, error } = await supabase.from('brick').select('*');
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks: ${error.message}`);
    }
    console.log("Bricks fetched from Supabase:", brick);
    return brick;
}

const updateBrick = async (supabase, id, data) => {
    console.log("Updating brick:", id, data);
    const panel = id.split('-')[0];
    const row = id.split('-')[1];
    const col = id.split('-')[2];
    const { data: brick, error } = await supabase.from('brick').update(data).eq('Panel_Number', panel).eq('Row_Number', row).eq('Col_Number', col);
    if (error) {
        console.error(error);
        throw new Error(`Failed to update brick: ${error.message}`);
    }
    return brick;
}

export { getBricks, updateBrick };