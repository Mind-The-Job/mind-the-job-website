// Shared helpers for the website's API routes.
// Files in /api that start with "_" are not exposed as routes by Vercel.

const ALLOWED_ORIGINS = [
    'https://mindthejob.com',
    'https://www.mindthejob.com',
];

// Escape user input before it is placed inside an HTML email.
export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function isEmail(value) {
    return typeof value === 'string'
        && value.length <= 254
        && /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[A-Za-z]{2,}$/.test(value);
}

// Trim, cap length and strip control characters from a text field.
export function cleanText(value, max = 500) {
    if (typeof value !== 'string') return '';
    // eslint-disable-next-line no-control-regex
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

// Only accept browser requests from our own site (and Vercel previews of it).
export function isAllowedOrigin(request) {
    const origin = request.headers.origin || '';
    if (!origin) return false;
    if (ALLOWED_ORIGINS.includes(origin)) return true;
    if (process.env.VERCEL_ENV !== 'production' && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return true;
    if (process.env.VERCEL_ENV === undefined && /^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
    return false;
}

// Simple per-instance rate limit. It slows down abuse but is not a full defence;
// add Vercel Firewall rate limiting or a captcha before heavy marketing.
const hits = new Map();
export function isRateLimited(request, limit = 5, windowMs = 10 * 60 * 1000) {
    const ip = (request.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > limit;
}

// Common checks for every POST form endpoint.
export function guardRequest(request, response) {
    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        return false;
    }
    if (!isAllowedOrigin(request)) {
        response.status(403).json({ error: 'Forbidden' });
        return false;
    }
    if (isRateLimited(request)) {
        response.status(429).json({ error: 'Too many requests. Please try again later.' });
        return false;
    }
    return true;
}

// Base URL for links in emails: the site the request came from, if it is ours.
export function siteUrl(request) {
    const origin = request.headers.origin || '';
    return isAllowedOrigin(request) && origin ? origin : 'https://www.mindthejob.com';
}

// Origin and rate-limit checks for admin and feedback endpoints (any method).
export function guardOrigin(request, response, limit = 60) {
    if (!isAllowedOrigin(request)) {
        response.status(403).json({ error: 'Forbidden' });
        return false;
    }
    if (isRateLimited(request, limit)) {
        response.status(429).json({ error: 'Too many requests. Please try again later.' });
        return false;
    }
    return true;
}
