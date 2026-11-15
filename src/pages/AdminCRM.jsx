import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const STATUSES = ['New', 'Contacted', 'Health Check booked', 'Proposal sent', 'Won', 'Lost'];
const TYPES = { demo: 'Demo', 'health-check': 'Health Check', plan: 'Plan registration' };
const TYPE_COLOURS = { demo: '#0EA5E9', 'health-check': '#F59E0B', plan: '#059669' };
const gbp = (n) => `£${Math.round(n || 0).toLocaleString('en-GB')}`;
const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [busy, setBusy] = useState(false);

    const withPassword = async (e) => {
        e.preventDefault();
        setBusy(true); setMsg('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMsg(error.message);
        setBusy(false);
    };
    const withLink = async () => {
        if (!email) { setMsg('Enter your email first.'); return; }
        setBusy(true); setMsg('');
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        setMsg(error ? error.message : 'Check your inbox for a sign-in link.');
        setBusy(false);
    };

    return (
        <form onSubmit={withPassword} className="bg-white border border-slate-200 rounded-3xl p-7 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-primary">CRM sign in</h1>
            <p className="text-sm text-text-muted">Private area for Mind the Job staff.</p>
            <div>
                <label htmlFor="crm-email" className="block text-sm font-semibold mb-1">Email</label>
                <input id="crm-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full min-h-[44px] rounded-lg border border-slate-300 px-3" />
            </div>
            <div>
                <label htmlFor="crm-password" className="block text-sm font-semibold mb-1">Password</label>
                <input id="crm-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full min-h-[44px] rounded-lg border border-slate-300 px-3" />
            </div>
            <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy || !password} className="min-h-[44px] px-5 rounded-lg bg-primary text-white font-semibold disabled:opacity-50">Sign in</button>
                <button type="button" disabled={busy} onClick={withLink} className="min-h-[44px] px-5 rounded-lg border border-slate-300 font-semibold">Email me a sign-in link</button>
            </div>
            {msg && <p role="status" className="text-sm font-semibold">{msg}</p>}
        </form>
    );
}

function Tile({ label, value, note }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-text-muted">{label}</p>
            <p className="text-3xl font-bold text-primary mt-1">{value}</p>
            {note && <p className="text-xs text-text-muted mt-1">{note}</p>}
        </div>
    );
}

function WeeklyChart({ weekly }) {
    const max = Math.max(1, ...weekly.map((w) => w.demo + w['health-check'] + w.plan));
    const W = 640, H = 220, pad = 28, bw = (W - pad * 2) / weekly.length - 8;
    return (
        <figure>
            <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full h-auto" role="img" aria-label="Enquiries per week for the last 12 weeks, split by type">
                {[0, 0.5, 1].map((f) => (
                    <g key={f}>
                        <line x1={pad} x2={W - 8} y1={H - f * (H - 20)} y2={H - f * (H - 20)} stroke="#E2E8F0" />
                        <text x={pad - 6} y={H - f * (H - 20) + 4} fontSize="11" textAnchor="end" fill="#64748B">{Math.round(max * f)}</text>
                    </g>
                ))}
                {weekly.map((w, i) => {
                    const x = pad + 4 + i * (bw + 8);
                    let y = H;
                    return (
                        <g key={w.week}>
                            {['demo', 'health-check', 'plan'].map((t) => {
                                const h = (w[t] / max) * (H - 20);
                                y -= h;
                                return h > 0 ? <rect key={t} x={x} y={y} width={bw} height={h} rx="3" fill={TYPE_COLOURS[t]}><title>{`${TYPES[t]}: ${w[t]}`}</title></rect> : null;
                            })}
                            <text x={x + bw / 2} y={H + 16} fontSize="10" textAnchor="middle" fill="#64748B">{new Date(w.week).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</text>
                        </g>
                    );
                })}
            </svg>
            <figcaption className="flex flex-wrap gap-4 text-sm mt-2">
                {Object.entries(TYPES).map(([t, l]) => <span key={t} className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: TYPE_COLOURS[t] }} />{l}</span>)}
            </figcaption>
        </figure>
    );
}

function HBars({ rows, colour = '#0F172A' }) {
    const max = Math.max(1, ...rows.map((r) => r[1]));
    return (
        <ul className="space-y-2">
            {rows.map(([label, value, c]) => (
                <li key={label} className="grid grid-cols-[150px_1fr_32px] gap-3 items-center text-sm">
                    <span>{label}</span>
                    <span className="h-3 rounded bg-slate-100"><span className="block h-3 rounded" style={{ width: `${(value / max) * 100}%`, background: c || colour }} /></span>
                    <span className="font-bold text-right">{value}</span>
                </li>
            ))}
        </ul>
    );
}

