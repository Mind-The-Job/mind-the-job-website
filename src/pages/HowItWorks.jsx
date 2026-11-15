import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Clock, ShieldCheck, MessageCircle, Sparkles, UserCheck, BadgeCheck, ArrowRight, Check, Smartphone, LayoutDashboard, Database, Mail, Table } from 'lucide-react';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
};

const goals = [
    { icon: Clock, title: 'Workers cleared in days, not weeks', text: 'Every day a worker waits for paperwork is a shift you can’t fill. We aim to clear new starters as soon as their documents arrive.' },
    { icon: Target, title: '8+ hours a week back for your team', text: 'Less chasing, opening attachments and updating spreadsheets. If we don’t save you 8 hours a week within 60 days, your next month is free.' },
    { icon: ShieldCheck, title: 'Always audit-ready, always safe', text: 'Nothing expires unnoticed, every decision is logged, and worker data is handled under a signed Data Processing Agreement.' },
];

const beforeDay1 = [
    ['Free Compliance Health Check (30 minutes)', 'We look at one worker file and how you onboard today. Within 24 hours you get a 1-page report showing the hours you lose and where you may be exposed.'],
    ['Try the free demo', 'It uses sample data only, so you can see the approvals screen before you commit.'],
    ['Choose your plan and register', 'Pick a plan on the Pricing page. We reply within 1 working hour.'],
    ['Sign online', 'Your service agreement and our Data Processing Agreement. Nothing starts with worker data until both are signed.'],
    ['Send us your checklist', 'The documents each of your clients requires per role, such as DBS, right to work, training certificates and references.'],
];

const setup = [
    ['Day 1', 'Kick-off call; your secure client portal login with two-step sign-in', 'Join the call; name who approves documents', '45 min'],
    ['Days 2–4', 'Build your document checklists per client and role; set up WhatsApp messages', 'Check the checklists and wording', '30 min'],
    ['Days 5–7', 'Load your current workers and expiry dates from your CRM export or spreadsheet', 'Send us the export', '15 min'],
    ['Days 8–10', 'Test run with 5 to 10 real workers', 'Approve their documents in the portal', '30 min'],
    ['Days 11–13', 'Fix anything the test found; train your team', 'Join a 30-minute training session', '30 min'],
    ['Day 14', 'Go live for all new and existing workers', 'Tell your workers to expect our WhatsApp message', '15 min'],
];

const flow = [
    { icon: Smartphone, title: 'Your worker', text: 'Sends photos of documents on WhatsApp, any time, 24/7' },
    { icon: Sparkles, title: 'Mind the Job AI', text: 'Reads and checks every document, and flags anything unusual' },
    { icon: UserCheck, title: 'Your team', text: 'Approves or rejects in one tap in the client portal' },
    { icon: BadgeCheck, title: 'Cleared to work', text: 'Expiry reminders are set automatically', accent: true },
];

const tools = [
    { icon: Database, tool: 'Your recruitment CRM', stays: 'Placements, clients, shifts and pay', adds: 'Cleared status and expiry dates sent back to you as a weekly export, or by connection where your CRM allows' },
    { icon: Mail, tool: 'Email (Gmail, Outlook)', stays: 'Your inbox and client emails', adds: 'No more document attachments to open and file' },
    { icon: Table, tool: 'Spreadsheets', stays: 'Any reports you already use', adds: 'An up-to-date compliance tracker you can open any time' },
    { icon: MessageCircle, tool: 'WhatsApp', stays: 'Your own business chats', adds: 'A separate compliance number that chases workers for you' },
];

const weeks = [
    ['Week 3', 'First full week live. We check in by phone to fix anything that feels slow.'],
    ['Week 4', 'Your first monthly report: documents checked, workers cleared, expiries caught and hours saved.'],
    ['Week 6', 'Review call. We tune checklists and reminder timings to your clients.'],
    ['Week 8 (day 60)', 'Guarantee check. Under 8 hours a week saved means your next month is free.'],
    ['Every month after', 'A new report, plus updates when rules change, such as the Employment Rights Act 2025 and Fair Work Agency guidance.'],
];

const savings = [
    ['Staff time saved: 10 hours a week at £15 an hour', '£650'],
    ['Faster placements: 3 new workers a month cleared 5 days sooner, about £120 extra margin each', '£360'],
];

