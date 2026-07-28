"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  label: "Før" | "Efter";
}

const galleryImages: GalleryImage[] = [
  { src: "/renovations/stue-before.jpg", alt: "Stue før renovering", category: "Stue", label: "Før" },
  { src: "/renovations/stue-after.jpg", alt: "Stue efter renovering", category: "Stue", label: "Efter" },
  { src: "/renovations/loft-before.jpg", alt: "Loftrum før renovering", category: "Loft", label: "Før" },
  { src: "/renovations/loft-after.jpg", alt: "Loftrum efter renovering", category: "Loft", label: "Efter" },
  { src: "/renovations/sovevaerelse-before.jpg", alt: "Soveværelse før renovering", category: "Soveværelse", label: "Før" },
  { src: "/renovations/sovevaerelse-after.jpg", alt: "Soveværelse efter renovering", category: "Soveværelse", label: "Efter" },
];

const categories = ["Alle", ...Array.from(new Set(galleryImages.map((i) => i.category)))];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Alle"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  function close() {
    setLightboxIndex(null);
  }
  function next() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }
  function prev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="gallery-thumb"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Åbn ${img.alt} i fuld størrelse`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            <span className="gallery-thumb-tag">{img.label}</span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="gallery-lightbox-overlay" onClick={close}>
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={close}
            aria-label="Luk"
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Forrige billede"
          >
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="gallery-lightbox-image-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <p className="gallery-lightbox-caption">{active.category} — {active.label}</p>
          </div>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Næste billede"
          >
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
