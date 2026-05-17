"use client";

import { useState } from "react";

// Defined outside component to avoid recreation on every render
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  backgroundColor: "#fff",
  color: "var(--text-dark)",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className="text-center py-12 px-6 rounded-lg"
        style={{ backgroundColor: "#f0f5ee", border: "1px solid #c3d9be" }}
      >
        <p className="text-xl font-semibold mb-2" style={{ color: "var(--navy)" }}>
          Tak for din besked!
        </p>
        <p style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}>
          Vi vender tilbage til dig hurtigst muligt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--navy)", fontFamily: "Arial, sans-serif" }}
          >
            Navn *
          </label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Dit fulde navn"
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--navy)", fontFamily: "Arial, sans-serif" }}
          >
            Telefon
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+45 00 00 00 00"
            className="form-input"
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--navy)", fontFamily: "Arial, sans-serif" }}
        >
          E-mail *
        </label>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="din@email.dk"
          className="form-input"
          style={inputStyle}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--navy)", fontFamily: "Arial, sans-serif" }}
        >
          Besked *
        </label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Beskriv dit projekt eller din forespørgsel..."
          rows={5}
          className="form-input"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
      <button
        type="submit"
        className="self-start px-8 py-3 text-white font-medium text-sm rounded transition-colors"
        style={{
          backgroundColor: "var(--gold)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--gold-dark)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
      >
        Send besked
      </button>
    </form>
  );
}
