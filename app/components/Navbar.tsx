"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks: { label: string; anchor: string }[] = [
  { label: "Ydelser", anchor: "services" },
  { label: "Arbejde", anchor: "arbejde" },
  { label: "Proces",  anchor: "process" },
];

const sectionIds = ["services", "about", "arbejde", "process", "anmeldelser", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 40);
  const [active, setActive]     = useState("");

  useEffect(() => {
    // Scroll shadow
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll spy via IntersectionObserver
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const anchorHref = (anchor: string) => (isHome ? `#${anchor}` : `/#${anchor}`);

  const items = [
    { label: navLinks[0].label, href: anchorHref(navLinks[0].anchor), isActive: isHome && active === navLinks[0].anchor },
    { label: navLinks[1].label, href: anchorHref(navLinks[1].anchor), isActive: isHome && active === navLinks[1].anchor },
    { label: "Om os", href: "/om-os", isActive: pathname === "/om-os" },
    { label: navLinks[2].label, href: anchorHref(navLinks[2].anchor), isActive: isHome && active === navLinks[2].anchor },
  ];

  return (
    <>
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
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 5vw" }}>

          {/* Brand */}
          <Link href="/"
            style={{
              fontFamily: "var(--font-heading)", fontSize: "1.25rem",
              fontWeight: 600, letterSpacing: ".08em",
              color: "var(--navy)", textDecoration: "none",
            }}
          >
            August <span style={{ color: "var(--gold)" }}>Råd</span>{" "}&amp; Byg
          </Link>

          {/* Desktop links */}
          <ul style={{ gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
              className="hidden md:flex items-center">
            {items.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="nav-link"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".78rem", letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: l.isActive ? "var(--gold)" : "var(--navy)",
                    textDecoration: "none", fontWeight: 500,
                    transition: "color .2s",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={anchorHref("contact")} className="nav-cta"
                style={{
                  fontFamily: "var(--font-body)", color: "var(--white)",
                  padding: ".55rem 1.4rem", fontSize: ".78rem",
                  letterSpacing: ".12em", textTransform: "uppercase",
                  fontWeight: 500, textDecoration: "none", display: "inline-block",
                }}
              >
                Kontakt os
              </Link>
            </li>
          </ul>

          {/* Mobile burger */}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Åbn menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)", marginBottom: 6 }} />
            <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)", marginBottom: 6 }} />
            <span style={{ display: "block", width: 20, height: 1, background: "var(--navy)" }} />
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: "var(--off-white)", borderTop: "1px solid var(--light-grey)", padding: "1.5rem 5vw 2rem" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {items.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: ".78rem",
                      letterSpacing: ".14em", textTransform: "uppercase",
                      color: l.isActive ? "var(--gold)" : "var(--navy)",
                      textDecoration: "none", fontWeight: 500, display: "block",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={anchorHref("contact")} onClick={() => setOpen(false)} className="nav-cta"
                  style={{
                    fontFamily: "var(--font-body)", color: "var(--white)",
                    padding: ".55rem 1.4rem", fontSize: ".78rem",
                    letterSpacing: ".12em", textTransform: "uppercase",
                    fontWeight: 500, textDecoration: "none", display: "inline-block",
                  }}
                >
                  Kontakt os
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
