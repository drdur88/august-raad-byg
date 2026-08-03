import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import FadeUp from "./components/FadeUp";
import CountUp from "./components/CountUp";
import HeroMedia from "./components/HeroMedia";

// Drop an .mp4 into public/videos/hero.mp4 and the hero automatically
// plays it instead of the static photo — no code changes needed.
const HERO_VIDEO_PATH = path.join(process.cwd(), "public", "videos", "hero.mp4");

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
    name: "Tømrerarbejde",
    desc: "Alt i tømrer- og snedkerarbejde – døre, vinduer, trapper, terrasser og indbyggede løsninger udført i massivt træ.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20l7-7"/>
        <path d="M9 13l6.5-6.5a2.12 2.12 0 013 3L12 16"/>
        <path d="M15 6l3-3 4 4-3 3"/>
      </svg>
    ),
  },
  {
    num: "06",
    name: "VVS & el-installation",
    desc: "Fagkyndig installation, service og reparation af vand, varme og el – udført af certificerede fagfolk med fokus på sikkerhed.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s7 8.5 7 13a7 7 0 11-14 0c0-4.5 7-13 7-13z"/>
      </svg>
    ),
  },
];

const processSteps = [
  { num: "1", title: "Første møde", desc: "Vi lytter til dine ønsker og behov. Gratis og uforpligtende gennemgang af dit projekt." },
  { num: "2", title: "Tilbud & Plan", desc: "Vi udarbejder et detaljeret tilbud med tidsplan og fast pris – ingen skjulte omkostninger." },
  { num: "3", title: "Udførelse", desc: "Vi eksekverer projektet med løbende opdateringer og fuld gennemsigtighed undervejs." },
  { num: "4", title: "Aflevering", desc: "Grundig gennemgang og overdragelse. Vi sikrer, at alt lever op til dine forventninger." },
];

const workItems = [
  { img: "/renovations/stue-after.jpg", tag: "Stue", title: "Stuerenovering", desc: "Total renovering — nyt loft, gulv og indbyggede spots." },
  { img: "/renovations/loft-after.jpg", tag: "Loftrum", title: "Loftrum", desc: "Råt loftrum ombygget til lyst, moderne værelse." },
  { img: "/renovations/sovevaerelse-after.jpg", tag: "Soveværelse", title: "Soveværelse", desc: "Nyt gulv, malerbehandling og indretning." },
];

const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 15.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.62 4.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 12.1a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 19.41z"/>
      </svg>
    ),
    text: <a href="tel:+4512345678" className="text-[var(--navy)] no-underline">+45 12 34 56 78</a>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    text: <a href="mailto:info@augustraadogbyg.dk" className="text-[var(--navy)] no-underline">info@augustraadogbyg.dk</a>,
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
];

const testimonials = [
  {
    quote: "August Råd & Byg stod for en total renovering af vores hus. Professionelt fra start til slut — de holdt tidsplan, budget og kommunikerede løbende. Vi kunne ikke have ønsket os bedre.",
    name: "Mikkel H.",
    project: "Total renovering, Aarhus",
  },
  {
    quote: "Ærlig rådgivning, fast pris og ingen overraskelser. Præcis hvad vi havde brug for. Vi følte os trygge hele vejen igennem projektet.",
    name: "Lone & Per K.",
    project: "Tilbygning, Odense",
  },
  {
    quote: "Vi er utrolig glade for resultatet. De koordinerede alle håndværkere og vi behøvede kun at forholde os til ét kontaktpunkt. Stærkt anbefalet.",
    name: "Thomas B.",
    project: "Projektledelse, København",
  },
];

