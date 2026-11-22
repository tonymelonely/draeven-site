"use client";

import { useLocale } from "next-intl";
import { DOCS_CORE_VERSION, DOCS_PACKAGE_PIN } from "@/lib/docs-meta";

/** Shows when guide pin and declared package pin drift. */
export function CoreAlignBadge() {
  const locale = useLocale();
  const isNl = locale === "nl";
  const aligned = DOCS_CORE_VERSION === DOCS_PACKAGE_PIN;

  if (aligned) {
    return (
      <span
        className="rounded-md border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[var(--color-accent-soft)] px-2 py-1 text-[0.65rem] tracking-[0.08em] text-[var(--color-accent-bright)] uppercase"
        title={
          isNl
            ? `Gidsen afgestemd op @draeven/core ${DOCS_CORE_VERSION}`
            : `Guides aligned to @draeven/core ${DOCS_CORE_VERSION}`
        }
      >
        {isNl ? `core ${DOCS_CORE_VERSION}` : `core ${DOCS_CORE_VERSION}`}
      </span>
    );
  }

  return (
    <span
      className="rounded-md border border-[color-mix(in_srgb,var(--color-warn)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-warn)_12%,transparent)] px-2 py-1 text-[0.65rem] tracking-[0.08em] text-[var(--color-warn)] uppercase"
      title={
        isNl
          ? `Gidsen ${DOCS_CORE_VERSION} · package-pin ${DOCS_PACKAGE_PIN}`
          : `Guides ${DOCS_CORE_VERSION} · package pin ${DOCS_PACKAGE_PIN}`
      }
    >
      {isNl
        ? `drift ${DOCS_CORE_VERSION}≠${DOCS_PACKAGE_PIN}`
        : `drift ${DOCS_CORE_VERSION}≠${DOCS_PACKAGE_PIN}`}
    </span>
  );
}
