"use client";

import { useState } from "react";
import { sendContactEmail } from "../actions/contact";

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

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", projectType: "", message: "",
    budgetRange: "", referralSource: "", preferredContactTime: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      <div style={{ textAlign: "center", padding: "3.5rem 2rem" }}>
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
          Besked sendt!
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: ".88rem", color: "var(--grey)", fontWeight: 300 }}>
          Vi vender tilbage til dig inden for 24 timer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <div className="grid-form-row">
        <div>
          <label style={labelStyle}>Navn</label>
          <input name="name" type="text" value={form.name} onChange={handleChange}
            placeholder="Dit fulde navn" className="form-input" required />
        </div>
        <div>
          <label style={labelStyle}>Telefon</label>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="+45 00 00 00 00" className="form-input" />
        </div>
      </div>

      <div>
        <label style={labelStyle}>E-mail</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange}
          placeholder="din@email.dk" className="form-input" />
      </div>

      <div>
        <label style={labelStyle}>Projekttype</label>
        <select name="projectType" value={form.projectType} onChange={handleChange} className="form-input">
          <option value="" disabled>Vælg projekttype</option>
          <option>Nybyggeri</option>
          <option>Renovering</option>
          <option>Byggerådgivning</option>
          <option>Projektledelse</option>
          <option>Tilstandsrapport</option>
          <option>Malerarbejde</option>
          <option>Tømrerarbejde</option>
          <option>VVS &amp; el-installation</option>
          <option>Andet</option>
        </select>
      </div>

      <div className="grid-form-row">
        <div>
          <label style={labelStyle}>Budget</label>
          <select name="budgetRange" value={form.budgetRange} onChange={handleChange} className="form-input">
            <option value="">Vælg budget (valgfrit)</option>
            <option>Under 50.000 kr</option>
            <option>50.000–200.000 kr</option>
            <option>200.000–500.000 kr</option>
            <option>Over 500.000 kr</option>
            <option>Ved ikke endnu</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Hvornår passer det bedst?</label>
          <select name="preferredContactTime" value={form.preferredContactTime} onChange={handleChange} className="form-input">
            <option value="">Vælg tidspunkt (valgfrit)</option>
            <option>Formiddag</option>
            <option>Eftermiddag</option>
            <option>Aften</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Hvordan hørte du om os?</label>
        <select name="referralSource" value={form.referralSource} onChange={handleChange} className="form-input">
          <option value="">Vælg (valgfrit)</option>
          <option>Google-søgning</option>
          <option>Anbefaling fra bekendt</option>
          <option>Facebook / Instagram</option>
          <option>Tidligere kunde</option>
          <option>Andet</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Besked</label>
        <textarea name="message" required value={form.message} onChange={handleChange}
          placeholder="Beskriv kort dit projekt eller dine spørgsmål..."
          className="form-input" rows={5} />
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: ".82rem", color: "#c0392b" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="form-submit"
        disabled={status === "sending"}
        style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.6 : 1 }}
      >
        {status === "sending" ? "Sender…" : "Send besked →"}
      </button>
    </form>
  );
}
