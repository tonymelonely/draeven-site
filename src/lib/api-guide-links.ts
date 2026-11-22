/**
 * Reverse map: API symbol name → docs guide slug(s).
 * Shown on /reference pages so readers can jump back to narrative guides.
 */
export type ApiGuideLink = {
  slug: string;
  en: string;
  nl: string;
};

const guide = (slug: string, en: string, nl: string): ApiGuideLink => ({ slug, en, nl });

const MAP: Record<string, ApiGuideLink[]> = {
  Start: [guide("start-options", "Start options", "Start-opties"), guide("quickstart", "Quickstart", "Snelstart")],
  command: [guide("commands", "Commands", "Commando's"), guide("command-meta", "Command metadata", "Commando-metadata")],
  userMenu: [guide("context-menus", "Context menus", "Contextmenu's")],
  messageMenu: [guide("context-menus", "Context menus", "Contextmenu's")],
  text: [guide("options", "Options", "Opties")],
  user: [guide("options", "Options", "Opties")],
  number: [guide("options", "Options", "Opties")],
  boolean: [guide("options", "Options", "Opties")],
  channel: [guide("options", "Options", "Opties")],
  role: [guide("options", "Options", "Opties")],
  mentionable: [guide("options", "Options", "Opties")],
  attachment: [guide("options", "Options", "Opties")],
  choice: [guide("options", "Options", "Opties")],
  sub: [guide("subcommands", "Subcommands", "Subcommando's")],
  group: [guide("subcommands", "Subcommands", "Subcommando's")],
  embed: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  layout: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  show: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  pack: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  beside: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  divide: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  album: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  thumb: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  button: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  menu: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  row: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  form: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren"), guide("press-handlers", "Press & submit", "Press & submit")],
  link: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  sku: [guide("sku", "SKU buttons", "SKU-knoppen")],
  people: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  roles: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  channels: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  mentions: [guide("pieces", "Buttons, menus & forms", "Knoppen, menu's & formulieren")],
  poll: [guide("polls", "Polls", "Peilingen")],
  canvas: [guide("canvas", "Canvas", "Canvas")],
  guard: [guide("guard", "Error guard", "Error-guard"), guide("hot-reload-guard", "Hot-reload & guard", "Hot-reload en guard")],
  simulate: [guide("simulate", "Simulate & tests", "Simuleren en tests")],
  intentsFor: [guide("events-intents", "Events & intents", "Events en intents")],
  intentBits: [guide("events-intents", "Events & intents", "Events en intents")],
  intents: [guide("discord-client", "@draeven/discord", "@draeven/discord")],
  say: [guide("locales", "Locales", "Taalvarianten")],
  formatDate: [guide("format-date", "formatDate utility", "formatDate-hulp")],
  time: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  colors: [guide("embeds-layout", "Embeds & layout", "Embeds en layout")],
  readConfig: [guide("config", "Config file", "Configbestand")],
  CooldownBook: [guide("cooldowns", "Cooldowns", "Wachttijden"), guide("advanced-api", "Advanced API", "Geavanceerde API")],
  CollectorBook: [guide("collectors", "Collectors", "Verzamelaars"), guide("advanced-api", "Advanced API", "Geavanceerde API")],
  checkGates: [guide("permissions", "Permissions & gates", "Rechten & gates"), guide("advanced-api", "Advanced API", "Geavanceerde API")],
  answerCommand: [guide("advanced-api", "Advanced API", "Geavanceerde API")],
  startBot: [guide("advanced-api", "Advanced API", "Geavanceerde API"), guide("bot-handle", "Bot handle", "Bot-handle")],
  permissionBitfield: [guide("command-meta", "Command metadata", "Commando-metadata")],
  hasPermissions: [guide("permissions", "Permissions & gates", "Rechten & gates")],
  loadCommands: [guide("architecture", "How it fits", "Hoe het in elkaar zit"), guide("project-layout", "Project layout", "Projectstructuur")],
  loadEvents: [guide("events-intents", "Events & intents", "Events en intents")],
  gatewayEventNames: [guide("gateway-events", "Gateway event payloads", "Gateway event-payloads")],
};

export function guidesForSymbol(name: string | undefined | null): ApiGuideLink[] {
  if (!name) return [];
  return MAP[name] ?? [];
}
