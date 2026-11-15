import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';

// A safe, browser-only demo with sample data. Nothing is sent to a server.
const sampleQueue = [
    { id: 'a', worker: 'A. Patel', doc: 'Enhanced DBS', detail: 'Name and date of birth match · Update Service checked', flag: 'All checks passed', warn: false },
    { id: 'b', worker: 'M. Silva', doc: 'Right to work (share code)', detail: 'Checked via certified provider · permission valid to 06/2028', flag: 'All checks passed', warn: false },
    { id: 'c', worker: 'L. Brown', doc: 'Paediatric first aid', detail: 'Certificate dated 14/01/2026 · provider recognised', flag: 'Photo slightly blurred, text still readable', warn: true },
    { id: 'd', worker: 'T. Nowak', doc: 'Reference', detail: 'From previous care employer · dates match the CV', flag: 'Referee uses a personal email: please confirm', warn: true },
];

const sampleDocs = {
    dbs: { label: 'Sample enhanced DBS certificate', result: ['Certificate type: Enhanced, adult workforce', 'Issue date read: 02/11/2026', 'Name and date of birth match the passport', 'No signs of editing found'] },
    training: { label: 'Sample manual handling certificate', result: ['Course: Manual handling', 'Issued 12/03/2026, expires 12/03/2027', 'Reminders set for 60, 30 and 7 days before expiry'] },
    rtw: { label: 'Sample right-to-work share code', result: ['Checked through a certified provider (simulated)', 'Permission to work: valid to 30/06/2028', 'Follow-up check scheduled before expiry'] },
};

const locked = [
    ['Messages to your real candidates', 'Demo: sample messages only'],
    ['Real DBS and right-to-work checks', 'Through a certified UK provider'],
    ['Holiday and shift records (ERA 2025)', 'Full records and exports'],
    ['Audit packs, exports and CRM connection', 'Included in your plan'],
    ['Your own named specialist', 'WhatsApp support within 2 working hours'],
];

const rejectReasons = [
    'Photo unclear: please upload a clearer copy',
    'Document has expired',
    'Name does not match ID',
    'Need a work email for the referee',
];

