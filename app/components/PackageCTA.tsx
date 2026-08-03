"use client";

export const PREFILL_EVENT = "august-prefill-project-type";

export default function PackageCTA({
  projectType,
  label,
  className,
}: {
  projectType: string;
  label: string;
  className?: string;
}) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent<string>(PREFILL_EVENT, { detail: projectType }));
  }

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {label}
    </a>
  );
}
