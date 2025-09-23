import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../../utils/apiClient';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useParams } from 'react-router-dom';
import AdminHeader from './adminHeader.js';

export default function ManageBricks() {
    const { panel, col, row } = useParams();
    const { user, getToken } = useAuth();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();

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
    const [validationError, setValidationError] = useState([]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmationName, setDeleteConfirmationName] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

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
        setValidationError([]);
        setIsSuccess(null);
        let errors = [];

        if (!editForm.Inscription_Line_1.trim()) {
            errors.push('Inscription Line 1 is required.');
        }

        const locationChanged =
            String(editForm.Panel_Number) !== String(selectedBrick.Panel_Number) ||
            String(editForm.Row_Number) !== String(selectedBrick.Row_Number) ||
            String(editForm.Col_Number) !== String(selectedBrick.Col_Number);

        if (locationChanged) {
            try {
                const brickLocations = await axios.get(`${serverUrl}/brick-locations`);
                const exists = brickLocations.data.some(loc =>
                    String(loc.Panel_Number) === String(editForm.Panel_Number) &&
                    String(loc.Row_Number) === String(editForm.Row_Number) &&
                    String(loc.Col_Number) === String(editForm.Col_Number)
                );
                if (exists) {
                    errors.push(`A brick already exists at this location (Panel ${editForm.Panel_Number}, Row ${editForm.Row_Number}, Col ${editForm.Col_Number}).`);
                }
            } catch (error) {
                console.error('Error fetching brick locations:', error);
                errors.push('Could not validate brick location. Please try again.');
            }
        }

        console.log(errors);

        if (errors.length > 0) {
            setValidationError(errors);
            return;
        }

        setIsSaving(true);
        try {
            const brickId = selectedBrick.id;
            console.log("Edit form:", editForm);
            await apiClient.put(`/bricks/${brickId}`, { data: editForm });
            setIsSuccess(true);
        } catch (error) {
            console.error('Save error:', error);
            setIsSuccess(false);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteBrick = async () => {
        if (deleteConfirmationName !== selectedBrick.Purchaser_Name) {
            setDeleteError("Purchaser's name does not match.");
            return;
        }

        setDeleteError(null);
        setIsDeleting(true);

        try {
            const brickId = selectedBrick.id;
            // debug: log token presence
            try {
                const t = getToken && typeof getToken === 'function' ? getToken() : null;
                console.debug('Deleting brick, client token present:', !!t);
                console.debug('LocalStorage authToken:', localStorage.getItem('authToken') ? '[present]' : '[missing]');
            } catch (e) {}
            await apiClient.delete(`/bricks/${brickId}`);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Delete error:', error);
            setDeleteError('Failed to delete brick.');
            setIsDeleting(false);
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
                                    <label>Panel Number: <span className="subText">(-1 - 20ish)</span></label>
                                    <input
                                        type="number"
                                        value={editForm.Panel_Number}
                                        onChange={(e) => handleInputChange('Panel_Number', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Column Number: <span className="subText">(0 - 9)</span></label>
                                    <input
                                        type="number"
                                        value={editForm.Col_Number}
                                        onChange={(e) => handleInputChange('Col_Number', e.target.value)}
                                        min="0"
                                        max="9"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Row Number: <span className="subText">(1 - 15)</span></label>
                                    <input
                                        type="number"
                                        value={editForm.Row_Number}
                                        onChange={(e) => handleInputChange('Row_Number', e.target.value)}
                                        min="1"
                                        max="15"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Inscription Line 1: <span className="subText">(required)</span></label>
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
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="delete-button"
                                    disabled={isSaving}
                                >
                                    Delete Brick
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

                {isDeleteModalOpen && selectedBrick && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Confirm Deletion</h3>
                            <p>To delete this brick, please type the purchaser's name,  
                            <strong> {selectedBrick.Purchaser_Name}</strong>,
                             to confirm.</p>
                            
                            <div className="form-group">
                                <label>Purchaser Name:</label>
                                <input
                                    type="text"
                                    value={deleteConfirmationName}
                                    onChange={(e) => setDeleteConfirmationName(e.target.value)}
                                    placeholder="Enter purchaser's name"
                                />
                            </div>
                            {deleteError && <p className="error-message">{deleteError}</p>}
                            <div className="modal-actions">
                                <button
                                    onClick={handleDeleteBrick}
                                    disabled={isDeleting}
                                    className="delete-button"
                                >
                                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setDeleteConfirmationName('');
                                        setDeleteError(null);
                                    }}
                                    className="cancel-button"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
