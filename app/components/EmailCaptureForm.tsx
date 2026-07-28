"use client";

import { useState } from "react";
import { subscribeEmail } from "../actions/leadMagnet";

interface Props {
  source: "newsletter" | "lead_magnet";
  placeholder?: string;
  ctaLabel: string;
  successMessage: string;
  downloadHref?: string;
  variant?: "light" | "dark";
}

export default function EmailCaptureForm({
  source,
  placeholder = "din@email.dk",
  ctaLabel,
  successMessage,
  downloadHref,
  variant = "light",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const result = await subscribeEmail({ email, source });
    setStatus(result.success ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className={`text-sm font-light ${variant === "dark" ? "text-[rgba(255,255,255,.8)]" : "text-[var(--navy)]"}`}>
        <p className="mb-2">{successMessage}</p>
        {downloadHref && (
          <a
            href={downloadHref}
            download
            className="btn-primary inline-block px-6 py-3 text-[.75rem] font-medium tracking-[.12em] uppercase no-underline"
          >
            Download guiden nu →
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="form-input min-w-[220px] flex-1"
        style={
          variant === "dark"
            ? { background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.2)", color: "var(--white)" }
            : undefined
        }
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="form-submit"
        style={{ opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sender…" : ctaLabel}
      </button>
      {status === "error" && (
        <p className="w-full text-[.8rem] text-[#c0392b]">Noget gik galt. Prøv igen.</p>
      )}
    </form>
  );
}
