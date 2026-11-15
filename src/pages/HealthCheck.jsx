import { Check } from 'lucide-react';
import { LeadForm } from '../components/compliance/LeadForm';

export const HealthCheck = () => (
    <div className="bg-surface-muted pt-36 pb-20">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
            <section className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">Free · 30 minutes · no obligation</p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">Book your free Compliance and Admin Health Check</h1>
                <p className="text-lg text-text-muted">We look at one worker file and your onboarding process, then send you a 1-page report within 24 hours.</p>
                <ul className="space-y-3">
                    {[
                        'How many hours your team spends chasing and checking documents',
                        'Where you may be exposed under the Employment Rights Act 2025 and the Fair Work Agency',
                        'Which documents are close to expiring',
                        'What you could save each month, in pounds',
                    ].map((t) => <li key={t} className="flex gap-3"><Check className="text-secondary-dark shrink-0 mt-1" size={20} aria-hidden="true" />{t}</li>)}
                </ul>
                <p className="text-sm text-text-muted">Please don't send any worker documents with this form. We'll agree a secure way to look at a sample file during the call.</p>
            </section>
            <section className="bg-white border border-slate-200 rounded-3xl p-7">
                <h2 className="text-2xl font-bold text-primary mb-4">Request your Health Check</h2>
                <LeadForm type="health-check" submitLabel="Book my free Health Check" showMessage />
            </section>
        </div>
    </div>
);
