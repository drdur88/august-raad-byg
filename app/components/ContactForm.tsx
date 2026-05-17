"use client";

import { useState } from "react";

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
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", phone: "", email: "", projectType: "", message: "" }); }, 4000);
  }

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 300, color: "var(--navy)", marginBottom: ".6rem" }}>
          Besked sendt ✓
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: ".88rem", color: "var(--grey)", fontWeight: 300 }}>
          Vi vender tilbage til dig hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
           className="grid-cols-form">
        <div>
          <label style={labelStyle}>Navn</label>
          <input
            name="name" type="text"
            value={form.name} onChange={handleChange}
            placeholder="Dit fulde navn"
            className="form-input"
          />
        </div>
        <div>
          <label style={labelStyle}>Telefon</label>
          <input
            name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+45 00 00 00 00"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>E-mail</label>
        <input
          name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="din@email.dk"
          className="form-input"
        />
      </div>

      <div>
        <label style={labelStyle}>Projekttype</label>
        <select
          name="projectType"
          value={form.projectType} onChange={handleChange}
          className="form-input"
        >
          <option value="" disabled>Vælg projekttype</option>
          <option>Nybyggeri</option>
          <option>Renovering</option>
          <option>Byggerådgivning</option>
          <option>Projektledelse</option>
          <option>Tilstandsrapport</option>
          <option>Andet</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Besked</label>
        <textarea
          name="message" required
          value={form.message} onChange={handleChange}
          placeholder="Beskriv kort dit projekt eller dine spørgsmål..."
          className="form-input"
          rows={5}
        />
      </div>

      <button type="submit" className="form-submit" style={{ alignSelf: "flex-start" }}>
        Send besked →
      </button>
    </form>
  );
}
