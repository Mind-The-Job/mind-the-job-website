import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, ShieldCheck, MessageCircle, Users, Lock, KeyRound, GraduationCap, Check, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { plans, formatGBP } from '../data/compliance';
import { ChatMockup, DashboardMockup, CheckMockup, ExpiryMockup, ReportMockup, FlagChip } from '../components/home/Mockups';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
};

const showcase = [
    {
        eyebrow: 'Collect',
        title: 'Workers send documents on WhatsApp. No app, no portal, no chasing.',
        text: 'Your AI assistant asks each worker for exactly what your clients need, answers their questions at 10pm, and keeps going until the file is complete.',
        Mock: ChatMockup,
    },
    {
        eyebrow: 'Check',
        title: 'Every document read and checked in seconds. You just approve.',
        text: 'Names, dates, certificate numbers and expiry dates are checked automatically. Anything odd is flagged in plain English, and a person at your agency makes every decision.',
        Mock: CheckMockup,
    },
    {
        eyebrow: 'Protect',
        title: 'Nothing expires on shift again.',
        text: 'Every DBS, right to work and training certificate is tracked. Workers are reminded at 60, 30 and 7 days, and you see who is at risk before your client does.',
        Mock: ExpiryMockup,
    },
    {
        eyebrow: 'Prove',
        title: 'A monthly report that shows exactly what you got for your money.',
        text: 'Hours saved, documents checked, workers cleared and expiries caught, in one page you can share with your directors and your clients.',
        Mock: ReportMockup,
    },
];

const faqs = [
    ['Do I have to change my CRM or recruitment software?', 'No. We work alongside the tools you already use, such as your CRM, email, WhatsApp and spreadsheets. Nothing to migrate.'],
    ['Does the AI make decisions about workers?', 'No. The AI collects, reads and flags documents. A person at your agency approves or rejects every one, and every decision is logged with a name and time.'],
    ['How is worker data kept safe?', 'Every client signs a Data Processing Agreement and we complete a data protection impact assessment before go-live. Access needs multi-factor login, and every access is logged. See our Security page for details.'],
    ['How long does it take to get started?', 'Usually 14 days from signing. We set everything up, test it on real files with you, then go live.'],
    ['What if it doesn’t save us time?', 'If you don’t save at least 8 hours a week within 60 days of going live, your next month is free. You can also try the free demo first.'],
    ['Is there a long contract?', 'Annual plans have £0 setup. Monthly rolling plans have a 3-month minimum and then one month’s notice.'],
];

function Faq() {
    const [open, setOpen] = useState(0);
    return (
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map(([q, a], i) => (
                <div key={q}>
                    <h3>
                        <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}
                            className="w-full flex justify-between items-center gap-4 text-left px-6 py-5 font-semibold text-primary hover:bg-slate-50">
                            {q}<ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                    </h3>
                    <div id={`faq-${i}`} hidden={open !== i} className="px-6 pb-5 text-text-muted">{a}</div>
                </div>
            ))}
        </div>
    );
}

const problems = [
    { icon: FileText, title: 'Chasing documents for weeks', text: 'DBS, right to work, training certificates and references take weeks to collect. Every day of waiting is a shift you can’t fill.' },
    { icon: Clock, title: 'Expiry dates slipping through', text: 'One expired DBS or training certificate can mean a failed client audit, a worker pulled off shift or a lost contract.' },
    { icon: ShieldCheck, title: 'New rules, new inspector', text: 'The Employment Rights Act 2025 and the Fair Work Agency mean longer record keeping, more agency worker rights and real enforcement.' },
    { icon: MessageCircle, title: 'Missed messages after 5pm', text: 'Candidates and clients message in the evening. If nobody answers, a faster agency gets them.' },
    { icon: Users, title: 'Hiring admin just to keep up', text: 'Growing from 80 to 150 temps shouldn’t mean another salary spent on paperwork.' },
];

const comparison = [
    ['Who sets it up and runs it', 'Your team', 'Their staff, working through a queue', 'We do. You just approve'],
    ['Change your CRM or systems?', 'Often yes', 'Shared logins to your systems', 'No. Built into your tools'],
    ['Candidates complete on WhatsApp', 'Usually an app or portal', 'Email and phone chasing', 'Yes, 24/7'],
    ['Employment Rights Act 2025 readiness', 'Depends on the product', 'Not their focus', 'Built in: records, audit packs, updates'],
    ['Proof of value', 'Dashboards you have to read', 'Hours billed', 'Monthly report of hours saved'],
    ['Guarantee', 'Rarely', 'Rarely', '8+ hours a week saved in 60 days, or next month free'],
    ['Built for small agencies', 'Often priced for larger firms', 'Minimum team sizes', 'Yes. Fixed public prices from £295 a month'],
];

