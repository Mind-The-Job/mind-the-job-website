// Server-only database helpers (Supabase REST). The service role key lives
// only in Vercel's environment variables and is never sent to the browser.

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export const dbReady = () => Boolean(SUPABASE_URL && SERVICE_KEY);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v) => typeof v === 'string' && UUID.test(v);

async function rest(path, { method = 'GET', body, prefer } = {}) {
    if (!dbReady()) throw new Error('Database is not configured');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        method,
        headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            'Content-Type': 'application/json',
            ...(prefer ? { Prefer: prefer } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Database error ${res.status}: ${text.slice(0, 200)}`);
    }
    if (res.status === 204) return null;
    return res.json();
}

export async function insertRow(table, row) {
    const rows = await rest(table, { method: 'POST', body: row, prefer: 'return=representation' });
    return rows?.[0] || null;
}

export async function updateRow(table, id, changes) {
    const rows = await rest(`${table}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: changes,
        prefer: 'return=representation',
    });
    return rows?.[0] || null;
}

export async function selectRows(table, query = '') {
    return rest(`${table}?${query}`);
}

// Check a signed-in user's access token and confirm they are a CRM admin.
export async function getAdmin(request) {
    const auth = request.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token || !dbReady()) return null;
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { apikey: ANON_KEY || SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const user = await res.json();
    if (!isUuid(user?.id)) return null;
    const admins = await selectRows('crm_admins', `select=user_id&user_id=eq.${user.id}`);
    return admins?.length ? { id: user.id, email: user.email } : null;
}
