import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../components/FadeUp";
import Carousel from "../components/Carousel";

const dengangImages = [
  { src: "/om-os/dengang-1.png", alt: "Byggeplads fra tidligere tid" },
  { src: "/om-os/dengang-2.png", alt: "Barndomsminde ved stranden" },
  { src: "/om-os/dengang-3.png", alt: "Genopbygning efter ødelæggelse" },
  { src: "/om-os/dengang-4.png", alt: "Sammenhold på byggepladsen i tidligere år" },
];

const nuImages = [
  { src: "/om-os/nu-1.png", alt: "Nybygget ejendom" },
  { src: "/om-os/nu-2.png", alt: "Solcelleanlæg på tag" },
  { src: "/om-os/nu-3.png", alt: "Vindmøller i landskabet" },
  { src: "/om-os/nu-4.png", alt: "Renoveret badeværelse" },
  { src: "/om-os/nu-5.png", alt: "Renoveret stue med lyst gulv" },
  { src: "/om-os/nu-6.png", alt: "Byggeprojekt under opførelse" },
  { src: "/om-os/nu-7.png", alt: "Byggeprojekt under opførelse" },
  { src: "/om-os/nu-8.png", alt: "Byggeprojekt under opførelse" },
  { src: "/om-os/nu-9.png", alt: "Villa med pool efter renovering" },
];

export const metadata: Metadata = {
  title: "Om os – August Råd & Byg",
  description:
    "Mød August Råd & Byg — skabt af tre sønner med en fælles opdragelse og et enkelt princip: det, man påtager sig, gør man ordentligt.",
};

const valueSteps = [
  {
    name: "Afklaring og økonomi",
    desc: "Vi gennemgår dine ønsker, muligheder og dit budget, så de rigtige beslutninger bliver truffet, før arbejdet begynder.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    name: "Tilbud og aftaler",
    desc: "Vi hjælper med arbejdsbeskrivelser, tilbud og klare aftaler, så du ved, hvad du betaler for – og håndværkerne ved, hvad de skal levere.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1z"/>
        <rect x="5" y="5" width="14" height="16" rx="2"/>
        <line x1="8" y1="11" x2="16" y2="11"/>
        <line x1="8" y1="15" x2="13" y2="15"/>
      </svg>
    ),
  },
  {
    name: "Styring og aflevering",
    desc: "Vi følger projektets fremdrift, koordinerer de involverede og holder øje med økonomi, kvalitet og aftaler frem til den endelige aflevering.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
];

const coreValues = [
  {
    name: "Et ord er et ord",
    desc: "Den pris, deadline og kvalitet vi aftaler, er den der holder. Ingen tomme løfter, ingen overraskelser på regningen.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    name: "Din tryghed i byggeprocessen",
    desc: "Vi passer på dit hjem, som var det vores eget – rydder op efter os hver dag og guider dig i øjenhøjde gennem hele forløbet.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    name: "Personligt ejerskab",
    desc: "Vi arbejder med et fast, sammentømret team frem for skiftende løsarbejdere. Det giver ægte medejerskab og løsninger, der er bygget til at holde i generationer.",
    icon: (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6.5-4.35-9.5-8.5C.5 9 2 5 5.5 5c2 0 3.5 1.5 4.5 3 1-1.5 2.5-3 4.5-3C17.5 5 19 9 21.5 12.5 18.5 16.65 12 21 12 21z"/>
      </svg>
    ),
  },
];

