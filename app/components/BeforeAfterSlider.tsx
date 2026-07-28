"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface Props {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  title: string;
  description?: string;
  autoPlay?: boolean;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt = "Før",
  afterAlt = "Efter",
  title,
  description,
  autoPlay = false,
}: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [autoActive, setAutoActive] = useState(
    () =>
      autoPlay &&
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  // Auto-sweep the reveal back and forth while in view, until the visitor
  // takes over by dragging — reduced-motion users never get the auto-sweep.
  useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAutoActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [autoPlay]);

  useEffect(() => {
    if (!autoActive || dragging) return;
    let raf: number;
    const start = performance.now();
    const cyclePeriodMs = 7000;
    const tick = (now: number) => {
      const t = ((now - start) % cyclePeriodMs) / cyclePeriodMs;
      // Ping-pong between 22% and 78% using a smooth sine wave
      const wave = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      setPosition(22 + wave * 56);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoActive, dragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setAutoActive(false);
    setDragging(true);
    updatePosition(e.clientX);
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    },
    [dragging, updatePosition]
  );

  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setAutoActive(false);
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => setDragging(false);

  return (
    <div>
      {/* Slider */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          overflow: "hidden",
          userSelect: "none",
          cursor: dragging ? "grabbing" : "grab",
          background: "#000",
        }}
      >
        {/* AFTER image (full width, underneath) */}
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />

        {/* BEFORE image (clipped to left side) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 2,
            background: "white",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            position: "absolute",
            top: "50%",
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: dragging ? "grabbing" : "grab",
            zIndex: 10,
            touchAction: "none",
          }}
        >
          {/* Left/right arrows */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 5l-5 5 5 5M13 5l5 5-5 5" stroke="#2d3748" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Labels */}
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(45,55,72,0.75)",
            color: "white",
            fontSize: ".65rem",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            padding: "4px 10px",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            pointerEvents: "none",
            opacity: position < 15 ? 0 : 1,
            transition: "opacity .2s",
          }}
        >
          Før
        </span>
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(184,149,106,0.85)",
            color: "white",
            fontSize: ".65rem",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            padding: "4px 10px",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            pointerEvents: "none",
            opacity: position > 85 ? 0 : 1,
            transition: "opacity .2s",
          }}
        >
          Efter
        </span>
      </div>

      {/* Caption */}
      <div style={{ padding: "1.4rem 0 .5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "var(--navy)",
            marginBottom: ".3rem",
          }}
        >
          {title}
        </p>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: ".82rem",
              lineHeight: 1.65,
              color: "var(--grey)",
              fontWeight: 300,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
