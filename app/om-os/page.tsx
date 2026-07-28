import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../components/FadeUp";

export const metadata: Metadata = {
  title: "Om os – August Råd & Byg",
  description:
    "Mød August Råd & Byg — stiftet af tre brødre med en fælles passion for byggeri, håndværk, rådgivning og projektledelse.",
};

const pillars = [
  {
    name: "Håndværk",
    desc: "Solidt, ærligt håndværk udført med stolthed — fra de mindste detaljer til de største konstruktioner.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    name: "Rådgivning",
    desc: "Ærlig og uafhængig rådgivning, der sætter dine behov og dit budget først — hver gang.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    name: "Projektledelse",
    desc: "Overblik og struktur, så dit projekt bliver ført sikkert i mål — til tiden og til prisen.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
];

const values = [
  "Personlig betjening fra start til slut",
  "Gennemsigtighed i økonomi og tidsplan",
  "Screenede og erfarne håndværkere",
  "Dokumenteret kvalitetssikring",
  "Familieejet og lokalt forankret",
  "Fast pris – ingen overraskelser",
];

export default function OmOs() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="grid-about">
        <div className="about-img-mh relative min-h-[600px] overflow-hidden bg-[var(--navy)]">
          <Image
            src="/renovations/sovevaerelse-after.jpg"
            alt="Håndværk udført af August Råd & Byg"
            fill
            sizes="50vw"
            className="kenburns object-cover"
            style={{ opacity: .4, mixBlendMode: "luminosity" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(45,55,72,.3) 0%, rgba(45,55,72,.8) 100%)" }}
          />
          <blockquote className="absolute bottom-12 left-12 right-12 border-l-2 border-[var(--gold)] pl-6 font-[var(--font-heading)] text-[1.6rem] leading-[1.5] font-semibold text-[var(--white)]">
            &ldquo;Vi ved, hvad det betyder at bygge noget op fra bunden.&rdquo;
          </blockquote>
        </div>

        <div className="about-content-pad flex flex-col justify-center bg-[var(--off-white)] py-24 pr-[5vw] pl-20">
          <p className="eyebrow mb-6">Vores historie</p>
          <h1 className="heading-hero mb-[1.8rem]">
            Tre ben.<br /><em>Aldrig i ubalance.</em>
          </h1>
          <p className="copy mb-6">
            En skammel med tre ben vælter aldrig — uanset hvor ujævnt underlaget er. August
            Råd &amp; Byg er stiftet af tre brødre, der hver bidrager med sin egen styrke. Vi kom
            til Danmark som børn fra Balkanhalvøen i 1990&apos;erne og fandt vores nye hjem på den
            jyske halvø. Her voksede vi op i et hjem, hvor forældrene byggede en ny tilværelse fra
            bunden — og hvor vi tidligt lærte, hvad det kræver at genopbygge noget rigtigt.
          </p>
          <p className="copy">
            Den forståelse har aldrig sluppet os. I dag er den drivkraften bag alt, hvad vi laver
            i August Råd &amp; Byg.
          </p>
        </div>
      </section>

      {/* ── GENOPBYGNING ── */}
      <section className="section-pad bg-[var(--white)]">
        <div className="mx-auto max-w-[720px]">
          <p className="section-label">Vores rødder</p>
          <h2 className="section-title">
            Genopbygning i <em>blodet</em>
          </h2>
          <p className="copy mb-6">
            Vi har set på nært hold, hvor stor en forskel det gør, når noget bliver bygget
            rigtigt — uanset om det er ét enkelt værelse eller en hel bygning. Den lære sidder
            dybt, og den følger os stadig, når vi går ind i et nyt projekt sammen med en kunde.
          </p>
          <p className="copy">
            Uanset størrelsen på opgaven møder vi den med den samme respekt: godt håndværk
            handler i sidste ende om at skabe trygge rammer for menneskers liv.
          </p>
        </div>
      </section>

      {/* ── TRE STYRKER ── */}
      <section className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Hvad vi brænder for</p>
        <h2 className="section-title">
          Tre ben, <em>ét fundament</em>
        </h2>
        <p className="copy mb-10 max-w-[560px]">
          Fjern ét ben fra en skammel, og den vælter. Sådan ser vi også vores fag: håndværk,
          rådgivning og projektledelse er tre lige stærke ben, der sammen bærer hvert eneste
          projekt fra idé til færdigt resultat.
        </p>

        <div className="grid-services">
          {pillars.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1}>
              <div className="service-card h-full">
                <div className="mb-5">{p.icon}</div>
                <p className="card-title mb-[.8rem]">{p.name}</p>
                <p className="copy-sm">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── GODE MENNESKER ── */}
      <section className="section-pad bg-[var(--navy)] text-[var(--white)]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="section-label section-label-light mx-auto justify-center">Vores håndværkere</p>
          <h2 className="section-title section-title-light">
            Gode mennesker finder <em>hinanden</em>
          </h2>
          <p className="mx-auto font-[var(--font-body)] text-[.95rem] leading-[1.8] font-light text-[rgba(255,255,255,.65)]">
            Vi samarbejder med et fast team af dygtige håndværkere, som er blevet grundigt
            screenet, før de bliver en del af vores netværk. Vi tror på, at gode mennesker har
            det med at finde hinanden — og det er den standard, vi holder alle vores
            samarbejdspartnere op imod.
          </p>
        </div>
      </section>

      {/* ── VÆRDIER ── */}
      <section className="section-pad bg-[var(--white)]">
        <p className="section-label">Det kan du regne med</p>
        <h2 className="section-title">
          Vores <em>værdier</em>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v} className="flex items-start gap-[.8rem]">
              <span className="mt-[.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
              <span className="font-[var(--font-body)] text-[.85rem] font-normal text-[var(--navy)]">
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-[var(--off-white)] text-center">
        <p className="section-label mx-auto justify-center">Kom i gang</p>
        <h2 className="section-title mx-auto text-center">
          Skal vi tale om <em>dit projekt?</em>
        </h2>
        <p className="copy mx-auto mb-8 max-w-[480px]">
          Vi tilbyder altid en gratis og uforpligtende samtale om dit projekt.
        </p>
        <Link
          href="/#contact"
          className="btn-primary inline-block px-[2.2rem] py-[.9rem] text-[.78rem] font-medium tracking-[.14em] uppercase no-underline"
        >
          Kontakt os
        </Link>
      </section>
    </div>
  );
}
