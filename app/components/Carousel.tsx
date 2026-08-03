"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

export default function Carousel({
  images,
  label,
  intervalMs = 4000,
}: {
  images: CarouselImage[];
  label: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  function goTo(i: number) {
    setIndex(((i % images.length) + images.length) % images.length);
  }

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 768px) 340px, 90vw"
          loading={i === 0 ? "eager" : "lazy"}
          unoptimized
          className="object-cover"
          style={{ opacity: i === index ? 1 : 0, transition: "opacity .6s ease" }}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-nav carousel-prev"
            aria-label={`Forrige billede – ${label}`}
            onClick={() => goTo(index - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-nav carousel-next"
            aria-label={`Næste billede – ${label}`}
            onClick={() => goTo(index + 1)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="carousel-dots" role="tablist" aria-label={`Billeder – ${label}`}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Vis billede ${i + 1} af ${images.length} – ${label}`}
                className={`carousel-dot${i === index ? " active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
