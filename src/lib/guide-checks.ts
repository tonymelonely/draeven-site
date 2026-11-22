import type { ChecklistItem } from "@/lib/migration-checklist";

/** Short end-of-guide checks for heavy pages (localStorage per slug). */
export const GUIDE_CHECKS: Record<string, ChecklistItem[]> = {
  "events-intents": [
    {
      id: "intents",
      en: "`intentsFor(...)` lists every event you handle.",
      nl: "`intentsFor(...)` noemt elk event dat je afhandelt.",
      href: "/docs/events-intents",
    },
    {
      id: "portal",
      en: "Privileged intents are on in the Developer Portal.",
      nl: "Privileged intents staan aan in het Developer Portal.",
      href: "/docs/creating-app",
    },
    {
      id: "use",
      en: "Durable buttons use `use()` in the events folder.",
      nl: "Duurzame knoppen gebruiken `use()` in de events-map.",
      href: "/docs/press-handlers",
    },
  ],
  replies: [
    {
      id: "ack",
      en: "You acknowledge within ~3s (`reply`, `wait`, or auto-defer).",
      nl: "Je bevestigt binnen ~3s (`reply`, `wait`, of auto-defer).",
      href: "/docs/replies",
    },
    {
      id: "form",
      en: "A `form()` is the first reply — no `wait` before it.",
      nl: "Een `form()` is het eerste antwoord — geen `wait` ervoor.",
      href: "/docs/pieces",
    },
    {
      id: "edit",
      en: "After `wait()`, you fill with `edit()` (or another `reply()`).",
      nl: "Na `wait()` vul je met `edit()` (of een nieuwe `reply()`).",
      href: "/docs/replies",
    },
  ],
  collectors: [
    {
      id: "show",
      en: "You replied (or waited) before `collect`.",
      nl: "Je hebt geantwoord (of gewacht) vóór `collect`.",
      href: "/docs/collectors",
    },
    {
      id: "ids",
      en: "`ids` match the custom ids on the controls.",
      nl: "`ids` matchen de custom ids op de controls.",
      href: "/docs/collectors",
    },
    {
      id: "path",
      en: "You picked collect vs press vs `use()` on purpose.",
      nl: "Je koos collect vs press vs `use()` expres.",
      href: "/docs/press-handlers",
    },
  ],
  "press-handlers": [
    {
      id: "once",
      en: "`reply` runs exactly once in the press/`use` handler.",
      nl: "`reply` draait precies één keer in de press/`use`-handler.",
      href: "/docs/press-handlers",
    },
    {
      id: "folder",
      en: "`use()` lives in the events folder, not commands.",
      nl: "`use()` staat in de events-map, niet bij commands.",
      href: "/docs/events-intents",
    },
    {
      id: "ids",
      en: "Open `collect` and `press` do not share the same id.",
      nl: "Open `collect` en `press` delen niet dezelfde id.",
      href: "/docs/why-failing",
    },
  ],
  commands: [
    {
      id: "export",
      en: "The file exports `command()` / menu builders Discord can register.",
      nl: "Het bestand exporteert `command()` / menu-builders die Discord kan registreren.",
      href: "/docs/commands",
    },
    {
      id: "dist",
      en: "Config points at compiled `dist/`, not `src/`.",
      nl: "Config wijst naar gecompileerde `dist/`, niet `src/`.",
      href: "/docs/install",
    },
    {
      id: "reply",
      en: "The handler replies (or waits) before it returns.",
      nl: "De handler antwoordt (of wacht) vóór hij terugkeert.",
      href: "/docs/replies",
    },
  ],
};

export function getGuideChecks(slug: string): ChecklistItem[] | undefined {
  return GUIDE_CHECKS[slug];
}
