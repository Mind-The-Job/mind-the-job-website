import { useState } from 'react';
import { Link } from 'react-router-dom';

const inputClass = 'w-full min-h-[44px] rounded-xl border border-slate-300 px-3 text-base focus:outline-none focus:ring-2 focus:ring-secondary';

// One form for demo requests, Health Check bookings and plan registrations.
// Sends to /api/lead, which validates the data and emails the team.
export const LeadForm = ({ type, submitLabel, onSuccess, extra = {}, showMessage = false, children }) => {
    const [values, setValues] = useState({
        name: '', email: '', phone: '', company: '', companyNumber: '', workers: 'Up to 40', message: '',
        consent: false, marketing: false, website: '',
    });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const set = (key) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues((v) => ({ ...v, [key]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!values.consent) {
            setError('Please accept the terms and privacy notice.');
            return;
        }
        setStatus('sending');
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, ...extra, type }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
            setStatus('sent');
            if (onSuccess) onSuccess(values);
        } catch (err) {
            setStatus('idle');
            setError(err.message);
        }
    };

    if (status === 'sent' && !onSuccess) {
        return (
            <div role="status" className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-900">
                <p className="font-bold text-lg">Thank you, we've received your request.</p>
                <p className="mt-2">We'll reply within 1 working hour (Monday to Friday, 9am to 5:30pm). A confirmation is on its way to your inbox.</p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="space-y-4" noValidate>
            {children}
            <div>
                <label htmlFor={`${type}-name`} className="block text-sm font-semibold mb-1">Full name</label>
                <input id={`${type}-name`} className={inputClass} autoComplete="name" required value={values.name} onChange={set('name')} />
            </div>
            <div>
                <label htmlFor={`${type}-email`} className="block text-sm font-semibold mb-1">Work email</label>
                <input id={`${type}-email`} type="email" className={inputClass} autoComplete="email" required value={values.email} onChange={set('email')} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`${type}-company`} className="block text-sm font-semibold mb-1">Agency name</label>
                    <input id={`${type}-company`} className={inputClass} autoComplete="organization" required value={values.company} onChange={set('company')} />
                </div>
                <div>
                    <label htmlFor={`${type}-crn`} className="block text-sm font-semibold mb-1">Companies House number</label>
                    <input id={`${type}-crn`} className={inputClass} inputMode="numeric" value={values.companyNumber} onChange={set('companyNumber')} />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor={`${type}-workers`} className="block text-sm font-semibold mb-1">Active workers</label>
                    <select id={`${type}-workers`} className={`${inputClass} bg-white`} value={values.workers} onChange={set('workers')}>
                        <option>Up to 40</option>
                        <option>41–120</option>
                        <option>121–300</option>
                        <option>More than 300</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={`${type}-phone`} className="block text-sm font-semibold mb-1">Phone (optional)</label>
                    <input id={`${type}-phone`} type="tel" className={inputClass} autoComplete="tel" value={values.phone} onChange={set('phone')} />
                </div>
            </div>
            {showMessage && (
                <div>
                    <label htmlFor={`${type}-message`} className="block text-sm font-semibold mb-1">Anything we should know? (optional)</label>
                    <textarea id={`${type}-message`} rows={3} className={`${inputClass} py-2`} value={values.message} onChange={set('message')} />
                </div>
            )}
            {/* Spam trap: hidden from people, filled in by bots */}
            <div className="hidden" aria-hidden="true">
                <label htmlFor={`${type}-website`}>Website</label>
                <input id={`${type}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>
            <div className="flex gap-3 items-start">
                <input id={`${type}-consent`} type="checkbox" className="mt-1 w-5 h-5" checked={values.consent} onChange={set('consent')} />
                <label htmlFor={`${type}-consent`} className="text-sm text-slate-700">
                    I agree to the <Link to="/terms" className="text-secondary-dark underline">terms</Link> and <Link to="/privacy" className="text-secondary-dark underline">privacy notice</Link>.
                </label>
            </div>
            <div className="flex gap-3 items-start">
                <input id={`${type}-marketing`} type="checkbox" className="mt-1 w-5 h-5" checked={values.marketing} onChange={set('marketing')} />
                <label htmlFor={`${type}-marketing`} className="text-sm text-slate-700">Send me compliance tips and updates (optional, unsubscribe anytime).</label>
            </div>
            {error && <p role="alert" className="text-red-700 font-semibold">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="w-full min-h-[50px] rounded-xl bg-amber-400 text-primary font-bold text-lg hover:bg-amber-300 transition-colors disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : submitLabel}
            </button>
        </form>
    );
};