function SectionTitle({ eyebrow, title, text }) {
    return (
        <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark mb-2">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{title}</h2>
            {text && <p className="text-lg text-text-muted mt-3">{text}</p>}
        </div>
    );
}

export const HowItWorks = () => (
    <div className="bg-surface-muted text-text-main">
        {/* Mission */}
        <section className="relative overflow-hidden bg-[#0B1220] text-white pt-40 pb-20">
            <div aria-hidden="true" className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full bg-teal-500/20 blur-3xl" />
            <div className="relative container mx-auto px-4 md:px-6 max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-teal-300 mb-3">Our aim</p>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                    Small agencies deserve big-agency compliance, <span className="text-amber-400">without the big-agency price.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-2xl">You keep your current software. We take the chasing, checking and tracking off your team, and your workers only need WhatsApp. Here is exactly how it works, from your first call to your first month’s report.</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link to="/health-check" className="inline-flex justify-center items-center gap-2 rounded-xl bg-amber-400 text-slate-900 font-bold px-7 py-4 hover:bg-amber-300">Book your free Health Check<ArrowRight size={18} aria-hidden="true" /></Link>
                    <Link to="/demo" className="inline-flex justify-center items-center rounded-xl border border-white/25 bg-white/5 text-white font-semibold px-7 py-4 hover:bg-white/10">Try the free demo</Link>
                </div>
            </div>
        </section>

        {/* Goals */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Our goals for every client" title="Three promises we measure ourselves against" />
                <div className="grid md:grid-cols-3 gap-6">
                    {goals.map(({ icon: Icon, title, text }) => (
                        <motion.div {...fadeUp} key={title} className="rounded-2xl border border-slate-200 p-7">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 grid place-items-center mb-4"><Icon className="text-teal-700" size={24} aria-hidden="true" /></div>
                            <h3 className="text-xl font-bold mb-2">{title}</h3>
                            <p className="text-text-muted">{text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Who does what */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    ['Your workers', 'Use WhatsApp only. No app, no portal, no password.'],
                    ['Your team', 'Uses the Mind the Job client portal on our website to approve, see who is cleared and download audit packs.'],
                    ['Your software', 'Stays exactly as it is. We work alongside it.'],
                    ['Mind the Job', 'Sets everything up, runs it every day and sends you a report each month.'],
                ].map(([t, d]) => (
                    <div key={t} className="rounded-2xl bg-white border border-slate-200 p-6">
                        <p className="font-bold text-primary mb-1">{t}</p>
                        <p className="text-text-muted text-sm">{d}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Before day 1 */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Before day 1" title="From first call to signed, usually in under a week" />
                <ol className="grid md:grid-cols-5 gap-4">
                    {beforeDay1.map(([t, d], i) => (
                        <motion.li {...fadeUp} key={t} className="rounded-2xl bg-teal-50 p-6">
                            <p className="w-9 h-9 rounded-full bg-teal-700 text-white grid place-items-center font-bold mb-3">{i + 1}</p>
                            <h3 className="font-bold mb-1">{t}</h3>
                            <p className="text-sm text-slate-700">{d}</p>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>

        {/* Setup */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Days 1 to 14" title="We set it up. You go live in two weeks." text="You spend about 3 hours in total over the first two weeks. We do the rest." />
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full min-w-[720px] text-left">
                        <thead className="bg-slate-50 text-sm text-text-muted">
                            <tr><th scope="col" className="p-4">When</th><th scope="col" className="p-4">What we do</th><th scope="col" className="p-4">What you do</th><th scope="col" className="p-4">Your time</th></tr>
                        </thead>
                        <tbody>
                            {setup.map(([when, we, you, time]) => (
                                <tr key={when} className="border-t border-slate-100 align-top">
                                    <th scope="row" className="p-4 font-bold text-primary whitespace-nowrap">{when}</th>
                                    <td className="p-4">{we}</td>
                                    <td className="p-4 text-text-muted">{you}</td>
                                    <td className="p-4 font-semibold whitespace-nowrap">{time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* Daily flow */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Every day" title="Every document passes a person before a worker is cleared" text="Your team only steps in to approve. Everything else runs on its own, day and night." />
                <ol className="grid md:grid-cols-4 gap-4 items-stretch">
                    {flow.map(({ icon: Icon, title, text, accent }, i) => (
                        <motion.li {...fadeUp} key={title} className={`relative rounded-2xl p-6 border ${accent ? 'border-2 border-teal-700 bg-teal-50' : 'border-slate-200 bg-white'}`}>
                            <Icon className={accent ? 'text-teal-700 mb-3' : 'text-slate-700 mb-3'} size={26} aria-hidden="true" />
                            <h3 className="font-bold mb-1">{title}</h3>
                            <p className="text-sm text-text-muted">{text}</p>
                            {i < flow.length - 1 && <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-400 bg-white rounded-full" size={24} aria-hidden="true" />}
                        </motion.li>
                    ))}
                </ol>
                <p className="mt-4 text-sm text-text-muted">If a document is rejected, the worker is automatically asked on WhatsApp for a new copy.</p>

                <div className="mt-12 rounded-3xl bg-[#0B1220] text-white p-8 md:p-10">
                    <h3 className="text-2xl font-bold mb-6">A typical day for your compliance lead</h3>
                    <ol className="space-y-4">
                        {[
                            ['8am', 'A WhatsApp summary arrives: who was cleared overnight, who is blocked, what expires this week.'],
                            ['Sign in', 'Open the client portal on mindthejob.com with two-step login.'],
                            ['Approve', 'Approve or reject the documents the AI has already checked. Each shows what was checked and anything unusual, in plain English.'],
                            ['No chasing', 'Workers who are missing something get reminders automatically, including evenings and weekends.'],
                            ['Audit ready', 'A client asks for proof? Download an audit pack for that worker.'],
                        ].map(([t, d]) => (
                            <li key={t} className="flex gap-4"><span className="shrink-0 w-28 font-bold text-amber-400">{t}</span><span className="text-slate-300">{d}</span></li>
                        ))}
                    </ol>
                    <p className="text-xs text-slate-400 mt-6">Some features depend on your plan. See the Pricing page for what each plan includes.</p>
                </div>
            </div>
        </section>

        {/* Keep your software */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Already have software?" title="Keep it. We work alongside it." text="Your CRM stays your record of placements, clients and pay. We handle the paperwork that feeds it. If your software already collects documents, we can take over just the chasing and checking." />
                <div className="grid md:grid-cols-2 gap-5">
                    {tools.map(({ icon: Icon, tool, stays, adds }) => (
                        <div key={tool} className="rounded-2xl bg-white border border-slate-200 p-6 flex gap-4">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-100 grid place-items-center"><Icon className="text-slate-700" size={22} aria-hidden="true" /></div>
                            <div>
                                <h3 className="font-bold mb-2">{tool}</h3>
                                <p className="text-sm"><span className="text-text-muted">Stays the same: </span>{stays}</p>
                                <p className="text-sm mt-1"><span className="font-semibold text-teal-800">We add: </span>{adds}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Weeks 3-8 */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Weeks 3 to 8" title="First results, and our guarantee" text="By week 8 you should see at least 8 hours a week back. If you don’t, your next month is free." />
                <ol className="relative border-l-2 border-teal-200 ml-3 space-y-8">
                    {weeks.map(([w, d]) => (
                        <li key={w} className="pl-8 relative">
                            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-teal-700 ring-4 ring-white" aria-hidden="true" />
                            <p className="font-bold text-primary">{w}</p>
                            <p className="text-text-muted">{d}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        {/* Savings */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-start">
                <div>
                    <SectionTitle eyebrow="How you save money" title="A care agency with 60 workers comes out about £415 a month ahead" text="On the Growth plan, before counting the admin hire it no longer needs. Your own numbers come from your free Health Check." />
                    <ul className="space-y-3">
                        {[
                            'No extra admin hire as you grow: a part-time administrator on 20 hours a week costs about £1,200 a month with employer costs.',
                            'Fewer lost shifts and contracts: a worker with an expired DBS or certificate can’t be placed.',
                            'Less audit stress: records are ready when a client or inspector asks.',
                        ].map((t) => <li key={t} className="flex gap-3"><Check className="text-teal-700 shrink-0 mt-1" size={20} aria-hidden="true" />{t}</li>)}
                    </ul>
                </div>
                <div className="rounded-3xl bg-white border border-slate-200 p-8">
                    <table className="w-full">
                        <caption className="sr-only">Worked example of monthly savings</caption>
                        <tbody>
                            {savings.map(([l, v]) => (
                                <tr key={l} className="border-b border-slate-100"><td className="py-3 pr-4">{l}</td><td className="py-3 text-right font-semibold whitespace-nowrap">{v}</td></tr>
                            ))}
                            <tr className="border-b border-slate-200"><th scope="row" className="py-3 text-left">Total benefit</th><td className="py-3 text-right font-bold">£1,010</td></tr>
                            <tr className="border-b border-slate-200"><td className="py-3">Growth plan, annual (plus VAT)</td><td className="py-3 text-right font-semibold whitespace-nowrap">–£595</td></tr>
                            <tr><th scope="row" className="pt-4 text-left text-lg">You are ahead by</th><td className="pt-4 text-right"><span className="text-3xl font-extrabold text-teal-700">£415</span><span className="block text-sm text-text-muted">about £4,980 a year</span></td></tr>
                        </tbody>
                    </table>
                    <p className="text-xs text-text-muted mt-4">Illustration only. Assumes £15 an hour staff cost and about £4 an hour agency margin on care shifts.</p>
                </div>
            </div>
        </section>

        {/* Data */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <SectionTitle eyebrow="Keeping worker data safe" title="You stay in control of your workers’ data" text="We only process it on your instructions, under a signed Data Processing Agreement." />
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        ['Signed DPA and DPIA', 'Before any real worker data is used.'],
                        ['A person decides', 'Someone at your agency approves every document; each decision is logged.'],
                        ['Locked-down access', 'Two-step sign-in, no shared passwords, every access logged.'],
                        ['Encrypted in transit', 'Only named Mind the Job staff can see your account.'],
                        ['Your rights, simply', 'Ask us to export or delete a worker’s data at any time.'],
                    ].map(([t, d]) => (
                        <div key={t} className="rounded-2xl border border-slate-200 p-5"><p className="font-bold mb-1">{t}</p><p className="text-sm text-text-muted">{d}</p></div>
                    ))}
                </div>
                <Link to="/security" className="inline-flex items-center gap-2 mt-8 font-semibold text-secondary-dark">Read our security summary <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
        </section>

        {/* Tips + CTA */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10">
                <div>
                    <SectionTitle eyebrow="Getting the most from us" title="Agencies that save the most do three things" />
                    <ul className="space-y-3">
                        {[
                            'Approve once a day, ideally after the 8am summary. Ten minutes keeps workers moving.',
                            'Send every new starter to us on day one, so nothing is collected by email any more.',
                            'Tell us when a client changes its requirements, and we update the checklist the same day.',
                            'Share the monthly report with your directors and key clients as proof of compliance.',
                            'Ask about training: when we spot a training gap, we can introduce you to our training partners, including funded apprenticeships.',
                        ].map((t) => <li key={t} className="flex gap-3"><Check className="text-teal-700 shrink-0 mt-1" size={20} aria-hidden="true" />{t}</li>)}
                    </ul>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-[#0B1220] text-white p-8 md:p-10 self-start">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to see your own numbers?</h2>
                    <p className="text-teal-50 mb-6">A free 30-minute Compliance Health Check, with a 1-page report within 24 hours. No obligation.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/health-check" className="rounded-xl bg-amber-400 text-slate-900 font-bold px-6 py-4 text-center hover:bg-amber-300">Book my free Health Check</Link>
                        <Link to="/pricing" className="rounded-xl border border-white text-white font-bold px-6 py-4 text-center">See plans</Link>
                    </div>
                    <p className="text-sm text-teal-100 mt-6">Questions? Email <a className="underline" href="mailto:hallo@mindthejob.com">hallo@mindthejob.com</a> or call <a className="underline" href="tel:+447780114420">+44 (0) 7780 114420</a>. We reply within 1 working hour, Monday to Friday, 9am to 5:30pm.</p>
                </div>
            </div>
        </section>
    </div>
);
