export type GlossaryEntry = {
  id: string;
  term: string;
  en: string;
  nl: string;
  href: string;
};

/** Short glossary with deep-links into guides. */
export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "ctx",
    term: "ctx",
    en: "The single handler context: options, lookups, reply, collect, moderation.",
    nl: "De ene handler-context: opties, lookups, reply, collect, moderatie.",
    href: "/docs/commands",
  },
  {
    id: "wait",
    term: "wait()",
    en: "Acknowledge within ~3s with no content yet; pair with edit() for slow handlers.",
    nl: "Bevestig binnen ~3s zonder inhoud; combineer met edit() bij trage handlers.",
    href: "/docs/replies",
  },
  {
    id: "defer",
    term: "defer (CommandMeta)",
    en: "Optional metadata (`defer: true` or `{ private: true }`) that acknowledges before the handler. Prefer wait() inside the handler.",
    nl: "Optionele metadata (`defer: true` of `{ private: true }`) die vóór de handler bevestigt. Gebruik liever wait() in de handler.",
    href: "/docs/commands",
  },
  {
    id: "auto-defer",
    term: "autoDefer",
    en: "Start-level safety net that defers around 2s if you have not replied yet.",
    nl: "Start-niveau veiligheidsnet dat rond 2s defert als je nog niet hebt geantwoord.",
    href: "/docs/start-options",
  },
  {
    id: "leaf",
    term: "leaf",
    en: "A subcommand endpoint under a parent (optionally inside one group).",
    nl: "Een subcommando-eindpunt onder een parent (optioneel in één groep).",
    href: "/docs/subcommands",
  },
  {
    id: "places",
    term: "places",
    en: "Where a command may run: guild, bot DM, private channels.",
    nl: "Waar een commando mag draaien: guild, bot-DM, privékanalen.",
    href: "/docs/command-meta",
  },
  {
    id: "install",
    term: "install",
    en: "Whether the command installs to a guild app, a user app, or both.",
    nl: "Of het commando op een guild-app, user-app, of beide installeert.",
    href: "/docs/command-meta",
  },
  {
    id: "need",
    term: "need",
    en: "Runtime permission gate checked before the handler runs.",
    nl: "Runtime-rechtencheck vóór de handler.",
    href: "/docs/permissions",
  },
  {
    id: "collect",
    term: "collect",
    en: "`ctx.collect({ ids, seconds })` — wait for a button, menu, or form. Then `ctx.edit` (no `.update`).",
    nl: "`ctx.collect({ ids, seconds })` — wacht op knop, menu of formulier. Daarna `ctx.edit` (geen `.update`).",
    href: "/docs/collectors",
  },
  {
    id: "use",
    term: "use()",
    en: "Durable button, menu, or form handler in the events folder. It survives a restart. `ids` can be exact, a prefix (`hangman_*`), a list, or a function.",
    nl: "Duurzame knop-, menu- of formulierhandler in de events-map. Hij overleeft een herstart. `ids` kan exact zijn, een prefix (`hangman_*`), een lijst of een functie.",
    href: "/docs/press-handlers",
  },
  {
    id: "getChannel",
    term: "getChannel()",
    en: "No arg → channel of this slash (or undefined). With a ref/id → that channel.",
    nl: "Zonder arg → kanaal van deze slash (of undefined). Met ref/id → dat kanaal.",
    href: "/docs/lookups",
  },
  {
    id: "memberJoin",
    term: "memberJoin",
    en: "Gateway event when someone joins. Wire with `intentsFor(\"memberJoin\")` and `events` / `bot.onMemberJoin`.",
    nl: "Gateway-event bij join. Koppel met `intentsFor(\"memberJoin\")` en `events` / `bot.onMemberJoin`.",
    href: "/docs/events-intents",
  },
  {
    id: "layout",
    term: "layout()",
    en: "Components V2 layout. It is the whole reply. It cannot mix with an embed.",
    nl: "Components V2-layout. Het is het hele antwoord. Het mengt niet met een embed.",
    href: "/docs/embeds-layout",
  },
  {
    id: "simulate",
    term: "simulate()",
    en: "Run a command handler offline with fake input and no token.",
    nl: "Draai een command-handler offline met nep-input en zonder token.",
    href: "/docs/simulate",
  },
  {
    id: "alone",
    term: "alone",
    en: "Ensure only one process holds the bot token.",
    nl: "Zorg dat maar één proces het bot-token vasthoudt.",
    href: "/docs/alone",
  },
  {
    id: "bridge",
    term: "bridge / desk",
    en: "Optional owner ops surface for the process you run.",
    nl: "Optioneel owner-ops-oppervlak voor het proces dat jij draait.",
    href: "/docs/bridge-desk",
  },
];
