import { Resend } from 'resend';
import { escapeHtml, isEmail, cleanText, guardRequest, siteUrl } from './_lib/security.js';
import { dbReady, insertRow } from './_lib/db.js';

const resend = new Resend(process.env.RESEND_API_KEY);
// Comma-separated list in Vercel (LEAD_NOTIFY_EMAIL), otherwise both company inboxes.
const NOTIFY = (process.env.LEAD_NOTIFY_EMAIL || 'hallo@mindthejob.com,shahriar@mindthejob.com')
    .split(',')
    .map((e) => e.trim())
    .filter((e) => isEmail(e));

const TYPES = {
    demo: 'Free 14-day demo request',
    'health-check': 'Free Compliance Health Check request',
    plan: 'New client registration request',
};

const WORKER_BANDS = ['Up to 40', '41–120', '121–300', 'More than 300'];
const PLANS = ['Essentials', 'Growth', 'Pro'];
const BILLING = ['Annual', 'Monthly rolling'];

function row(label, value) {
    if (!value) return '';
    return `<tr><td style="padding:6px 12px 6px 0;color:#475569">${escapeHtml(label)}</td><td style="padding:6px 0"><strong>${escapeHtml(value)}</strong></td></tr>`;
}

export default async function handler(request, response) {
    if (!guardRequest(request, response)) return;

    try {
        const body = request.body || {};
        if (body.website) return response.status(200).json({ ok: true }); // spam trap

        const type = Object.keys(TYPES).includes(body.type) ? body.type : null;
        const name = cleanText(body.name, 120);
        const email = cleanText(body.email, 254);
        const company = cleanText(body.company, 160);
        const companyNumber = cleanText(body.companyNumber, 12).replace(/[^A-Za-z0-9]/g, '');
        const phone = cleanText(body.phone, 30).replace(/[^0-9+()\s-]/g, '');
        const workers = WORKER_BANDS.includes(body.workers) ? body.workers : '';
        const plan = PLANS.includes(body.plan) ? body.plan : '';
        const billing = BILLING.includes(body.billing) ? body.billing : '';
        const message = cleanText(body.message, 2000);
        const consent = body.consent === true;
        const marketing = body.marketing === true;

        if (!type || !name || !company || !isEmail(email) || !consent) {
            return response.status(400).json({ error: 'Please complete the required fields and accept the terms.' });
        }

        const title = TYPES[type];
        const submittedAt = new Date().toISOString();

        // Save to the CRM first, so a lead is never lost even if an email fails.
        let leadId = null;
        if (dbReady()) {
            try {
                const saved = await insertRow('leads', {
                    type, name, email, phone: phone || null, company,
                    company_number: companyNumber || null, workers: workers || null,
                    plan: plan || null, billing: billing || null, message: message || null, marketing,
                });
                leadId = saved?.id || null;
            } catch (err) {
                console.error('lead save failed', err);
            }
        }

        const { error } = await resend.emails.send({
            from: 'Mind the Job Website <hallo@mindthejob.com>',
            to: NOTIFY,
            reply_to: email,
            subject: `${title}: ${company.replace(/[\r\n]/g, ' ')}`,
            html: `
<div style="font-family:Arial,sans-serif;max-width:600px">
  <h2 style="color:#0F172A">${escapeHtml(title)}</h2>
  <table style="border-collapse:collapse;font-size:14px">
    ${row('Name', name)}
    ${row('Email', email)}
    ${row('Phone', phone)}
    ${row('Agency', company)}
    ${row('Companies House number', companyNumber)}
    ${row('Active workers', workers)}
    ${row('Plan', plan)}
    ${row('Billing', billing)}
    ${row('Marketing emails', marketing ? 'Yes' : 'No')}
    ${row('Submitted', submittedAt)}
  </table>
  ${message ? `<p style="white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>` : ''}
  <p style="color:#475569;font-size:12px;margin-top:24px">Reply within 1 working hour (Service Promise). ${leadId ? 'Saved to the CRM: <a href="https://www.mindthejob.com/admin">open the CRM dashboard</a>.' : 'Not saved to the CRM (database not connected): please add it by hand.'}</p>
</div>`,
        });

        if (error && !leadId) {
            console.error('lead notify failed', error);
            return response.status(502).json({ error: 'Sorry, we could not send your request. Please email hallo@mindthejob.com.' });
        }

        const nextStep = {
            demo: 'Your demo is ready to explore now at https://www.mindthejob.com/demo/app. It uses sample data only, so please do not upload any real worker documents.',
            'health-check': 'We will contact you within 1 working hour (Monday to Friday, 9am to 5:30pm) to book your free 30-minute Compliance Health Check.',
            plan: 'We will contact you within 1 working hour to confirm your details and send your service agreement and Data Processing Agreement to sign online.',
        }[type];

        const base = siteUrl(request);
        const stars = leadId ? [1, 2, 3, 4, 5].map((n) =>
            `<a href="${base}/feedback?ref=${leadId}&amp;score=${n}" style="display:inline-block;margin-right:6px;padding:8px 12px;border:1px solid #CBD5E1;border-radius:8px;color:#0F172A;text-decoration:none;font-weight:bold">${n} ★</a>`).join('') : '';

        await resend.emails.send({
            from: 'Mind the Job <hallo@mindthejob.com>',
            to: [email],
            subject: `We've received your request – Mind the Job`,
            html: `
<div style="font-family:Arial,sans-serif;max-width:600px;color:#1E293B;line-height:1.6">
  <h2 style="color:#0F172A">Thank you, ${escapeHtml(name.split(' ')[0])}</h2>
  <p>We've received your ${escapeHtml(title.toLowerCase())} for <strong>${escapeHtml(company)}</strong>.</p>
  <p>${escapeHtml(nextStep)}</p>
  <p>Questions? Reply to this email or call +44 (0) 7780 114420.</p>
  ${stars ? `<p style="margin-top:20px"><strong>How easy was it to get in touch with us?</strong> Tap a score (5 is best):</p><p>${stars}</p>` : ''}
  <p style="color:#64748B;font-size:12px">Mind the Job Ltd. You received this email because this address was entered on mindthejob.com. If that wasn't you, please ignore this email.</p>
</div>`,
        }).catch((err) => console.error('lead confirmation failed', err));

        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error('lead failed', error);
        return response.status(500).json({ error: 'Sorry, something went wrong. Please email hallo@mindthejob.com.' });
    }
}
