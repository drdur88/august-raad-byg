"use server";

import { Resend } from "resend";

export async function sendContactEmail(data: {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

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
        `Navn:        ${data.name}`,
        `Telefon:     ${data.phone || "–"}`,
        `E-mail:      ${data.email}`,
        `Projekttype: ${data.projectType || "–"}`,
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
