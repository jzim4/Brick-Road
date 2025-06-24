const { Resend } = require('resend');
const resend = new Resend('re_gmJKZ7mX_13RowUwk2KrUtTYSSF7y6mxA');
const cors = require('cors');

const express = require('express');
const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  console.log('Received request for /');
  res.send('Hello World!');
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
    const { to, subject, htmlContent } = req.body;

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Use Resend's verified domain
            to: to,
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return res.status(400).json({ error });
        }

        res.status(200).json({ data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Report email endpoint (for the form data)
app.post('/api/report-email', async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { formData } = req.body;

        // Create email content
        const emailHtml = `
            <h2>Brick Error Report</h2>
            <p><strong>Purchaser Name:</strong> ${formData.purchaserName}</p>
            <p><strong>Panel:</strong> ${formData.panel}</p>
            <p><strong>Error Explanation:</strong> ${formData.errorExplanation}</p>
            <p><strong>Additional Comments:</strong> ${formData.comment || 'No additional comments'}</p>
        `;

        const recipientEmail = 'jszimmer545@gmail.com';
        const subject = `Brick Error Report - Panel ${formData.panel}`;
        
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: recipientEmail,
            subject: subject,
            html: emailHtml,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: 'Email sent successfully', data });

    } catch (error) {
        console.error('Error in /api/report-email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
    console.log(`Open your browser and go to: http://localhost:${port}`);
});

// Handle server errors
app.on('error', (error) => {
    console.error('Server error:', error);
});