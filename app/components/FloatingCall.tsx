"use client";

export default function FloatingCall() {
  return (
    <a
      href="tel:+4512345678"
      aria-label="Ring til os"
      className="floating-call md:hidden"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 200,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "var(--gold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(184,149,106,.5)",
        textDecoration: "none",
        transition: "transform .2s, background .2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--navy)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 15.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.62 4.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 12.1a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 19.41z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
