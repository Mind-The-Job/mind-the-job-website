import { Link } from 'react-router-dom';

export const Training = () => (
    <div className="bg-surface-muted pt-36 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-10">
            <header className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark mb-2">Compliance plus training, in one place</p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Train your team, often fully funded</h1>
                <p className="text-lg text-text-muted">When our tracker spots a training need, we can introduce you to our training partners. Small employers can get apprenticeship training fully funded for staff under 25, and government payments may be available for new apprentices. Eligibility is checked by the training provider.</p>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
                <section className="bg-white border border-teal-200 rounded-2xl p-7 space-y-3">
                    <span className="inline-block rounded-full bg-teal-100 text-teal-900 text-xs font-bold px-3 py-1">Sister company</span>
                    <h2 className="text-2xl font-bold">Workforce Training &amp; Development</h2>
                    <p className="text-slate-700">A registered apprenticeship provider offering government-funded apprenticeships, including team leader programmes and food and drink training.</p>
                </section>
                <section className="bg-white border border-teal-200 rounded-2xl p-7 space-y-3">
                    <span className="inline-block rounded-full bg-teal-100 text-teal-900 text-xs font-bold px-3 py-1">Affiliate partner</span>
                    <h2 className="text-2xl font-bold">Prime College</h2>
                    <p className="text-slate-700">Care courses for carers, support workers and care team leaders, to keep your workers trained and placement-ready.</p>
                </section>
            </div>
            <section className="bg-white border border-slate-200 rounded-2xl p-7">
                <h2 className="text-xl font-bold mb-3">How introductions work</h2>
                <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                    <li>We talk through training needs at your Health Check or quarterly review.</li>
                    <li>With your consent, we introduce you to the right partner.</li>
                    <li>The partner checks eligibility, enrols your learners and delivers the training.</li>
                    <li>We track progress and certificates in your monthly compliance report.</li>
                </ol>
            </section>
            <p className="text-sm text-text-muted">Using a training partner is always your choice and never a condition of our service. We only share your details with your consent. We may receive a fee from our training partners for privately paid courses.</p>
            <Link to="/health-check" className="inline-flex rounded-xl bg-secondary-dark text-white font-bold px-6 py-4">Talk to us about training</Link>
        </div>
    </div>
);
