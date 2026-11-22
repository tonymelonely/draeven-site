"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { withInlineCode } from "@/components/docs/inlineCode";

type Slide = {
  id: string;
  en: { title: string; lead: string; code: string };
  nl: { title: string; lead: string; code: string };
};

const TOURS: Record<"start-options" | "command-meta" | "collect", Slide[]> = {
  "start-options": [
    {
      id: "token-commands",
      en: {
        title: "Token + commands",
        lead: "Start needs a token. Commands come from a folder, an array, or draeven.config.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  // omit commands → draeven.config.js
});`,
      },
      nl: {
        title: "Token + commands",
        lead: "Start heeft een token nodig. Commando’s komen uit een map, een array, of draeven.config.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  // commands weglaten → draeven.config.js
});`,
      },
    },
    {
      id: "events",
      en: {
        title: "events folder",
        lead: "A folder loads gateway handlers and `use()`. Or set `events` in draeven.config and omit it here.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  events: "./dist/events",
  intents: intentsFor("memberJoin", "ready"),
});`,
      },
      nl: {
        title: "events-map",
        lead: "Een map laadt gateway-handlers en `use()`. Of zet `events` in draeven.config en laat het hier weg.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  events: "./dist/events",
  intents: intentsFor("memberJoin", "ready"),
});`,
      },
    },
    {
      id: "watch",
      en: {
        title: "watch",
        lead: "`watch: true` reloads compiled command and event folders. An in-memory `commands` array throws.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true, // needs a folder path
});`,
      },
      nl: {
        title: "watch",
        lead: "`watch: true` herlaadt gecompileerde command- en eventmappen. Een `commands`-array in geheugen geeft een foutmelding.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true, // heeft een mappad nodig
});`,
      },
    },
    {
      id: "defaults",
      en: {
        title: "Defaults",
        lead: "Omitted `intents` is `0`. `alone` defaults to \"ask\". `autoDefer` defaults to 2000 ms.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  // intents: 0
  // alone: "ask"
  // autoDefer: 2000
});`,
      },
      nl: {
        title: "Standaardwaarden",
        lead: "Weggelaten `intents` is `0`. `alone` is standaard \"ask\". `autoDefer` is standaard 2000 ms.",
        code: `await Start({
  token: process.env.DISCORD_TOKEN,
  // intents: 0
  // alone: "ask"
  // autoDefer: 2000
});`,
      },
    },
  ],
  "command-meta": [
    {
      id: "need",
      en: {
        title: "need",
        lead: "Blocks the handler unless the member has the permission bit. Administrator passes.",
        code: `command("purge", "…", run, {
  need: "ManageMessages",
});`,
      },
      nl: {
        title: "need",
        lead: "Blokkeert de handler tenzij het lid de rechtenbit heeft. Administrator slaagt.",
        code: `command("purge", "…", run, {
  need: "ManageMessages",
});`,
      },
    },
    {
      id: "owner",
      en: {
        title: "ownerOnly",
        lead: "Only the Discord server owner. Not the application owner. Fails in a DM.",
        code: `command("danger", "…", run, {
  ownerOnly: true,
});`,
      },
      nl: {
        title: "ownerOnly",
        lead: "Alleen de Discord-servereigenaar. Niet de app-eigenaar. Faalt in een DM.",
        code: `command("danger", "…", run, {
  ownerOnly: true,
});`,
      },
    },
    {
      id: "when",
      en: {
        title: "when",
        lead: "Your own gate. Keep it fast — auto-defer starts after gates.",
        code: `command("here", "…", run, {
  when: (ctx) => ctx.getGuild()?.id === "123",
});`,
      },
      nl: {
        title: "when",
        lead: "Je eigen gate. Houd hem snel — auto-defer start ná de gates.",
        code: `command("here", "…", run, {
  when: (ctx) => ctx.getGuild()?.id === "123",
});`,
      },
    },
    {
      id: "defer",
      en: {
        title: "defer / cooldown",
        lead: "defer acknowledges early. cooldown is an in-memory wait on the command name.",
        code: `command("ping", "…", run, {
  defer: { private: true },
  cooldown: 5,
});`,
      },
      nl: {
        title: "defer / cooldown",
        lead: "defer bevestigt vroeg. cooldown is een in-memory wachttijd op de commandonaam.",
        code: `command("ping", "…", run, {
  defer: { private: true },
  cooldown: 5,
});`,
      },
    },
  ],
  collect: [
    {
      id: "ids",
      en: {
        title: "ids",
        lead: "One id or a list. Only those custom ids finish the wait.",
        code: `const pick = await ctx.collect({
  ids: ["yes", "no"],
  seconds: 30,
});`,
      },
      nl: {
        title: "ids",
        lead: "Één id of een lijst. Alleen die custom ids beëindigen de wacht.",
        code: `const pick = await ctx.collect({
  ids: ["yes", "no"],
  seconds: 30,
});`,
      },
    },
    {
      id: "kind",
      en: {
        title: "kind",
        lead: "Default is `press` (button/menu). Use `submit` for a form.",
        code: `await ctx.collect({
  ids: "report-form",
  kind: "submit",
  seconds: 120,
});`,
      },
      nl: {
        title: "kind",
        lead: "Standaard is `press` (knop/menu). Gebruik `submit` voor een formulier.",
        code: `await ctx.collect({
  ids: "report-form",
  kind: "submit",
  seconds: 120,
});`,
      },
    },
    {
      id: "who",
      en: {
        title: "who",
        lead: "Defaults to the command author. A different user still runs `press`/`use` if nothing matches.",
        code: `await ctx.collect({
  ids: "yes",
  who: ctx.author, // default
  seconds: 20,
});`,
      },
      nl: {
        title: "who",
        lead: "Standaard de aanroeper. Een andere gebruiker draait nog `press`/`use` als niets matcht.",
        code: `await ctx.collect({
  ids: "yes",
  who: ctx.author, // standaard
  seconds: 20,
});`,
      },
    },
    {
      id: "timeout",
      en: {
        title: "seconds",
        lead: "Default 60. 0, negative, or non-finite throws. Timeout resolves undefined.",
        code: `const pick = await ctx.collect({ ids: "yes", seconds: 20 });
