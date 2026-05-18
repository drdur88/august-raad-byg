import Image from "next/image";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import FadeUp from "./components/FadeUp";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

const services = [
  {
    num: "01",
    name: "Nybyggeri",
    desc: "Vi opfører nye boliger og erhvervsbygninger fra grunden med fokus på kvalitet, holdbarhed og æstetik. Fra fundament til nøglefærdig løsning.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    num: "02",
    name: "Renovering",
    desc: "Modernisering og istandsættelse af eksisterende ejendomme. Vi respekterer bygningens karakter og tilfører ny funktionalitet og livskvalitet.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: "03",
    name: "Byggerådgivning",
    desc: "Uafhængig rådgivning i alle faser af dit byggeprojekt. Vi hjælper med myndighedskrav, tidsplaner, budget og kvalitetssikring.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    num: "04",
    name: "Projektledelse",
    desc: "Professionel styring af byggeprocessen – koordinering af håndværkere, leverandører og myndigheder. Ét kontaktpunkt for hele projektet.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    num: "05",
    name: "Tilstandsrapporter",
    desc: "Grundig gennemgang og vurdering af bygningers stand. Uvildig rapport der giver dig det fulde overblik inden køb, salg eller renovering.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M6 20V10M10 20V4M14 20v-6M18 20v-9"/>
      </svg>
    ),
  },
  {
    num: "06",
    name: "Kvalitetssikring",
    desc: "Løbende kontrol og dokumentation af byggekvalitet. Vi sikrer, at dit projekt lever op til gældende normer og dine forventninger.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

const aboutValues = [
  "Personlig betjening fra start til slut",
  "Gennemsigtighed i økonomi og tidsplan",
  "Certificerede og erfarne håndværkere",
  "Dokumenteret kvalitetssikring",
  "Lokalt forankret, nationalt netværk",
  "Fast pris – ingen overraskelser",
];

const processSteps = [
  { num: "1", title: "Første møde", desc: "Vi lytter til dine ønsker og behov. Gratis og uforpligtende gennemgang af dit projekt." },
  { num: "2", title: "Tilbud & Plan", desc: "Vi udarbejder et detaljeret tilbud med tidsplan og fast pris – ingen skjulte omkostninger." },
  { num: "3", title: "Udførelse", desc: "Vi eksekverer projektet med løbende opdateringer og fuld gennemsigtighed undervejs." },
  { num: "4", title: "Aflevering", desc: "Grundig gennemgang og overdragelse. Vi sikrer, at alt lever op til dine forventninger." },
];

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* ── HERO ── */}
      <section id="hero" className="grid-hero">
        {/* Left: text */}
        <div
          className="hero-left-pad"
          style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "6rem 5vw 6rem 8vw",
            position: "relative",
            background: "var(--off-white)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase",
              color: "var(--gold)", fontWeight: 500, marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: ".8rem",
            }}
          >
            <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", flexShrink: 0 }} />
            Bygge- og Rådgivning
          </p>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 300, lineHeight: 1.12,
              color: "var(--navy)", marginBottom: "1.8rem",
            }}
          >
            Kvalitet i<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>hvert eneste</em><br />
            projekt
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".95rem", lineHeight: 1.75,
              color: "var(--grey)", maxWidth: 420,
              marginBottom: "3rem", fontWeight: 300,
            }}
          >
            August Råd &amp; Byg tilbyder professionel rådgivning og udførelse inden for
            byggeri. Vi guider dig fra første idé til færdigt resultat – med ekspertise,
            ærlighed og håndværksmæssig stolthed.
          </p>

          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="btn-primary"
              style={{
                fontFamily: "var(--font-body)",
                padding: ".9rem 2.2rem",
                fontSize: ".78rem", letterSpacing: ".14em",
                textTransform: "uppercase", fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Få et tilbud
            </a>
            <a
              href="#services"
              className="btn-ghost"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: ".78rem", letterSpacing: ".14em",
                textTransform: "uppercase", fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Vores ydelser <span className="arrow">→</span>
            </a>
          </div>

          {/* Diagonal accent */}
          <div
            className="hero-diagonal"
            style={{
              position: "absolute", right: -40, top: 0, bottom: 0, width: 80,
              background: "var(--off-white)",
              clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0% 100%)",
              zIndex: 2,
            }}
          />
        </div>

        {/* Right: image + stats */}
        <div
          className="hero-right-mh"
          style={{ position: "relative", overflow: "hidden", background: "var(--navy)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
            alt="Moderne byggeri"
            fill
            sizes="50vw"
            className="object-cover"
            style={{ opacity: .45, mixBlendMode: "luminosity" }}
            priority
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(45,55,72,.6) 0%, rgba(184,149,106,.25) 100%)",
            }}
          />

          {/* Stats */}
          <div
            className="hero-stats"
            style={{
              position: "absolute", bottom: "3rem", left: "3rem",
              display: "flex", gap: "2.5rem",
            }}
          >
            {[
              { num: "15+", label: "Års erfaring" },
              null,
              { num: "200+", label: "Projekter" },
              null,
              { num: "100%", label: "Tilfredse kunder" },
            ].map((s, i) =>
              s === null ? (
                <div key={i} style={{ width: 1, background: "rgba(255,255,255,.2)", alignSelf: "stretch" }} />
              ) : (
                <div key={s.label} style={{ color: "var(--white)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2.8rem", fontWeight: 300, lineHeight: 1, display: "block",
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: ".7rem", letterSpacing: ".15em",
                      textTransform: "uppercase", opacity: .65,
                      marginTop: ".3rem", display: "block",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: "var(--white)", padding: "7rem 8vw" }}>
        <p className="section-label">Hvad vi tilbyder</p>
        <h2 className="section-title">
          Vores <em>ydelser</em>
        </h2>

        <div className="grid-services">
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={Math.floor(i % 3) * 0.1}>
              <div className="service-card" style={{ height: "100%" }}>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "3.5rem", fontWeight: 300,
                    color: "var(--light-grey)", lineHeight: 1,
                    marginBottom: "1.5rem", display: "block",
                  }}
                >
                  {s.num}
                </span>
                <div style={{ marginBottom: "1.2rem" }}>{s.icon}</div>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.4rem", fontWeight: 600,
                    color: "var(--navy)", marginBottom: ".8rem",
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".88rem", lineHeight: 1.75,
                    color: "var(--grey)", fontWeight: 300,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="grid-about">
        {/* Image side */}
        <div
          className="about-img-mh"
          style={{
            background: "var(--navy)",
            minHeight: 600, position: "relative", overflow: "hidden",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
            alt="Byggearbejde"
            fill
            sizes="50vw"
            className="object-cover"
            style={{ opacity: .4, mixBlendMode: "luminosity" }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(45,55,72,.3) 0%, rgba(45,55,72,.8) 100%)",
            }}
          />
          <blockquote
            style={{
              position: "absolute", bottom: "3rem", left: "3rem", right: "3rem",
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic",
              color: "var(--white)", lineHeight: 1.5,
              borderLeft: "2px solid var(--gold)", paddingLeft: "1.5rem",
            }}
          >
            &ldquo;Vi bygger ikke bare huse – vi skaber rammer for menneskers liv.&rdquo;
          </blockquote>
        </div>

        {/* Content side */}
        <div
          className="about-content-pad"
          style={{
            padding: "6rem 5vw 6rem 5rem",
            display: "flex", flexDirection: "column", justifyContent: "center",
            background: "var(--off-white)",
          }}
        >
          <p className="section-label">Om August Råd &amp; Byg</p>
          <h2 className="section-title">
            Håndværk og <em>ekspertise</em><br />i over 15 år
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".95rem", lineHeight: 1.85,
              color: "var(--grey)", fontWeight: 300, marginBottom: "1.5rem",
            }}
          >
            August Råd &amp; Byg er din lokale partner inden for byggeri og rådgivning.
            Vi kombinerer solid håndværksmæssig erfaring med moderne byggeteknikker og
            et stærkt netværk af specialister.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".95rem", lineHeight: 1.85,
              color: "var(--grey)", fontWeight: 300, marginBottom: "2.5rem",
            }}
          >
            Uanset om du drømmer om et nyt hjem, ønsker at renovere dit eksisterende
            eller har brug for professionel rådgivning til et erhvervsprojekt, er vi
            klar til at gøre din vision til virkelighed.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}
          >
            {aboutValues.map((v) => (
              <div key={v} style={{ display: "flex", gap: ".8rem", alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 6, height: 6, background: "var(--gold)",
                    borderRadius: "50%", marginTop: ".45rem", flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: ".85rem", color: "var(--navy)", fontWeight: 400,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJEKTER (Before/After) ── */}
      <section id="projekter" style={{ background: "var(--white)", padding: "7rem 8vw" }}>
        <p className="section-label">Vores arbejde</p>
        <h2 className="section-title">
          Se <em>forvandlingen</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: ".95rem", lineHeight: 1.75,
            color: "var(--grey)", fontWeight: 300,
            maxWidth: 520, marginBottom: "3.5rem",
          }}
        >
          Træk i skillelinjen for at se forskellen fra før til efter. Alle billeder er
          fra virkelige projekter udført af August Råd &amp; Byg.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3rem",
          }}
          className="grid-projekter"
        >
          <BeforeAfterSlider
            before="/renovations/stue-before.jpg"
            after="/renovations/stue-after.jpg"
            title="Stuerenovering"
            description="Total renovering af stue — nyt loft, gulv, vægge og indbyggede spots."
          />
          <BeforeAfterSlider
            before="/renovations/loft-before.jpg"
            after="/renovations/loft-after.jpg"
            title="Loftrum"
            description="Råt loftrum med eksponeret murværk ombygget til lyst og moderne værelse."
          />
          <BeforeAfterSlider
            before="/renovations/sovevaerelse-before.jpg"
            after="/renovations/sovevaerelse-after.jpg"
            title="Soveværelse"
            description="Fra afrensede råvægge til færdigt soveværelse med nyt gulv og malerbehandling."
          />
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ background: "var(--navy)", color: "var(--white)", padding: "7rem 8vw" }}>
        <p className="section-label section-label-light">Sådan arbejder vi</p>
        <h2 className="section-title section-title-light">
          En enkel og <em>tryg</em> proces
        </h2>

        <div style={{ position: "relative", marginTop: "4rem" }}>
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: 28,
              left: "calc(12.5% + 14px)",
              right: "calc(12.5% + 14px)",
              height: 1,
              background: "rgba(184,149,106,.3)",
            }}
          />

          <div className="grid-process">
            {processSteps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div style={{ padding: "0 1.5rem", textAlign: "center" }}>
                  <div
                    style={{
                      width: 56, height: 56,
                      border: "1px solid var(--gold)",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 1.5rem",
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.3rem", fontWeight: 300,
                      color: "var(--gold)",
                      background: "var(--navy)",
                      position: "relative", zIndex: 1,
                    }}
                  >
                    {step.num}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.2rem", fontWeight: 600,
                      color: "var(--white)", marginBottom: ".6rem",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: ".82rem", lineHeight: 1.7,
                      color: "rgba(255,255,255,.5)", fontWeight: 300,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "var(--off-white)", padding: "7rem 8vw" }}>
        <p className="section-label">Kom i kontakt</p>
        <h2 className="section-title">
          Lad os tale om<br />dit <em>projekt</em>
        </h2>

        <div
          className="grid-contact"
        >
          {/* Contact info */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: ".95rem", lineHeight: 1.8,
                color: "var(--grey)", fontWeight: 300, marginBottom: "2.5rem",
              }}
            >
              Vi tilbyder altid en gratis og uforpligtende samtale om dit projekt.
              Tag fat i os – vi er klar til at hjælpe dig fra første dag.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 15.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.62 4.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 12.1a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 19.41z"/>
                    </svg>
                  ),
                  text: <a href="tel:+4512345678" style={{ color: "var(--navy)", textDecoration: "none" }}>+45 12 34 56 78</a>,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  text: <a href="mailto:info@augustraadogbyg.dk" style={{ color: "var(--navy)", textDecoration: "none" }}>info@augustraadogbyg.dk</a>,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: "Danmark",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  text: "Man–Fre: 07:30–17:00",
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: ".88rem", color: "var(--navy)",
                      fontWeight: 400, lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "var(--navy)",
          color: "rgba(255,255,255,.6)",
          padding: "3rem 8vw",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem", fontWeight: 600,
            color: "var(--white)", letterSpacing: ".06em",
          }}
        >
          August <span style={{ color: "var(--gold)" }}>Råd</span> &amp; Byg
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: ".75rem", letterSpacing: ".05em" }}>
          © {new Date().getFullYear()} August Råd &amp; Byg. Alle rettigheder forbeholdes.
        </div>
        <div style={{ display: "flex", gap: "1.8rem" }}>
          {["Privatlivspolitik", "Handelsbetingelser"].map((l) => (
            <a
              key={l}
              href="#"
              className="footer-link"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
