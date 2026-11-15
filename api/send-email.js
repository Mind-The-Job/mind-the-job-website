import { Resend } from 'resend';
import { escapeHtml, isEmail, cleanText, guardRequest } from './_lib/security.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
    if (!guardRequest(request, response)) return;

    try {
        const body = request.body || {};
        if (body.website) return response.status(200).json({ ok: true }); // spam trap
        const name = cleanText(body.name, 120);
        const email = cleanText(body.email, 254);
        const message = cleanText(body.message, 5000);
        if (!name || !message || !isEmail(email)) {
            return response.status(400).json({ error: 'Please enter your name, a valid email and a message.' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Mind the Job Website <hallo@mindthejob.com>',
            to: ['hallo@mindthejob.com', 'shahriar@mindthejob.com'],
            reply_to: email, // This allows you to hit "Reply" and email the user back
            subject: `New message from ${name.replace(/[\r\n]/g, ' ')}`,
            html: `
        <h2>New Request from Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
        });

        if (error) {
            return response.status(400).json({ error: 'The message could not be sent.' });
        }

        return response.status(200).json({ data });
    } catch (error) {
        console.error('send-email failed', error);
        return response.status(500).json({ error: 'The message could not be sent.' });
    }
}
