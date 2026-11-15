// Turns raw leads and feedback into the numbers used by the CRM dashboard
// and the weekly/monthly email reports.

export const PLAN_PRICES = { Essentials: 295, Growth: 595, Pro: 995 };
export const STATUSES = ['New', 'Contacted', 'Health Check booked', 'Proposal sent', 'Won', 'Lost'];
export const TYPE_LABELS = { demo: 'Demo sign-ups', 'health-check': 'Health Check requests', plan: 'Plan registrations' };

const DAY = 24 * 60 * 60 * 1000;

// Monday 00:00 UTC of the week containing `date`.
export function weekStart(date) {
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const offset = (d.getUTCDay() + 6) % 7;
    return new Date(d.getTime() - offset * DAY);
}

// The report period that has just finished (weekly: last Mon–Sun; monthly: last calendar month).
export function reportPeriod(kind, now = new Date()) {
    if (kind === 'monthly') {
        const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
        const prevStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 2, 1));
        const label = start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
        return { start, end, prevStart, label };
    }
    const end = weekStart(now);
    const start = new Date(end.getTime() - 7 * DAY);
    const prevStart = new Date(start.getTime() - 7 * DAY);
    const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    return { start, end, prevStart, label: `${fmt(start)} – ${fmt(new Date(end.getTime() - DAY))}` };
}

const inRange = (iso, start, end) => {
    const t = new Date(iso).getTime();
    return t >= start.getTime() && t < end.getTime();
};

export function satisfaction(feedback) {
    const ratings = feedback.map((f) => f.rating).filter((r) => Number.isInteger(r));
    const recs = feedback.map((f) => f.recommend).filter((r) => Number.isInteger(r));
    const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
    const promoters = recs.filter((r) => r >= 9).length;
    const detractors = recs.filter((r) => r <= 6).length;
    const nps = recs.length ? Math.round(((promoters - detractors) / recs.length) * 100) : null;
    const happy = ratings.length ? Math.round((ratings.filter((r) => r >= 4).length / ratings.length) * 100) : null;
    const distribution = [1, 2, 3, 4, 5].map((n) => ratings.filter((r) => r === n).length);
    return { avg, nps, happy, responses: feedback.length, distribution };
}

export function summarise(leads, feedback, { start, end, prevStart }) {
    const current = leads.filter((l) => inRange(l.created_at, start, end));
    const previous = leads.filter((l) => inRange(l.created_at, prevStart, start));
    const byType = Object.fromEntries(Object.keys(TYPE_LABELS).map((t) => [t, current.filter((l) => l.type === t).length]));
    const pipeline = Object.fromEntries(STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));
    const won = leads.filter((l) => l.status === 'Won');
    const mrr = won.reduce((sum, l) => sum + (PLAN_PRICES[l.plan] || 0), 0);
    const wonInPeriod = won.filter((l) => inRange(l.updated_at || l.created_at, start, end)).length;
    const periodFeedback = feedback.filter((f) => inRange(f.created_at, start, end));
    return {
        total: current.length,
        previousTotal: previous.length,
        byType,
        pipeline,
        wonClients: won.length,
        wonInPeriod,
        mrr,
        satisfaction: satisfaction(periodFeedback),
        allTimeSatisfaction: satisfaction(feedback),
        newLeads: current,
        comments: periodFeedback.filter((f) => f.comment).slice(0, 10),
    };
}

// Leads per week for the last `weeks` weeks, split by type (for charts).
export function weeklySeries(leads, weeks = 12, now = new Date()) {
    const thisWeek = weekStart(now);
    return Array.from({ length: weeks }, (_, i) => {
        const start = new Date(thisWeek.getTime() - (weeks - 1 - i) * 7 * DAY);
        const end = new Date(start.getTime() + 7 * DAY);
        const items = leads.filter((l) => inRange(l.created_at, start, end));
        return {
            week: start.toISOString().slice(0, 10),
            demo: items.filter((l) => l.type === 'demo').length,
            'health-check': items.filter((l) => l.type === 'health-check').length,
            plan: items.filter((l) => l.type === 'plan').length,
        };
    });
}
