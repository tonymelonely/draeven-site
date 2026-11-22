/** Core package version these guides describe. */
export const DOCS_CORE_VERSION = "0.1.9";

/**
 * Declared @draeven/core pin the site claims to match.
 * Keep equal to DOCS_CORE_VERSION unless you are mid-upgrade.
 */
export const DOCS_PACKAGE_PIN = "0.1.9";

/** Learning-path pages that get a sticky next-step CTA (uses DocExtras.nextStep). */
export const PATH_NEXT_SLUGS = new Set([
  "welcome",
  "install",
  "create-cli",
  "creating-app",
  "quickstart",
]);

export type DocApiLink = {
  label: string;
  /** Path under /reference */
  href: string;
};

export type DocExtras = {
  /** Related guide slugs (no locale prefix). */
  related: string[];
  /** Recommended next guide when it differs from sidebar order. */
  nextStep?: string;
  /** API reference deep-links. */
  api?: DocApiLink[];
  /** Extra search keywords / aliases. */
  aliases?: string[];
};

const core = (hash: string, label: string): DocApiLink => ({
  label,
  href: `/reference/core${hash}`,
});

/**
 * Per-guide extras used by DocFooter, search, and the learning path.
 * Related replaces trailing ## Related / ## Verder sections in MDX.
 */
