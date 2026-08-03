"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Er den første samtale gratis?",
    a: "Ja. Den indledende afklaringssamtale er gratis og uforpligtende. Her taler vi kort om dit projekt og finder ud af, hvilken hjælp der giver mest mening for dig.",
  },
  {
    q: "Kan I også indhente tilbud fra håndværkere?",
    a: "Ja. Vi hjælper med at indhente og sammenligne tilbud fra håndværkere, så du får tilbud, der er lige til at sammenligne — ikke bare det billigste.",
  },
  {
    q: "Udfører I selv byggearbejdet?",
    a: "Nej. August Råd & Byg rådgiver og koordinerer — vi er ikke selv udførende håndværkere. Det praktiske arbejde udføres af relevante samarbejdspartnere, herunder autoriserede el- og VVS-installatører, hvor det er påkrævet.",
  },
  {
    q: "Kan jeg bruge jer, hvis jeg allerede har fået tilbud?",
    a: "Ja, det er faktisk et af de mest almindelige udgangspunkter. Med Tilbuds- og aftaletjek gennemgår vi de tilbud, du allerede har, og hjælper dig med at vurdere dem.",
  },
  {
    q: "Hvad koster bygherrestyring?",
    a: "Det afhænger af projektets omfang. Vi tilbyder enten en fast pris ud fra projektet eller løbende timepris på 1.195 kr. inkl. moms. Du får altid et konkret estimat, før vi går i gang.",
  },
  {
    q: "Hjælper I gennem hele renoveringen?",
    a: "Ja, hvis du ønsker det. Vores pakker kan bruges enkeltvis eller i forlængelse af hinanden — fra den første afklaring til aflevering af det færdige projekt.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 max-w-[720px]">
      {faqs.map((item, i) => {
        const open = openIndex === i;
        const triggerId = `faq-trigger-${i}`;
        const panelId = `faq-panel-${i}`;

        return (
          <div key={item.q} className="faq-item">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                className="faq-trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!open}
              className="faq-panel"
            >
              <p className="copy-sm">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
