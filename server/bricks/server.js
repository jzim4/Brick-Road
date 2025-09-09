const getBricks = async (supabase) => {
    const { data: brick, error } = await supabase.from('brick').select('*');
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch bricks: ${error.message}`);
    }
    return brick;
}

const updateBrick = async (supabase, id, data) => {
    console.log("Updating brick:", id, data);
    const { data: brick, error } = await supabase.from('brick').update(data).eq('id', id);
    if (error) {
        console.error(error);
        throw new Error(`Failed to update brick: ${error.message}`);
    }
    return brick;
}

const deleteBrick = async (supabase, id) => {
    const { error } = await supabase.from('brick').delete().eq('id', id);
    if (error) {
        console.error(error);
        throw new Error(`Failed to delete brick: ${error.message}`);
    }
    return id;
}

const createBrick = async (supabase, data) => {
    console.log("Creating brick:", data);
    const { data: brick, error } = await supabase.from('brick').insert(data);
    if (error) {
        console.error(error);
        throw new Error(`Failed to create brick: ${error.message}`);
    }
    return brick;
}

const getBrickLocations = async (supabase) => {
    const { data: brickLocations, error } = await supabase.from('brick').select('Panel_Number, Row_Number, Col_Number');
    if (error) {
        console.error(error);
        throw new Error(`Failed to fetch brick locations: ${error.message}`);
    }
    return brickLocations;
}

export { getBricks, updateBrick, deleteBrick, createBrick, getBrickLocations };