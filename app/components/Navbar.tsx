"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Ydelser",  href: "#services" },
  { label: "Om os",    href: "#about" },
  { label: "Proces",   href: "#process" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 40);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(247,246,244,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--light-grey)",
        boxShadow: scrolled ? "0 2px 20px rgba(45,55,72,.07)" : "none",
        transition: "box-shadow .3s",
      }}
    >
      <nav
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.4rem 5vw",
        }}
      >
        {/* Brand */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.25rem", fontWeight: 600, letterSpacing: ".08em",
            color: "var(--navy)", textDecoration: "none",
          }}
        >
          August <span style={{ color: "var(--gold)" }}>Råd</span> &amp; Byg
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
            className="hidden md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: ".78rem", letterSpacing: ".12em",
                  textTransform: "uppercase", color: "var(--navy)",
                  textDecoration: "none", fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav-cta"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--white)",
                padding: ".55rem 1.4rem",
                fontSize: ".78rem", letterSpacing: ".12em",
                textTransform: "uppercase", fontWeight: 500,
                textDecoration: "none", display: "inline-block",
              }}
            >
              Kontakt os
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Åbn menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
        >
          <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)", marginBottom: 6 }} />
          <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)", marginBottom: 6 }} />
          <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--off-white)", borderTop: "1px solid var(--light-grey)", padding: "1.5rem 5vw 2rem" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".78rem", letterSpacing: ".14em",
                    textTransform: "uppercase", color: "var(--navy)",
                    textDecoration: "none", fontWeight: 500, display: "block",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="nav-cta"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--white)",
                  padding: ".55rem 1.4rem",
                  fontSize: ".78rem", letterSpacing: ".12em",
                  textTransform: "uppercase", fontWeight: 500,
                  textDecoration: "none", display: "inline-block",
                }}
              >
                Kontakt os
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
