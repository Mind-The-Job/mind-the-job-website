import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { plans, addOns, promises, formatGBP } from '../data/compliance';
import { LeadForm } from '../components/compliance/LeadForm';

export const Pricing = () => {
    const [annual, setAnnual] = useState(true);
    const [selected, setSelected] = useState('growth');
    const plan = plans.find((p) => p.id === selected) || plans[1];

    const toggleClass = (on) => `min-h-[44px] px-4 rounded-lg font-semibold ${on ? 'bg-white text-primary shadow' : 'text-slate-600'}`;

    return (
        <div className="bg-surface-muted pt-36 pb-20">
            <div className="container mx-auto px-4 md:px-6 space-y-16">
                <header className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Simple plans. No surprises.</h1>
                        <p className="text-lg text-text-muted">Prices per month by number of active workers, plus VAT. Choose an annual plan and pay no setup fee. Not ready? <Link to="/demo" className="text-secondary-dark font-semibold underline">Try the free 14-day demo</Link> first.</p>
                    </div>
                    <div role="group" aria-label="Billing option" className="flex bg-slate-200 rounded-xl p-1 gap-1 self-start">
                        <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={toggleClass(annual)}>Annual: £0 setup</button>
                        <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={toggleClass(!annual)}>Monthly rolling</button>
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((p) => {
                        const chosen = p.id === selected;
                        return (
                            <div key={p.id} className={`rounded-2xl p-7 flex flex-col gap-4 ${chosen ? 'border-2 border-secondary-dark bg-teal-50' : 'border border-slate-200 bg-white'}`}>
                                <div className="flex justify-between items-center"><h2 className="text-2xl font-bold">{p.name}</h2>{p.tag && <span className="text-xs font-bold bg-secondary-dark text-white rounded-full px-3 py-1">{p.tag}</span>}</div>
                                <p className="text-text-muted">{p.workers}</p>
                                <p><span className="text-4xl font-bold">{formatGBP(p.price)}</span><span className="text-text-muted"> /month</span></p>
                                <p className="text-sm font-semibold text-secondary-dark">{annual ? '£0 setup on the annual plan' : `+ ${formatGBP(p.setupMonthly)} one-off setup, 3-month minimum`}</p>
                                <ul className="space-y-2 text-sm flex-1">
                                    {p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className="text-secondary-dark shrink-0" aria-hidden="true" />{f}</li>)}
                                </ul>
                                <button type="button" aria-pressed={chosen} onClick={() => { setSelected(p.id); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }); }} className={`min-h-[46px] rounded-xl font-bold ${chosen ? 'bg-secondary-dark text-white' : 'border border-secondary-dark text-secondary-dark bg-white'}`}>
                                    {chosen ? 'Selected' : `Choose ${p.name}`}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <section className="grid lg:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Add-ons</h2>
                        <ul className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200">
                            {addOns.map((a) => (
                                <li key={a.name} className="p-4 flex justify-between gap-4"><span><strong>{a.name}</strong><br /><span className="text-sm text-text-muted">{a.note}</span></span><span className="font-semibold text-right">{a.price}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Our Service Promise</h2>
                        <ul className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200">
                            {promises.map((p) => (
                                <li key={p.label} className="p-4 flex justify-between gap-4"><span>{p.label}</span><span className="font-semibold text-right">{p.value}</span></li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section id="register" className="grid lg:grid-cols-2 gap-10 items-start">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-primary">Register for the full service: {plan.name}</h2>
                        <ol className="space-y-3">
                            {[
                                ['Choose your plan', 'Switch plans any time as you grow.'],
                                ['Register your agency', 'We check your details with Companies House and contact you within 1 working hour.'],
                                ['Sign online', 'Service agreement, Data Processing Agreement and data protection impact assessment.'],
                                ['Set up Direct Debit', 'Your first monthly payment is only taken on your go-live day.'],
                            ].map(([t, d], i) => (
                                <li key={t} className="bg-white border border-slate-200 rounded-xl p-4"><p className="text-xs font-bold text-secondary-dark">STEP {i + 1}</p><p className="font-semibold">{t}</p><p className="text-sm text-text-muted">{d}</p></li>
                            ))}
                        </ol>
                        <p className="text-sm text-text-muted">Then we hold a kickoff call within 2 working days and go live within 14 days, or your first month is free.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-7">
                        <LeadForm type="plan" submitLabel={`Register for ${plan.name}`} extra={{ plan: plan.name, billing: annual ? 'Annual' : 'Monthly rolling' }} showMessage>
                            <p className="rounded-xl bg-teal-50 p-3 text-sm text-teal-900"><strong>{plan.name}</strong>, {formatGBP(plan.price)} a month + VAT, {annual ? 'annual plan, £0 setup' : `monthly rolling, ${formatGBP(plan.setupMonthly)} setup`}.</p>
                        </LeadForm>
                    </div>
                </section>
            </div>
        </div>
    );
};
