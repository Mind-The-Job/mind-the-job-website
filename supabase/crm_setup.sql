-- Mind the Job CRM: leads, client feedback and CRM admins.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Row Level Security is ON with no policies, so the public website keys
-- can never read or change these tables. Only the server (service role key,
-- kept in Vercel) can, after it has checked that the user is a CRM admin.

create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    type text not null check (type in ('demo', 'health-check', 'plan')),
    name text not null,
    email text not null,
    phone text,
    company text not null,
    company_number text,
    workers text,
    plan text,
    billing text,
    message text,
    marketing boolean not null default false,
    status text not null default 'New'
        check (status in ('New', 'Contacted', 'Health Check booked', 'Proposal sent', 'Won', 'Lost')),
    notes text,
    updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create table if not exists public.feedback (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    lead_id uuid references public.leads (id) on delete set null,
    rating smallint check (rating between 1 and 5),
    recommend smallint check (recommend between 0 and 10),
    comment text,
    source text not null default 'email'
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);

create table if not exists public.crm_admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    added_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.feedback enable row level security;
alter table public.crm_admins enable row level security;

-- Nobody using the public keys gets any access.
revoke all on public.leads, public.feedback, public.crm_admins from anon, authenticated;

-- Make the company owner a CRM admin (the account must exist first:
-- sign in once at /admin with the email link).
insert into public.crm_admins (user_id)
select id from auth.users where lower(email) = 'shahriar@mindthejob.com'
on conflict do nothing;
