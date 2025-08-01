import "../../styles/viewToggle.css";
import React from 'react';

export default function ViewToggle({ viewMode, setViewMode }) {
    return (
        <div id="displayToggle" className="toggle-switch">
            <button
                className={`toggle-option ${viewMode === 'scroll' ? 'active' : ''}`}
                onClick={() => setViewMode('scroll')}
            >
                Path View
            </button>
            <button
                className={`toggle-option ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
            >
                List View
            </button>
        </div>
    )
}