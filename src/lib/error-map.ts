/** Canonical symptom → cause → guide map for troubleshooting pages and search. */

export type ErrorMapRow = {
  id: string;
  symptom: { en: string; nl: string };
  cause: { en: string; nl: string };
  fix: { en: string; nl: string };
  href: string;
  aliases?: string[];
};

export const ERROR_MAP: ErrorMapRow[] = [
  {
    id: "missing-command",
    symptom: {
      en: "`/command` missing after a restart",
      nl: "`/command` ontbreekt na een herstart",
    },
    cause: {
      en: "Guild sync never ran, or the sync is global",
      nl: "Guild-sync liep niet, of de sync is globaal",
    },
    fix: {
      en: "Set `guildId` while you edit. A global list can take up to an hour.",
      nl: "Zet `guildId` terwijl je bewerkt. Een globale lijst kan een uur duren.",
    },
    href: "/docs/creating-app",
    aliases: ["missing slash", "command not registered", "guild sync"],
  },
  {
    id: "unknown-interaction",
    symptom: {
      en: "Unknown interaction, or the ack times out",
      nl: "Unknown interaction, of de bevestiging loopt uit",
    },
    cause: {
      en: "The handler is slow and `autoDefer` is off",
      nl: "De handler is traag en `autoDefer` staat uit",
    },
    fix: {
      en: "Acknowledge first with `await ctx.wait()` then `edit()`, or keep auto-defer on.",
      nl: "Bevestig eerst met `await ctx.wait()` en daarna `edit()`, of laat auto-defer aan.",
    },
    href: "/docs/replies",
    aliases: ["unknown interaction", "10062", "ack timeout", "3 seconds"],
  },
  {
    id: "dead-button",
    symptom: {
      en: "A button replies `Received.`",
      nl: "Een knop antwoordt `Received.`",
    },
    cause: {
      en: "No collect matched, no remembered `press` or `submit`, and no `use()` from the events folder matched the id",
      nl: "Geen collect die klopte, geen onthouden `press` of `submit`, en geen `use()` uit de events-map die de id pakte",
    },
    fix: {
      en: "Collect the id, attach `press`, or export `use()` from the events folder. With none of those, Draeven replies `Received.`",
      nl: "Verzamel de id, koppel `press`, of exporteer `use()` uit de events-map. Zonder die drie antwoordt Draeven `Received.`",
    },
    href: "/docs/press-handlers",
    aliases: ["button noop", "customId", "collect stuck"],
  },
  {
    id: "intents",
    symptom: {
      en: "Intents or events never fire",
      nl: "Intents of events vuren nooit",
    },
    cause: {
      en: "The event name was omitted from `intentsFor` (rest args, not an array)",
      nl: "De eventnaam ontbrak in `intentsFor` (rest-args, geen array)",
    },
    fix: {
      en: "Call `intentsFor(\"memberJoin\", \"message\", …)` with every event you listen for.",
      nl: "Roep `intentsFor(\"memberJoin\", \"message\", …)` aan met elk event dat je beluistert.",
    },
    href: "/docs/events-intents",
    aliases: ["missing intents", "messageCreate", "memberJoin", "guildMemberAdd"],
  },
  {
    id: "watch-noop",
    symptom: {
      en: "`[Draeven] watch: true needs commands from a folder path or draeven.config.`",
      nl: "`[Draeven] watch: true needs commands from a folder path or draeven.config.`",
    },
    cause: {
      en: "`Start` throws when `watch` is true and `commands` is an in-memory array",
      nl: "`Start` faalt als `watch` aan staat en `commands` een array in het geheugen is",
    },
    fix: {
      en: "Pass a folder path or `draeven.config.js`.",
      nl: "Geef een mappad of `draeven.config.js` mee.",
    },
    href: "/docs/hot-reload-guard",
    aliases: ["hot reload", "watch true"],
  },
  {
    id: "cooldown-memory",
    symptom: {
      en: "A cooldown is forgotten after restart",
      nl: "Een wachttijd is na herstart vergeten",
    },
    cause: {
      en: "`CooldownBook` lives in process memory",
      nl: "`CooldownBook` leeft in het procesgeheugen",
    },
    fix: {
      en: "Expect in-memory cooldowns, or store your own.",
      nl: "Reken op in-memory wachttijden, of bewaar ze zelf.",
    },
    href: "/docs/cooldowns",
    aliases: ["cooldown reset", "CooldownBook"],
  },
  {
    id: "layout-text",
    symptom: {
      en: "Layout plus text throws",
      nl: "Layout plus tekst geeft een foutmelding",
    },
    cause: {
      en: "A `layout()` is the whole reply",
      nl: "Een `layout()` is het hele antwoord",
    },
    fix: {
      en: "Reply with layout alone, or use embed fields instead of mixing text.",
      nl: "Antwoord met alleen layout, of gebruik embed-velden i.p.v. tekst erbij.",
    },
    href: "/docs/embeds-layout",
    aliases: ["layout() throw", "cannot mix"],
  },
  {
    id: "two-bots",
    symptom: {
      en: "`Another bot is already running`",
      nl: "`Another bot is already running`",
    },
    cause: {
      en: "`alone` is a pid lock for the same script and working directory",
      nl: "`alone` is een pid-lock voor hetzelfde script en dezelfde werkmap",
    },
    fix: {
      en: "Stop the other process, or pass `alone: true` to replace it.",
      nl: "Stop het andere proces, of geef `alone: true` om het te vervangen.",
    },
    href: "/docs/alone",
    aliases: ["another bot", "duplicate process", ".draeven.pid"],
  },
  {
    id: "disallowed-intents",
    symptom: {
      en: "Discord closes the gateway with 4014",
      nl: "Discord sluit de gateway met 4014",
    },
    cause: {
      en: "Disallowed intents. The portal and the bitmask do not match. This is not a second session.",
      nl: "Niet-toegestane intents. Portaal en bitmasker komen niet overeen. Dit is geen tweede sessie.",
    },
    fix: {
      en: "Turn the intent on in the portal, or stop requesting it.",
      nl: "Zet de intent aan in het portaal, of vraag hem niet meer aan.",
    },
    href: "/docs/events-intents",
    aliases: ["4014", "disallowed intents"],
  },
  {
    id: "unknown-permission",
    symptom: {
      en: "`[Draeven] Unknown permission`",
      nl: "`[Draeven] Unknown permission`",
    },
    cause: {
      en: "The `PermissionName` is misspelled",
      nl: "De `PermissionName` is verkeerd gespeld",
    },
    fix: {
      en: "Use a valid Discord permission name in `need` / `permissions`.",
      nl: "Gebruik een geldige Discord-rechtennaam in `need` / `permissions`.",
    },
    href: "/docs/command-meta",
    aliases: ["Unknown permission", "ManageGuild"],
  },
  {
    id: "bridge-401",
    symptom: {
      en: "Dashboard 401, or the desk cannot connect",
      nl: "Dashboard 401, of de desk maakt geen verbinding",
    },
    cause: {
      en: "`BRIDGE_SECRET` or `BRIDGE_URL` does not match",
      nl: "`BRIDGE_SECRET` of `BRIDGE_URL` komt niet overeen",
    },
    fix: {
      en: "Align secret and URL between bot and desk.",
      nl: "Stem secret en URL af tussen bot en desk.",
    },
    href: "/docs/bridge-desk",
    aliases: ["401", "BRIDGE_SECRET", "desk"],
  },
  {
    id: "ts-commands",
    symptom: {
      en: "The commands folder is TypeScript and Discord shows nothing",
      nl: "De commands-map is TypeScript en Discord toont niets",
    },
    cause: {
      en: "`loadCommands` skips files that are not `.js`. Discord never sees that folder.",
      nl: "`loadCommands` slaat bestanden over die geen `.js` zijn. Discord ziet die map nooit.",
    },
    fix: {
      en: "Build to `dist/commands` and point config there.",
      nl: "Build naar `dist/commands` en wijs de config daarheen.",
    },
    href: "/docs/config",
    aliases: ["typescript commands", "dist/commands", "Cannot find module"],
  },
  {
    id: "reserved-option",
    symptom: {
      en: "Option key collides with ctx helpers",
      nl: "Optiesleutel botst met ctx-helpers",
    },
    cause: {
      en: "Reserved names like `reply`, `author`, `collect`",
      nl: "Gereserveerde namen zoals `reply`, `author`, `collect`",
    },
    fix: {
      en: "Rename the option. See Commands → reserved keys.",
      nl: "Hernoem de optie. Zie Commando's → gereserveerde sleutels.",
    },
    href: "/docs/commands",
    aliases: ["reserved", "opt key", "author option"],
  },
];

export function errorMapAliases(): string[] {
  return ERROR_MAP.flatMap((row) => row.aliases ?? []);
}
