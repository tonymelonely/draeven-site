"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";

export function CollapsibleCheatsheet({
  title,
  children,
  defaultOpen = false,
}: {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [open, setOpen] = useState(defaultOpen);
  const heading =
    title || (isNl ? "Referentie (cheatsheet)" : "Reference (cheatsheet)");

  return (
    <div className="collapsible-cheatsheet my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[color-mix(in_srgb,var(--color-mist)_22%,transparent)]"
        aria-expanded={open}
      >
        <span>
          <span className="block text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {isNl ? "Naslag" : "Lookup"}
          </span>
          <span className="mt-0.5 block text-sm font-medium text-[var(--color-ink)]">
            {heading}
          </span>
        </span>
        <span
          className={`text-[var(--color-accent)] transition ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          ▸
        </span>
      </button>
      {open ? (
        <div className="border-t border-[var(--color-line)] px-4 py-3 [&_table]:my-0">
          {children}
        </div>
      ) : (
        <p className="border-t border-[var(--color-line)] px-4 py-2 text-[0.8rem] text-[var(--color-ink-soft)]">
          {isNl
            ? "Tour hierboven leert. Open dit voor limieten en verplichte velden."
            : "The tour above teaches. Open this for limits and required fields."}
        </p>
      )}
    </div>
  );
}
