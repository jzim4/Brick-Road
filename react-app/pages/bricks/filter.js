/*
 Centralized filtering helpers for bricks by highlight input.
*/

export const SECTIONS = [
    "Centenarian",
    "Heroes",
    "Golden Women",
    "Family/Friends",
    "Businesses/Organizations"
];

export function matchesHighlight(brick, highlight) {
    if (!highlight || highlight === "all") return true;
    if (SECTIONS.includes(highlight)) {
        return brick.Paver_Assigned_Section === highlight;
    }

    const normalizeWhitespace = (value) => (value || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const normalizedHighlight = normalizeWhitespace(highlight);
    if (!normalizedHighlight) return true;

    const purchaserMatch = normalizeWhitespace(brick.Purchaser_Name)
        .includes(normalizedHighlight);

    const inscriptionCombined = normalizeWhitespace([
        brick.Inscription_Line_1,
        brick.Inscription_Line_2,
        brick.Inscription_Line_3
    ].filter(Boolean).join(" "));

    return purchaserMatch || inscriptionCombined.includes(normalizedHighlight);
}

export function filterBricks(bricks, highlight) {
    if (!Array.isArray(bricks)) return [];
    if (!highlight || highlight === "all") return bricks;
    return bricks.filter(brick => matchesHighlight(brick, highlight));
}


