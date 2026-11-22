"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PathNext({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div className="path-next sticky bottom-3 z-20 mt-8">
      <Link
        href={href}
        className="flex items-center justify-between gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] px-4 py-3 no-underline shadow-[0_10px_40px_color-mix(in_srgb,black_35%,transparent)] backdrop-blur-md transition hover:border-[var(--color-accent)]"
      >
        <span>
          <span className="block text-[0.62rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {isNl ? "Volgende stap" : "Next step"}
          </span>
          <span className="mt-0.5 block font-medium text-[var(--color-ink)]">{title}</span>
        </span>
        <span className="text-[var(--color-accent-bright)]" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
