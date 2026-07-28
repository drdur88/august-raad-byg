"use server";

import { Resend } from "resend";
import { insertLead } from "../lib/supabase";

export interface LeadData {
  projectType: string;
  size: number;
  postalCode: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  estimateLow: string;
  estimateHigh: string;
  referralSource?: string;
}

const projectTypeLabels: Record<string, string> = {
  nybyggeri:   "Nybyggeri",
  renovering:  "Renovering",
  tilbygning:  "Tilbygning",
  raadgivning: "Byggerådgivning",
  maler:       "Malerarbejde",
  tommer:      "Tømrerarbejde",
  vvs_el:      "VVS & el-installation",
};

const timingLabels: Record<string, string> = {
  snarest:  "Snarest muligt",
  "3-6":    "3–6 måneder",
  "6-12":   "6–12 måneder",
  overslag: "Bare et overslag",
};

export async function sendLeadEmail(
  data: LeadData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  await insertLead({
    source: "price_calculator",
    name: data.name,
    phone: data.phone,
    email: data.email,
    project_type: projectTypeLabels[data.projectType] ?? data.projectType,
    size_m2: data.size,
    postal_code: data.postalCode,
    timing: timingLabels[data.timing] ?? data.timing,
    estimate_low: data.estimateLow,
    estimate_high: data.estimateHigh,
    referral_source: data.referralSource,
  });

  if (!apiKey) {
    console.log("[Tilbudsberegner lead]", data);
    return { success: true };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from:    "August Råd & Byg <onboarding@resend.dev>",
      to:      process.env.CONTACT_EMAIL ?? "info@augustraadogbyg.dk",
      replyTo: data.email,
      subject: `Nyt prisestimat-lead: ${projectTypeLabels[data.projectType] ?? data.projectType} – ${data.name}`,
      text: [
        "══ TILBUDSBEREGNER-LEAD ══",
        "",
        `Navn:          ${data.name}`,
        `Telefon:       ${data.phone}`,
        `E-mail:        ${data.email}`,
        "",
        `Projekttype:   ${projectTypeLabels[data.projectType] ?? data.projectType}`,
        `Størrelse:     ${data.size} m²`,
        `Postnummer:    ${data.postalCode}`,
        `Tidsramme:     ${timingLabels[data.timing] ?? data.timing}`,
        `Hørt om os via: ${data.referralSource || "–"}`,
        "",
        `Estimeret interval: ${data.estimateLow} – ${data.estimateHigh}`,
      ].join("\n"),
    });

    return { success: true };
  } catch (err) {
    console.error("[Resend – lead]", err);
    return { success: false, error: "Kunne ikke sende. Prøv igen." };
  }
}
