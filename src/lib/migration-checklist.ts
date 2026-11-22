export type ChecklistItem = {
  id: string;
  en: string;
  nl: string;
  href?: string;
};

export const MIGRATION_CHECKLIST: ChecklistItem[] = [
  {
    id: "remove-djs",
    en: "Remove `discord.js` from the same process (one token, one client).",
    nl: "Verwijder `discord.js` uit hetzelfde proces (één token, één client).",
    href: "/docs/from-discordjs",
  },
  {
    id: "start",
    en: "Replace `Client` + `login` with `Start({ token, guildId, … })`.",
    nl: "Vervang `Client` + `login` door `Start({ token, guildId, … })`.",
    href: "/docs/quickstart",
  },
  {
    id: "commands",
    en: "Rewrite slash builders as `command()` / `sub()` / `group()` exports.",
    nl: "Herschrijf slash-builders naar `command()` / `sub()` / `group()`-exports.",
    href: "/docs/commands",
  },
  {
    id: "ctx",
    en: "Swap `interaction.reply` / `deferReply` / `editReply` for `ctx.reply`, `await ctx.wait()` + `ctx.edit()`, or a quick `ctx.reply()` alone.",
    nl: "Vervang `interaction.reply` / `deferReply` / `editReply` door `ctx.reply`, `await ctx.wait()` + `ctx.edit()`, of alleen een snelle `ctx.reply()`.",
    href: "/docs/replies",
  },
  {
    id: "embeds",
    en: "Replace `EmbedBuilder` with `embed({ header, fields, … })`.",
    nl: "Vervang `EmbedBuilder` door `embed({ header, fields, … })`.",
    href: "/docs/embeds-layout",
  },
  {
    id: "components",
    en: "Rebuild rows with `row()` + `button()` / menus / `form()`.",
    nl: "Bouw rijen opnieuw met `row()` + `button()` / menu's / `form()`.",
    href: "/docs/pieces",
  },
  {
    id: "collect",
    en: "Move collectors to `ctx.collect` (or press handlers).",
    nl: "Verplaats collectors naar `ctx.collect` (of press-handlers).",
    href: "/docs/collectors",
  },
  {
    id: "events",
    en: "Wire gateway listeners through `events` + `intentsFor`.",
    nl: "Koppel gateway-listeners via `events` + `intentsFor`.",
    href: "/docs/events-intents",
  },
  {
    id: "mod",
    en: "Use `ctx.timeout` / `kick` / `ban` instead of manager calls.",
    nl: "Gebruik `ctx.timeout` / `kick` / `ban` i.p.v. manager-calls.",
    href: "/docs/mod-actions",
  },
  {
    id: "simulate",
    en: "Cover handlers with `simulate()` before going live.",
    nl: "Dek handlers af met `simulate()` vóór je live gaat.",
    href: "/docs/simulate",
  },
  {
    id: "limits",
    en: "Read Known limits for intentional gaps vs discord.js.",
    nl: "Lees Bekende limieten voor bewuste gaten vs discord.js.",
    href: "/docs/known-limits",
  },
];
