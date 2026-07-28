"use client";

import { useState, useRef, useEffect } from "react";
import { sendLeadEmail } from "../actions/sendLead";

/* ── Types ───────────────────────────────────────────────── */
type ProjectType = "nybyggeri" | "renovering" | "tilbygning" | "raadgivning" | "maler" | "tommer" | "vvs_el";
type Timing      = "snarest" | "3-6" | "6-12" | "overslag";

/* ── Static data ─────────────────────────────────────────── */
const projectTypes: { key: ProjectType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    key:   "nybyggeri",
    label: "Nybyggeri",
    desc:  "Nyt hus eller erhvervsbygning fra grunden",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    key:   "renovering",
    label: "Renovering",
    desc:  "Modernisering af din eksisterende bolig",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    key:   "tilbygning",
    label: "Tilbygning",
    desc:  "Udvidelse af eksisterende bygning",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="13" height="15" rx="1"/>
        <path d="M15 10h4a2 2 0 012 2v8a2 2 0 01-2 2h-4"/>
        <line x1="9" y1="7" x2="9" y2="3"/>
        <line x1="6" y1="3" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    key:   "raadgivning",
    label: "Rådgivning",
    desc:  "Uafhængig professionel byggerådgivning",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    key:   "maler",
    label: "Malerarbejde",
    desc:  "Maling af vægge, lofter og facader",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="11" height="6" rx="1"/>
        <line x1="7.5" y1="10" x2="7.5" y2="14"/>
        <rect x="5" y="14" width="5" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    key:   "tommer",
    label: "Tømrerarbejde",
    desc:  "Døre, vinduer, trapper og træarbejde",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20l7-7"/>
        <path d="M9 13l6.5-6.5a2.12 2.12 0 013 3L12 16"/>
        <path d="M15 6l3-3 4 4-3 3"/>
      </svg>
    ),
  },
  {
    key:   "vvs_el",
    label: "VVS & el",
    desc:  "Vand, varme og el-installation",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s7 8.5 7 13a7 7 0 11-14 0c0-4.5 7-13 7-13z"/>
      </svg>
    ),
  },
];

const timingOptions: { key: Timing; label: string }[] = [
  { key: "snarest",  label: "Snarest muligt" },
  { key: "3-6",      label: "3–6 måneder" },
  { key: "6-12",     label: "6–12 måneder" },
  { key: "overslag", label: "Bare et overslag" },
];

/* ── Pricing logic ───────────────────────────────────────── */
// Price range per m² (DKK)
const pricePerM2: Record<ProjectType, [number, number]> = {
  nybyggeri:   [14_000, 24_000],
  renovering:  [7_000,  16_000],
  tilbygning:  [11_000, 21_000],
  raadgivning: [400,    1_200],
  maler:       [200,    450],
  tommer:      [2_000,  6_000],
  vvs_el:      [800,    2_500],
};

// Minimum totals (DKK) so small projects look realistic
const minTotal: Record<ProjectType, [number, number]> = {
  nybyggeri:   [800_000, 1_200_000],
  renovering:  [60_000,  120_000],
  tilbygning:  [300_000, 500_000],
  raadgivning: [15_000,  40_000],
  maler:       [8_000,   20_000],
  tommer:      [25_000,  80_000],
  vvs_el:      [15_000,  50_000],
};

function getRegionalMultiplier(postal: string): number {
  const p = parseInt(postal, 10);
  if (!p || isNaN(p)) return 1;
  if (p >= 1000 && p <= 2999) return 1.20;  // Greater Copenhagen
  if (p >= 3000 && p <= 3999) return 1.10;  // North Zealand
  if (p >= 4000 && p <= 4999) return 1.00;  // Zealand
  if (p >= 5000 && p <= 5999) return 0.95;  // Funen
  if (p >= 6000 && p <= 6999) return 0.90;  // SW Jutland
  if (p >= 7000 && p <= 7999) return 0.95;  // Central Jutland
  if (p >= 8000 && p <= 8999) return 1.05;  // Aarhus area
  if (p >= 9000 && p <= 9999) return 0.90;  // North Jutland
  return 1;
}

function round10k(n: number) { return Math.round(n / 10_000) * 10_000; }