export default async function Home() {
  const heroVideoSrc = existsSync(HERO_VIDEO_PATH) ? "/videos/hero.mp4" : undefined;

  return (
    <div>
      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[var(--navy)]">
        {/* Background media */}
        <div className="absolute inset-0">
          <HeroMedia
            videoSrc={heroVideoSrc}
            imageSrc="/renovations/stue-after.jpg"
            imageAlt="Renoveret stue af August Råd & Byg"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(20,22,27,.92) 15%, rgba(20,22,27,.55) 55%, rgba(20,22,27,.2) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(20,22,27,.85) 0%, rgba(20,22,27,0) 32%)" }}
        />

        {/* Content */}
        <div className="relative z-[2] flex min-h-screen flex-col justify-center px-[6vw] pt-32 pb-36">
          <p className="eyebrow mb-6">Bygge- og Rådgivning</p>

          <h1 className="heading-hero heading-hero-light mb-6 max-w-[900px]">
            Kvalitet i <em>hvert eneste</em> projekt
          </h1>

          <p className="copy copy-light mb-10 max-w-[460px]">
            August Råd &amp; Byg tilbyder professionel rådgivning og udførelse inden for
            byggeri. Vi guider dig fra første idé til færdigt resultat – med ekspertise,
            ærlighed og håndværksmæssig stolthed.
          </p>

          <div className="flex flex-wrap items-center gap-[1.2rem]">
            <a
              href="#contact"
              className="btn-hero-primary font-[var(--font-body)] px-[2.2rem] py-[.9rem] text-[.78rem] font-bold tracking-[.14em] uppercase no-underline"
            >
              Få et gratis tilbud
            </a>
            <a
              href="#services"
              className="btn-ghost-light font-[var(--font-body)] text-[.78rem] font-medium tracking-[.14em] uppercase no-underline"
            >
              Vores ydelser <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute inset-x-0 bottom-0 z-[2] grid grid-cols-3 border-t border-[rgba(255,255,255,.15)] bg-[rgba(20,22,27,.65)] backdrop-blur-sm">
          {[
            { target: 15, suffix: "+", label: "Års erfaring" },
            { target: 200, suffix: "+", label: "Projekter" },
            { target: 100, suffix: "%", label: "Tilfredse kunder" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-7 text-center text-[var(--white)] sm:py-8 ${i > 0 ? "border-l border-[rgba(255,255,255,.15)]" : ""}`}
            >
              <span className="block font-[var(--font-heading)] text-[2rem] font-bold leading-none sm:text-[2.6rem]">
                <CountUp target={s.target} suffix={s.suffix} />
              </span>
              <span className="mt-[.4rem] block font-[var(--font-body)] text-[.65rem] tracking-[.12em] uppercase opacity-70 sm:text-[.7rem] sm:tracking-[.15em]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad bg-[var(--white)]">
        <p className="section-label">Hvad vi tilbyder</p>
        <h2 className="section-title">
          Vores <em>ydelser</em>
        </h2>

        <div className="grid-services">
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={Math.floor(i % 3) * 0.1}>
              <div className="service-card h-full">
                <span className="mb-6 block font-[var(--font-heading)] text-[3.5rem] font-bold leading-none text-[var(--light-grey)]">
                  {s.num}
                </span>
                <div className="mb-[1.2rem]">{s.icon}</div>
                <p className="card-title mb-[.8rem]">{s.name}</p>
                <p className="copy-sm">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="grid-about">
        {/* Image side */}
        <div className="about-img-mh relative min-h-[600px] overflow-hidden bg-[var(--navy)]">
          <Image
            src="/renovations/loft-after.jpg"
            alt="Renoveret loftrum af August Råd & Byg"
            fill
            sizes="50vw"
            className="kenburns-alt object-cover"
            style={{ opacity: .4, mixBlendMode: "luminosity" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(45,55,72,.3) 0%, rgba(45,55,72,.8) 100%)" }}
          />
          <blockquote className="absolute bottom-12 left-12 right-12 border-l-2 border-[var(--gold)] pl-6 font-[var(--font-heading)] text-[1.6rem] leading-[1.5] font-semibold text-[var(--white)]">
            &ldquo;Vi bygger ikke bare huse – vi skaber rammer for menneskers liv.&rdquo;
          </blockquote>
        </div>

        {/* Content side */}
        <div className="about-content-pad flex flex-col justify-center bg-[var(--off-white)] py-24 pr-[5vw] pl-20">
          <p className="section-label">Om August Råd &amp; Byg</p>
          <h2 className="section-title">
            Bygget på <em>tre stærke ben</em>
          </h2>

          <p className="copy mb-6">
            En skammel med tre ben vælter aldrig — uanset hvor ujævnt underlaget er. Sådan
            arbejder vi også: håndværk, rådgivning og projektledelse er tre lige stærke ben,
            der bærer hvert eneste projekt. Vi kombinerer solid håndværksmæssig erfaring med
            et stærkt netværk af screenede specialister.
          </p>
          <p className="copy mb-10">
            Uanset om du drømmer om et nyt hjem, ønsker at renovere dit eksisterende
            eller har brug for professionel rådgivning til et erhvervsprojekt, er vi
            klar til at gøre din vision til virkelighed.
          </p>

          <Link
            href="/om-os"
            className="btn-ghost font-[var(--font-body)] text-[.78rem] font-medium tracking-[.14em] uppercase no-underline"
          >
            Læs vores historie <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ── ARBEJDE ── */}
      <section id="arbejde" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Vores arbejde</p>
        <h2 className="section-title">
          Udvalgte <em>projekter</em>
        </h2>
        <p className="copy mb-14 max-w-[520px]">
          Et udpluk af rigtige projekter udført af August Råd &amp; Byg.
        </p>

        <div className="grid-work">
          {workItems.map((w) => (
            <div key={w.title}>
              <div className="work-thumb">
                <Image src={w.img} alt={w.title} fill sizes="33vw" className="object-cover" />
                <span className="work-thumb-tag">{w.tag}</span>
              </div>
              <p className="card-title mt-5 mb-[.4rem]" style={{ fontSize: "1.15rem" }}>{w.title}</p>
              <p className="copy-sm">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="section-pad bg-[var(--navy)] text-[var(--white)]">
        <p className="section-label section-label-light">Sådan arbejder vi</p>
        <h2 className="section-title section-title-light">
          En enkel og <em>tryg</em> proces
        </h2>

        <div className="relative mt-16">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute h-px bg-[rgba(184,149,106,.3)]"
            style={{ top: 28, left: "calc(12.5% + 14px)", right: "calc(12.5% + 14px)" }}
          />

          <div className="grid-process">
            {processSteps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="px-6 text-center">
                  <div className="relative z-[1] mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--navy)] font-[var(--font-heading)] text-[1.3rem] font-bold text-[var(--gold)]">
                    {step.num}
                  </div>
                  <p className="card-title-sm mb-[.6rem]">{step.title}</p>
                  <p className="copy-light font-[var(--font-body)] text-[.82rem] leading-[1.7] font-light">
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="anmeldelser" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Hvad kunderne siger</p>
        <h2 className="section-title">
          Bygget på <em>tillid</em>
        </h2>

        <div className="grid-testimonials mt-14">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between border-t-[3px] border-[var(--gold)] bg-[var(--white)] p-10">
                {/* Stars */}
                <div className="mb-[1.2rem] flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                <p className="mb-6 flex-1 font-[var(--font-heading)] text-[1.1rem] leading-[1.6] font-semibold text-[var(--navy)]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div>
                  <p className="font-[var(--font-body)] text-[.88rem] font-medium text-[var(--navy)]">
                    {t.name}
                  </p>
                  <p className="font-[var(--font-body)] text-[.78rem] font-light tracking-[.05em] text-[var(--grey)]">
                    {t.project}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Kom i kontakt</p>
        <h2 className="section-title">
          Lad os tale om<br />dit <em>projekt</em>
        </h2>

        <div className="grid-contact">
          {/* Contact info */}
          <div>
            <p className="copy mb-10">
              Vi tilbyder altid en gratis og uforpligtende samtale om dit projekt.
              Tag fat i os – vi er klar til at hjælpe dig fra første dag.
            </p>

            <div className="flex flex-col gap-[1.2rem]">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div className="font-[var(--font-body)] text-[.88rem] leading-[1.5] font-normal text-[var(--navy)]">
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

    </div>
  );
}
