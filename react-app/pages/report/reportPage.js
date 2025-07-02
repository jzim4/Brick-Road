import React, { useState } from 'react';
import Layout from '../layout.js';
import EditForm from './form.js';

export default function ReportPage() {
    const [formData, setFormData] = useState({
        purchaserName: '',
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

        const htmlContent = `
            <p>Purchaser Name: ${formData.purchaserName.replace(/[<>]/g, '')}</p>
            <p>Panel: ${formData.panel.replace(/[<>]/g, '')}</p>
            <p>Error Explanation: ${formData.errorExplanation.replace(/[<>]/g, '')}</p>
            <p>Comment: ${formData.comment.replace(/[<>]/g, '')}</p>
        `;

        try {
            const response = await fetch('http://localhost:4000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'jszimmer545@gmail.com',
                    subject: 'Brick Error Report',
                    htmlContent: htmlContent,
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setSubmissionStatus('success');
            console.log(data);
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <main className="contactContent">
                <h1>Report an Error on a Brick</h1>

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

                <EditForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                />
            </main>
        </Layout>
    );
}