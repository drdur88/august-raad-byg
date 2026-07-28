import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import FadeUp from "./components/FadeUp";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import Gallery from "./components/Gallery";
import CountUp from "./components/CountUp";
import PriceCalculator from "./components/PriceCalculator";
import HeroMedia from "./components/HeroMedia";
import EmailCaptureForm from "./components/EmailCaptureForm";

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
  {
    num: "07",
    name: "Malerarbejde",
    desc: "Professionel malerbehandling af vægge, lofter og facader – indendørs såvel som udendørs. Fra enkelte rum til hele bygninger.",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="11" height="6" rx="1"/>
        <line x1="7.5" y1="10" x2="7.5" y2="14"/>
        <rect x="5" y="14" width="5" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    num: "08",
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
    num: "09",
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

const adviceItems = [
  {
    tag: "Gør-det-selv",
    title: "Før du selv går i gang",
    desc: "Mindre opgaver som maling, fugning og enkle reparationer kan du sagtens løfte selv. Så snart det involverer bærende konstruktioner, el eller vand, bør du altid bruge en fagmand.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    tag: "Gør-det-selv",
    title: "De rigtige værktøjer gør forskellen",
    desc: "Invester i kvalitetsværktøj til de opgaver, du selv udfører — det sparer tid, giver et bedre resultat og er ofte billigere i det lange løb end at leje eller købe billigt.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="2" y1="13" x2="22" y2="13"/>
      </svg>
    ),
  },
  {
    tag: "Inspiration",
    title: "Lad lyset komme ind",
    desc: "Større vinduer, lysere farvevalg og gennemtænkt belysning kan forvandle selv de mørkeste rum og få boligen til at føles markant større.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
      </svg>
    ),
  },
  {
    tag: "Inspiration",
    title: "Åbne løsninger vinder frem",
    desc: "Nedrivning af ikke-bærende vægge mellem køkken og stue skaber luftigere, mere sociale hjem — og er ofte en overkommelig opgave med stor effekt.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-5 9 5v13"/>
        <path d="M3 21h18"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    tag: "Pas på",
    title: "Tjek altid momsregistrering og forsikring",
    desc: "Før du skriver under på noget, bør du sikre dig, at håndværkeren er momsregistreret og har den rette ansvarsforsikring. Det er din sikkerhed, hvis noget går galt.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    tag: "Pas på",
    title: "Få altid en skriftlig aftale",
    desc: "Fast pris, tidsplan og omfang skal stå sort på hvidt, inden arbejdet går i gang. Et mundtligt overslag er ikke nok til at holde nogen fast på noget.",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
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
              href="#tilbudsberegner"
              className="btn-hero-primary font-[var(--font-body)] px-[2.2rem] py-[.9rem] text-[.78rem] font-bold tracking-[.14em] uppercase no-underline"
            >
              Beregn dit tilbud
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

      {/* ── PROJEKTER (Before/After) ── */}
      <section id="projekter" className="section-pad bg-[var(--white)]">
        <p className="section-label">Vores arbejde</p>
        <h2 className="section-title">
          Se <em>forvandlingen</em>
        </h2>
        <p className="copy mb-14 max-w-[520px]">
          Træk i skillelinjen for at se forskellen fra før til efter. Alle billeder er
          fra virkelige projekter udført af August Råd &amp; Byg.
        </p>

        <div className="grid-projekter">
          <BeforeAfterSlider
            before="/renovations/stue-before.jpg"
            after="/renovations/stue-after.jpg"
            title="Stuerenovering"
            description="Total renovering af stue — nyt loft, gulv, vægge og indbyggede spots."
            autoPlay
          />
          <BeforeAfterSlider
            before="/renovations/loft-before.jpg"
            after="/renovations/loft-after.jpg"
            title="Loftrum"
            description="Råt loftrum med eksponeret murværk ombygget til lyst og moderne værelse."
            autoPlay
          />
          <BeforeAfterSlider
            before="/renovations/sovevaerelse-before.jpg"
            after="/renovations/sovevaerelse-after.jpg"
            title="Soveværelse"
            description="Fra afrensede råvægge til færdigt soveværelse med nyt gulv og malerbehandling."
            autoPlay
          />
        </div>
      </section>

      {/* ── GALLERI ── */}
      <section id="galleri" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Billeder fra vores projekter</p>
        <h2 className="section-title">
          Galleri
        </h2>
        <p className="copy mb-10 max-w-[520px]">
          Klik på et billede for at se det i fuld størrelse. Filtrér efter rum for at finde
          netop det, du er interesseret i.
        </p>
        <Gallery />
      </section>

      {/* ── RÅD & INSPIRATION ── */}
      <section id="raad" className="section-pad bg-[var(--white)]">
        <p className="section-label">Gode råd</p>
        <h2 className="section-title">
          Råd &amp; <em>inspiration</em>
        </h2>
        <p className="copy mb-10 max-w-[560px]">
          Gør-det-selv-tips, inspiration til dit næste projekt, og hvad du bør holde øje med,
          når du samarbejder med en håndværker.
        </p>

        <div className="grid-services">
          {adviceItems.map((item, i) => (
            <FadeUp key={item.title} delay={Math.floor(i % 3) * 0.1}>
              <div className="service-card h-full">
                <span className="advice-tag mb-5">{item.tag}</span>
                <div className="mb-5">{item.icon}</div>
                <p className="card-title mb-[.6rem]">{item.title}</p>
                <p className="copy-sm">{item.desc}</p>
              </div>
            </FadeUp>
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

      {/* ── GRATIS GUIDE (lead magnet) ── */}
      <section id="guide" className="section-pad bg-[var(--white)]">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow mx-auto mb-4 justify-center">Gratis download</p>
          <h2 className="section-title mx-auto text-center">
            Sådan planlægger du <em>dit byggeprojekt</em>
          </h2>
          <p className="copy mx-auto mb-8">
            Få vores gratis guide med 5 konkrete trin, typiske faldgruber og de spørgsmål du
            bør stille din håndværker — send direkte til din e-mail.
          </p>
          <div className="flex justify-center">
            <EmailCaptureForm
              source="lead_magnet"
              ctaLabel="Send mig guiden →"
              successMessage="Tjek din indbakke — guiden er på vej!"
              downloadHref="/downloads/byggeguide.pdf"
            />
          </div>
        </div>
      </section>

      {/* ── TILBUDSBEREGNER ── */}
      <section id="tilbudsberegner" className="section-pad bg-[var(--navy)]">
        <p className="section-label section-label-light">Prisestimat</p>
        <h2 className="section-title section-title-light">
          Hvad koster dit <em>projekt?</em>
        </h2>
        <p className="max-w-[520px] font-[var(--font-body)] text-[.95rem] leading-[1.75] font-light text-[rgba(255,255,255,.55)]">
          Få et vejledende prisestimat på få minutter. Angiv projekttype, størrelse og
          din tidsramme — vi kontakter dig med et præcist tilbud.
        </p>
        <PriceCalculator />
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