function toCsv(leads) {
    const cols = ['created_at', 'type', 'status', 'company', 'company_number', 'name', 'email', 'phone', 'workers', 'plan', 'billing', 'marketing', 'notes'];
    const esc = (v) => {
        let s = String(v ?? '');
        if (/^[=+\-@]/.test(s)) s = `'${s}`; // stop spreadsheet formula injection
        return `"${s.replace(/"/g, '""')}"`;
    };
    return [cols.join(','), ...leads.map((l) => cols.map((c) => esc(l[c])).join(','))].join('\n');
}

export const AdminCRM = () => {
    const [session, setSession] = useState(null);
    const [ready, setReady] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('Open');
    const [search, setSearch] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: d }) => { setSession(d.session); setReady(true); });
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
        return () => sub.subscription.unsubscribe();
    }, []);

    const call = useCallback(async (method, body) => {
        const res = await fetch('/api/crm', {
            method,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
            body: body ? JSON.stringify(body) : undefined,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json.error || 'Request failed');
        return json;
    }, [session]);

    const load = useCallback(async () => {
        setError('');
        try { setData(await call('GET')); } catch (e) { setError(e.message); }
    }, [call]);

    useEffect(() => { if (session) load(); }, [session, load]);

    const updateLead = async (id, changes) => {
        try {
            const { lead } = await call('PATCH', { id, ...changes });
            setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? lead : l)) }));
        } catch (e) { setNotice(e.message); }
    };

    const sendNow = async (period) => {
        setNotice('Sending…');
        try { const r = await call('POST', { action: 'send-report', period }); setNotice(`Sent "${r.subject}" to your inbox.`); } catch (e) { setNotice(e.message); }
    };

    const exportCsv = () => {
        const blob = new Blob([toCsv(data.leads)], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `mindthejob-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const shown = useMemo(() => {
        if (!data) return [];
        const q = search.trim().toLowerCase();
        return data.leads.filter((l) => {
            if (filter === 'Open' && (l.status === 'Won' || l.status === 'Lost')) return false;
            if (filter !== 'Open' && filter !== 'All' && l.status !== filter) return false;
            return !q || [l.company, l.name, l.email].some((v) => (v || '').toLowerCase().includes(q));
        });
    }, [data, filter, search]);

    const feedbackByLead = useMemo(() => Object.fromEntries((data?.feedback || []).filter((f) => f.lead_id).map((f) => [f.lead_id, f])), [data]);

    if (!ready) return <div className="pt-36 pb-20 text-center">Loading…</div>;

    return (
        <div className="bg-slate-100 pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-4 md:px-6 space-y-6">
                {!session ? <SignIn /> : (
                    <>
                        <header className="flex flex-wrap gap-3 items-end justify-between">
                            <div>
                                <p className="text-sm text-text-muted">Signed in as {session.user.email}</p>
                                <h1 className="text-3xl font-bold text-primary">CRM dashboard</h1>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button type="button" onClick={load} className="min-h-[44px] px-4 rounded-lg border border-slate-300 bg-white font-semibold">Refresh</button>
                                {data && <button type="button" onClick={exportCsv} className="min-h-[44px] px-4 rounded-lg border border-slate-300 bg-white font-semibold">Export CSV</button>}
                                {data && <button type="button" onClick={() => sendNow('weekly')} className="min-h-[44px] px-4 rounded-lg bg-amber-400 text-primary font-bold">Email me this week's report</button>}
                                <button type="button" onClick={() => supabase.auth.signOut()} className="min-h-[44px] px-4 rounded-lg border border-slate-300 bg-white font-semibold">Sign out</button>
                            </div>
                        </header>
                        {notice && <p role="status" className="rounded-lg bg-white border border-slate-200 p-3 font-semibold">{notice}</p>}
                        {error && <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 font-semibold text-red-800">{error}</p>}

                        {data && (() => {
                            const s = data.stats;
                            const sat = s.satisfaction;
                            return (
                                <>
                                    <section aria-label="Key numbers" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <Tile label="Enquiries this week" value={s.thisWeek} note={`${s.thisMonth} this month · ${s.total} all time`} />
                                        <Tile label="Clients won" value={s.wonClients} note={s.winRate === null ? 'win rate shows once deals close' : `${s.winRate}% win rate`} />
                                        <Tile label="Monthly revenue (won)" value={gbp(s.mrr)} note="plan fees, + VAT" />
                                        <Tile label="Happy clients" value={sat.happy === null ? '–' : `${sat.happy}%`} note={sat.responses ? `avg ${sat.avg?.toFixed(1) ?? '–'}/5 · NPS ${sat.nps ?? '–'} · ${sat.responses} answers` : 'no feedback yet'} />
                                    </section>

                                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                                        <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                                            <h2 className="text-xl font-bold mb-3">Enquiries per week (last 12 weeks)</h2>
                                            <WeeklyChart weekly={s.weekly} />
                                        </section>
                                        <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                                            <div>
                                                <h2 className="text-xl font-bold mb-3">Sales pipeline</h2>
                                                <HBars rows={STATUSES.map((st) => [st, s.pipeline[st], st === 'Won' ? '#059669' : st === 'Lost' ? '#94A3B8' : '#0F172A'])} />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold mb-3">Satisfaction scores</h2>
                                                <HBars rows={[5, 4, 3, 2, 1].map((n) => [`${n} ★`, sat.distribution[n - 1], n >= 4 ? '#059669' : n === 3 ? '#F59E0B' : '#DC2626'])} />
                                            </div>
                                        </section>
                                    </div>

                                    <section className="bg-white rounded-2xl border border-slate-200 p-6">
                                        <div className="flex flex-wrap gap-3 items-end justify-between mb-4">
                                            <h2 className="text-xl font-bold">Enquiries ({shown.length})</h2>
                                            <div className="flex flex-wrap gap-2">
                                                <label className="sr-only" htmlFor="crm-search">Search</label>
                                                <input id="crm-search" type="search" placeholder="Search agency, name or email" value={search} onChange={(e) => setSearch(e.target.value)} className="min-h-[44px] rounded-lg border border-slate-300 px-3" />
                                                <label className="sr-only" htmlFor="crm-filter">Show</label>
                                                <select id="crm-filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="min-h-[44px] rounded-lg border border-slate-300 px-3">
                                                    {['Open', 'All', ...STATUSES].map((st) => <option key={st}>{st}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="text-left text-text-muted border-b border-slate-200">
                                                        <th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Agency</th><th className="py-2 pr-3">Contact</th>
                                                        <th className="py-2 pr-3">Type</th><th className="py-2 pr-3">Rating</th><th className="py-2 pr-3">Status</th><th className="py-2">Notes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {shown.map((l) => (
                                                        <tr key={l.id} className="border-b border-slate-100 align-top">
                                                            <td className="py-2 pr-3 whitespace-nowrap">{fmtDate(l.created_at)}</td>
                                                            <td className="py-2 pr-3"><p className="font-semibold">{l.company}</p><p className="text-xs text-text-muted">{l.workers || ''}{l.company_number ? ` · CH ${l.company_number}` : ''}</p></td>
                                                            <td className="py-2 pr-3"><p>{l.name}</p><a className="text-xs underline" href={`mailto:${l.email}`}>{l.email}</a>{l.phone && <p className="text-xs"><a href={`tel:${l.phone}`}>{l.phone}</a></p>}</td>
                                                            <td className="py-2 pr-3"><span className="inline-block rounded px-2 py-0.5 text-xs font-semibold text-white" style={{ background: TYPE_COLOURS[l.type] }}>{TYPES[l.type]}</span>{l.plan && <p className="text-xs mt-1">{l.plan} · {l.billing}</p>}</td>
                                                            <td className="py-2 pr-3">{feedbackByLead[l.id]?.rating ? `${feedbackByLead[l.id].rating} ★` : '–'}</td>
                                                            <td className="py-2 pr-3">
                                                                <label className="sr-only" htmlFor={`st-${l.id}`}>Status for {l.company}</label>
                                                                <select id={`st-${l.id}`} value={l.status} onChange={(e) => updateLead(l.id, { status: e.target.value })} className="min-h-[40px] rounded-lg border border-slate-300 px-2">
                                                                    {STATUSES.map((st) => <option key={st}>{st}</option>)}
                                                                </select>
                                                            </td>
                                                            <td className="py-2 min-w-[200px]">
                                                                <label className="sr-only" htmlFor={`nt-${l.id}`}>Notes for {l.company}</label>
                                                                <textarea id={`nt-${l.id}`} rows={2} defaultValue={l.notes || ''} onBlur={(e) => e.target.value !== (l.notes || '') && updateLead(l.id, { notes: e.target.value })} className="w-full rounded-lg border border-slate-300 p-2" />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {shown.length === 0 && <tr><td colSpan={7} className="py-6 text-center text-text-muted">No enquiries match.</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {data.feedback.some((f) => f.comment) && (
                                        <section className="bg-white rounded-2xl border border-slate-200 p-6">
                                            <h2 className="text-xl font-bold mb-3">Latest client comments</h2>
                                            <ul className="space-y-2">
                                                {data.feedback.filter((f) => f.comment).slice(0, 15).map((f) => (
                                                    <li key={f.id} className="border-b border-slate-100 pb-2"><span className="font-semibold">{f.rating ? `${f.rating} ★ ` : ''}</span>{f.comment} <span className="text-xs text-text-muted">· {fmtDate(f.created_at)}</span></li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                    <p className="text-sm text-text-muted">Reports are emailed automatically every Monday at 8am (last week) and on the 1st of each month (last month).</p>
                                </>
                            );
                        })()}
                    </>
                )}
            </div>
        </div>
    );
};