const security = [
    { icon: Lock, title: 'Locked-down access', text: 'Multi-factor login on every account, no shared passwords, and every access logged.' },
    { icon: KeyRound, title: 'Protected connections', text: 'Keys kept in a secure vault, unique to each client and rotated every 90 days.' },
    { icon: ShieldCheck, title: 'UK GDPR, properly done', text: 'A signed Data Processing Agreement and a data protection impact assessment for every client.' },
    { icon: Users, title: 'A human approves', text: 'The AI collects, reads and flags. A person at your agency approves every decision.' },
];

export const Home = () => {
    const [hours, setHours] = useState(15);
    const [rate, setRate] = useState(15);
    const yearHours = hours * 52;
    const yearly = yearHours * rate;

    return (
        <div className="bg-surface-muted text-text-main">
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#0B1220] text-white pt-36 pb-24">
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
                <div aria-hidden="true" className="absolute -top-40 -right-32 w-[620px] h-[620px] rounded-full bg-teal-500/25 blur-3xl" />
                <div aria-hidden="true" className="absolute -bottom-48 -left-40 w-[520px] h-[520px] rounded-full bg-amber-400/15 blur-3xl" />
                <div className="relative container mx-auto px-4 md:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-7">
                        <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-sm font-semibold text-teal-200">
                            <Sparkles size={16} aria-hidden="true" />AI compliance team for UK staffing agencies
                        </p>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                            Stop chasing paperwork.{' '}
                            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Get every worker compliant in days,</span>{' '}not weeks.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-xl">We collect and check every candidate document on WhatsApp, track every expiry date and keep you ready for the Fair Work Agency, 24/7. You approve in minutes. We do the rest.</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link to="/health-check" className="group inline-flex justify-center items-center gap-2 rounded-xl bg-amber-400 text-slate-900 font-bold px-7 py-4 shadow-lg shadow-amber-400/30 hover:bg-amber-300 transition-colors">
                                Book your free Health Check<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                            <Link to="/demo" className="inline-flex justify-center items-center rounded-xl border border-white/25 bg-white/5 text-white font-semibold px-7 py-4 hover:bg-white/10 transition-colors">Try the free demo</Link>
                        </div>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                            {['Live in 14 days', '£0 setup on annual plans', 'A person approves every decision', 'UK GDPR by design'].map((t) => (
                                <li key={t} className="flex items-center gap-2"><Check size={16} className="text-teal-300" aria-hidden="true" />{t}</li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className="relative flex justify-center lg:justify-end" aria-label="Example of the service: a WhatsApp chat collecting documents and a compliance dashboard">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative z-10">
                            <ChatMockup />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                            className="hidden md:block absolute -left-4 lg:-left-40 bottom-[-40px] w-[330px] z-20">
                            <DashboardMockup />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.1 }} className="hidden sm:block absolute top-6 -right-2 lg:right-[-24px] z-30">
                            <FlagChip>DBS checked · 38 sec</FlagChip>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.4 }} className="hidden sm:block absolute top-1/2 -left-6 lg:left-[-70px] z-30">
                            <FlagChip tone="warn">Training expires in 12 days</FlagChip>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Proof numbers */}
            <section aria-label="Our promises" className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200">
                    {[['14 days', 'from sign-up to live'], ['24/7', 'replies to your workers'], ['1 hour', 'our reply time, working days'], ['8+ hrs', 'saved a week, or a month free']].map(([n, l]) => (
                        <div key={l} className="py-8 px-4 text-center">
                            <p className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{n}</p>
                            <p className="text-sm text-text-muted mt-1">{l}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Works with */}
            <section className="border-y border-slate-200 bg-slate-100 py-6">
                <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-3 items-center justify-center text-sm font-semibold text-slate-700">
                    <span className="uppercase tracking-wider text-xs text-slate-500 mr-2">Works with your tools</span>
                    {['WhatsApp', 'Gmail and Outlook', 'Google Sheets and Excel', 'Your recruitment CRM', 'Certified UK ID and right-to-work checks'].map((t) => (
                        <span key={t} className="bg-white border border-slate-300 rounded-lg px-3 py-2">{t}</span>
                    ))}
                </div>
            </section>

            {/* Problems */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Sound familiar?</h2>
                    <p className="text-lg text-text-muted mb-10 max-w-2xl">Small agencies lose hours every week to paperwork that a well-built system can do for them.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {problems.map(({ icon: Icon, title, text }) => (
                            <motion.div {...fadeUp} key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition">
                                <div className="w-12 h-12 rounded-xl bg-red-50 grid place-items-center mb-4"><Icon className="text-red-600" size={24} aria-hidden="true" /></div>
                                <h3 className="text-lg font-bold mb-2">{title}</h3>
                                <p className="text-text-muted">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark mb-2">See it working</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">From first message to cleared worker, without the chasing</h2>
                    </div>
                    <div className="space-y-24">
                        {showcase.map(({ eyebrow, title, text, Mock }, i) => (
                            <motion.div {...fadeUp} key={eyebrow} className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className={i % 2 ? 'lg:order-2' : ''}>
                                    <p className="inline-flex items-center gap-2 text-sm font-bold text-secondary-dark mb-3"><span className="w-7 h-7 rounded-full bg-teal-700 text-white grid place-items-center text-xs">{i + 1}</span>{eyebrow}</p>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">{title}</h3>
                                    <p className="text-lg text-text-muted">{text}</p>
                                </div>
                                <div className={`relative rounded-3xl bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 p-8 md:p-12 flex justify-center ${i % 2 ? 'lg:order-1' : ''}`}>
                                    <div className="w-full max-w-sm flex justify-center"><Mock /></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Link to="/demo" className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-bold px-7 py-4 hover:bg-slate-800">Try it yourself in the free demo<ArrowRight size={18} aria-hidden="true" /></Link>
                    </div>
                </div>
            </section>

            {/* Why us */}
            <section className="bg-primary text-slate-200 py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-300 mb-2">Why Mind the Job</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Software gives you another system to run. We run it for you.</h2>
                    <p className="text-lg mb-8 max-w-3xl">Most agencies choose between compliance software they must learn, or an offshore admin team. We're a third option: an AI compliance team that works inside your tools, managed by UK specialists.</p>
                    <div className="overflow-x-auto rounded-2xl border border-slate-700">
                        <table className="w-full min-w-[760px] text-left text-sm md:text-base">
                            <thead className="bg-slate-800">
                                <tr><th scope="col" className="p-4"><span className="sr-only">Feature</span></th><th scope="col" className="p-4">Compliance software</th><th scope="col" className="p-4">Offshore admin team</th><th scope="col" className="p-4 bg-secondary-dark text-white">Mind the Job</th></tr>
                            </thead>
                            <tbody>
                                {comparison.map(([label, a, b, us]) => (
                                    <tr key={label} className="border-t border-slate-700">
                                        <th scope="row" className="p-4 text-white font-semibold">{label}</th>
                                        <td className="p-4">{a}</td>
                                        <td className="p-4">{b}</td>
                                        <td className="p-4 bg-teal-900 text-white font-semibold">{us}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">How it works</h2>
                    <ol className="grid md:grid-cols-3 gap-6">
                        {[
                            ['Free Health Check', 'A 30-minute call. We look at one worker file and your process, then send a 1-page report showing the hours you lose and where you’re exposed.'],
                            ['We build it in 14 days', 'Document collection, AI checks, expiry alerts and your compliance tracker, set up for your clients’ requirements and tested on real files.'],
                            ['We run it every month', 'We monitor everything, fix issues within one working day and send a monthly report of documents processed, hours saved and workers cleared.'],
                        ].map(([title, text], i) => (
                            <li key={title} className="bg-teal-50 rounded-2xl p-7">
                                <p className="text-4xl font-bold text-secondary-dark mb-2">{i + 1}</p>
                                <h3 className="text-xl font-bold mb-2">{title}</h3>
                                <p className="text-slate-700">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Savings calculator */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What is the paperwork costing you?</h2>
                        <p className="text-lg text-text-muted mb-2">Move the sliders to match your agency.</p>
                        <p className="text-sm text-text-muted">An estimate only. Your free Health Check gives you a real number for your agency.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6">
                        <div>
                            <label htmlFor="calc-hours" className="flex justify-between font-semibold mb-2"><span>Hours a week spent chasing and checking documents</span><span className="text-secondary-dark">{hours} hrs</span></label>
                            <input id="calc-hours" type="range" min="2" max="40" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-teal-700" />
                        </div>
                        <div>
                            <label htmlFor="calc-rate" className="flex justify-between font-semibold mb-2"><span>Hourly cost of that staff time</span><span className="text-secondary-dark">£{rate}</span></label>
                            <input id="calc-rate" type="range" min="12" max="30" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-teal-700" />
                        </div>
                        <div className="bg-primary text-white rounded-2xl p-6" aria-live="polite">
                            <p className="text-slate-300">Admin time cost per year</p>
                            <p className="text-4xl font-bold">{formatGBP(yearly)}</p>
                            <p className="text-slate-300">That’s {yearHours.toLocaleString('en-GB')} hours a year your team could spend placing workers instead.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans preview */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">A full compliance team for less than a part-time admin.</h2>
                    <p className="text-lg text-text-muted mb-10">Prices per month, plus VAT. £0 setup on annual plans.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((p) => (
                            <div key={p.id} className={`rounded-2xl p-7 border ${p.tag ? 'border-2 border-secondary-dark bg-teal-50' : 'border-slate-200'}`}>
                                <div className="flex justify-between items-center"><h3 className="text-xl font-bold">{p.name}</h3>{p.tag && <span className="text-xs font-bold bg-secondary-dark text-white rounded-full px-3 py-1">{p.tag}</span>}</div>
                                <p className="text-text-muted mt-1">{p.workers}</p>
                                <p className="mt-4"><span className="text-4xl font-bold">{formatGBP(p.price)}</span><span className="text-text-muted"> /month</span></p>
                                <ul className="mt-4 space-y-2 text-sm">
                                    {p.features.slice(0, 3).map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-secondary-dark shrink-0" aria-hidden="true" />{f}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Link to="/pricing" className="inline-flex items-center gap-2 mt-8 font-semibold text-secondary-dark">See full plans, add-ons and promises <ArrowRight size={18} aria-hidden="true" /></Link>
                </div>
            </section>

            {/* Security */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark mb-2">Security and UK GDPR</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">Worker data is sensitive. We protect it like our own.</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {security.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 grid place-items-center mb-4"><Icon className="text-teal-700" size={24} aria-hidden="true" /></div>
                                <h3 className="font-bold mb-1">{title}</h3>
                                <p className="text-text-muted text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/security" className="inline-flex items-center gap-2 mt-8 font-semibold text-secondary-dark">Read our security summary <ArrowRight size={18} aria-hidden="true" /></Link>
                </div>
            </section>

            {/* CEO promise */}
            <section className="bg-[#0B1220] text-white py-20">
                <motion.div {...fadeUp} className="container mx-auto px-4 md:px-6 max-w-4xl grid md:grid-cols-[auto_1fr] gap-8 items-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-900 grid place-items-center text-3xl font-extrabold" aria-hidden="true">SA</div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-teal-300 mb-3">Our promise</p>
                        <p className="text-xl md:text-2xl leading-relaxed text-slate-100">“We built Mind the Job because small agencies deserve the same compliance support as the big firms, without the big-firm price. If we don’t save you real time, you don’t pay for it.”</p>
                        <p className="mt-4 font-semibold">Shahriar Arafat <span className="text-slate-400 font-normal">· CEO, Mind the Job</span></p>
                    </div>
                </motion.div>
            </section>

            {/* FAQ */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8 text-center">Questions agencies ask us</h2>
                    <Faq />
                </div>
            </section>

            {/* Training */}
            <section className="bg-teal-50 py-16">
                <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                    <div className="max-w-2xl">
                        <GraduationCap className="text-secondary-dark mb-2" size={30} aria-hidden="true" />
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Train your team, often fully funded</h2>
                        <p className="text-slate-700">When our tracker spots a training need, we can introduce you to our training partners, including funded apprenticeships.</p>
                    </div>
                    <Link to="/training" className="inline-flex justify-center rounded-xl bg-primary text-white font-semibold px-6 py-4">See training options</Link>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-[#0B1220] text-white py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Find out how many hours you could get back</h2>
                    <p className="text-lg text-teal-50 mb-8">A free 30-minute Compliance Health Check, with a 1-page report within 24 hours. No obligation.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/health-check" className="rounded-xl bg-amber-400 text-primary font-bold px-6 py-4 hover:bg-amber-300">Book my free Health Check</Link>
                        <Link to="/demo" className="rounded-xl border border-white text-white font-bold px-6 py-4">Try the free demo</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
