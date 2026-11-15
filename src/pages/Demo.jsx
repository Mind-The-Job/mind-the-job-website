import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { LeadForm } from '../components/compliance/LeadForm';

export const Demo = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-surface-muted pt-36 pb-20">
            <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
                <section className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark">Free 14-day demo · no card needed</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">See Compliance Autopilot work before you pay a penny</h1>
                    <p className="text-lg text-text-muted">Explore a sample agency, watch the AI check documents in seconds and see a sample monthly report.</p>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                        <h2 className="font-bold text-lg mb-3">In the free demo you can</h2>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700">
                            <li>Use the dashboard with 20 sample workers</li>
                            <li>Try the AI check on sample documents</li>
                            <li>Practise approving and rejecting documents</li>
                            <li>View a sample monthly savings report</li>
                        </ul>
                    </div>
                    <div className="bg-primary text-slate-200 rounded-2xl p-6">
                        <h2 className="font-bold text-lg text-white mb-2">The full service, for registered clients</h2>
                        <p>Your real workers, candidate messages 24/7, DBS and right-to-work checks, holiday and shift records, audit packs, exports and a named specialist. From £295 a month.</p>
                        <Link to="/pricing" className="inline-block mt-3 font-semibold text-teal-300 underline">See plans</Link>
                    </div>
                </section>
                <section className="bg-white border border-slate-200 rounded-3xl p-7">
                    <h2 className="text-2xl font-bold text-primary mb-4">Start your free demo</h2>
                    <LeadForm type="demo" submitLabel="Start free demo" onSuccess={() => navigate('/demo/app')} />
                    <div className="mt-5 flex gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-950">
                        <AlertTriangle size={20} className="shrink-0" aria-hidden="true" />
                        <p>For safety, the demo uses sample data only and runs in your browser. Nothing you try in the demo is uploaded to us.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};
