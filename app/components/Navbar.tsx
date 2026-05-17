"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Forside", href: "#hjem" },
  { label: "Om os", href: "#om-os" },
  { label: "Ydelser", href: "#ydelser" },
  { label: "Projekter", href: "#projekter" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check initial position — page may load mid-scroll or restore scroll
    setScrolled(window.scrollY > 40);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "var(--navy-dark)" : "transparent",
        transition: "background-color 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hjem" className="flex items-center gap-3">
          <Image
            src="/logo-white.svg"
            alt="August Råd & Byg logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span
            className="text-white font-semibold text-lg tracking-wide hidden sm:block"
            style={{ fontFamily: "Georgia, serif" }}
          >
            August Råd & Byg
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/80 hover:text-white text-sm tracking-wide transition-colors"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#kontakt"
              className="px-5 py-2 text-sm font-medium text-white rounded transition-colors"
              style={{
                backgroundColor: "var(--gold)",
                fontFamily: "Arial, sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--gold-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--gold)")
              }
            >
              Få et tilbud
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Åbn menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6"
          style={{ backgroundColor: "var(--navy-dark)" }}
        >
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/80 hover:text-white text-base block"
                  onClick={() => setOpen(false)}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="inline-block px-5 py-2 text-sm font-medium text-white rounded mt-2"
                style={{ backgroundColor: "var(--gold)" }}
                onClick={() => setOpen(false)}
              >
                Få et tilbud
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
