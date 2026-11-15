// Prices for MTJ Compliance Autopilot (per month, plus VAT).
export const plans = [
    {
        id: 'essentials',
        name: 'Essentials',
        workers: 'Up to 40 active workers',
        price: 295,
        setupMonthly: 495,
        features: [
            'AI document collection and checks',
            'WhatsApp and email reminders to candidates',
            'Expiry tracking at 60, 30 and 7 days',
            'Live dashboard and monthly savings report',
            'Email support, next working day',
        ],
    },
    {
        id: 'growth',
        name: 'Growth',
        tag: 'Most popular',
        workers: 'Up to 120 active workers',
        price: 595,
        setupMonthly: 795,
        features: [
            'Everything in Essentials',
            '24/7 AI WhatsApp assistant for candidates',
            'Holiday and shift records for the Employment Rights Act 2025',
            'Quarterly Fair Work Agency audit pack',
            'WhatsApp support within 2 working hours',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        workers: 'Up to 300 active workers, several branches',
        price: 995,
        setupMonthly: 1495,
        features: [
            'Everything in Growth',
            'AI CV screening and interview booking',
            'Connection to your recruitment CRM',
            'Priority same-day support and a named specialist',
        ],
    },
];

export const addOns = [
    { name: 'Mock Fair Work Agency audit', price: '£295 one-off', note: 'A fix list before a real inspection' },
    { name: 'Extra active workers', price: '£2.50 per worker a month', note: 'Above your plan limit' },
    { name: 'Extra branch', price: '£195 a month', note: 'For multi-site agencies' },
    { name: 'DBS and right-to-work checks', price: 'At cost, no markup', note: 'Through a certified UK provider' },
];

export const promises = [
    { label: 'First reply to any enquiry', value: 'Within 1 working hour' },
    { label: 'Health Check report', value: 'Within 24 hours' },
    { label: 'Go-live', value: '14 days, or your first month is free' },
    { label: 'Support reply (Growth and Pro)', value: 'Within 2 working hours' },
    { label: 'Fixes', value: 'Within 1 working day' },
    { label: 'Hours saved', value: '8+ a week within 60 days, or next month free' },
    { label: 'Data breach notice', value: 'Within 24 hours' },
];

export const formatGBP = (n) => `£${n.toLocaleString('en-GB')}`;
