import { Resend } from 'resend';
import { escapeHtml, isEmail } from './security.js';
import { selectRows } from './db.js';
import { reportPeriod, summarise, TYPE_LABELS, STATUSES } from './stats.js';

const REPORT_TO = (process.env.REPORT_EMAIL || 'shahriar@mindthejob.com,hallo@mindthejob.com')
    .split(',').map((e) => e.trim()).filter((e) => isEmail(e));

const avg = (v) => (v === null || v === undefined ? '–' : v.toFixed(1));
const gbp = (n) => `£${Math.round(n).toLocaleString('en-GB')}`;

function bar(label, value, max, colour = '#F59E0B') {
    const width = max ? Math.max(2, Math.round((value / max) * 260)) : 2;
    return `<tr>
  <td style="padding:4px 10px 4px 0;font-size:13px;color:#334155;white-space:nowrap">${escapeHtml(label)}</td>
  <td style="padding:4px 0"><div style="background:${colour};height:14px;width:${width}px;border-radius:3px;display:inline-block"></div>
  <span style="font-size:13px;font-weight:bold;margin-left:6px">${value}</span></td></tr>`;
}

function tile(label, value, note = '') {
    return `<td style="padding:12px;border:1px solid #E2E8F0;border-radius:10px;width:25%;vertical-align:top">
  <div style="font-size:12px;color:#64748B">${escapeHtml(label)}</div>
  <div style="font-size:24px;font-weight:bold;color:#0F172A">${escapeHtml(String(value))}</div>
  ${note ? `<div style="font-size:11px;color:#64748B">${escapeHtml(note)}</div>` : ''}</td>`;
}

export async function buildReport(kind) {
    const period = reportPeriod(kind);
    const [leads, feedback] = await Promise.all([
        selectRows('leads', 'select=*&order=created_at.desc'),
        selectRows('feedback', 'select=*&order=created_at.desc'),
    ]);
    const s = summarise(leads, feedback, period);

    const change = s.previousTotal ? Math.round(((s.total - s.previousTotal) / s.previousTotal) * 100) : null;
    const changeText = change === null ? 'no data for the period before' : `${change >= 0 ? '+' : ''}${change}% on the period before`;
    const sat = s.satisfaction;
    const allSat = s.allTimeSatisfaction;
    const maxType = Math.max(1, ...Object.values(s.byType));
    const maxPipe = Math.max(1, ...Object.values(s.pipeline));
    const title = `${kind === 'monthly' ? 'Monthly' : 'Weekly'} report: ${period.label}`;

    const html = `
<div style="font-family:Arial,sans-serif;max-width:640px;color:#1E293B;line-height:1.5">
  <h2 style="color:#0F172A;margin-bottom:4px">Mind the Job: ${escapeHtml(title)}</h2>
  <p style="color:#64748B;margin-top:0">Your ${kind} summary of website enquiries, sales and client happiness.</p>

  <table style="border-collapse:separate;border-spacing:6px;width:100%"><tr>
    ${tile('New enquiries', s.total, changeText)}
    ${tile('New clients won', s.wonInPeriod, `${s.wonClients} clients in total`)}
    ${tile('Monthly revenue (won)', gbp(s.mrr), 'from plans, + VAT')}
    ${tile('Happy clients', sat.happy === null ? '–' : `${sat.happy}%`, sat.responses ? `${sat.responses} answers, avg ${avg(sat.avg)}/5` : 'no answers this period')}
  </tr></table>

  <h3 style="margin-bottom:6px">Enquiries by type</h3>
  <table>${Object.entries(TYPE_LABELS).map(([t, l]) => bar(l, s.byType[t], maxType)).join('')}</table>

  <h3 style="margin-bottom:6px">Sales pipeline (all open enquiries)</h3>
  <table>${STATUSES.map((st) => bar(st, s.pipeline[st], maxPipe, st === 'Won' ? '#059669' : st === 'Lost' ? '#94A3B8' : '#0F172A')).join('')}</table>

  <h3 style="margin-bottom:6px">Client happiness</h3>
  <p style="margin:0">This period: ${sat.responses ? `average <strong>${avg(sat.avg)} / 5</strong>${sat.nps !== null ? `, recommend score (NPS) <strong>${sat.nps}</strong>` : ''}` : 'no feedback received'}.
  All time: ${allSat.responses ? `average <strong>${avg(allSat.avg)} / 5</strong> from ${allSat.responses} answers` : 'no feedback yet'}.</p>
  ${s.comments.length ? `<ul>${s.comments.map((c) => `<li style="margin-bottom:4px">${c.rating ? `${c.rating}★ ` : ''}${escapeHtml(c.comment)}</li>`).join('')}</ul>` : ''}

  <h3 style="margin-bottom:6px">New enquiries this period</h3>
  ${s.newLeads.length ? `<table style="border-collapse:collapse;font-size:13px;width:100%">
    <tr style="text-align:left;color:#64748B"><th style="padding:4px">Date</th><th style="padding:4px">Agency</th><th style="padding:4px">Type</th><th style="padding:4px">Status</th></tr>
    ${s.newLeads.slice(0, 40).map((l) => `<tr style="border-top:1px solid #E2E8F0">
      <td style="padding:4px">${new Date(l.created_at).toLocaleDateString('en-GB', { timeZone: 'Europe/London' })}</td>
      <td style="padding:4px">${escapeHtml(l.company)}</td>
      <td style="padding:4px">${escapeHtml(TYPE_LABELS[l.type] || l.type)}${l.plan ? ` (${escapeHtml(l.plan)})` : ''}</td>
      <td style="padding:4px">${escapeHtml(l.status)}</td></tr>`).join('')}
  </table>` : '<p>No new enquiries this period.</p>'}

  <p style="margin-top:24px"><a href="https://www.mindthejob.com/admin" style="background:#F59E0B;color:#0F172A;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:bold">Open the CRM dashboard</a></p>
  <p style="color:#94A3B8;font-size:11px">Sent automatically by mindthejob.com. Contains business contact details: please don't forward outside the company.</p>
</div>`;

    return { subject: `Mind the Job ${title}`, html, summary: s };
}

export async function sendReport(kind, to = REPORT_TO) {
    const { subject, html, summary } = await buildReport(kind);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: 'Mind the Job Reports <hallo@mindthejob.com>', to, subject, html });
    if (error) throw new Error(error.message || 'Email failed');
    return { subject, total: summary.total };
}
