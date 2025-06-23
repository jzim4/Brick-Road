import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendReportEmail(email, subject, message) {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: subject,
        react: message
    });

    if (error) {
        console.error('Resend API Error:', error);
        throw new Error(error.message);
    }

    return data;
}