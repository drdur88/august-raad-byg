"use client";

import { useEffect, useState } from "react";
import EmailCaptureForm from "./EmailCaptureForm";

const STORAGE_KEY = "arb-exit-intent-shown";
const FALLBACK_DELAY_MS = 45_000;

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    function trigger() {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }

    function onMouseOut(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }

    window.addEventListener("mouseout", onMouseOut);
    // Fallback for touch devices, which never fire a top-edge mouseout.
    const fallback = setTimeout(trigger, FALLBACK_DELAY_MS);

    return () => {
      window.removeEventListener("mouseout", onMouseOut);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={() => setOpen(false)}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup-close"
          onClick={() => setOpen(false)}
          aria-label="Luk"
        >
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <p className="eyebrow mb-4">Gratis guide</p>
        <h3 className="mb-3 font-[var(--font-heading)] text-[1.7rem] font-bold leading-[1.15] text-[var(--navy)]">
          Sådan planlægger du <em className="text-[var(--gold)] not-italic">dit byggeprojekt</em>
        </h3>
        <p className="copy-sm mb-6">
          Få vores gratis guide med 5 konkrete trin, typiske faldgruber og spørgsmål du bør
          stille din håndværker — direkte i din indbakke.
        </p>

        <EmailCaptureForm
          source="lead_magnet"
          ctaLabel="Send mig guiden →"
          successMessage="Tjek din indbakke — guiden er på vej!"
          downloadHref="/downloads/byggeguide.pdf"
        />
      </div>
    </div>
  );
}
