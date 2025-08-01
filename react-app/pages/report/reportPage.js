import React, { useState } from 'react';
import Layout from '../layout.js';
import EditForm from './form.js';
import axios from 'axios';
import {serverLink } from '../app.js';

export default function ReportPage() {
    const [formData, setFormData] = useState({
        purchaserName: '',
        reporterEmail: '',
        panel: '',
        errorExplanation: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        setSubmissionStatus(null); // Reset status on new input
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.purchaserName.trim()) {
            newErrors.purchaserName = 'Purchaser name is required';
        }
        if (!formData.reporterEmail.trim()) {
            newErrors.reporterEmail = 'A contact email is required';
        }
        if (!formData.panel.trim()) {
            newErrors.panel = 'Panel number is required';
        }
        if (!formData.errorExplanation.trim()) {
            newErrors.errorExplanation = 'Error explanation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmissionStatus(null);

        axios.post(serverLink + "/report",
            {
                purchaserName: formData.purchaserName,
                reporterEmail: formData.reporterEmail,
                panel: formData.panel,
                errorExplanation: formData.errorExplanation,
                comment: formData.comment
            }
        )
            .then(response => {
                setSubmissionStatus('success');
            })
            .catch(error => {
                console.error("Axios error:", error);
                setSubmissionStatus('error');
            });
    };

    return (
        <Layout>
            <main className="contactContent">
                <h1>Report an Error on a Brick</h1>
                <EditForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                />

                {submissionStatus === 'success' && (
                    <div style={{ color: 'green', border: '1px solid green', padding: '1rem', marginBottom: '1rem' }}>
                        Thank you for your submission! We will get back to you soon.
                    </div>
                )}

                {submissionStatus === 'error' && (
                    <div style={{ color: 'red', border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
                        Sorry, there was an error submitting your form. Please try again later.
                    </div>
                )}
                
            </main>
        </Layout>
    );
}