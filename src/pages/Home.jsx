import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, ShieldCheck, MessageCircle, Users, Lock, KeyRound, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { plans, formatGBP } from '../data/compliance';

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
            <section className="bg-white pt-36 pb-20">
                <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">AI compliance and admin for UK staffing agencies</p>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">Get workers compliant and on shift faster, without hiring more admin staff.</h1>
                        <p className="text-lg md:text-xl text-text-muted max-w-xl">We set up and run AI that collects and checks candidate documents, tracks every expiry date and keeps your records ready for the Fair Work Agency. You approve. We do the chasing.</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link to="/health-check" className="inline-flex justify-center items-center rounded-xl bg-secondary-dark text-white font-semibold px-6 py-4 hover:bg-primary transition-colors">Book your free Compliance Health Check</Link>
                            <Link to="/demo" className="inline-flex justify-center items-center rounded-xl border border-slate-300 bg-white text-primary font-semibold px-6 py-4 hover:border-primary transition-colors">Try the free 14-day demo</Link>
                        </div>
                        <p className="text-sm text-text-muted">Live in 14 days · Annual plans have £0 setup · Built for care, nursing, education and industrial staffing</p>
                    </div>
                    <div className="bg-primary rounded-3xl p-6 text-slate-200 shadow-xl" aria-label="Example dashboard">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-semibold text-white">Worker compliance this week</p>
                            <p className="text-xs text-slate-400">Example view</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[['42', 'documents checked'], ['6', 'expiries caught'], ['9', 'workers cleared']].map(([n, l]) => (
                                <div key={l} className="bg-slate-800 rounded-xl p-3"><p className="text-2xl font-bold text-white">{n}</p><p className="text-xs text-slate-300">{l}</p></div>
                            ))}
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between gap-3 bg-slate-800 rounded-lg px-3 py-3"><span>A. Patel · Care assistant</span><span className="rounded-full bg-emerald-100 text-emerald-900 px-2 font-semibold">Cleared</span></li>
                            <li className="flex justify-between gap-3 bg-slate-800 rounded-lg px-3 py-3"><span>J. Okafor · Nurse</span><span className="rounded-full bg-amber-100 text-amber-900 px-2 font-semibold">DBS due in 12 days</span></li>
                            <li className="flex justify-between gap-3 bg-slate-800 rounded-lg px-3 py-3"><span>M. Silva · Support worker</span><span className="rounded-full bg-red-100 text-red-900 px-2 font-semibold">Right to work missing</span></li>
                        </ul>
                    </div>
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
                            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6">
                                <Icon className="text-secondary-dark mb-3" size={28} aria-hidden="true" />
                                <h3 className="text-lg font-bold mb-2">{title}</h3>
                                <p className="text-text-muted">{text}</p>
                            </div>
                        ))}
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
                            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6">
                                <Icon className="text-secondary-dark mb-3" size={26} aria-hidden="true" />
                                <h3 className="font-bold mb-1">{title}</h3>
                                <p className="text-text-muted text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/security" className="inline-flex items-center gap-2 mt-8 font-semibold text-secondary-dark">Read our security summary <ArrowRight size={18} aria-hidden="true" /></Link>
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
            <section className="bg-secondary-dark text-white py-20">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Find out how many hours you could get back</h2>
                    <p className="text-lg text-teal-50 mb-8">A free 30-minute Compliance Health Check, with a 1-page report within 24 hours. No obligation.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/health-check" className="rounded-xl bg-white text-primary font-bold px-6 py-4">Book my free Health Check</Link>
                        <Link to="/demo" className="rounded-xl border border-white text-white font-bold px-6 py-4">Try the free demo</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
