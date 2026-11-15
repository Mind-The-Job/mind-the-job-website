import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Bell, FileCheck2, Clock } from 'lucide-react';

const appear = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
});

// A WhatsApp-style conversation showing a candidate sending documents.
export function ChatMockup() {
    const msgs = [
        { from: 'ai', text: 'Hi Amira 👋 Welcome to Brightcare. To get you on shift, I just need 3 things. First, a photo of your DBS certificate please.' },
        { from: 'worker', text: '📎 DBS_certificate.jpg' },
        { from: 'ai', text: 'Thanks! ✅ Enhanced DBS checked: name and date of birth match. Next, your manual handling certificate.' },
        { from: 'worker', text: '📎 manual_handling.pdf' },
        { from: 'ai', text: '✅ Valid until 12/03/2027. I’ll remind you 60 days before. Last one: your right-to-work share code.' },
    ];
    return (
        <div className="rounded-[2rem] bg-slate-900 p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/10 w-full max-w-[320px]">
            <div className="rounded-[1.6rem] overflow-hidden bg-[#ECE5DD]">
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-bold grid place-items-center text-sm">MJ</div>
                    <div><p className="font-semibold text-sm leading-tight">Brightcare Compliance</p><p className="text-[11px] text-emerald-100">online · replies 24/7</p></div>
                </div>
                <div className="p-3 space-y-2 text-[13px] leading-snug min-h-[330px]">
                    {msgs.map((m, i) => (
                        <motion.div key={i} {...appear(0.25 + i * 0.35)}
                            className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm ${m.from === 'ai' ? 'bg-white text-slate-800' : 'bg-[#DCF8C6] text-slate-800 ml-auto'}`}>
                            {m.text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Compact compliance dashboard card.
export function DashboardMockup({ className = '' }) {
    const rows = [
        { name: 'A. Patel', role: 'Care assistant', status: 'Cleared', tone: 'ok' },
        { name: 'J. Okafor', role: 'Nurse', status: 'DBS due in 12 days', tone: 'warn' },
        { name: 'M. Silva', role: 'Support worker', status: 'Right to work missing', tone: 'bad' },
    ];
    const tone = { ok: 'bg-emerald-100 text-emerald-900', warn: 'bg-amber-100 text-amber-900', bad: 'bg-red-100 text-red-900' };
    return (
        <div className={`rounded-2xl bg-white shadow-2xl shadow-black/30 ring-1 ring-slate-200 p-5 text-slate-800 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <p className="font-bold">Worker compliance</p>
                <span className="text-[11px] font-semibold rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">Example view</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {[['42', 'docs checked'], ['6', 'expiries caught'], ['9', 'cleared']].map(([n, l]) => (
                    <div key={l} className="rounded-xl bg-slate-50 p-3"><p className="text-2xl font-extrabold text-slate-900">{n}</p><p className="text-[11px] text-slate-500">{l}</p></div>
                ))}
            </div>
            <ul className="space-y-2 text-sm">
                {rows.map((r) => (
                    <li key={r.name} className="flex justify-between gap-3 items-center rounded-lg border border-slate-100 px-3 py-2.5">
                        <span><span className="font-semibold">{r.name}</span> <span className="text-slate-500">· {r.role}</span></span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${tone[r.tone]}`}>{r.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// AI document check result.
export function CheckMockup() {
    return (
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-5 space-y-3 text-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 grid place-items-center"><FileCheck2 className="text-teal-700" size={22} aria-hidden="true" /></div>
                <div><p className="font-bold">Enhanced DBS certificate</p><p className="text-xs text-slate-500">A. Patel · read in 38 seconds (example)</p></div>
            </div>
            {['Name matches ID', 'Date of birth matches', 'Update Service status checked', 'Certificate number valid format'].map((t) => (
                <p key={t} className="flex items-center gap-2 text-sm"><CheckCircle2 className="text-emerald-600 shrink-0" size={18} aria-hidden="true" />{t}</p>
            ))}
            <div className="flex gap-2 pt-1">
                <span className="flex-1 text-center rounded-lg border border-slate-300 py-2 text-sm font-semibold">Reject with reason</span>
                <span className="flex-1 text-center rounded-lg bg-teal-700 text-white py-2 text-sm font-semibold">Approve</span>
            </div>
        </div>
    );
}

// Expiry tracker list.
export function ExpiryMockup() {
    const items = [
        ['J. Okafor', 'Enhanced DBS', '12 days', 'bg-amber-100 text-amber-900'],
        ['L. Brown', 'Paediatric first aid', '27 days', 'bg-amber-50 text-amber-800'],
        ['T. Nowak', 'Moving and handling', '58 days', 'bg-slate-100 text-slate-700'],
    ];
    return (
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-5 text-slate-800">
            <p className="font-bold mb-3 flex items-center gap-2"><Bell size={18} className="text-amber-500" aria-hidden="true" />Expiring soon</p>
            <ul className="space-y-2">
                {items.map(([n, d, left, c]) => (
                    <li key={n} className="flex justify-between items-center gap-3 rounded-lg border border-slate-100 px-3 py-2.5 text-sm">
                        <span><span className="font-semibold">{n}</span><span className="text-slate-500"> · {d}</span></span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${c}`}>{left}</span>
                    </li>
                ))}
            </ul>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5"><Clock size={14} aria-hidden="true" />Worker reminded automatically at 60, 30 and 7 days</p>
        </div>
    );
}

// Monthly value report.
export function ReportMockup() {
    const bars = [38, 52, 47, 64];
    return (
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-5 text-slate-800">
            <p className="font-bold">Your monthly report</p>
            <p className="text-xs text-slate-500 mb-4">Hours saved per month (example)</p>
            <div className="flex items-end gap-3 h-32 mb-3" aria-hidden="true">
                {bars.map((b, i) => (
                    <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${(b / 64) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                        className={`flex-1 rounded-t-lg ${i === bars.length - 1 ? 'bg-amber-400' : 'bg-teal-600/70'}`} />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
                {[['64 hrs', 'saved'], ['186', 'docs checked'], ['0', 'expired on shift']].map(([n, l]) => (
                    <div key={l} className="rounded-lg bg-slate-50 py-2"><p className="font-extrabold">{n}</p><p className="text-[11px] text-slate-500">{l}</p></div>
                ))}
            </div>
        </div>
    );
}

export function FlagChip({ children, tone = 'ok', className = '' }) {
    const Icon = tone === 'ok' ? CheckCircle2 : AlertTriangle;
    return (
        <div className={`inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-xl ring-1 ring-slate-200 ${className}`}>
            <Icon size={18} className={tone === 'ok' ? 'text-emerald-600' : 'text-amber-500'} aria-hidden="true" />{children}
        </div>
    );
}
