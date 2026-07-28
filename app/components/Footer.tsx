import EmailCaptureForm from "./EmailCaptureForm";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] px-[8vw] py-12 text-[rgba(255,255,255,.6)]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6 border-b border-[rgba(255,255,255,.12)] pb-8">
        <div>
          <p className="mb-2 font-[var(--font-heading)] text-[1.1rem] font-semibold tracking-[.06em] text-[var(--white)]">
            August <span className="text-[var(--gold)]">Råd</span>{" "}&amp; Byg
          </p>
          <p className="max-w-[280px] font-[var(--font-body)] text-[.78rem] leading-[1.6]">
            Få nyt om vores projekter og gode råd til dit byggeprojekt.
          </p>
        </div>
        <EmailCaptureForm
          source="newsletter"
          ctaLabel="Tilmeld →"
          successMessage="Tak for din tilmelding!"
          variant="dark"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="font-[var(--font-body)] text-[.75rem] tracking-[.05em]">
          © {new Date().getFullYear()} August Råd &amp; Byg. Alle rettigheder forbeholdes.
        </div>
        <div className="flex gap-[1.8rem]">
          {["Privatlivspolitik", "Handelsbetingelser"].map((l) => (
            <a key={l} href="#" className="footer-link font-[var(--font-body)]">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
