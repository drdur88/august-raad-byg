"use server";

import { Resend } from "resend";
import { insertLead } from "../lib/supabase";

export async function sendContactEmail(data: {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  budgetRange?: string;
  referralSource?: string;
  preferredContactTime?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  await insertLead({
    source: "contact_form",
    name: data.name,
    phone: data.phone,
    email: data.email,
    project_type: data.projectType,
    message: data.message,
    budget_range: data.budgetRange,
    referral_source: data.referralSource,
    preferred_contact_time: data.preferredContactTime,
  });

  // If no API key is configured yet, log and pretend success
  if (!apiKey) {
    console.log("[Contact form]", data);
    return { success: true };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "August Råd & Byg <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "info@augustraadogbyg.dk",
      replyTo: data.email,
      subject: `Ny henvendelse: ${data.projectType || "Generel"} – ${data.name}`,
      text: [
        `Navn:              ${data.name}`,
        `Telefon:           ${data.phone || "–"}`,
        `E-mail:            ${data.email}`,
        `Projekttype:       ${data.projectType || "–"}`,
        `Budget:            ${data.budgetRange || "–"}`,
        `Hørt om os via:    ${data.referralSource || "–"}`,
        `Foretrukken tid:   ${data.preferredContactTime || "–"}`,
        ``,
        `Besked:`,
        data.message,
      ].join("\n"),
    });

    return { success: true };
  } catch (err) {
    console.error("[Resend]", err);
    return { success: false, error: "Kunne ikke sende besked. Prøv igen." };
  }
}