if (!pick) return ctx.reply("Timed out.");`,
      },
      nl: {
        title: "seconds",
        lead: "Standaard 60. 0, negatief of non-finite geeft een foutmelding. Timeout wordt `undefined`.",
        code: `const pick = await ctx.collect({ ids: "yes", seconds: 20 });
if (!pick) return ctx.reply("Tijd verstreken.");`,
      },
    },
  ],
};

export function DocTour({ id }: { id: keyof typeof TOURS }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const slides = TOURS[id];
  const [index, setIndex] = useState(0);
  const slide = slides[index]!;
  const copy = isNl ? slide.nl : slide.en;
  const tabs = useMemo(
    () => slides.map((item) => (isNl ? item.nl.title : item.en.title)),
    [isNl, slides]
  );

  return (
    <div className="doc-tour my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] px-3 py-2">
        <button
          type="button"
          className="rounded-md border border-[var(--color-line)] px-2 py-1 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          onClick={() => setIndex((value) => (value - 1 + slides.length) % slides.length)}
          aria-label={isNl ? "Vorige" : "Previous"}
        >
          ←
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-[0.7rem] tracking-[0.12em] text-[var(--color-accent)] uppercase">
          {copy.title}
          <span className="ml-2 opacity-60">
            {index + 1}/{slides.length}
          </span>
        </p>
        <button
          type="button"
          className="rounded-md border border-[var(--color-line)] px-2 py-1 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
          onClick={() => setIndex((value) => (value + 1) % slides.length)}
          aria-label={isNl ? "Volgende" : "Next"}
        >
          →
        </button>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-line)] px-2 py-2">
        {tabs.map((label, i) => (
          <button
            key={slides[i]!.id}
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
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {withInlineCode(copy.lead)}
        </p>
        <pre className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] p-3 text-[0.82rem] leading-relaxed text-[var(--color-ink)]">
          <code>{copy.code}</code>
        </pre>
      </div>
    </div>
  );
}
