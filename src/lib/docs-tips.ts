export type DocsTip = {
  id: string;
  en: string;
  nl: string;
};

/** Facts / shortcuts not printed on the guide body — rotate per visit. */
export const DOCS_TIPS: DocsTip[] = [
  {
    id: "search",
    en: "⌘K / Ctrl+K opens search across guides and API.",
    nl: "⌘K / Ctrl+K opent zoeken in gidsen en API.",
  },
  {
    id: "cheatsheet",
    en: "Press ? for the keyboard cheatsheet.",
    nl: "Druk op ? voor het sneltoetsen-overzicht.",
  },
  {
    id: "brackets",
    en: "[ toggles Guides · ] toggles On this page.",
    nl: "[ wisselt Guides · ] wisselt Op deze pagina.",
  },
  {
    id: "g-d",
    en: "G then D jumps to Docs. G then A jumps to API.",
    nl: "G dan D springt naar Docs. G dan A naar API.",
  },
  {
    id: "swipe",
    en: "On mobile, swipe right for Guides, left for On this page.",
    nl: "Op mobiel: veeg rechts voor Guides, links voor Op deze pagina.",
  },
  {
    id: "simulate",
    en: "`simulate()` runs a handler with no Discord token — great for unit tests.",
    nl: "`simulate()` draait een handler zonder Discord-token — handig voor unittests.",
  },
  {
    id: "guildId",
    en: "Set `guildId` while developing so slash sync is instant (global can take ~1h).",
    nl: "Zet `guildId` tijdens ontwikkelen zodat slash-sync meteen is (globaal kan ~1u duren).",
  },
  {
    id: "dist",
    en: "Point config at `./dist/commands` — TypeScript sources are skipped.",
    nl: "Wijs config naar `./dist/commands` — TypeScript-bronnen worden overgeslagen.",
  },
  {
    id: "autoDefer",
    en: "Auto-defer fires ~2s if you have not replied — Discord’s ack window is ~3s.",
    nl: "Auto-defer vuurt ~2s als je nog niet hebt geantwoord — Discord’s ack-venster is ~3s.",
  },
  {
    id: "glossary",
    en: "Words like ctx, leaf, places: see the Glossary guide.",
    nl: "Woorden als ctx, leaf, places: zie het Glossarium.",
  },
  {
    id: "why-failing",
    en: "Symptom → cause → guide lives on Why is this failing?",
    nl: "Symptoom → oorzaak → gids staat bij Waarom faalt dit?",
  },
  {
    id: "theme",
    en: "Theme and 3D depth live in the header / hamburger preferences.",
    nl: "Thema en 3D-diepte staan in de header / hamburger-voorkeuren.",
  },
];

export const DOCS_TIPS_PREF_KEY = "draeven-docs-tips";
export const DOCS_TIPS_DISMISS_KEY = "draeven-docs-tips-dismissed";

export function pickRandomTip(excludeId?: string): DocsTip {
  const pool = excludeId
    ? DOCS_TIPS.filter((tip) => tip.id !== excludeId)
    : DOCS_TIPS;
  const list = pool.length ? pool : DOCS_TIPS;
  return list[Math.floor(Math.random() * list.length)]!;
}
