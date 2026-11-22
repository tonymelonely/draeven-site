"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

type Slide = {
  id: string;
  en: { title: string; lead: string; code: string };
  nl: { title: string; lead: string; code: string };
};

const SLIDES: Slide[] = [
  {
    id: "colors",
    en: {
      title: "Colors (4)",
      lead: "Discord has four button paints. Draeven names them color, not ButtonStyle. Default is blurple.",
      code: `import { button, buttonColors, row } from "@draeven/core";

row(
  button({ id: "a", label: "Default" }), // blurple
  button({ id: "b", label: "Grey", color: "grey" }),
  button({ id: "c", label: "Green", color: buttonColors.green }),
  button({ id: "d", label: "Red", color: "red" })
);`,
    },
    nl: {
      title: "Kleuren (4)",
      lead: "Discord heeft vier knopkleuren. Draeven noemt ze color, niet ButtonStyle. Standaard is blurple.",
      code: `import { button, buttonColors, row } from "@draeven/core";

row(
  button({ id: "a", label: "Standaard" }), // blurple
  button({ id: "b", label: "Grijs", color: "grey" }),
  button({ id: "c", label: "Groen", color: buttonColors.green }),
  button({ id: "d", label: "Rood", color: "red" })
);`,
    },
  },
  {
    id: "id",
    en: {
      title: "id is your string",
      lead: "You invent the id, e.g. \"yes\". The “1–100” is the max length in characters Discord allows — not a number from 1 to 100.",
      code: `button({ id: "yes", label: "Delete", color: "red" })
button({ id: "confirm-report", label: "OK" })
// later: ctx.collect({ ids: ["yes", "confirm-report"], seconds: 30 })`,
    },
    nl: {
      title: "id is jouw string",
      lead: "Jij bedenkt de id, bv. \"yes\". “1–100” is de maximale lengte in tekens die Discord toestaat — geen getal van 1 tot 100.",
      code: `button({ id: "yes", label: "Wissen", color: "red" })
button({ id: "confirm-report", label: "OK" })
// later: ctx.collect({ ids: ["yes", "confirm-report"], seconds: 30 })`,
    },
  },
  {
    id: "emoji",
    en: {
      title: "Emoji",
      lead: "Unicode or a custom emoji as <:name:id>. Optional beside the label.",
      code: `button({
  id: "ok",
  label: "Done",
  color: "green",
  emoji: "✅",
})

button({
  id: "wave",
  label: "Hi",
  emoji: "<:wave:123456789012345678>",
})`,
    },
    nl: {
      title: "Emoji",
      lead: "Unicode of een custom emoji als <:name:id>. Optioneel naast het label.",
      code: `button({
  id: "ok",
  label: "Klaar",
  color: "green",
  emoji: "✅",
})

button({
  id: "wave",
  label: "Hoi",
  emoji: "<:wave:123456789012345678>",
})`,
    },
  },
  {
    id: "disabled",
    en: {
      title: "disabled",
      lead: "Greyed out and not clickable. Useful after a choice, or while you edit the message.",
      code: `button({
  id: "locked",
  label: "Already chosen",
  color: "grey",
  disabled: true,
})`,
    },
    nl: {
      title: "disabled",
      lead: "Grijs en niet klikbaar. Handig na een keuze, of terwijl je het bericht bewerkt.",
      code: `button({
  id: "locked",
  label: "Al gekozen",
  color: "grey",
  disabled: true,
})`,
    },
  },
  {
    id: "press",
    en: {
      title: "press",
      lead: "Runs later when someone clicks and no collect is waiting on that id. Own reply — the original command has already finished.",
      code: `button({
  id: "ping-later",
  label: "Ping",
  color: "blurple",
  press: async (ctx) => ctx.reply("Pong from press."),
})`,
    },
    nl: {
      title: "press",
      lead: "Draait later bij een klik als er geen collect op die id wacht. Eigen reply — het oorspronkelijke commando is al klaar.",
      code: `button({
  id: "ping-later",
  label: "Ping",
  color: "blurple",
  press: async (ctx) => ctx.reply("Pong vanuit press."),
})`,
    },
  },
  {
    id: "link",
    en: {
      title: "link (not a button id)",
      lead: "Opens a URL. No custom id, so collect never sees it. Use link(), not button().",
      code: `import { link, row } from "@draeven/core";

row(link({ url: "https://draeven.dev/docs", label: "Docs" }))`,
    },
    nl: {
      title: "link (geen button-id)",
      lead: "Opent een URL. Geen custom id, dus collect ziet hem nooit. Gebruik link(), niet button().",
      code: `import { link, row } from "@draeven/core";

row(link({ url: "https://draeven.dev/docs", label: "Docs" }))`,
    },
  },
  {
    id: "discover",
    en: {
      title: "How to discover colors",
      lead: "In TypeScript, type color: \" and the four names appear. In JS/TS you can also use buttonColors. — same idea as ButtonStyle. after the dot.",
      code: `import { button, buttonColors } from "@draeven/core";

// TS autocomplete on the string union:
button({ id: "ok", label: "OK", color: "green" })

// Dot-list like discord.js styles (works in JS too):
button({ id: "ok", label: "OK", color: buttonColors.green })`,
    },
    nl: {
      title: "Kleuren ontdekken",
      lead: "In TypeScript: type color: \" en de vier namen verschijnen. In JS/TS kun je ook buttonColors. gebruiken — hetzelfde idee als ButtonStyle. na de punt.",
      code: `import { button, buttonColors } from "@draeven/core";

// TS-autocomplete op de string-union:
button({ id: "ok", label: "OK", color: "green" })

// Lijst na de punt, zoals discord.js-styles (ook in JS):
button({ id: "ok", label: "OK", color: buttonColors.green })`,
    },
  },
];

export function PieceTour() {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index]!;
  const copy = isNl ? slide.nl : slide.en;
  const tabs = useMemo(
    () => SLIDES.map((item) => (isNl ? item.nl.title : item.en.title)),
    [isNl]
  );

  return (
    <div className="piece-tour my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] px-3 py-2">
        <button
          type="button"
          className="rounded-md border border-[var(--color-line)] px-2 py-1 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          onClick={() => setIndex((value) => (value - 1 + SLIDES.length) % SLIDES.length)}
          aria-label={isNl ? "Vorige" : "Previous"}
        >
          ←
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-[0.7rem] tracking-[0.12em] text-[var(--color-accent)] uppercase">
          {copy.title}
          <span className="ml-2 opacity-60">
            {index + 1}/{SLIDES.length}
          </span>
        </p>
        <button
          type="button"
          className="rounded-md border border-[var(--color-line)] px-2 py-1 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          onClick={() => setIndex((value) => (value + 1) % SLIDES.length)}
          aria-label={isNl ? "Volgende" : "Next"}
        >
          →
        </button>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-line)] px-2 py-2">
        {tabs.map((label, i) => (
          <button
            key={SLIDES[i]!.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-[0.75rem] transition ${
              i === index
                ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent-bright)]"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-mist)]/35 hover:text-[var(--color-ink)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{copy.lead}</p>
        <pre className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] p-3 text-[0.82rem] leading-relaxed text-[var(--color-ink)]">
          <code>{copy.code}</code>
        </pre>
      </div>
    </div>
  );
}