export const DOC_EXTRAS: Record<string, DocExtras> = {
  welcome: {
    related: ["install", "quickstart", "starters", "glossary", "architecture", "from-discordjs", "rules", "recipes"],
    nextStep: "install",
    api: [core("", "@draeven/core")],
    aliases: ["intro", "overview", "getting started", "welkom", "introductie", "5 minutes"],
  },
  install: {
    related: ["create-cli", "creating-app", "quickstart", "project-layout", "config"],
    nextStep: "create-cli",
    api: [core("", "@draeven/core")],
    aliases: ["npm", "pnpm", "create-draeven", "node 20"],
  },
  "create-cli": {
    related: ["install", "creating-app", "config", "bridge-desk"],
    nextStep: "creating-app",
    aliases: ["draeven init", "create-draeven", "--with-dashboard", "--events", "scaffold", "use"],
  },
  "creating-app": {
    related: ["quickstart", "events-intents", "start-options", "permissions", "known-limits"],
    nextStep: "quickstart",
    aliases: ["portal", "token", "invite", "guild id", "intents"],
  },
  quickstart: {
    related: ["commands", "replies", "recipes"],
    nextStep: "commands",
    api: [core("", "Start"), core("", "command")],
    aliases: ["ping", "hello world", "first bot"],
  },
  "project-layout": {
    related: ["config", "start-options", "commands"],
    nextStep: "config",
    aliases: ["folder", "dist", "tree", "structure"],
  },
  "start-options": {
    related: ["config", "events-intents", "alone", "hot-reload-guard"],
    nextStep: "recipes",
    api: [core("", "Start")],
    aliases: ["Start", "watch", "autoDefer", "alone", "guildId"],
  },
  recipes: {
    related: ["starters", "commands", "replies", "collectors", "pieces"],
    nextStep: "starters",
    aliases: ["examples", "cookbook", "copy paste"],
  },
  config: {
    related: ["project-layout", "start-options", "events-intents", "press-handlers", "deploy"],
    nextStep: "commands",
    api: [core("", "readConfig")],
    aliases: ["draeven.config", "commands folder", "events folder", "readConfig", "use"],
  },
  rules: {
    related: ["replies", "pieces", "collectors", "press-handlers", "embeds-layout", "debugging"],
    nextStep: "debugging",
    aliases: ["pitfalls", "gotchas", "constraints", "must"],
  },
  changelog: {
    related: ["known-limits", "feedback", "welcome"],
    nextStep: "feedback",
    aliases: ["version", "0.1.9", "release", "whats new"],
  },
  commands: {
    related: ["options", "subcommands", "replies", "permissions"],
    nextStep: "options",
    api: [core("", "command")],
    aliases: ["slash", "command()", "handler"],
  },
  options: {
    related: ["commands", "autocomplete", "lookups"],
    nextStep: "subcommands",
    api: [core("", "text"), core("", "user")],
    aliases: ["text()", "user()", "number()", "choice"],
  },
  subcommands: {
    related: ["commands", "options", "permissions", "mod-actions"],
    nextStep: "context-menus",
    api: [core("", "sub"), core("", "group")],
    aliases: ["sub()", "group()", "nested"],
  },
  "context-menus": {
    related: ["commands", "replies", "embeds-layout"],
    nextStep: "autocomplete",
    api: [core("", "userMenu"), core("", "messageMenu")],
    aliases: ["userMenu", "messageMenu", "right click", "apps"],
  },
  autocomplete: {
    related: ["options", "commands"],
    nextStep: "permissions",
    aliases: ["suggest", "autocomplete", ".suggest"],
  },
  permissions: {
    related: ["command-meta", "cooldowns", "commands", "mod-actions"],
    nextStep: "command-meta",
    aliases: ["need", "ownerOnly", "when", "gates", "permissions"],
  },
  "command-meta": {
    related: ["permissions", "commands", "cooldowns", "locales"],
    nextStep: "cooldowns",
    aliases: ["places", "install", "nsfw", "PermissionName", "CommandMeta", "defer"],
  },
  cooldowns: {
    related: ["permissions", "locales", "commands"],
    nextStep: "locales",
    aliases: ["cooldown", "rate limit", "wait"],
  },
  locales: {
    related: ["commands", "options", "lookups"],
    nextStep: "lookups",
    api: [core("", "say"), core("", "withLocales")],
    aliases: ["say()", "i18n", "translation", "withLocales"],
  },
  lookups: {
    related: ["commands", "options", "format-date"],
    nextStep: "format-date",
    aliases: ["getUser", "getMember", "getGuild", "getChannel", "getRole"],
  },
  "format-date": {
    related: ["lookups", "embeds-layout", "locales"],
    nextStep: "replies",
    api: [core("", "formatDate")],
    aliases: ["formatDate", "Netherlands", "countries", "UTC date"],
  },
  replies: {
    related: ["pieces", "collectors", "embeds-layout", "rules"],
    nextStep: "pieces",
    api: [core("", "command")],
    aliases: ["reply", "wait", "edit", "followup", "defer", "ephemeral"],
  },
  pieces: {
    related: ["collectors", "press-handlers", "sku", "replies", "rules"],
    nextStep: "collectors",
    api: [core("", "button"), core("", "row"), core("", "form")],
    aliases: ["button", "menu", "form", "row", "people", "roles", "channels"],
  },
  sku: {
    related: ["pieces", "replies", "collectors"],
    nextStep: "collectors",
    api: [core("", "sku")],
    aliases: ["sku", "premium", "purchase", "monetization"],
  },
  collectors: {
    related: ["pieces", "press-handlers", "events-intents", "replies", "rules"],
    nextStep: "press-handlers",
    aliases: ["collect", "ctx.collect", "press", "submit", "verzamelaar", "wacht op knop"],
  },
  "press-handlers": {
    related: ["collectors", "pieces", "events-intents", "replies", "rules"],
    nextStep: "embeds-layout",
    aliases: ["press", "submit", "PressContext", "button press", "use", "use()", "indrukken", "formulier"],
  },
  "embeds-layout": {
    related: ["replies", "canvas", "pieces", "rules"],
    nextStep: "canvas",
    api: [core("", "embed"), core("", "layout")],
    aliases: ["embed", "header", "breakline", "layout", "beside", "Components V2", "card"],
  },
  canvas: {
    related: ["embeds-layout", "replies"],
    nextStep: "polls",
    api: [core("", "canvas")],
    aliases: ["canvas", "png", "picture", "draw"],
  },
  polls: {
    related: ["replies", "events-intents"],
    nextStep: "mod-actions",
    api: [core("", "poll")],
    aliases: ["poll", "vote"],
  },
  "mod-actions": {
    related: ["permissions", "replies", "sending-messages"],
    nextStep: "transcript",
    aliases: ["timeout", "kick", "ban", "purge", "pin", "react"],
  },
  transcript: {
    related: ["replies", "start-options", "mod-actions"],
    nextStep: "events-intents",
    api: [core("", "renderTranscript")],
    aliases: ["transcript", "html", "export chat"],
  },
  "events-intents": {
    related: [
      "gateway-events",
      "press-handlers",
      "creating-app",
      "from-discordjs",
      "config",
      "bot-handle",
      "presence",
      "sending-messages",
    ],
    nextStep: "gateway-events",
    api: [core("", "intentsFor")],
    aliases: [
      "intentsFor",
      "intentBits",
      "memberJoin",
      "guildMemberAdd",
      "messageCreate",
      "gateway",
      "use",
      "use()",
      "intents",
    ],
  },
  "gateway-events": {
    related: ["events-intents", "discord-client", "bot-handle", "from-discordjs", "guard"],
    nextStep: "presence",
    aliases: [
      "GatewayMember",
      "GatewayMessage",
      "reactionAdd",
      "voiceUpdate",
      "payload",
      "gatewayEventNames",
      "guildMemberAdd",
      "messageCreate",
    ],
  },
  presence: {
    related: ["events-intents", "bot-handle", "start-options"],
    nextStep: "sending-messages",
    aliases: ["setPresence", "status", "activity"],
  },
  "sending-messages": {
    related: ["bot-handle", "replies", "events-intents"],
    nextStep: "bot-handle",
    aliases: ["bot.send", "ctx.send", "channel message"],
  },
  "bot-handle": {
    related: ["start-options", "sending-messages", "presence", "discord-client"],
    nextStep: "discord-client",
    api: [core("", "Start")],
    aliases: ["bot", "stop", "syncState", "onSync", "onEvent"],
  },
  "discord-client": {
    related: ["architecture", "bot-handle", "gateway-events", "events-intents", "advanced-api", "changelog"],
    nextStep: "debugging",
    api: [{ label: "@draeven/discord", href: "/reference/discord" }],
    aliases: ["GatewaySession", "DiscordRestClient", "intents", "low-level"],
  },
  debugging: {
    related: ["troubleshooting", "rules", "guard", "simulate", "hot-reload-guard", "known-limits"],
    nextStep: "troubleshooting",
    aliases: ["error", "throw", "[Draeven]", "troubleshoot", "debug", "fouten", "oplossen"],
  },
  guard: {
    related: ["hot-reload-guard", "debugging", "start-options"],
    nextStep: "hot-reload-guard",
    api: [core("", "guard")],
    aliases: ["guard", "via", "of", "formatUptime", "error guard"],
  },
  "hot-reload-guard": {
    related: ["guard", "start-options", "simulate", "debugging"],
    nextStep: "simulate",
    api: [core("", "guard")],
    aliases: ["watch", "guard", "hot reload"],
  },
  simulate: {
    related: ["debugging", "advanced-api", "commands", "recipes"],
    nextStep: "alone",
    api: [core("", "simulate")],
    aliases: ["simulate", "unit test", "offline"],
  },
  alone: {
    related: ["deploy", "start-options"],
    nextStep: "bridge-desk",
    aliases: ["alone", "pid", "single process"],
  },
  "bridge-desk": {
    related: ["deploy", "start-options", "create-cli", "known-limits"],
    nextStep: "deploy",
    api: [{ label: "@draeven/bridge", href: "/reference/bridge" }],
    aliases: ["dashboard", "desk", "embedded", "BRIDGE_SECRET"],
  },
  deploy: {
    related: ["alone", "config", "debugging", "advanced-api"],
    nextStep: "advanced-api",
    aliases: ["pm2", "systemd", "production", "deploy"],
  },
  "advanced-api": {
    related: ["simulate", "discord-client", "collectors", "press-handlers", "cooldowns", "debugging"],
    nextStep: "known-limits",
    api: [core("", "CooldownBook"), core("", "CollectorBook")],
    aliases: [
      "CooldownBook",
      "CollectorBook",
      "checkGates",
      "answerCommand",
      "startBot",
      "permissionBitfield",
    ],
  },
  "known-limits": {
    related: ["debugging", "rules", "feedback", "changelog", "advanced-api"],
    nextStep: "changelog",
    aliases: ["limits", "beta", "not supported", "card", "Message.card"],
  },
  feedback: {
    related: ["known-limits", "changelog", "welcome"],
    aliases: ["report", "bug", "stars"],
  },
  architecture: {
    related: ["start-options", "commands", "permissions", "replies", "collectors", "press-handlers", "events-intents", "bot-handle", "troubleshooting"],
    nextStep: "from-discordjs",
    aliases: [
      "flow",
      "how it fits",
      "pipeline",
      "loadCommands",
      "hoe het in elkaar zit",
      "architectuur",
      "stroom",
    ],
  },
  "from-discordjs": {
    related: ["welcome", "migration-checklist", "embeds-layout", "pieces", "collectors", "known-limits", "architecture"],
    nextStep: "migration-checklist",
    aliases: [
      "discord.js",
      "cheat sheet",
      "EmbedBuilder",
      "SlashCommandBuilder",
      "spiekbrief",
      "migratie",
      "vanuit discord.js",
    ],
  },
  starters: {
    related: ["recipes", "quickstart", "simulate", "mod-actions", "events-intents"],
    nextStep: "recipes",
    aliases: ["starter", "mod bot", "ticket bot", "welcome bot", "template", "boilerplate"],
  },
  "migration-checklist": {
    related: ["from-discordjs", "commands", "replies", "known-limits", "why-failing"],
    nextStep: "commands",
    aliases: ["migrate", "checklist", "port", "upgrade from djs", "afvinken"],
  },
  troubleshooting: {
    related: ["why-failing", "debugging", "feedback", "known-limits", "rules", "architecture"],
    nextStep: "why-failing",
    aliases: [
      "symptom",
      "unknown interaction",
      "401",
      "watch",
      "problemen oplossen",
      "foutmatrix",
      "werkt niet",
      "ack",
    ],
  },
  "why-failing": {
    related: ["troubleshooting", "debugging", "simulate", "feedback", "glossary"],
    nextStep: "debugging",
    aliases: [
      "failing",
      "broken",
      "error map",
      "waarom faalt",
      "symptom map",
      "fix matrix",
    ],
  },
  glossary: {
    related: ["welcome", "commands", "replies", "command-meta", "architecture", "press-handlers", "events-intents"],
    nextStep: "welcome",
    aliases: ["dictionary", "terms", "definitions", "glossarium", "ctx", "defer", "leaf", "use()"],
  },
};

