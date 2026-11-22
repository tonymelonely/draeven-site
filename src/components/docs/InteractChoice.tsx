"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const CHOICES = [
  {
    id: "collect",
    href: "/docs/collectors",
    en: {
      title: "collect",
      when: "This command waits for a click, then continues.",
      example: "Confirm / cancel in the same handler",
    },
    nl: {
      title: "collect",
      when: "Dit commando wacht op een klik en gaat daarna verder.",
      example: "Bevestigen / annuleren in dezelfde handler",
    },
  },
  {
    id: "press",
    href: "/docs/press-handlers",
    en: {
      title: "press",
      when: "The control answers later on its own, in this process.",
      example: "A short “Yes.” button on a panel",
    },
    nl: {
      title: "press",
      when: "Het element antwoordt later zelf, in dit proces.",
      example: "Een korte “Ja.”-knop op een paneel",
    },
  },
  {
    id: "use",
    href: "/docs/press-handlers#use-in-the-events-folder",
    hrefNl: "/docs/press-handlers#use-in-de-events-map",
    en: {
      title: "use()",
      when: "A durable handler in the events folder. Survives a restart.",
      example: "Hangman letters, role panels",
    },
    nl: {
      title: "use()",
      when: "Duurzame handler in de events-map. Overleeft een herstart.",
      example: "Hangman-letters, rollenpanelen",
    },
  },
] as const;

export function InteractChoice() {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div className="interact-choice my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3">
        <p className="text-[0.65rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {isNl ? "Kies eerst" : "Pick one"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {isNl
            ? "Knoppen en menu’s kennen drie paden. Kies er één vóór je code schrijft."
            : "Buttons and menus have three paths. Pick one before you write code."}
        </p>
      </div>
      <ul className="grid gap-0 sm:grid-cols-3">
        {CHOICES.map((choice, index) => {
          const copy = isNl ? choice.nl : choice.en;
          const href =
            isNl && "hrefNl" in choice && choice.hrefNl ? choice.hrefNl : choice.href;
          return (
            <li
              key={choice.id}
              className={`border-[var(--color-line)] p-4 ${
                index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <Link href={href} className="group block no-underline">
                <p className="font-mono text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent-bright)]">
                  {copy.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {copy.when}
                </p>
                <p className="mt-2 text-[0.75rem] text-[var(--color-ink-soft)] opacity-80">
                  {copy.example}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
