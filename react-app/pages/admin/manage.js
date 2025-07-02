import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout.js';
import { useAuth } from '../../contexts/AuthContext.js';

export default function ManageBricks() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedBrick, setSelectedBrick] = useState(null);
    const [editForm, setEditForm] = useState({
        Naming_Year: '',
        Panel_Number: '',
        Row_Number: '',
        Col_Number: '',
        Inscription_Line_1: '',
        Inscription_Line_2: '',
        Inscription_Line_3: '',
        Purchaser_Name: '',
        Paver_Assigned_Section: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Search for bricks
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setMessage('Please enter a search query');
            return;
        }

        setIsSearching(true);
        setMessage('');
        
        try {
            const response = await axios.get(`http://localhost:8000/bricks/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchResults(response.data);
            setMessage(`Found ${response.data.length} brick(s) matching "${searchQuery}"`);
        } catch (error) {
            console.error('Search error:', error);
            setMessage('Error searching for bricks. Please try again.');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Select a brick for editing
    const handleSelectBrick = (brick) => {
        setSelectedBrick(brick);
        setEditForm({
            Naming_Year: brick.Naming_Year || '',
            Panel_Number: brick.Panel_Number || '',
            Row_Number: brick.Row_Number || '',
            Col_Number: brick.Col_Number || '',
            Inscription_Line_1: brick.Inscription_Line_1 || '',
            Inscription_Line_2: brick.Inscription_Line_2 || '',
            Inscription_Line_3: brick.Inscription_Line_3 || '',
            Purchaser_Name: brick.Purchaser_Name || '',
            Paver_Assigned_Section: brick.Paver_Assigned_Section || ''
        });
        setMessage('');
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Save brick changes
    const handleSaveBrick = async () => {
        setIsSaving(true);
        setMessage('');

        try {
            // Create a unique identifier for the brick (combination of panel, row, col)
            const brickId = `${selectedBrick.Panel_Number}-${selectedBrick.Row_Number}-${selectedBrick.Col_Number}`;
            
            const response = await axios.put(`http://localhost:8000/bricks/${brickId}`, editForm);
            
            setMessage('Brick updated successfully!');
            
            // Update the search results to reflect the changes
            setSearchResults(prev => 
                prev.map(brick => 
                    brick.Panel_Number === selectedBrick.Panel_Number &&
                    brick.Row_Number === selectedBrick.Row_Number &&
                    brick.Col_Number === selectedBrick.Col_Number
                        ? { ...brick, ...editForm }
                        : brick
                )
            );
            
            // Clear selection after successful save
            setTimeout(() => {
                setSelectedBrick(null);
                setEditForm({
                    Naming_Year: '',
                    Panel_Number: '',
                    Row_Number: '',
                    Col_Number: '',
                    Inscription_Line_1: '',
                    Inscription_Line_2: '',
                    Inscription_Line_3: '',
                    Purchaser_Name: '',
                    Paver_Assigned_Section: ''
                });
            }, 2000);
            
        } catch (error) {
            console.error('Save error:', error);
            setMessage('Error saving brick. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setSelectedBrick(null);
        setEditForm({
            Naming_Year: '',
            Panel_Number: '',
            Row_Number: '',
            Col_Number: '',
            Inscription_Line_1: '',
            Inscription_Line_2: '',
            Inscription_Line_3: '',
            Purchaser_Name: '',
            Paver_Assigned_Section: ''
        });
        setMessage('');
    };

    // Handle Enter key in search input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Layout>
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Manage Bricks</h1>
                    <div className="admin-user-info">
                        <span>Logged in as: {user?.email}</span>
                    </div>
                </div>

                <div className="admin-content">
                    {/* Search Section */}
                    <div className="admin-section">
                        <h2>Search for Existing Bricks</h2>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by purchaser name or inscription text..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="search-input"
                            />
                            <button 
                                onClick={handleSearch} 
                                disabled={isSearching}
                                className="search-button"
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                        
                        {message && (
                            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                                {message}
                            </div>
                        )}
                    </div>

                    {/* Search Results Section */}
                    {searchResults.length > 0 && (
                        <div className="admin-section">
                            <h3>Search Results</h3>
                            <div className="brick-list">
                                {searchResults.map((brick, index) => (
                                    <div key={index} className="brick-item">
                                        <div className="brick-preview">
                                            <div className="brick-inscription">
                                                <div>{brick.Inscription_Line_1}</div>
                                                <div>{brick.Inscription_Line_2}</div>
                                                <div>{brick.Inscription_Line_3}</div>
                                            </div>
                                        </div>
                                        <div className="brick-details">
                                            <p><strong>Purchaser:</strong> {brick.Purchaser_Name}</p>
                                            <p><strong>Year:</strong> {brick.Naming_Year}</p>
                                            <p><strong>Location:</strong> Panel {brick.Panel_Number}, Row {brick.Row_Number}, Col {brick.Col_Number}</p>
                                            <p><strong>Section:</strong> {brick.Paver_Assigned_Section || 'None'}</p>
                                        </div>
                                        <div className="brick-actions">
                                            <button 
                                                onClick={() => handleSelectBrick(brick)}
                                                className="edit-button"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Edit Form Section */}
                    {selectedBrick && (
                        <div className="admin-section">
                            <h3>Edit Brick</h3>
                            <div className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Naming Year:</label>
                                        <input
                                            type="text"
                                            value={editForm.Naming_Year}
                                            onChange={(e) => handleInputChange('Naming_Year', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Panel Number:</label>
                                        <input
                                            type="number"
                                            value={editForm.Panel_Number}
                                            onChange={(e) => handleInputChange('Panel_Number', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Row Number:</label>
                                        <input
                                            type="number"
                                            value={editForm.Row_Number}
                                            onChange={(e) => handleInputChange('Row_Number', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Column Number:</label>
                                        <input
                                            type="number"
                                            value={editForm.Col_Number}
                                            onChange={(e) => handleInputChange('Col_Number', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Inscription Line 1:</label>
                                    <input
                                        type="text"
                                        value={editForm.Inscription_Line_1}
                                        onChange={(e) => handleInputChange('Inscription_Line_1', e.target.value)}
                                        maxLength="20"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Inscription Line 2:</label>
                                    <input
                                        type="text"
                                        value={editForm.Inscription_Line_2}
                                        onChange={(e) => handleInputChange('Inscription_Line_2', e.target.value)}
                                        maxLength="20"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Inscription Line 3:</label>
                                    <input
                                        type="text"
                                        value={editForm.Inscription_Line_3}
                                        onChange={(e) => handleInputChange('Inscription_Line_3', e.target.value)}
                                        maxLength="20"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Purchaser Name:</label>
                                    <input
                                        type="text"
                                        value={editForm.Purchaser_Name}
                                        onChange={(e) => handleInputChange('Purchaser_Name', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Section:</label>
                                    <select
                                        value={editForm.Paver_Assigned_Section}
                                        onChange={(e) => handleInputChange('Paver_Assigned_Section', e.target.value)}
                                    >
                                        <option value="">None</option>
                                        <option value="Centenarian">Centenarian</option>
                                        <option value="Heroes">Heroes</option>
                                        <option value="Golden Women">Golden Women</option>
                                        <option value="Family/Friends">Family/Friends</option>
                                        <option value="Businesses/Organizations">Businesses/Organizations</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button 
                                        onClick={handleSaveBrick}
                                        disabled={isSaving}
                                        className="save-button"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button 
                                        onClick={handleCancelEdit}
                                        className="cancel-button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Original Action Buttons */}
                    <div className="admin-section">
                        <h2>Other Actions</h2>
                        <div className="action-buttons">
                            <button className="action-button">Add New Brick</button>
                            <button className="action-button">Import Bricks</button>
                            <button className="action-button">Export Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 