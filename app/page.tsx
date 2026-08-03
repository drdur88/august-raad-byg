import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import FadeUp from "./components/FadeUp";
import HeroMedia from "./components/HeroMedia";
import FAQ from "./components/FAQ";
import PackageCTA from "./components/PackageCTA";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

// Drop an .mp4 into public/videos/hero.mp4 and the hero automatically
// plays it instead of the static photo — no code changes needed.
const HERO_VIDEO_PATH = path.join(process.cwd(), "public", "videos", "hero.mp4");

const checkIcon = (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const packages = [
  {
    num: "01",
    name: "Renoveringsafklaring",
    desc: "Vi gennemgår dine ønsker, boligen og projektets muligheder. Du får en prioriteret plan, et foreløbigt budget og klare næste skridt.",
    items: [
      "Indledende gennemgang af projektet",
      "Afklaring af ønsker og prioriteringer",
      "Foreløbig budgetramme",
      "Vurdering af projektets næste skridt",
      "Kort skriftlig opsamling",
    ],
    price: "Introduktionspris: 3.495 kr. inkl. moms",
    cta: "Book renoveringsafklaring",
  },
  {
    num: "02",
    name: "Tilbuds- og aftaletjek",
    desc: "Vi sammenligner op til tre håndværkertilbud, finder mangler og uklare formuleringer og hjælper dig med at vælge det rigtige – ikke bare det billigste.",
    items: [
      "Gennemgang af op til tre tilbud",
      "Sammenligning af pris og omfang",
      "Identifikation af mangler og forbehold",
      "Kontrol af betalingsplan og tidsplan",
      "Spørgsmål, du bør stille håndværkerne",
      "Anbefaling af næste skridt",
    ],
    price: "Fra 4.995 kr. inkl. moms",
    cta: "Få tjekket mine tilbud",
    featured: true,
  },
  {
    num: "03",
    name: "Projektklar renovering",
    desc: "Vi udarbejder arbejdsbeskrivelse, budgetramme, tidsplan og tilbudsgrundlag, så håndværkerne beregner pris på den samme opgave.",
    items: [
      "Afklaring af projektets omfang",
      "Samlet arbejdsbeskrivelse",
      "Budget- og risikoramme",
      "Overordnet tidsplan",
      "Tilbudsgrundlag til håndværkere",
      "Hjælp til indhentning og sammenligning af tilbud",
    ],
    price: "Fra 14.995 kr. inkl. moms",
    cta: "Gør mit projekt klar",
  },
  {
    num: "04",
    name: "Bygherrestyring",
    desc: "Vi fungerer som kundens faste kontaktpunkt og følger økonomi, tidsplan, ændringer, håndværkere og aflevering gennem projektet.",
    items: [
      "Koordinering med håndværkere",
      "Opfølgning på økonomi og tidsplan",
      "Håndtering af ændringer og tillægsarbejde",
      "Løbende status til kunden",
      "Gennemgang før betalinger",
      "Hjælp ved aflevering og mangelregistrering",
    ],
    price: "Fast pris efter projektets omfang eller 1.195 kr. pr. time inkl. moms",
    cta: "Tal med os om bygherrestyring",
  },
];

const processSteps = [
  { num: "1", title: "Gratis afklaringssamtale", desc: "Vi tager en kort samtale om dit projekt og vurderer, hvilken hjælp der giver mening." },
  { num: "2", title: "Afklaring og plan", desc: "Vi skaber overblik over ønsker, økonomi, risici og næste skridt." },
  { num: "3", title: "Tilbud og forberedelse", desc: "Vi hjælper med arbejdsbeskrivelse, tilbud og valg af håndværkere." },
  { num: "4", title: "Styring og aflevering", desc: "Vi følger projektet og hjælper med at holde styr på økonomi, kvalitet og tidsplan." },
];

const valueItems = [
  {
    title: "Sammenlignelige tilbud",
    desc: "Håndværkerne prissætter den samme opgave, så du kan sammenligne tilbud direkte.",
  },
  {
    title: "Færre overraskelser",
    desc: "Ændringer og risici bliver synlige tidligere i forløbet – ikke efter regningen lander.",
  },
  {
    title: "Styr på aftalerne",
    desc: "Beslutninger, priser og deadlines bliver dokumenteret, så alle ved, hvad der er aftalt.",
  },
];

const workItems = [
  {
    before: "/renovations/stue-before.jpg",
    after: "/renovations/stue-after.jpg",
    tag: "Stue",
    title: "Stuerenovering",
    desc: "Total renovering planlagt og fulgt til dørs — nyt loft, gulv og indbyggede spots.",
  },
  {
    before: "/renovations/loft-before.jpg",
    after: "/renovations/loft-after.jpg",
    tag: "Loftrum",
    title: "Loftrum",
    desc: "Råt loftrum koordineret og omdannet til lyst, moderne værelse.",
  },
  {
    before: "/renovations/sovevaerelse-before.jpg",
    after: "/renovations/sovevaerelse-after.jpg",
    tag: "Soveværelse",
    title: "Soveværelse",
    desc: "Nyt gulv, malerbehandling og indretning — styret fra A til Z.",
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
            imageAlt="Renoveret stue"
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
        <div className="relative z-[2] flex min-h-screen flex-col justify-center px-[6vw] pt-32 pb-32">
          <p className="eyebrow mb-6">Renoveringsrådgivning</p>

          <h1 className="heading-hero heading-hero-light mb-6 max-w-[900px]">
            Få styr på renoveringen, <em>før den bliver dyr</em>
          </h1>

          <p className="copy copy-light mb-10 max-w-[480px]">
            Vi hjælper private boligejere med at planlægge, prissætte og styre
            renoveringer – fra den første idé til den sidste gennemgang.
          </p>

          <div className="flex flex-wrap items-center gap-[1.2rem]">
            <a
              href="#contact"
              className="btn-hero-primary font-[var(--font-body)] px-[2.2rem] py-[.9rem] text-[.78rem] font-bold tracking-[.14em] uppercase no-underline"
            >
              Book en gratis afklaringssamtale
            </a>
            <a
              href="#ydelser"
              className="btn-ghost-light font-[var(--font-body)] text-[.78rem] font-medium tracking-[.14em] uppercase no-underline"
            >
              Se vores rådgivningspakker <span className="arrow">→</span>
            </a>
          </div>

          <p className="mt-9 font-[var(--font-body)] text-[.78rem] font-normal tracking-[.03em] text-[rgba(255,255,255,.55)]">
            Uafhængig rådgivning · Klare priser · Én fast kontaktperson
          </p>
        </div>
      </section>

      {/* ── YDELSER (rådgivningspakker) ── */}
      <section id="ydelser" className="section-pad bg-[var(--white)]">
        <p className="section-label">Vores rådgivningspakker</p>
        <h2 className="section-title">
          Sådan hjælper <em>vi dig</em>
        </h2>
        <p className="copy max-w-[560px]">
          Fire pakker, der kan bruges enkeltvis eller i forlængelse af hinanden — alt efter
          hvor i dit renoveringsprojekt du står.
        </p>

        <div className="grid-packages">
          {packages.map((p, i) => (
            <FadeUp key={p.num} delay={i * 0.08}>
              <div className={`package-card h-full${p.featured ? " featured" : ""}`}>
                {p.featured && <span className="package-badge">Mest populær</span>}
                <span className="mb-4 block font-[var(--font-heading)] text-[2rem] font-bold leading-none text-[var(--light-grey)]">
                  {p.num}
                </span>
                <p className="card-title mb-[.6rem]" style={{ fontSize: "1.2rem" }}>{p.name}</p>
                <p className="copy-sm mb-5">{p.desc}</p>

                <ul className="package-list">
                  {p.items.map((item) => (
                    <li key={item}>
                      {checkIcon}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="package-price">{p.price}</p>

                <PackageCTA
                  projectType={p.name}
                  label={p.cta}
                  className="form-submit block text-center no-underline"
                />
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
            alt="Renoveret loftrum"
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
            &ldquo;Et godt renoveringsprojekt starter med et godt overblik.&rdquo;
          </blockquote>
        </div>

        {/* Content side */}
        <div className="about-content-pad flex flex-col justify-center bg-[var(--off-white)] py-24 pr-[5vw] pl-20">
          <p className="section-label">Om August Råd &amp; Byg</p>
          <h2 className="section-title">
            Renovering med <em>overblik og ro</em>
          </h2>

          <p className="copy mb-6">
            Vi hjælper private boligejere med at træffe de rigtige beslutninger, før
            håndværkerne går i gang. Sammen skaber vi overblik over ønsker, økonomi, tilbud
            og tidsplan, så projektet bliver tydeligt fra starten.
          </p>
          <p className="copy mb-10">
            Når arbejdet begynder, følger vi processen tæt og koordinerer med de rette
            fagfolk. Du får én fast sparringspartner, klare aftaler og en renovering, der
            bliver styret hele vejen til aflevering.
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
        <p className="section-label">Vores erfaring</p>
        <h2 className="section-title">
          Udvalgte <em>projekter</em>
        </h2>
        <p className="copy mb-14 max-w-[520px]">
          Et udpluk af renoveringsprojekter, vi har hjulpet med at planlægge og følge til dørs.
        </p>

        <div className="grid-work">
          {workItems.map((w) => (
            <div key={w.title}>
              <BeforeAfterSlider
                before={w.before}
                after={w.after}
                beforeAlt={`${w.title} før renovering`}
                afterAlt={`${w.title} efter renovering`}
                title={w.title}
                tag={w.tag}
              />
              <p className="card-title mt-5 mb-[.4rem]" style={{ fontSize: "1.15rem" }}>{w.title}</p>
              <p className="copy-sm">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SÅDAN FOREGÅR DET ── */}
      <section id="proces" className="section-pad bg-[var(--navy)] text-[var(--white)]">
        <p className="section-label section-label-light">Kunderejsen</p>
        <h2 className="section-title section-title-light">
          Sådan <em>foregår det</em>
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

      {/* ── HVAD KOSTER MANGLENDE OVERBLIK ── */}
      <section id="overblik" className="section-pad bg-[var(--white)]">
        <p className="section-label">Hvorfor overblik betaler sig</p>
        <h2 className="section-title">
          Hvad koster <em>manglende overblik?</em>
        </h2>
        <p className="copy max-w-[620px]">
          Uklare tilbud, udefinerede opgaver og mundtlige aftaler er blandt de hyppigste
          årsager til ekstraregninger, forsinkelser og konflikter i renoveringsprojekter.
        </p>

        <div className="grid-value">
          {valueItems.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.1}>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]">
                  {checkIcon}
                </div>
                <div>
                  <p className="card-title mb-[.3rem]" style={{ fontSize: "1.05rem" }}>{v.title}</p>
                  <p className="copy-sm">{v.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Spørgsmål &amp; svar</p>
        <h2 className="section-title">
          Godt at <em>vide</em>
        </h2>
        <FAQ />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Kom i kontakt</p>
        <h2 className="section-title">
          Lad os tale om<br />dit <em>renoveringsprojekt</em>
        </h2>

        <div className="grid-contact">
          {/* Contact info */}
          <div>
            <p className="copy mb-10">
              Vi tilbyder altid en gratis og uforpligtende afklaringssamtale om dit
              renoveringsprojekt. Tag fat i os – vi er klar til at hjælpe dig fra første dag.
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
