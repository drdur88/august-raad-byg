"use client";

import Image from "next/image";
import { useId, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  tag: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  title,
  tag,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();

  return (
    <div className="before-after">
      <div className="before-after-frame">
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          className="before-after-before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <span className="before-after-tag">{tag}</span>
        <span className="before-after-label before-after-label-before">Før</span>
        <span className="before-after-label before-after-label-after">Efter</span>

        <input
          id={sliderId}
          className="before-after-range"
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label={`Før og efter: ${title}`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />

        <div
          className="before-after-divider"
          style={{ left: `${position}%` }}
        />
        <div
          className="before-after-handle"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
