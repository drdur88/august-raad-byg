"use client";

import { useEffect, useState } from "react";
import { sendContactEmail } from "../actions/contact";
import { PREFILL_EVENT } from "./PackageCTA";

const labelStyle: React.CSSProperties = {
  fontSize: ".7rem",
  letterSpacing: ".15em",
  textTransform: "uppercase",
  color: "var(--grey)",
  fontWeight: 500,
  fontFamily: "var(--font-body)",
  display: "block",
  marginBottom: ".4rem",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: ".75rem",
  color: "#c0392b",
  marginTop: ".35rem",
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", postalCode: "",
    projectType: "", budgetRange: "", desiredStart: "", message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Prefills "Type af projekt" when a visitor clicks a package's CTA button
  // further up the page (see PackageCTA) — same-page event, no navigation.
  useEffect(() => {
    function onPrefill(e: Event) {
      const projectType = (e as CustomEvent<string>).detail;
      if (projectType) setForm((f) => ({ ...f, projectType }));
    }
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Udfyld dit navn.";
    if (!form.email.trim()) {
      errors.email = "Udfyld din e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Indtast en gyldig e-mail.";
    }
    if (!form.postalCode.trim()) {
      errors.postalCode = "Udfyld postnummer.";
    } else if (!/^\d{4}$/.test(form.postalCode.trim())) {
      errors.postalCode = "Postnummer skal være 4 cifre.";
    }
    if (!form.message.trim()) errors.message = "Beskriv kort dit projekt.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");
    const result = await sendContactEmail(form);
    if (result.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Noget gik galt.");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "3.5rem 2rem" }} role="status">
        <div
          style={{
            width: 56, height: 56,
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.2rem",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 300, color: "var(--navy)", marginBottom: ".5rem" }}>
          Tak for din henvendelse!
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: ".88rem", color: "var(--grey)", fontWeight: 300 }}>
          Vi vender tilbage til dig inden for 24 timer for at booke din gratis afklaringssamtale.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <div className="grid-form-row">
        <div>
          <label style={labelStyle} htmlFor="name">Navn</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
            placeholder="Dit fulde navn" className="form-input"
            aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
          {fieldErrors.name && <p id="name-error" style={errorStyle}>{fieldErrors.name}</p>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="+45 00 00 00 00" className="form-input" />
        </div>
      </div>

      <div className="grid-form-row">
        <div>
          <label style={labelStyle} htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="din@email.dk" className="form-input"
            aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
          {fieldErrors.email && <p id="email-error" style={errorStyle}>{fieldErrors.email}</p>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="postalCode">Postnummer</label>
          <input id="postalCode" name="postalCode" type="text" inputMode="numeric" value={form.postalCode} onChange={handleChange}
            placeholder="F.eks. 8000" className="form-input"
            aria-invalid={!!fieldErrors.postalCode} aria-describedby={fieldErrors.postalCode ? "postalCode-error" : undefined} />
          {fieldErrors.postalCode && <p id="postalCode-error" style={errorStyle}>{fieldErrors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="projectType">Type af projekt</label>
        <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange} className="form-input">
          <option value="" disabled>Vælg det, der passer bedst</option>
          <option>Renoveringsafklaring</option>
          <option>Tilbuds- og aftaletjek</option>
          <option>Projektklar renovering</option>
          <option>Bygherrestyring</option>
          <option>Ved ikke endnu</option>
        </select>
      </div>

      <div className="grid-form-row">
        <div>
          <label style={labelStyle} htmlFor="budgetRange">Forventet budget</label>
          <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} className="form-input">
            <option value="">Vælg budget (valgfrit)</option>
            <option>Under 50.000 kr</option>
            <option>50.000–200.000 kr</option>
            <option>200.000–500.000 kr</option>
            <option>Over 500.000 kr</option>
            <option>Ved ikke endnu</option>
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="desiredStart">Ønsket opstart</label>
          <select id="desiredStart" name="desiredStart" value={form.desiredStart} onChange={handleChange} className="form-input">
            <option value="">Vælg tidsramme (valgfrit)</option>
            <option>Snarest muligt</option>
            <option>1–3 måneder</option>
            <option>3–6 måneder</option>
            <option>Ved ikke endnu</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="message">Kort beskrivelse af projektet</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange}
          placeholder="Beskriv kort dit renoveringsprojekt eller dine spørgsmål..."
          className="form-input" rows={5}
          aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message ? "message-error" : undefined} />
        {fieldErrors.message && <p id="message-error" style={errorStyle}>{fieldErrors.message}</p>}
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: ".82rem", color: "#c0392b" }} role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={status === "sending"}
        style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sender…" : "Book gratis afklaringssamtale →"}
      </button>
    </form>
  );
}
