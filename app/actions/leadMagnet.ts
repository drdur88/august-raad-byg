"use server";

import { readFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { insertLead, type LeadSource } from "../lib/supabase";

interface SubscribeInput {
  email: string;
  source: Extract<LeadSource, "newsletter" | "lead_magnet">;
}

export async function subscribeEmail({ email, source }: SubscribeInput) {
  await insertLead({ source, email });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[${source}]`, email);
    return { success: true };
  }

  const resend = new Resend(apiKey);

  try {
    if (source === "lead_magnet") {
      const pdfBuffer = await readFile(
        path.join(process.cwd(), "public", "downloads", "byggeguide.pdf")
      );

      await resend.emails.send({
        from: "August Råd & Byg <onboarding@resend.dev>",
        to: email,
        subject: "Din guide: Sådan planlægger du dit byggeprojekt",
        text:
          "Tak for din interesse! Din gratis guide er vedhæftet dette brev.\n\n" +
          "Har du spørgsmål til dit projekt, er du altid velkommen til at kontakte os på " +
          "info@augustraadogbyg.dk eller +45 12 34 56 78.\n\n" +
          "Med venlig hilsen\nAugust Råd & Byg",
        attachments: [
          { filename: "byggeguide.pdf", content: pdfBuffer },
        ],
      });

      // Notify the business of the new lead separately from the attachment email above.
      await resend.emails.send({
        from: "August Råd & Byg <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL ?? "info@augustraadogbyg.dk",
        subject: `Nyt lead-magnet download: ${email}`,
        text: `${email} downloadede byggeguiden.`,
      });
    } else {
      await resend.emails.send({
        from: "August Råd & Byg <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL ?? "info@augustraadogbyg.dk",
        subject: `Nyt nyhedsbrev-tilmelding: ${email}`,
        text: `${email} tilmeldte sig nyhedsbrevet.`,
      });
    }

    return { success: true };
  } catch (err) {
    console.error("[Resend – lead magnet]", err);
    return { success: false, error: "Noget gik galt. Prøv igen." };
  }
}
