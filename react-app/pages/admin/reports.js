import React, { useEffect, useState } from "react"
import AdminHeader from "./adminHeader"
import Layout from "../layout"
import axios from "axios";
import apiClient from '../../utils/apiClient';
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
const ReportModal = ({ report, onClose, onUpdate }) => {
    if (!report) return null;

    const [isFixed, setIsFixed] = useState(report.isFixed);

    const handleUpdate = () => {
        onUpdate({ ...report, isFixed });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Report Details</h2>
                <p><strong>Purchaser:</strong> {report.purchaserName}</p>
                <p><strong>Email:</strong> {report.reporterEmail}</p>
                <p><strong>Panel:</strong> {report.panel}</p>
                <p><strong>Message:</strong> {report.errorExplanation}</p>
                <p><strong>Comment:</strong> {report.comment}</p>
                <div className="toggle-switch-container" style={{ margin: "10px 0", justifyContent: 'flex-start' }}>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isFixed}
                            onChange={(e) => setIsFixed(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span>Addressed</span>
                </div>
                <button className="save-button" onClick={handleUpdate}>Update</button>
                <button className="cancel-button" onClick={onClose} style={{ marginLeft: "10px" }}>Close</button>
            </div>
        </div>
    );
};


export default function Reports() {
    const navigate = useNavigate();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getToken } = useAuth();
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showAddressed, setShowAddressed] = useState(true);

    useEffect(() => {
        apiClient.get('/reports')
            .then(response => {
                const reports = response.data.map((r, index) => ({...r, id: r.id || index}));
                setReports(reports);
                console.log(reports);
            })
            .catch(err => {
                if (err.isAuthError || err?.response?.status === 401) {
                    // Central handler will clear token and redirect; stop further handling here
                    return;
                }
                setError(err.message || 'Failed to load reports');
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const handleUpdateReport = (updatedReport) => {
        console.log("Updating report:", updatedReport);
        apiClient.put(`/update-report/${updatedReport.id}`, { isFixed: updatedReport.isFixed })
            .catch((err) => {
                if (err.isAuthError || err?.response?.status === 401) {
                    return Promise.reject(err);
                }
                return Promise.reject(err);
            })
            .then((response) => {
                console.log("Response:", response);
                const updatedFromServer = response.data[0];
                setReports(reports.map(r => (r.id === updatedFromServer.id ? updatedFromServer : r)));
                setSelectedReport(null);
            })
            .catch(err => {
                console.error("Error updating report:", err);

                // Handle the specific "Report not found" error from the server.
                if (err.response && err.response.data && err.response.data.error === "Report not found") {
                    setError("This report could not be found. It may have been deleted.");
                    // Remove the report from the local state since it no longer exists on the server.
                    setReports(reports.filter(r => r.id !== updatedReport.id));
                    setSelectedReport(null); // Close the modal as the report is gone.
                } else {
                    // For other errors, display a generic message.
                    setError("Failed to update report. Please try again.");
                }
            });
    };

    const sortedReports = [...reports].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const filteredReports = showAddressed ? sortedReports : sortedReports.filter(report => !report.isFixed);

    return <Layout>
        <ReportModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onUpdate={handleUpdateReport}
        />
        <div className="admin-container">
            <AdminHeader page="Reports" />
            <div className="toggle-switch-container">
                <label className="toggle-switch">
                    <input type="checkbox" checked={showAddressed} onChange={() => setShowAddressed(!showAddressed)} />
                    <span className="slider round"></span>
                </label>
                <span>Show Addressed Reports</span>
            </div>
            {loading && (
                <div>Loading...</div>
            )}
            {error && (
                <div> Error: {error.message}</div>
            )}
            {reports && (
                <div className="reports-card-container">
                    {filteredReports.map(report => (
                        <div key={report.id} className="report-card" onClick={() => setSelectedReport(report)}>
                            <div className="report-card-status">
                                {report.isFixed ? (
                                    <div className="report-fixed-cell">Addressed</div>
                                ) : (
                                    <div className="report-unfixed-cell">To Do</div>
                                )}
                            </div>
                            <div className="report-card-details">
                                <p><strong>Purchaser:</strong> {report.purchaserName}</p>
                                <p><strong>Email:</strong> {report.reporterEmail}</p>
                                <p><strong>Submitted:</strong> {report.created_at ? new Date(report.created_at).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric'}) : "N/A"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    </Layout>
}