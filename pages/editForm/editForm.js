import React, { useState } from 'react';
import Header from '../header.js';
import Footer from '../footer.js';
import EditForm from './form.js';

export default function Contact() {
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

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formType: 'edit', formData }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSubmissionStatus('success');
            // Reset form on successful submission
            setFormData({
                purchaserName: '',
                panel: '',
                errorExplanation: '',
                comment: ''
            });

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contactPage">
            <Header />
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
            <Footer />
        </div>
    );
}