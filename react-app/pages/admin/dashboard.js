import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout.js';
import { useAuth } from '../../contexts/AuthContext.js';
import axios from 'axios';

export default function AdminDashboard() {
    const { user, signOut } = useAuth();
    const [bricks, setBricks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalBricks: 0,
        totalSections: 0,
        totalPurchasers: 0
    });

    useEffect(() => {
        // Fetch bricks data for admin overview
        axios.get("http://localhost:8000/bricks")
            .then(response => {
                const bricksData = response.data;
                setBricks(bricksData);
                
                // Calculate statistics
                const uniqueSections = new Set(bricksData.map(brick => brick.Paver_Assigned_Section));
                const uniquePurchasers = new Set(bricksData.map(brick => brick.Purchaser_Name));
                
                setStats({
                    totalBricks: bricksData.length,
                    totalSections: uniqueSections.size,
                    totalPurchasers: uniquePurchasers.size
                });
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSignOut = () => {
        signOut();
        // Navigation will be handled by the auth context
    };

    if (loading) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="loading">Loading dashboard...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="admin-container">
                    <div className="error">Error loading dashboard: {error}</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <div className="admin-user-info">
                        <span>Welcome, {user?.email}</span>
                        <button onClick={handleSignOut} className="sign-out-button">
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Bricks</h3>
                        <div className="stat-number">{stats.totalBricks}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Sections</h3>
                        <div className="stat-number">{stats.totalSections}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Purchasers</h3>
                        <div className="stat-number">{stats.totalPurchasers}</div>
                    </div>
                </div>

                <div className="admin-content">
                    <div className="admin-section">
                        <h2>Recent Bricks</h2>
                        <div className="bricks-table-container">
                            <table className="bricks-table">
                                <thead>
                                    <tr>
                                        <th>Panel</th>
                                        <th>Row</th>
                                        <th>Col</th>
                                        <th>Purchaser</th>
                                        <th>Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bricks.slice(0, 10).map((brick, index) => (
                                        <tr key={index}>
                                            <td>{brick.Panel_Number}</td>
                                            <td>{brick.Row_Number}</td>
                                            <td>{brick.Col_Number}</td>
                                            <td>{brick.Purchaser_Name}</td>
                                            <td>{brick.Paver_Assigned_Section}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="admin-actions">
                        <h2>Admin Actions</h2>
                        <div className="action-buttons">
                            <Link to="/admin/manage" className="action-button">
                                Manage Bricks
                            </Link>
                            <button className="action-button">
                                View Reports
                            </button>
                            <button className="action-button">
                                User Management
                            </button>
                            <button className="action-button">
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 