export const DemoApp = () => {
    const [decisions, setDecisions] = useState([]);
    const [rejecting, setRejecting] = useState(null);
    const [reason, setReason] = useState(rejectReasons[0]);
    const [doc, setDoc] = useState(null);
    const pending = sampleQueue.filter((q) => !decisions.some((d) => d.id === q.id));
    const approvedCount = decisions.filter((d) => d.outcome === 'Approved').length;
    const decide = (q, outcome, why) => {
        const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        setDecisions((d) => [...d, { id: q.id, worker: q.worker, doc: q.doc, outcome, why, time }]);
        setRejecting(null);
        setReason(rejectReasons[0]);
    };

    return (
        <div className="bg-slate-100 pt-28 pb-20 min-h-screen">
            <div role="status" className="bg-amber-400 text-primary">
                <div className="container mx-auto px-4 md:px-6 py-3 flex flex-wrap gap-3 items-center justify-between">
                    <p className="font-bold">Demo mode · sample data only · nothing leaves your browser</p>
                    <Link to="/pricing" className="rounded-lg bg-primary text-white px-4 py-2 font-semibold">Choose a plan for the full service</Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 space-y-6">
                <header>
                    <p className="text-sm text-text-muted">Sample agency: Demo Care Staffing (20 example workers)</p>
                    <h1 className="text-3xl font-bold text-primary">Welcome to your demo</h1>
                </header>

                <section aria-label="Sample numbers" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[['Workers cleared', `${17 + approvedCount} / 20`], ['Waiting for approval', String(pending.length)], ['Expiring in 30 days', '3'], ['Hours saved this month (sample)', '38']].map(([l, v]) => (
                        <div key={l} className="bg-white rounded-2xl border border-slate-200 p-5"><p className="text-sm text-text-muted">{l}</p><p className="text-3xl font-bold mt-1">{v}</p></div>
                    ))}
                </section>

                <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <section aria-label="Approvals" className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                        <h2 className="text-xl font-bold">Approvals: the AI has already checked these</h2>
                        {pending.length === 0 && (
                            <p className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 font-semibold text-emerald-900">All done. In the full version, every decision is logged with your name and the time.</p>
                        )}
                        {pending.map((q) => (
                            <div key={q.id} className="border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold">{q.worker} · {q.doc}</p>
                                    <p className="text-sm text-text-muted">{q.detail}</p>
                                    <p className={`text-sm font-semibold ${q.warn ? 'text-amber-800' : 'text-emerald-800'}`}>{q.flag}</p>
                                </div>
                                {rejecting === q.id ? (
                                    <div className="w-full flex flex-wrap gap-2 items-center">
                                        <label htmlFor={`reason-${q.id}`} className="sr-only">Reason for rejecting</label>
                                        <select id={`reason-${q.id}`} value={reason} onChange={(e) => setReason(e.target.value)} className="min-h-[44px] flex-1 min-w-[220px] rounded-lg border border-slate-300 px-3">
                                            {rejectReasons.map((r) => <option key={r}>{r}</option>)}
                                        </select>
                                        <button type="button" onClick={() => setRejecting(null)} className="min-h-[44px] px-4 rounded-lg border border-slate-300 font-semibold">Cancel</button>
                                        <button type="button" onClick={() => decide(q, 'Rejected', reason)} className="min-h-[44px] px-4 rounded-lg bg-red-700 text-white font-semibold">Send back to worker</button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => setRejecting(q.id)} className="min-h-[44px] px-4 rounded-lg border border-slate-300 font-semibold">Reject with reason</button>
                                        <button type="button" onClick={() => decide(q, 'Approved')} className="min-h-[44px] px-4 rounded-lg bg-secondary-dark text-white font-semibold">Approve</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {decisions.length > 0 && (
                            <div className="pt-3 border-t border-slate-200">
                                <h3 className="font-semibold mb-2">Decision log (sample)</h3>
                                <ul className="text-sm space-y-1">
                                    {decisions.map((d) => (
                                        <li key={d.id}><span className="font-semibold">{d.time}</span> · {d.worker} · {d.doc}: <span className={d.outcome === 'Approved' ? 'text-emerald-800 font-semibold' : 'text-red-700 font-semibold'}>{d.outcome}</span>{d.why ? ` (${d.why}). The worker gets a WhatsApp message asking for a new copy.` : ''}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    <section aria-label="Full version" className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                        <h2 className="text-xl font-bold">Unlock with the full service</h2>
                        {locked.map(([t, d]) => (
                            <div key={t} className="flex gap-3"><Lock size={18} className="mt-1 text-slate-500 shrink-0" aria-hidden="true" /><div><p className="font-semibold">{t}</p><p className="text-sm text-text-muted">{d}</p></div></div>
                        ))}
                        <Link to="/pricing" className="block text-center rounded-xl bg-secondary-dark text-white font-bold py-3">See plans from £295 a month</Link>
                        <Link to="/health-check" className="block text-center font-semibold text-secondary-dark">Or book a free Health Check</Link>
                    </section>
                </div>

                <section aria-label="Try the AI check" className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h2 className="text-xl font-bold">Try the AI document check</h2>
                    <p className="text-text-muted">Pick a sample document to see what the AI reads. In the full version, a person at your agency then approves it.</p>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(sampleDocs).map(([key, d]) => (
                            <button key={key} type="button" aria-pressed={doc === key} onClick={() => setDoc(key)} className={`min-h-[44px] px-4 rounded-lg font-semibold border ${doc === key ? 'bg-secondary-dark text-white border-secondary-dark' : 'border-secondary-dark text-secondary-dark'}`}>{d.label}</button>
                        ))}
                    </div>
                    {doc && (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4" aria-live="polite">
                            <p className="font-bold text-emerald-900 mb-2">Checked in seconds (sample)</p>
                            <ul className="space-y-1">{sampleDocs[doc].result.map((r) => <li key={r} className="flex gap-2"><Check size={18} className="text-emerald-700 shrink-0" aria-hidden="true" />{r}</li>)}</ul>
                        </div>
                    )}
                </section>

                <section aria-label="Sample report" className="bg-primary text-white rounded-2xl p-6 grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-4"><h2 className="text-xl font-bold">Sample monthly savings report</h2></div>
                    {[['64 hours', 'saved this month'], ['186', 'documents checked'], ['4.2 days', 'average time to clear a worker'], ['9', 'expiries caught']].map(([n, l]) => (
                        <div key={l}><p className="text-3xl font-bold">{n}</p><p className="text-slate-300 text-sm">{l}</p></div>
                    ))}
                    <p className="sm:col-span-4 text-sm text-slate-300">Example figures for demonstration only.</p>
                </section>
            </div>
        </div>
    );
};
