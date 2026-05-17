import Image from "next/image";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

const services = [
  {
    title: "Byggerådgivning",
    description:
      "Vi guider dig gennem hele byggeprocessen – fra de første planer til det færdige resultat. Med vores erfaring sikrer vi, at dit projekt forløber smidigt og inden for budgettet.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={40} height={40}>
        <path d="M24 6L4 20h6v22h28V20h6L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="18" y="30" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: "Projektledelse",
    description:
      "Vi overtager det fulde ansvar for koordinering og ledelse af dit byggeprojekt. Vi sikrer, at håndværkere, leverandører og tidsplaner går op i en højere enhed.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={40} height={40}>
        <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 10V6M32 10V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 28l5 5 10-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Tilsyn & Kvalitetskontrol",
    description:
      "Vi fører uafhængigt tilsyn på byggepladsen og sikrer, at arbejdet udføres i overensstemmelse med tegninger, beskrivelser og gældende byggestandarder.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={40} height={40}>
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M32 32l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 22l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Renovering & Om-/Tilbygning",
    description:
      "Overvejer du at renovere, udvide eller ombygge din ejendom? Vi rådgiver om mulighederne, hjælper med ansøgninger og sikrer et godt forløb fra start til slut.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width={40} height={40}>
        <path d="M8 36l8-8 6 6 8-12 10 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="6" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="2.5" />
        <path d="M28 6h14M28 12h14M28 18h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const projects = [
  {
    title: "Enfamiliehus, Aarhus",
    category: "Nybyggeri",
    description: "Fuldstændig projektledelse af nyt parcelhus på 180 m². Fra byggetilladelse til aflevering.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    title: "Kontorombygning, København",
    category: "Renovering",
    description: "Rådgivning og tilsyn ved total renovering af 600 m² erhvervsejendom i indre by.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Tilbygning, Odense",
    category: "Tilbygning",
    description: "Rådgivning om tilbygning på 45 m² med tagterrasse. Herunder nabohøring og byggesagsbehandling.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    title: "Boligblok, Esbjerg",
    category: "Byggetilsyn",
    description: "Løbende byggetilsyn og kvalitetskontrol ved opførelse af 12 lejeboliger.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
  },
  {
    title: "Sommerhus, Vejle",
    category: "Byggerådgivning",
    description: "Rådgivning om sommerhusudvidelse og energirenovering inkl. teknisk gennemgang.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
  },
  {
    title: "Industribygning, Horsens",
    category: "Projektledelse",
    description: "Projektledelse og udbudsstyring for opførelse af ny produktionshal på 1200 m².",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* HERO */}
      <section
        id="hjem"
        className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 min-h-screen"
        style={{ backgroundColor: "var(--navy-dark)" }}
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=75"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-15"
            priority
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,126,0.3) 40px, rgba(201,168,126,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,126,0.3) 40px, rgba(201,168,126,0.3) 41px)",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-white.svg"
              alt="August Råd & Byg logo"
              width={260}
              height={234}
              className="object-contain"
              priority
            />
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
          >
            Professionel Bygge- og
            <br />
            <span style={{ color: "var(--gold)" }}>Rådgivning</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Vi hjælper dig fra idé til færdigt byggeri. Med fokus på kvalitet,
            økonomi og tryghed i hele processen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kontakt"
              className="px-8 py-4 text-white font-semibold rounded text-sm tracking-widest transition-colors"
              style={{ backgroundColor: "var(--gold)", fontFamily: "Arial, sans-serif" }}
            >
              KONTAKT OS
            </a>
            <a
              href="#ydelser"
              className="px-8 py-4 text-white font-semibold rounded text-sm tracking-widest border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.3)", fontFamily: "Arial, sans-serif" }}
            >
              VORES YDELSER
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest" style={{ fontFamily: "Arial, sans-serif" }}>
            SCROLL
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M8 0v20M2 14l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* OM OS */}
      <section id="om-os" className="py-24 px-6" style={{ backgroundColor: "var(--bg-white)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs font-semibold tracking-widest mb-4 uppercase"
              style={{ color: "var(--gold)", fontFamily: "Arial, sans-serif" }}
            >
              Om August Råd & Byg
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
            >
              Din uafhængige partner
              <br />i byggebranchen
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
            >
              August Råd & Byg er en uafhængig rådgivnings- og byggevirksomhed med speciale i
              at hjælpe private og erhvervskunder igennem komplekse byggeprojekter. Vi arbejder
              altid i bygherrens interesse og sikrer, at du får mest muligt for dine penge.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
            >
              Uanset om du planlægger et nyt hus, en renovering eller en tilbygning, tilbyder vi
              professionel rådgivning og projektledelse tilpasset netop dit projekt og dine behov.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "10+", label: "Års erfaring" },
                { value: "150+", label: "Projekter" },
                { value: "100%", label: "Uafhængig rådgivning" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-3xl font-bold mb-1"
                    style={{ color: "var(--gold)", fontFamily: "Georgia, serif" }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="text-xs leading-tight"
                    style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative rounded-lg overflow-hidden h-80 lg:h-96">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
              alt="Professionel byggerådgivning"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* YDELSER */}
      <section id="ydelser" className="py-24 px-6" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-widest mb-4 uppercase"
              style={{ color: "var(--gold)", fontFamily: "Arial, sans-serif" }}
            >
              Hvad vi tilbyder
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
            >
              Vores Ydelser
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-8 rounded-lg transition-shadow hover:shadow-md"
                style={{ backgroundColor: "var(--bg-white)", border: "1px solid #e5e7eb" }}
              >
                <div className="mb-4" style={{ color: "var(--gold)" }}>
                  {s.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJEKTER */}
      <section id="projekter" className="py-24 px-6" style={{ backgroundColor: "var(--bg-white)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-widest mb-4 uppercase"
              style={{ color: "var(--gold)", fontFamily: "Arial, sans-serif" }}
            >
              Vores arbejde
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
            >
              Udvalgte Projekter
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid #e5e7eb" }}
              >
                <div className="relative h-44">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5" style={{ backgroundColor: "var(--bg-white)" }}>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "var(--gold)", fontFamily: "Arial, sans-serif" }}
                  >
                    {p.category}
                  </span>
                  <h3
                    className="text-base font-semibold mt-1 mb-2"
                    style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
                  >
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-24 px-6" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-widest mb-4 uppercase"
              style={{ color: "var(--gold)", fontFamily: "Arial, sans-serif" }}
            >
              Kom i kontakt
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
            >
              Kontakt Os
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--navy-dark)", fontFamily: "Georgia, serif" }}
                >
                  August Råd & Byg
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
                >
                  Har du spørgsmål til dit byggeprojekt eller ønsker du et uforpligtende tilbud?
                  Kontakt os – vi svarer hurtigt.
                </p>
              </div>

              {[
                {
                  label: "Telefon",
                  value: "+45 00 00 00 00",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.91 19.79 19.79 0 01.18 1.2 2 2 0 012.16 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  ),
                },
                {
                  label: "E-mail",
                  value: "info@augustraadbyg.dk",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  ),
                },
                {
                  label: "Adresse",
                  value: "Adressevej 1, 0000 By",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                      style={{ color: "var(--navy)", fontFamily: "Arial, sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)", fontFamily: "Arial, sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div
              className="lg:col-span-3 p-8 rounded-lg"
              style={{ backgroundColor: "var(--bg-white)", border: "1px solid #e5e7eb" }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ backgroundColor: "var(--navy-dark)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-white.svg"
              alt="August Råd & Byg"
              width={44}
              height={40}
              className="object-contain"
            />
            <span
              className="text-white/70 text-sm"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              August Råd & Byg
            </span>
          </div>
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            © {new Date().getFullYear()} August Råd & Byg. Alle rettigheder forbeholdes.
          </p>
        </div>
      </footer>
    </div>
  );
}
