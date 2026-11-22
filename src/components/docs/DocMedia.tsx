"use client";

import { useLocale } from "next-intl";

const SCENES: Record<
  string,
  { en: string; nl: string; frames: Array<{ en: string; nl: string }> }
> = {
  collectors: {
    en: "Collector flow",
    nl: "Collector-stroom",
    frames: [
      { en: "1. Reply with a button", nl: "1. Reply met een knop" },
      { en: "2. ctx.collect waits", nl: "2. ctx.collect wacht" },
      { en: "3. User clicks → update", nl: "3. Klik → update" },
    ],
  },
  embeds: {
    en: "Embed composition",
    nl: "Embed-opbouw",
    frames: [
      { en: "1. embed({ header })", nl: "1. embed({ header })" },
      { en: "2. fields / breakline", nl: "2. fields / breakline" },
      { en: "3. reply(embed)", nl: "3. reply(embed)" },
    ],
  },
  subcommands: {
    en: "Subcommand tree",
    nl: "Subcommando-boom",
    frames: [
      { en: "1. /mod (parent)", nl: "1. /mod (parent)" },
      { en: "2. leaf or group", nl: "2. leaf of groep" },
      { en: "3. Handler on the leaf", nl: "3. Handler op de leaf" },
    ],
  },
};

/** Lightweight animated “GIF slot” — CSS steps until real media ships. */
export function DocMedia({ id }: { id: string }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const scene = SCENES[id];
  if (!scene) return null;

  return (
    <figure className="doc-media my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <figcaption className="border-b border-[var(--color-line)] px-4 py-2 text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
        {isNl ? scene.nl : scene.en}
        <span className="ml-2 opacity-60">{isNl ? "(animatie)" : "(animation)"}</span>
      </figcaption>
      <div className="doc-media__stage relative grid gap-2 bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] p-4 sm:grid-cols-3">
        {scene.frames.map((frame, index) => (
          <div
            key={frame.en}
            className="doc-media__frame rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-4 text-center text-sm text-[var(--color-ink)]"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            {isNl ? frame.nl : frame.en}
          </div>
        ))}
      </div>
    </figure>
  );
}
