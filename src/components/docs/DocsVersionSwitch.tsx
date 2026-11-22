"use client";

import { useLocale } from "next-intl";
import { DOCS_CORE_VERSION } from "@/lib/docs-meta";

const VERSIONS: Array<{
  id: string;
  label: string;
  current: boolean;
  disabled?: boolean;
}> = [
  { id: "0.1.9", label: "0.1.9", current: true },
  { id: "next", label: "next", current: false, disabled: true },
];

export function DocsVersionSwitch() {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-line)] p-0.5"
      role="group"
      aria-label={isNl ? "Docs-versie" : "Docs version"}
    >
      {VERSIONS.map((version) => (
        <span
          key={version.id}
          title={
            version.disabled
              ? isNl
                ? "Nog niet beschikbaar"
                : "Not available yet"
              : isNl
                ? `Gidsen voor @draeven/core ${DOCS_CORE_VERSION}`
                : `Guides for @draeven/core ${DOCS_CORE_VERSION}`
          }
          className={`rounded-md px-2 py-0.5 text-[0.65rem] tracking-[0.08em] uppercase ${
            version.current
              ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]"
              : "cursor-not-allowed text-[var(--color-ink-soft)] opacity-55"
          }`}
        >
          {version.label}
        </span>
      ))}
    </div>
  );
}
