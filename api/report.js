import { dbReady } from './_lib/db.js';
import { sendReport } from './_lib/report.js';

// Called by Vercel Cron (see vercel.json): weekly on Mondays, monthly on the 1st.
// Vercel sends "Authorization: Bearer <CRON_SECRET>", so nobody else can trigger it.
export default async function handler(request, response) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.authorization !== `Bearer ${secret}`) {
        return response.status(401).json({ error: 'Unauthorised' });
    }
    if (!dbReady()) return response.status(503).json({ error: 'Database is not configured' });

    const kind = request.query?.period === 'monthly' ? 'monthly' : 'weekly';
    try {
        const result = await sendReport(kind);
        return response.status(200).json({ ok: true, ...result });
    } catch (error) {
        console.error('report failed', error);
        return response.status(500).json({ error: 'Report failed' });
    }
}