export type LearningStep = { slug: string; en: string; nl: string };

/** Path 1 — first hour. Path 2 — after the basics. */
export const LEARNING_PATHS = [
  {
    id: "start",
    en: "First hour",
    nl: "Eerste uur",
    steps: [
      { slug: "install", en: "Install", nl: "Installatie" },
      { slug: "quickstart", en: "Quickstart", nl: "Snelstart" },
      { slug: "commands", en: "Commands", nl: "Commando's" },
      { slug: "starters", en: "Starters", nl: "Starters" },
    ] as const satisfies readonly LearningStep[],
  },
  {
    id: "next",
    en: "Next layer",
    nl: "Volgende laag",
    steps: [
      { slug: "embeds-layout", en: "Embeds", nl: "Embeds" },
      { slug: "collectors", en: "Collectors", nl: "Verzamelaars" },
      { slug: "architecture", en: "How it fits", nl: "Hoe het in elkaar zit" },
      { slug: "why-failing", en: "Why failing?", nl: "Waarom faalt?" },
    ] as const satisfies readonly LearningStep[],
  },
] as const;

/** @deprecated Prefer LEARNING_PATHS[0].steps */
export const LEARNING_PATH = LEARNING_PATHS[0].steps;

export function getDocExtras(slug: string): DocExtras {
  return (
    DOC_EXTRAS[slug] ?? {
      related: [],
      aliases: [],
    }
  );
}

/** Drop trailing Related / Verder / Where to go next — DocFooter owns that. */
export function stripTrailingNavSections(markdown: string): string {
  return markdown.replace(
    /\n##[^\n]*(Related|Verder|Where to go next|Waar verder|Volgende stappen)[^\n]*\n[\s\S]*$/i,
    "\n"
  );
}
