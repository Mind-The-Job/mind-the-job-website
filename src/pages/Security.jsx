const sections = [
    {
        title: 'Our role under UK GDPR',
        items: [
            'Your agency is the data controller. Mind the Job is your data processor, acting only on your written instructions.',
            'Every client signs a Data Processing Agreement, and we complete a data protection impact assessment together.',
            'We publish our list of sub-processors and tell you before adding a new one.',
            'We use UK or EU data regions wherever our tools offer them, with the right safeguards where they don’t.',
        ],
    },
    {
        title: 'How every document is handled',
        items: [
            'Candidates get a unique upload link that expires after 7 days. We never ask for passwords or bank details by message.',
            'Files are encrypted in transit and at rest, and never sent as email attachments.',
            'Identity and right-to-work checks run through a certified UK provider.',
            'The AI only sees what a task needs. A named person at your agency approves every document, and every action is logged.',
            'Documents are deleted automatically at the end of your retention schedule.',
        ],
    },
    {
        title: 'Protecting our systems',
        items: [
            'Multi-factor login on every account, with no shared passwords.',
            'Access keys kept in a secure vault, unique to each client and rotated every 90 days.',
            'Each agency has its own separate workspace, so one client can never see another’s data.',
            'Audit logs, alerts for unusual activity and a monthly access review.',
            'Daily backups with quarterly restore tests.',
        ],
    },
    {
        title: 'If something goes wrong',
        items: [
            'We contain the issue straight away and tell you within 24 hours, with the facts we know.',
            'We help you decide whether to report to the ICO, which must happen within 72 hours where people are at risk.',
            'We investigate, fix the cause and share a written incident report.',
        ],
    },
];

export const Security = () => (
    <div className="bg-surface-muted pt-36 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
            <header>
                <p className="text-sm font-semibold uppercase tracking-wider text-secondary-dark mb-2">Security and data protection</p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Worker data is sensitive. Here's how we protect it.</h1>
                <p className="text-lg text-text-muted">DBS details, passports and visas are some of the most sensitive data an agency holds. These standards are written into every client contract.</p>
            </header>
            {sections.map((s) => (
                <section key={s.title} className="bg-white border border-slate-200 rounded-2xl p-7">
                    <h2 className="text-2xl font-bold text-primary mb-4">{s.title}</h2>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </section>
            ))}
            <p className="text-sm text-text-muted">Certifications are listed here only once they are awarded. Questions about security? Email hallo@mindthejob.com.</p>
        </div>
    </div>
);