function calcEstimate(
  type: ProjectType,
  size: number,
  postal: string
): { low: number; high: number } {
  const m = getRegionalMultiplier(postal);
  const [pLow, pHigh] = pricePerM2[type];
  const [mLow, mHigh] = minTotal[type];
  return {
    low:  Math.max(mLow,  round10k(pLow  * size * m)),
    high: Math.max(mHigh, round10k(pHigh * size * m)),
  };
}

function fmtDKK(n: number) {
  return new Intl.NumberFormat("da-DK", {
    style:                 "currency",
    currency:              "DKK",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ── Component ───────────────────────────────────────────── */
export default function PriceCalculator() {
  const [step,        setStep]        = useState<1 | 2 | 3 | 4>(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [size,        setSize]        = useState(100);
  const [sizeInput,   setSizeInput]   = useState("100");
  const [timing,      setTiming]      = useState<Timing | null>(null);
  const [name,        setName]        = useState("");
  const [phone,       setPhone]       = useState("");
  const [email,       setEmail]       = useState("");
  const [postalCode,  setPostalCode]  = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [status,      setStatus]      = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg,    setErrorMsg]    = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll the card into view when step changes
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  /* ── Derived ── */
  const estimate =
    projectType && postalCode.length === 4
      ? calcEstimate(projectType, size, postalCode)
      : projectType
      ? calcEstimate(projectType, size, "")
      : null;

  /* ── Handlers ── */
  function handleSizeInput(val: string) {
    setSizeInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 10 && n <= 1000) setSize(n);
  }

  function nextFromStep1() {
    if (!projectType) return;
    setStep(2);
  }

  function nextFromStep2() {
    if (!timing) return;
    setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!projectType || !timing || !estimate) return;

    setStatus("sending");
    const result = await sendLeadEmail({
      projectType,
      size,
      postalCode,
      timing,
      name,
      phone,
      email,
      estimateLow:  fmtDKK(estimate.low),
      estimateHigh: fmtDKK(estimate.high),
      referralSource,
    });

    if (result.success) {
      setStatus("sent");
      setStep(4);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Noget gik galt. Prøv igen.");
    }
  }

  /* ── Progress bar ── */
  const progressPct = step === 1 ? 0 : step === 2 ? 33 : step === 3 ? 66 : 100;

  /* ── Render ── */
  return (
    <div ref={cardRef} className="calc-card">

      {/* ── Header with step indicator ── */}
      {step < 4 && (
        <div className="calc-header">
          <div className="calc-steps">
            {["Projekttype", "Størrelse & tid", "Dine oplysninger"].map((label, i) => {
              const n = i + 1;
              const done    = step > n;
              const current = step === n;
              return (
                <div key={label} className="calc-step-item">
                  <div
                    className={`calc-step-dot ${done ? "done" : current ? "active" : ""}`}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : n}
                  </div>
                  <span className={`calc-step-label ${current ? "active" : done ? "done" : ""}`}>
                    {label}
                  </span>
                  {i < 2 && <div className={`calc-step-line ${done ? "done" : ""}`} />}
                </div>
              );
            })}
          </div>
          <div className="calc-progress-bar">
            <div className="calc-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      {/* ══ STEP 1: Projekttype ══ */}
      {step === 1 && (
        <div className="calc-body">
          <h3 className="calc-question">Hvad ønsker du hjælp til?</h3>
          <div className="calc-type-grid">
            {projectTypes.map((pt) => (
              <button
                key={pt.key}
                type="button"
                className={`calc-type-card ${projectType === pt.key ? "selected" : ""}`}
                onClick={() => setProjectType(pt.key)}
              >
                <span className={`calc-type-icon ${projectType === pt.key ? "selected" : ""}`}>
                  {pt.icon}
                </span>
                <span className="calc-type-label">{pt.label}</span>
                <span className="calc-type-desc">{pt.desc}</span>
              </button>
            ))}
          </div>
          <div className="calc-footer">
            <button
              type="button"
              className="calc-btn-primary"
              onClick={nextFromStep1}
              disabled={!projectType}
            >
              Næste trin
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2: Størrelse + timing ══ */}
      {step === 2 && (
        <div className="calc-body">
          <h3 className="calc-question">Projektets omfang</h3>

          {/* Size slider */}
          <div className="calc-field">
            <label className="calc-label">
              Størrelse i m²
              <span className="calc-size-display">{size} m²</span>
            </label>
            <input
              type="range"
              min={10}
              max={500}
              value={size}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSize(v);
                setSizeInput(String(v));
              }}
              className="calc-slider"
            />
            <div className="calc-slider-labels">
              <span>10 m²</span>
              <span>
                Eller skriv præcist:&nbsp;
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={sizeInput}
                  onChange={(e) => handleSizeInput(e.target.value)}
                  className="calc-size-input"
                />
                &nbsp;m²
              </span>
              <span>500+ m²</span>
            </div>
          </div>

          {/* Timing */}
          <div className="calc-field" style={{ marginTop: "2rem" }}>
            <label className="calc-label">Hvornår ønsker du at gå i gang?</label>
            <div className="calc-timing-grid">
              {timingOptions.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`calc-timing-btn ${timing === t.key ? "selected" : ""}`}
                  onClick={() => setTiming(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="calc-footer">
            <button type="button" className="calc-btn-ghost" onClick={() => setStep(1)}>
              ← Tilbage
            </button>
            <button
              type="button"
              className="calc-btn-primary"
              onClick={nextFromStep2}
              disabled={!timing}
            >
              Næste trin
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 3: Kontaktoplysninger ══ */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="calc-body">
          <h3 className="calc-question">Dine oplysninger</h3>
          <p className="calc-sub">
            Vi sender dit estimat og kontakter dig for en uforpligtende snak.
          </p>

          <div className="calc-form-grid">
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-name">Navn *</label>
              <input
                id="calc-name"
                type="text"
                required
                placeholder="Dit fulde navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-phone">Telefon *</label>
              <input
                id="calc-phone"
                type="tel"
                required
                placeholder="+45 00 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-email">E-mail *</label>
              <input
                id="calc-email"
                type="email"
                required
                placeholder="din@email.dk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-postal">Postnummer</label>
              <input
                id="calc-postal"
                type="text"
                maxLength={4}
                placeholder="f.eks. 8000"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                className="form-input"
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calc-referral">Hvordan hørte du om os?</label>
              <select
                id="calc-referral"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                className="form-input"
              >
                <option value="">Vælg (valgfrit)</option>
                <option>Google-søgning</option>
                <option>Anbefaling fra bekendt</option>
                <option>Facebook / Instagram</option>
                <option>Tidligere kunde</option>
                <option>Andet</option>
              </select>
            </div>
          </div>

          {/* Live estimate preview */}
          {estimate && (
            <div className="calc-estimate-preview">
              <span className="calc-estimate-label">Foreløbigt estimat</span>
              <span className="calc-estimate-range">
                {fmtDKK(estimate.low)} – {fmtDKK(estimate.high)}
              </span>
              <span className="calc-estimate-note">
                Inkl. materialer og arbejdsløn. Ekskl. moms.
              </span>
            </div>
          )}

          {status === "error" && (
            <p className="calc-error">{errorMsg}</p>
          )}

          <div className="calc-footer">
            <button type="button" className="calc-btn-ghost" onClick={() => setStep(2)}>
              ← Tilbage
            </button>
            <button
              type="submit"
              className="calc-btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sender…" : "Beregn & send forespørgsel"}
              {status !== "sending" && (
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ══ STEP 4: Resultat ══ */}
      {step === 4 && estimate && (
        <div className="calc-body calc-result">
          {/* Check mark */}
          <div className="calc-result-icon">
            <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h3 className="calc-result-title">Dit prisestimat</h3>
          <p className="calc-result-sub">
            Baseret på <strong>{size} m² {projectTypes.find(p => p.key === projectType)?.label.toLowerCase()}</strong> i postnummer <strong>{postalCode || "DK"}</strong>
          </p>

          <div className="calc-result-range">
            <span className="calc-result-low">{fmtDKK(estimate.low)}</span>
            <span className="calc-result-dash">–</span>
            <span className="calc-result-high">{fmtDKK(estimate.high)}</span>
          </div>

          <p className="calc-result-note">
            Ekskl. moms · Inkl. materialer og arbejdsløn · Vejledende estimat baseret på lignende projekter
          </p>

          <div className="calc-result-divider" />

          <div className="calc-result-sent">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <p>
              Vi har modtaget din forespørgsel og vender tilbage inden for <strong>1 arbejdsdag</strong>.
            </p>
          </div>

          <div className="calc-footer" style={{ justifyContent: "center", marginTop: "2rem" }}>
            <a href="#contact" className="calc-btn-primary" style={{ textDecoration: "none" }}>
              Send en besked direkte →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
