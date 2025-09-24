/* 
Author: Jonah Zimmer

This is the static version of the site which does not have the scrolling bricks, 
making it accessible for screen readers and phone compatible.
*/
import React, { useState, useMemo } from 'react';
import '../../../styles/listDisplay.css';

export default function ListContent({ bricks, setCurrentBrick, loading }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [bricksPerPage, setBricksPerPage] = useState(25);

    const handleBrickClick = (brick) => {
        console.log("brick in static", brick);
        setCurrentBrick(brick);
    };

    // ✅ filter invalid bricks first
    const validBricks = useMemo(() => {
        return bricks.filter(
            b => typeof b.Panel_Number === "number" &&
                typeof b.Row_Number === "number" &&
                typeof b.Col_Number === "number"
        );
    }, [bricks]);

    // ✅ sort once (memoized)
    const sortedBricks = useMemo(() => {
        return [...validBricks].sort((a, b) => {
            if (a.Panel_Number === b.Panel_Number) {
                if (a.Col_Number === b.Col_Number) {
                    return a.Row_Number - b.Row_Number;
                }
                return a.Col_Number - b.Col_Number;
            }
            return a.Panel_Number - b.Panel_Number;
        });
    }, [validBricks]);

    // ✅ pagination calculations
    const totalPages = Math.ceil(sortedBricks.length / bricksPerPage);
    const safePage = Math.min(currentPage, totalPages || 1); // avoid page 0
    const startIndex = (safePage - 1) * bricksPerPage;
    const endIndex = startIndex + bricksPerPage;
    const currentBricks = sortedBricks.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePerPageChange = (e) => {
        setBricksPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page when per-page changes
    };

    if (loading) {
        return <div className="loading-container"><div className="loader"></div></div>;
    }

    return (
        <div>
            {/* Bricks */}
            <div id="accessibleBricksContainer">
                {currentBricks.map((brick) => (
                    <Brick
                        brick={brick}
                        onClick={() => handleBrickClick(brick)}
                        key={`p${brick.Panel_Number}r${brick.Row_Number}c${brick.Col_Number}`}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="pagination-controls">
                <label>
                    Bricks per page:
                    <select value={bricksPerPage} onChange={handlePerPageChange}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
            </div>

            {/* Pagination buttons */}
            <div className="pagination-buttons">
    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        First
    </button>

    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
    </button>

    <span className="page-info">
        Page {currentPage} of {totalPages}
    </span>

    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
    </button>

    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
        Last
    </button>
</div>


        </div>
    );
}

function Brick({ brick, onClick }) {
    return (
        <div className="accessibleBrickContainer" onClick={onClick}>
            <div className="accessibleBrick">
                {brick.Inscription_Line_1 && <p>{brick.Inscription_Line_1}</p>}
                {brick.Inscription_Line_2 && <p>{brick.Inscription_Line_2}</p>}
                {brick.Inscription_Line_3 && <p>{brick.Inscription_Line_3}</p>}
            </div>
        </div>
    );
}
function Pagination({ totalPages, currentPage, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // how many numbers to show around current

        if (totalPages <= maxVisible + 2) {
            // show all if only a few pages
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("…");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("…");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination-buttons">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {getPageNumbers().map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="ellipsis">…</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={currentPage === p ? "active" : ""}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