export default function OmOs() {
  return (
    <div>
      {/* ── VORES HISTORIE ── */}
      <section className="grid-about">
        <div className="about-img-mh relative min-h-[600px] overflow-hidden bg-[var(--navy)]">
          <Image
            src="/renovations/sovevaerelse-after.jpg"
            alt="Renoveret soveværelse, planlagt og fulgt af August Råd & Byg"
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
            &ldquo;En aftale er en aftale. Et ansvar følger man helt til dørs.&rdquo;
          </blockquote>
        </div>

        <div className="about-content-pad flex flex-col justify-center bg-[var(--off-white)] py-24 pr-[5vw] pl-20">
          <p className="eyebrow mb-6">Vores historie</p>
          <h1 className="heading-hero mb-[1.8rem]">
            Tre sønner. <em>Ét fælles ansvar.</em>
          </h1>
          <p className="copy mb-5">
            August Råd &amp; Byg er skabt af tre sønner med en fælles opdragelse og et enkelt
            princip: Det, man påtager sig, gør man ordentligt.
          </p>
          <p className="copy mb-5">
            Vi er vokset op med respekt for familien, det hårde arbejde og værdien af at holde
            sit ord. For os er tillid ikke noget, man kræver – det er noget, man gør sig
            fortjent til gennem sine handlinger.
          </p>
          <p className="copy">
            Den tilgang tager vi med ind i hvert projekt. Vi behandler kundens hjem og økonomi
            med samme omhu, som var det vores eget, og vi følger opgaven helt til dørs.
          </p>
        </div>
      </section>

      {/* ── HVOR DET BEGYNDTE / DET GØR VI I DAG ── */}
      <section className="section-pad bg-[var(--white)]">
        <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden border border-[var(--light-grey)] bg-[var(--white)]">
            <div className="work-thumb">
              <Carousel images={dengangImages} label="Dengang" />
              <span className="work-thumb-tag">Dengang</span>
            </div>
            <div className="p-6 text-center">
              <p className="card-title mb-[.4rem]" style={{ fontSize: "1.1rem" }}>Hvor det begyndte</p>
              <p className="copy-sm">
                Med en fælles opdragelse præget af familie, arbejdsomhed og ansvar for det,
                man påtager sig.
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-[var(--light-grey)] bg-[var(--white)]">
            <div className="work-thumb">
              <Carousel images={nuImages} label="Nu" />
              <span className="work-thumb-tag">Nu</span>
            </div>
            <div className="p-6 text-center">
              <p className="card-title mb-[.4rem]" style={{ fontSize: "1.1rem" }}>Det gør vi i dag</p>
              <p className="copy-sm">
                Vi hjælper private med at skabe overblik og styre renoveringsprojekter fra de
                første beslutninger til den endelige aflevering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VORES TILGANG ── */}
      <section className="section-pad bg-[var(--navy)] text-[var(--white)]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="section-label section-label-light mx-auto justify-center">Vores tilgang</p>
          <h2 className="section-title section-title-light">
            Bygget på <em>ordentlighed</em>
          </h2>
          <p className="mx-auto mb-5 font-[var(--font-body)] text-[.95rem] leading-[1.8] font-light text-[rgba(255,255,255,.65)]">
            Et hjem er mere end mursten og kvadratmeter. Det er rammen om en familie,
            resultatet af mange års arbejde og for de fleste deres største investering.
          </p>
          <p className="mx-auto mb-5 font-[var(--font-body)] text-[.95rem] leading-[1.8] font-light text-[rgba(255,255,255,.65)]">
            Derfor tror vi på grundig planlægning, fornuftig økonomi og løsninger, der holder.
            Vi jagter ikke det dyreste eller mest moderne for enhver pris. Vi anbefaler det,
            der giver mening – både nu og på længere sigt.
          </p>
          <p className="mx-auto font-[var(--font-body)] text-[.95rem] leading-[1.8] font-light text-[rgba(255,255,255,.65)]">
            Vi kommunikerer tydeligt, passer på pengene og siger ærligt til, når noget kan
            gøres bedre, enklere eller mere holdbart.
          </p>
        </div>
      </section>

      {/* ── SÅDAN SKABER VI VÆRDI ── */}
      <section className="section-pad bg-[var(--off-white)]">
        <p className="section-label">Sådan skaber vi værdi</p>
        <h2 className="section-title">
          Fra første beslutning til <em>færdigt resultat</em>
        </h2>
        <p className="copy mb-10 max-w-[560px]">
          Et godt renoveringsprojekt begynder længe før den første håndværker møder op. Vi
          hjælper med at træffe beslutningerne i den rigtige rækkefølge og skaber et
          sammenhængende forløb fra afklaring til aflevering.
        </p>

        <div className="grid-services">
          {valueSteps.map((v, i) => (
            <FadeUp key={v.name} delay={i * 0.1}>
              <div className="service-card h-full">
                <div className="mb-5">{v.icon}</div>
                <p className="card-title mb-[.8rem]">{v.name}</p>
                <p className="copy-sm">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── VÆRDIER ── */}
      <section className="section-pad bg-[var(--white)]">
        <p className="section-label">Det kan du regne med</p>
        <h2 className="section-title">
          Vores <em>værdier</em>
        </h2>
        <p className="copy mb-10 max-w-[560px]">
          Tre principper, vi er vokset op med, og som vi tager med ind i hvert eneste projekt.
        </p>

        <div className="grid-services">
          {coreValues.map((v, i) => (
            <FadeUp key={v.name} delay={i * 0.1}>
              <div className="service-card h-full">
                <div className="mb-5">{v.icon}</div>
                <p className="card-title mb-[.8rem]">{v.name}</p>
                <p className="copy-sm">{v.desc}</p>
              </div>
            </FadeUp>
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
          Vi tilbyder altid en gratis og uforpligtende afklaringssamtale om dit
          renoveringsprojekt.
        </p>
        <Link
          href="/#contact"
          className="btn-primary inline-block px-[2.2rem] py-[.9rem] text-[.78rem] font-medium tracking-[.14em] uppercase no-underline"
        >
          Book gratis afklaringssamtale
        </Link>
      </section>
    </div>
  );
}
