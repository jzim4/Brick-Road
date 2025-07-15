import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../layout.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useParams } from 'react-router-dom';
import AdminHeader from './adminHeader.js';

export default function ManageBricks() {
    const { panel, col, row } = useParams();
    const { user } = useAuth();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [dataLoading, setDataLoading] = useState(true);
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
    const [isSuccess, setIsSuccess] = useState(null);

    useEffect(() => {
        async function fetchBrick() {
            try {
                setDataLoading(true);
                const response = await axios.get(`${serverUrl}/brick`, {
                    params: {
                        Panel_Number: panel,
                        Col_Number: col,
                        Row_Number: row
                    }
                });

                const brick = response.data;

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
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setDataLoading(false);
            }
        }

        fetchBrick();
    }, [panel, row, col]);

    const handleInputChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveBrick = async () => {
        setIsSaving(true);
        try {
            const brickId = `${selectedBrick.Panel_Number}-${selectedBrick.Row_Number}-${selectedBrick.Col_Number}`;
            console.log("Edit form:", editForm);
            await axios.put(`${serverUrl}/bricks/${brickId}`, { data: editForm });
            // Optionally update state or show success message
        } catch (error) {
            console.error('Save error:', error);
            setIsSuccess(false);
        } finally {
            setIsSaving(false);
            setIsSuccess(true);
        }
    };

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
    };

    return (
        <Layout>
            <div className="admin-container">
                <AdminHeader
                page="Manage Bricks"
                />

                {isSuccess === true && (
                    <div className="success-message">
                        <h3>Brick updated successfully</h3>
                    </div>
                )}

                {isSuccess === false && (
                    <div className="error-message">
                        <h3>Failed to update brick</h3>
                    </div>
                )}

                {dataLoading && (
                    <div className="loading-message">
                        <h3>Loading brick data...</h3>
                    </div>
                )}

                {selectedBrick === null && !dataLoading && (
                    <div className="error-message">
                        <h3>Brick not found</h3>
                    </div>
                )}

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
                                    <label>Column Number:</label>
                                    <input
                                        type="number"
                                        value={editForm.Col_Number}
                                        onChange={(e) => handleInputChange('Col_Number', e.target.value)}
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
                                <Link
                                    to="/admin/dashboard"
                                    className="cancel-button"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
