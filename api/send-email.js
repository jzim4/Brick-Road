import { render } from '@react-email/render';
import EmailTemplate from '../pages/report/emailTemplate.js';
import sendReportEmail from './reportEmail.js';
import React from 'react';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { formData } = req.body;

        const emailHtml = render(React.createElement(EmailTemplate, {
            name: formData.purchaserName,
            panel: formData.panel,
            errorExplanation: formData.errorExplanation,
            comment: formData.comment || 'No additional comments'
        }));

        const recipientEmail = 'jszimmer545@gmail.com';
        const subject = `Brick Error Report - Panel ${formData.panel}`;
        
        await sendReportEmail(recipientEmail, subject, emailHtml);

        res.status(200).json({ message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error in /api/send-email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
} 