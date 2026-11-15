import { cleanText, guardOrigin } from './_lib/security.js';
import { dbReady, insertRow, updateRow, selectRows, isUuid } from './_lib/db.js';

// Saves a client satisfaction score. One answer per lead: a second answer
// (for example adding a comment after the one-click score) updates the first.
export default async function handler(request, response) {
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
    if (!guardOrigin(request, response, 20)) return;
    if (!dbReady()) return response.status(503).json({ error: 'Feedback is not available right now.' });

    try {
        const body = request.body || {};
        const ref = isUuid(body.ref) ? body.ref : null;
        const rating = Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5 ? body.rating : null;
        const recommend = Number.isInteger(body.recommend) && body.recommend >= 0 && body.recommend <= 10 ? body.recommend : null;
        const comment = cleanText(body.comment, 1500) || null;
        const source = ['email', 'website', 'client'].includes(body.source) ? body.source : 'website';

        if (rating === null && recommend === null && !comment) {
            return response.status(400).json({ error: 'Please choose a score.' });
        }

        const changes = {};
        if (rating !== null) changes.rating = rating;
        if (recommend !== null) changes.recommend = recommend;
        if (comment) changes.comment = comment;

        if (ref) {
            const existing = await selectRows('feedback', `select=id&lead_id=eq.${ref}&limit=1`);
            if (existing?.length) {
                await updateRow('feedback', existing[0].id, changes);
                return response.status(200).json({ ok: true });
            }
        }
        await insertRow('feedback', { ...changes, lead_id: ref, source });
        return response.status(200).json({ ok: true });
    } catch (error) {
        console.error('feedback failed', error);
        return response.status(400).json({ error: 'Sorry, we could not save your answer.' });
    }
}
