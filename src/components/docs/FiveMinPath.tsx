"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEARNING_PATHS } from "@/lib/docs-meta";

const FIVE_MIN = [
  { slug: "install", en: "Install", nl: "Installatie" },
  { slug: "creating-app", en: "Create the app", nl: "App aanmaken" },
  { slug: "quickstart", en: "Quickstart", nl: "Snelstart" },
  { slug: "commands", en: "First command", nl: "Eerste commando" },
] as const;

export function FiveMinPath({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const heading = title || (isNl ? "Eerste 5 minuten" : "First 5 minutes");
  const lead =
    subtitle ||
    (isNl
      ? "Installatie → Discord-app → online → één werkend slash-commando."
      : "Install → Discord app → online → one working slash command.");

  return (
    <div className="docs-five-min my-6 rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_28%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-accent-soft)_40%,transparent)] p-4 sm:p-5">
      <p className="text-[0.65rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
        {isNl ? "Pad" : "Path"}
      </p>
      <h2 className="mt-1 font-display text-xl tracking-tight text-[var(--color-ink)]">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{lead}</p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {FIVE_MIN.map((step, index) => (
          <li key={step.slug}>
            <Link
              href={`/docs/${step.slug}`}
              className="docs-path-step flex h-full flex-col gap-1 rounded-xl px-3 py-2.5 no-underline"
            >
              <span className="text-[0.62rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium text-[var(--color-ink)]">
                {isNl ? step.nl : step.en}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {LEARNING_PATHS.map((path) => (
          <span key={path.id} className="text-[var(--color-ink-soft)]">
            <span className="text-[0.62rem] tracking-[0.12em] uppercase">
              {isNl ? path.nl : path.en}:{" "}
            </span>
            {path.steps.map((step, i) => (
              <span key={step.slug}>
                {i > 0 ? " · " : null}
                <Link href={`/docs/${step.slug}`} className="no-underline hover:underline">
                  {isNl ? step.nl : step.en}
                </Link>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
