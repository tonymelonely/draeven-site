"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CalloutFix({ fix, href }: { fix: string; href?: string }) {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <p className="rounded-lg border border-[color-mix(in_srgb,var(--color-warn)_30%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-paper)_55%,transparent)] px-2.5 py-2 text-[0.82rem] text-[var(--color-ink)]">
      <span className="font-medium text-[var(--color-warn)]">{isNl ? "Fix: " : "Fix: "}</span>
      {fix}
      {href ? (
        <>
          {" "}
          <Link
            href={href}
            className="text-[var(--color-accent-bright)] underline-offset-2 hover:underline"
          >
            {isNl ? "Waarom faalt dit?" : "Why is this failing?"}
          </Link>
        </>
      ) : null}
    </p>
  );
}
