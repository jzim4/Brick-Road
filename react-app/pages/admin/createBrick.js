import AdminHeader from './adminHeader.js';
import Layout from '../layout.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateBrick() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [brickData, setBrickData] = useState({
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
    const [validationError, setValidationError] = useState([]);

    const handleInputChange = (field, value) => {
        setBrickData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateBrick = async () => {
        setValidationError([]);
        setIsSuccess(null);

        if (!brickData.Inscription_Line_1.trim()) {
            setValidationError(['Inscription Line 1 is required.']);
        }
        const brickLocations = await axios.get(`${serverUrl}/brick-locations`);
        const exists = brickLocations.data.some(loc =>
            String(loc.Panel_Number) === String(brickData.Panel_Number) &&
            String(loc.Row_Number) === String(brickData.Row_Number) &&
            String(loc.Col_Number) === String(brickData.Col_Number)
        );
        if (exists) {
            setValidationError([...validationError, `A brick already exists at this location (Panel ${brickData.Panel_Number}, Row ${brickData.Row_Number}, Col ${brickData.Col_Number}).`]);
        }
        if (validationError.length > 0) {
            return;
        }

        setIsSaving(true);
        try {
            // TODO: Link this to the backend to create the brick
            console.log("Creating brick with data:", brickData);
            // This is where you would make your API call, e.g.:
            // await axios.post('/api/bricks', brickData);  
            await axios.post(`${serverUrl}/create-brick`, { data: brickData });
            setIsSuccess(true);
            setBrickData({
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
        } catch (error) {
            console.error('Create error:', error);
            setIsSuccess(false);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Layout>
            <div className="admin-container">
                <AdminHeader page="Create Brick" />
                <div className="admin-content">
                    {validationError.length > 0 && (
                        <div className="error-message">
                            <ul>
                                {validationError.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {isSuccess === true && (
                        <div className="success-message">
                            <h3>Brick created successfully</h3>
                        </div>
                    )}

                    {isSuccess === false && (
                        <div className="error-message">
                            <h3>Failed to create brick</h3>
                        </div>
                    )}

                    <div className="admin-section">
                        <div className="edit-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Naming Year:</label>
                                    <input
                                        type="text"
                                        value={brickData.Naming_Year}
                                        onChange={(e) => handleInputChange('Naming_Year', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Panel Number:</label>
                                    <input
                                        type="number"
                                        value={brickData.Panel_Number}
                                        onChange={(e) => handleInputChange('Panel_Number', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Column Number:</label>
                                    <input
                                        type="number"
                                        value={brickData.Col_Number}
                                        onChange={(e) => handleInputChange('Col_Number', e.target.value)}
                                        min="0"
                                        max="9"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Row Number:</label>
                                    <input
                                        type="number"
                                        value={brickData.Row_Number}
                                        onChange={(e) => handleInputChange('Row_Number', e.target.value)}
                                        min="1"
                                        max="15"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Inscription Line 1: <span className="required">(required)</span></label>
                                <input
                                    type="text"
                                    value={brickData.Inscription_Line_1}
                                    onChange={(e) => handleInputChange('Inscription_Line_1', e.target.value)}
                                    maxLength="20"
                                />
                            </div>

                            <div className="form-group">
                                <label>Inscription Line 2:</label>
                                <input
                                    type="text"
                                    value={brickData.Inscription_Line_2}
                                    onChange={(e) => handleInputChange('Inscription_Line_2', e.target.value)}
                                    maxLength="20"
                                />
                            </div>

                            <div className="form-group">
                                <label>Inscription Line 3:</label>
                                <input
                                    type="text"
                                    value={brickData.Inscription_Line_3}
                                    onChange={(e) => handleInputChange('Inscription_Line_3', e.target.value)}
                                    maxLength="20"
                                />
                            </div>

                            <div className="form-group">
                                <label>Purchaser Name:</label>
                                <input
                                    type="text"
                                    value={brickData.Purchaser_Name}
                                    onChange={(e) => handleInputChange('Purchaser_Name', e.target.value)}
                                 />
                            </div>

                            <div className="form-group">
                                <label>Section:</label>
                                <select
                                    value={brickData.Paver_Assigned_Section}
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
                                    onClick={handleCreateBrick}
                                    disabled={isSaving}
                                    className="save-button"
                                >
                                    {isSaving ? 'Creating...' : 'Create Brick'}
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
                </div>
            </div>
        </Layout>
    );
}