import { cleanText, guardOrigin } from './_lib/security.js';
import { dbReady, getAdmin, selectRows, updateRow, isUuid } from './_lib/db.js';
import { STATUSES, PLAN_PRICES, satisfaction, weeklySeries, weekStart } from './_lib/stats.js';
import { sendReport } from './_lib/report.js';

// Private CRM data for signed-in CRM admins only.
// GET: leads, feedback and dashboard numbers. PATCH: update a lead's status/notes.
// POST { action: 'send-report', period }: email a report now.
export default async function handler(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    // Browsers don't send an Origin header on same-site GETs; the sign-in token protects reads.
    if (request.method !== 'GET' && !guardOrigin(request, response)) return;
    if (!dbReady()) return response.status(503).json({ error: 'The CRM database is not connected yet.' });

    const admin = await getAdmin(request).catch(() => null);
    if (!admin) return response.status(401).json({ error: 'Please sign in with a CRM admin account.' });

    try {
        if (request.method === 'GET') {
            const [leads, feedback] = await Promise.all([
                selectRows('leads', 'select=*&order=created_at.desc&limit=2000'),
                selectRows('feedback', 'select=*&order=created_at.desc&limit=2000'),
            ]);
            const now = new Date();
            const thisWeek = weekStart(now);
            const thisMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
            const won = leads.filter((l) => l.status === 'Won');
            const decided = leads.filter((l) => l.status === 'Won' || l.status === 'Lost').length;
            return response.status(200).json({
                admin: { email: admin.email },
                leads,
                feedback,
                stats: {
                    total: leads.length,
                    thisWeek: leads.filter((l) => new Date(l.created_at) >= thisWeek).length,
                    thisMonth: leads.filter((l) => new Date(l.created_at) >= thisMonth).length,
                    wonClients: won.length,
                    mrr: won.reduce((s, l) => s + (PLAN_PRICES[l.plan] || 0), 0),
                    winRate: decided ? Math.round((won.length / decided) * 100) : null,
                    pipeline: Object.fromEntries(STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length])),
                    satisfaction: satisfaction(feedback),
                    weekly: weeklySeries(leads, 12, now),
                },
            });
        }

        if (request.method === 'PATCH') {
            const body = request.body || {};
            if (!isUuid(body.id)) return response.status(400).json({ error: 'Unknown lead' });
            const changes = { updated_at: new Date().toISOString() };
            if (body.status !== undefined) {
                if (!STATUSES.includes(body.status)) return response.status(400).json({ error: 'Unknown status' });
                changes.status = body.status;
            }
            if (body.notes !== undefined) changes.notes = cleanText(body.notes, 2000) || null;
            const lead = await updateRow('leads', body.id, changes);
            return response.status(200).json({ lead });
        }

        if (request.method === 'POST' && request.body?.action === 'send-report') {
            const kind = request.body.period === 'monthly' ? 'monthly' : 'weekly';
            const result = await sendReport(kind, [admin.email]);
            return response.status(200).json({ ok: true, ...result });
        }

        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('crm failed', error);
        return response.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
