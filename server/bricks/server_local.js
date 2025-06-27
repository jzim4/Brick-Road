import bricks from './bricks.json' with { type: "json" };

export function getBricks() {
    return bricks;
}

export function getBricksBySection(section) {
    return bricks.filter(brick => brick.Paver_Assigned_Section === section);
}

export function getBricksByPurchaser(purchaser) {
    return bricks.filter(brick => brick.Purchaser_Name.toLowerCase().includes(purchaser.toLowerCase()));
}
