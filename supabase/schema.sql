-- August Råd & Byg — lead storage schema
--
-- Run this once in your Supabase project's SQL editor (Dashboard → SQL Editor → New query).
-- It creates a single `leads` table that every form on the site writes to,
-- distinguished by the `source` column.

create table if not exists leads (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  source                  text not null, -- 'contact_form' | 'price_calculator' | 'newsletter' | 'lead_magnet'
  name                    text,
  phone                   text,
  email                   text,
  project_type            text,
  message                 text,
  size_m2                 integer,
  postal_code             text,
  timing                  text,
  estimate_low            text,
  estimate_high           text,
  budget_range            text,
  referral_source         text,
  preferred_contact_time  text
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_source_idx on leads (source);

-- Row-level security is on with no policies, so the table is only reachable
-- via the service role key from server-side code (Server Actions) — never
-- from the browser.
alter table leads enable row level security;
