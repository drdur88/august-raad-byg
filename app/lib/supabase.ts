import "server-only";
import { createClient } from "@supabase/supabase-js";

export type LeadSource = "contact_form";

export interface LeadRow {
  source: LeadSource;
  name?: string;
  phone?: string;
  email?: string;
  postal_code?: string;
  project_type?: string;
  message?: string;
  budget_range?: string;
  desired_start?: string;
}

/**
 * Best-effort insert into Supabase using the service role key, which bypasses
 * row-level security. Never call this from a "use client" component.
 * Silently no-ops when Supabase isn't configured yet, so lead storage stays
 * optional — forms keep working via email even without a database.
 */
export async function insertLead(row: LeadRow) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return;

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("leads").insert(row);
  if (error) console.error("[Supabase] Failed to store lead:", error.message);
}
