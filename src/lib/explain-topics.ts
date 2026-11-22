import type { AppLocale } from "@/i18n/routing";

export type ExplainBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; language?: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type ExplainTopic = {
  title: string;
  lead: string;
  blocks: ExplainBlock[];
};

const EN: Record<string, ExplainTopic> = {
  "embed-color": {
    title: "color",
    lead: "The left accent bar on the embed. Use a named color from colors.*, a hex string, or a number.",
    blocks: [
      {
        type: "p",
        text: "Pass color on the embed options object. Named colors live on the colors export — including Discord’s blurple.",
      },
      {
        type: "code",
        code: `import { embed, colors } from "@draeven/core";

embed({
  color: colors.green,
  header: { title: "OK" },
});

embed({
  color: "#2ec4b6",
  header: { title: "Hex" },
});`,
      },
      {
        type: "ul",
        items: [
          "colors.blurple, colors.green, colors.teal, colors.red, … (full CSS color name list + blurple)",
          "Hex strings like \"#2ec4b6\" are accepted",
          "Omitting color uses Discord’s default bar",
        ],
      },
    ],
  },
  "embed-author": {
    title: "author",
    lead: "A small name line above the header title — optional icon and link.",
    blocks: [
      {
        type: "p",
        text: "author sits above header.title. Use it for the person or brand the embed is about.",
      },
      {
        type: "code",
        code: `embed({
  author: {
    name: person.name,
    icon: person.avatarUrl,
    link: "https://discord.com",
  },
  header: { title: "Profile" },
});`,
      },
      {
        type: "ul",
        items: [
          "name — required text",
          "icon — optional small image URL in front of the name",
          "link — optional URL that makes the name clickable",
        ],
      },
    ],
  },
  "embed-header": {
    title: "header",
    lead: "The main title block. In Draeven this is header — not a top-level title key (that is a discord.js habit).",
    blocks: [
      {
        type: "p",
        text: "header holds the large title, an optional link on that title, and an optional thumbnail image beside it.",
      },
      {
        type: "code",
        code: `embed({
  header: {
    title: "Server Information",
    link: "https://example.com",
    image: "https://cdn.discordapp.com/embed/avatars/1.png",
  },
  description: "Details under the title.",
});`,
      },
      {
        type: "table",
        headers: ["Key", "Meaning"],
        rows: [
          ["title", "Large title text (≤ 256 characters)"],
          ["link", "Makes the title a hyperlink — requires title"],
          ["image", "Small picture to the right of the title (thumbnail)"],
        ],
      },
      {
        type: "ul",
        items: [
          "Wrong: title: \"…\" at the embed root",
          "Right: header: { title: \"…\" }",
          "A header needs at least a title or an image",
        ],
      },
    ],
  },
  "embed-description": {
    title: "description",
    lead: "The paragraph under the header. Supports Discord markdown and Draeven time() stamps.",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Status" },
  description: \`Online since \${time(new Date(), "relative")}\`,
});`,
      },
      {
        type: "ul",
        items: [
          "Max 4096 characters",
          "Use **bold**, links, and time() for relative timestamps",
          "An embed can be description-only (no header) if you also have fields, image, or footer",
        ],
      },
    ],
  },
  "embed-fields": {
    title: "fields",
    lead: "Rows of labeled facts. Draeven lays out up to three fields per row; breakline starts a new row; wide takes the full width.",
    blocks: [
      {
        type: "p",
        text: "Each field is { name, value, wide? }. There is no inline: true — that is discord.js. Omit wide to share the row (up to three). Set wide: true for a full-width field.",
      },
      {
        type: "code",
        code: `import { embed, breakline, time } from "@draeven/core";

embed({
  header: { title: "Stats" },
  fields: [
    { name: "Members", value: 128 },
    { name: "Channels", value: 24 },
    breakline,
    { name: "Created", value: time(person.createdAt, "long date") },
    { name: "Online", value: 37 },
    breakline,
    { name: "About", value: "Uses the whole row.", wide: true },
  ],
});`,
      },
      {
        type: "table",
        headers: ["Piece", "Rule"],
        rows: [
          ["name", "Label on the left"],
          ["value", "string | number | boolean | Date (or a time() string)"],
          ["wide: true", "Field spans the full row"],
          ["breakline", "Force the next fields onto a new row"],
        ],
      },
      {
        type: "ul",
        items: [
          "Max 25 fields after layout (short rows may insert blank fillers)",
          "A bare Date value renders as a long date; prefer time(date, style) for control",
          "Never use inline — it is ignored / not part of Draeven’s API",
        ],
      },
    ],
  },
  "embed-breakline": {
    title: "breakline",
    lead: "A Symbol you put between fields to start the next visual row.",
    blocks: [
      {
        type: "p",
        text: "Import breakline from @draeven/core and place it in the fields array. Fields after a breakline begin on a new row. Empty short rows may insert blank columns so Discord keeps the grid.",
      },
      {
        type: "code",
        code: `import { breakline, embed } from "@draeven/core";

fields: [
  { name: "A", value: "1" },
  { name: "B", value: "2" },
  breakline,
  { name: "C", value: "3" },
]`,
      },
    ],
  },
  "embed-footer": {
    title: "footer",
    lead: "Bottom line of the embed — text plus optional small icon. timestamp sits beside it.",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Report" },
  footer: {
    text: "Draeven",
    icon: "https://cdn.discordapp.com/embed/avatars/3.png",
  },
  timestamp: new Date(),
});`,
      },
      {
        type: "ul",
        items: [
          "text — 1–2048 characters (required if you set footer)",
          "icon — optional URL for a small icon before the text",
          "timestamp — separate option: a Date shown next to the footer in the reader’s timezone",
        ],
      },
    ],
  },
  "embed-image": {
    title: "image",
    lead: "Large picture under the fields (full-width embed image).",
    blocks: [
      {
        type: "p",
        text: "Different from header.image (thumbnail beside the title). image is the big banner under the field block.",
      },
      {
        type: "code",
        code: `embed({
  header: { title: "Gallery" },
  image: "https://cdn.discordapp.com/embed/avatars/2.png",
});`,
      },
    ],
  },
  "embed-time": {
    title: "time()",
    lead: "Builds a Discord timestamp string Discord renders in each reader’s locale and timezone.",
    blocks: [
      {
        type: "p",
        text: "time requires a real Date instance — not Date.now(). Styles can be long names or single letters.",
      },
      {
        type: "table",
        headers: ["Style", "Example feel"],
        rows: [
          ["time / t", "16:20"],
          ["long time / T", "16:20:30"],
          ["date / d", "20/04/2021"],
          ["long date / D", "20 April 2021"],
          ["date and time / f", "20 April 2021 16:20"],
          ["full / F", "Tuesday, 20 April 2021 16:20"],
          ["relative / R", "2 months ago"],
        ],
      },
      {
        type: "code",
        code: `import { time } from "@draeven/core";

time(new Date(), "relative");
time(person.createdAt, "D");
time(person.createdAt, "long date");`,
      },
    ],
  },
  "embed-colors": {
    title: "colors",
    lead: "Named color map for embed.color (and layout pack colors).",
    blocks: [
      {
        type: "p",
        text: "Import colors from @draeven/core. Use colors.blurple for Discord’s brand blue, or any CSS color name Draeven ships.",
      },
      {
        type: "code",
        code: `import { colors, embed } from "@draeven/core";

embed({ color: colors.teal, header: { title: "Teal bar" } });
embed({ color: colors.blurple, header: { title: "Blurple bar" } });`,
      },
    ],
  },
  "embed-rows": {
    title: "rows",
    lead: "Buttons and menus that ship with the embed. Built with row(), button(), menu(), …",
    blocks: [
      {
        type: "p",
        text: "Pass up to five rows on the embed. Discord shows them under the embed. Presses use ctx.collect — see Collectors.",
      },
      {
        type: "code",
        code: `import { button, embed, row } from "@draeven/core";

embed({
  header: { title: "Confirm" },
  rows: [
    row(
      button({ id: "yes", label: "Yes", color: "green" }),
      button({ id: "no", label: "No", color: "red" })
    ),
  ],
});`,
      },
    ],
  },
  "embed-picture": {
    title: "picture",
    lead: "A canvas() bitmap sent with the embed as an attachment preview.",
    blocks: [
      {
        type: "p",
        text: "picture expects a Canvas from canvas(). It is Draeven-specific — not a plain URL. For a URL image use image or header.image instead.",
      },
    ],
  },
  "embed-reply": {
    title: "reply(embed)",
    lead: "How an embed leaves your handler.",
    blocks: [
      {
        type: "ul",
        items: [
          "reply(embed(...)) — the embed alone",
          "reply(\"Text\", embed(...)) — a content line above the embed",
          "edit(embed(...)) / followup(embed(...)) — same shapes after defer",
          "bot.send(channel, embed(...)) — post outside the interaction",
          "layout() is a different message. It cannot share a reply with an embed",
        ],
      },
      {
        type: "code",
        code: `return reply(embed({ header: { title: "Details" } }));
return reply("Heads up:", embed({ header: { title: "Details" } }));
await bot.send(channelId, embed({ header: { title: "Alert" } }));`,
      },
    ],
  },
  "lookup-member": {
    title: "getMember",
    lead: "getUser is the Discord account. getMember is that person in the current guild.",
    blocks: [
      {
        type: "ul",
        items: [
          "getUser(author) returns a User, or throws if that id was not sent with the interaction",
          "getMember(author) returns nick, joinedAt, and roles in a guild",
          "In a DM, getMember returns undefined — there is no guild member",
          "A user() option is already a User. Lookups are for author, the bot, and other ids",
        ],
      },
    ],
  },
  "format-vs-time": {
    title: "formatDate vs time()",
    lead: "formatDate is a fixed UTC calendar day. time() is a Discord timestamp each reader sees in their own zone.",
    blocks: [
      {
        type: "ul",
        items: [
          "formatDate(date, Netherlands) → a string such as 05-03-2020. The country picks order and separators",
          "time(date, \"date\") inside an embed becomes a Discord <t:…> stamp",
          "An invalid date or an unknown country throws. time() does not take a country",
        ],
      },
    ],
  },
  "auto-defer": {
    title: "autoDefer",
    lead: "Discord drops the interaction after about 3 seconds. Draeven defers at 2 seconds unless you change it.",
    blocks: [
      {
        type: "ul",
        items: [
          "Start({ autoDefer: true }) or omitted — defer at 2000 ms",
          "A number is clamped to 500–2500 ms",
          "Start({ autoDefer: false }) turns it off for every command",
          "autoDefer: false on one command turns it off for that command only",
          "defer: true in metadata acknowledges immediately, before the handler",
        ],
      },
    ],
  },
  "form-first": {
    title: "Form first",
    lead: "A modal has to be the first acknowledgement. Discord will not open one after a defer.",
    blocks: [
      {
        type: "ul",
        items: [
          "reply(form(...)) as the first response",
          "wait(), a metadata defer, transcript(), or an auto-defer that already fired will throw",
          "A form cannot be private, and ctx.send cannot carry one",
        ],
      },
    ],
  },
  "layout-mix": {
    title: "layout() stands alone",
    lead: "A layout is the whole reply. It cannot share that message with classic content.",
    blocks: [
      {
        type: "ul",
        items: [
          "Do not pass text, embed(), poll(), or a canvas() picture beside layout()",
          "reply(\"text\", layout(...)) throws: A reply takes text, an embed, or text and an embed.",
          "{ text, layout } throws: A layout cannot mix with text, embeds, or polls.",
          "Extra row() values on the same reply object are still allowed, and so is { private: true }",
        ],
      },
    ],
  },
  "sku-button": {
    title: "sku()",
    lead: "A premium purchase button. Discord sells the SKU. Your handler never sees a press.",
    blocks: [
      {
        type: "ul",
        items: [
          "id is the Discord SKU id: 1–20 digits",
          "Put it in row() with buttons and links (at most 5). No press, and collect never sees it",
          "The app needs a real SKU in the Developer Portal. An invalid id throws while the row is built",
        ],
      },
    ],
  },
  "collect-vs-press": {
    title: "collect vs press",
    lead: "collect continues this command. press answers later, on its own. use() answers after a restart.",
    blocks: [
      {
        type: "ul",
        items: [
          "ctx.collect({ ids }) waits in the handler that showed the components",
          "The collector wins only when id, kind, and who all match",
          "After that miss: a remembered inline press or submit, then use() from the events folder, then the text Received.",
          "Keep press for a one-off button. Export use() when the handler should survive a restart",
          "link() and sku() have no press and never arrive in collect",
        ],
      },
    ],
  },
  "start-token": {
    title: "token",
    lead: "The bot token Start() requires. A blank token throws before the gateway opens.",
    blocks: [
      {
        type: "ul",
        items: [
          "Read it from the environment. Start trims it, then throws when it is empty",
          "The message is [Draeven] Missing Discord token",
          "A reset in the Developer Portal invalidates the old token immediately",
        ],
      },
    ],
  },
  "start-commands": {
    title: "commands",
    lead: "Where Start loads slash commands and context menus from — a folder, an array, or draeven.config.",
    blocks: [
      {
        type: "ul",
        items: [
          "Omit commands and Draeven reads draeven.config.js (commands: \"./dist/commands\")",
          "A string or URL is a compiled folder loadCommands() imports",
          "An array like commands: [ping] lives in memory — useful in tests; watch cannot follow it",
          "Folder form is required for watch: true",
        ],
      },
      {
        type: "code",
        code: `await Start({
  token,
  commands: "./dist/commands",
  guildId: process.env.DISCORD_GUILD_ID,
});`,
      },
    ],
  },
  "start-guildId": {
    title: "guildId",
    lead: "A snowflake. Commands sync to that guild. Omit it and Discord registers them globally.",
    blocks: [
      {
        type: "ul",
        items: [
          "1–20 digits. Anything else throws at startup",
          "Guild sync shows new commands within seconds",
          "A global sync (no guildId) can take up to an hour",
        ],
      },
    ],
  },
  "start-watch": {
    title: "watch",
    lead: "Reload compiled command and event folders without dropping the gateway.",
    blocks: [
      {
        type: "ul",
        items: [
          "Needs a folder path or draeven.config.js. An in-memory commands array throws",
          "Watch follows the compiled .js. A TypeScript edit does nothing until the build writes dist",
          "An events object is not a folder, so watch does not swap those functions",
        ],
      },
    ],
  },
  "start-autoDefer": {
    title: "autoDefer",
    lead: "How soon Start acknowledges an interaction the handler has not answered yet.",
    blocks: [
      {
        type: "ul",
        items: [
          "true or omitted defers at 2000 ms",
          "false turns it off for every command. One command can still set autoDefer: false in its metadata",
          "A number is clamped to 500–2500 ms",
        ],
      },
    ],
  },
  "start-alone": {
    title: "alone",
    lead: "One token, one process. alone decides what a second start does.",
    blocks: [
      {
        type: "ul",
        items: [
          '"ask" (default) prompts on a TTY. It does not prompt when stdin is not a TTY',
          "true takes the lock and stops the other process. false skips the check",
          "Under PM2 or systemd, pass alone: true",
        ],
      },
    ],
  },
  "start-intents": {
    title: "intents",
    lead: "The gateway bitmask. intentsFor builds it from event names.",
    blocks: [
      {
        type: "ul",
        items: [
          'intentsFor("memberJoin", "message") unions the bits those events need, including privileged ones',
          'intentBits("guilds", "guildMessages") ORs named flags when you already know the mask',
          "The portal toggle and this mask both have to be on, or the events never arrive",
        ],
      },
    ],
  },
  "command-places": {
    title: "places",
    lead: "Where Discord offers the command: guild, the bot DM, or other private contexts.",
    blocks: [
      {
        type: "ul",
        items: [
          '"guild" is a server. "bot dm" is the bot\'s own DM. The space is part of the string',
          '"private" is a group DM, or a user-install DM that is not the bot DM',
          "Omit the key for Discord's default. An unknown place throws",
        ],
      },
    ],
  },
  "command-install": {
    title: "install",
    lead: "Who can install the command: a guild, a user, or both.",
    blocks: [
      {
        type: "ul",
        items: [
          '"guild" is integration type 0. "user" is integration type 1',
          "Omit the key for Discord's default",
          "An unknown install target throws",
        ],
      },
    ],
  },
  "command-nsfw": {
    title: "nsfw",
    lead: "Limit the command to age-restricted channels.",
    blocks: [
      {
        type: "ul",
        items: [
          "true sends nsfw: true. false sends nsfw: false",
          "Omit the key to leave it unset",
          "Discord still enforces the channel flag. This field only registers the limit",
        ],
      },
    ],
  },
  "command-need": {
    title: "need",
    lead: "A runtime permission gate. It runs in the process before your handler.",
    blocks: [
      {
        type: "ul",
        items: [
          "Same type as permissions: a PermissionName, a list, a digit string, or a bigint",
          "The member bitfield on the interaction must include every bit. Administrator passes",
          "permissions is what Discord stores. need is the check you run",
        ],
      },
    ],
  },
  "command-defer": {
    title: "defer",
    lead: "Acknowledge before the handler runs.",
    blocks: [
      {
        type: "ul",
        items: [
          "true is a public defer. { private: true } is ephemeral",
          "A form() cannot follow a defer. The modal has to be the first acknowledgement",
          "autoDefer: false on the same command turns off the 2-second auto-defer for that command only",
        ],
      },
    ],
  },
  "press-context": {
    title: "PressContext",
    lead: "The object a press, submit, or use() handler receives. It is not the command ctx.",
    blocks: [
      {
        type: "ul",
        items: [
          "id is the custom id. messageId is the message that carried the control, when Discord sent it",
          "author is { id }. values holds menu and picker selections. fields holds form values",
          "reply once. A second reply throws. Returning without reply throws",
          "It cannot wait, collect, followup, or call mod actions. Those live on the command ctx",
        ],
      },
    ],
  },
  "intents-for": {
    title: "intentsFor",
    lead: "Union the gateway bits a list of camelCase events needs.",
    blocks: [
      {
        type: "ul",
        items: [
          'intentsFor("ready") is 0. intentsFor() with no names throws',
          "Privileged events still need the matching portal toggle",
          "Prefer it over a hand-written mask. intentBits is for when you already know the flag names",
        ],
      },
    ],
  },
};

const NL: Record<string, ExplainTopic> = {
  "embed-color": {
    title: "color",
    lead: "De gekleurde balk links op de embed. Gebruik colors.*, een hex-string of een getal.",
    blocks: [
      {
        type: "p",
        text: "Zet color op het embed-object. Named colors zitten op colors — inclusief blurple.",
      },
      {
        type: "code",
        code: `import { embed, colors } from "@draeven/core";

embed({
  color: colors.green,
  header: { title: "OK" },
});`,
      },
      {
        type: "ul",
        items: [
          "colors.blurple, colors.green, colors.teal, …",
          "Hex zoals \"#2ec4b6\" mag ook",
          "Zonder color: Discord-standaardbalk",
        ],
      },
    ],
  },
  "embed-author": {
    title: "author",
    lead: "Kleine naamregel boven de header-titel — optioneel icoon en link.",
    blocks: [
      {
        type: "code",
        code: `embed({
  author: {
    name: person.name,
    icon: person.avatarUrl,
    link: "https://discord.com",
  },
  header: { title: "Profiel" },
});`,
      },
      {
        type: "ul",
        items: [
          "name — verplicht",
          "icon — optionele afbeeldings-URL",
          "link — optionele URL op de naam",
        ],
      },
    ],
  },
  "embed-header": {
    title: "header",
    lead: "Het titelblok. In Draeven heet dit header — geen losse title-key (dat is discord.js).",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: {
    title: "Serverinformatie",
    link: "https://example.com",
    image: "https://cdn.discordapp.com/embed/avatars/1.png",
  },
  description: "Details onder de titel.",
});`,
      },
      {
        type: "table",
        headers: ["Key", "Betekenis"],
        rows: [
          ["title", "Grote titel (≤ 256 tekens)"],
          ["link", "Maakt de titel klikbaar — vereist title"],
          ["image", "Kleine thumbnail rechts van de titel"],
        ],
      },
      {
        type: "ul",
        items: [
          "Fout: title: \"…\" op het embed-root",
          "Goed: header: { title: \"…\" }",
        ],
      },
    ],
  },
  "embed-description": {
    title: "description",
    lead: "Paragraaf onder de header. Markdown en time() zijn welkom.",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Status" },
  description: \`Online sinds \${time(new Date(), "relative")}\`,
});`,
      },
      {
        type: "ul",
        items: [
          "Max 4096 tekens",
          "Gebruik **bold**, links en time()",
        ],
      },
    ],
  },
  "embed-fields": {
    title: "fields",
    lead: "Rijen met feiten. Max drie per rij; breakline start een nieuwe rij; wide neemt de volle breedte.",
    blocks: [
      {
        type: "p",
        text: "Elk field is { name, value, wide? }. Er is geen inline: true — dat is discord.js.",
      },
      {
        type: "code",
        code: `import { embed, breakline, time } from "@draeven/core";

embed({
  header: { title: "Stats" },
  fields: [
    { name: "Leden", value: 128 },
    { name: "Kanalen", value: 24 },
    breakline,
    { name: "Over", value: "Hele rij.", wide: true },
  ],
});`,
      },
      {
        type: "table",
        headers: ["Onderdeel", "Regel"],
        rows: [
          ["name", "Label links"],
          ["value", "string | number | boolean | Date (of time()-string)"],
          ["wide: true", "Volle rij"],
          ["breakline", "Volgende fields op nieuwe rij"],
        ],
      },
    ],
  },
  "embed-breakline": {
    title: "breakline",
    lead: "Symbol tussen fields om een nieuwe rij te starten.",
    blocks: [
      {
        type: "code",
        code: `import { breakline, embed } from "@draeven/core";

fields: [
  { name: "A", value: "1" },
  { name: "B", value: "2" },
  breakline,
  { name: "C", value: "3" },
]`,
      },
    ],
  },
  "embed-footer": {
    title: "footer",
    lead: "Onderste regel — tekst plus optioneel icoon. timestamp staat ernaast.",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Rapport" },
  footer: { text: "Draeven", icon: "https://…" },
  timestamp: new Date(),
});`,
      },
      {
        type: "ul",
        items: [
          "text — 1–2048 tekens",
          "icon — optionele URL",
          "timestamp — aparte optie: Date naast de footer",
        ],
      },
    ],
  },
  "embed-image": {
    title: "image",
    lead: "Grote afbeelding onder de fields (niet de header-thumbnail).",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Galerie" },
  image: "https://cdn.discordapp.com/embed/avatars/2.png",
});`,
      },
    ],
  },
  "embed-time": {
    title: "time()",
    lead: "Discord-timestamp die elke lezer in eigen tijdzone ziet. Vereist een Date — geen Date.now().",
    blocks: [
      {
        type: "table",
        headers: ["Style", "Gevoel"],
        rows: [
          ["relative / R", "2 maanden geleden"],
          ["long date / D", "20 april 2021"],
          ["full / F", "dinsdag 20 april 2021 16:20"],
        ],
      },
      {
        type: "code",
        code: `time(new Date(), "relative");
time(person.createdAt, "D");`,
      },
    ],
  },
  "embed-colors": {
    title: "colors",
    lead: "Named kleuren voor embed.color (en layout).",
    blocks: [
      {
        type: "code",
        code: `import { colors, embed } from "@draeven/core";

embed({ color: colors.teal, header: { title: "Teal" } });`,
      },
    ],
  },
  "embed-rows": {
    title: "rows",
    lead: "Buttons en menu's die met de embed meegaan.",
    blocks: [
      {
        type: "code",
        code: `embed({
  header: { title: "Bevestig" },
  rows: [
    row(
      button({ id: "yes", label: "Ja", color: "green" }),
      button({ id: "no", label: "Nee", color: "red" })
    ),
  ],
});`,
      },
    ],
  },
  "embed-picture": {
    title: "picture",
    lead: "Een canvas()-bitmap als bijlage bij de embed — geen kale URL.",
    blocks: [
      {
        type: "p",
        text: "Voor een URL-afbeelding gebruik je image of header.image.",
      },
    ],
  },
  "embed-reply": {
    title: "reply(embed)",
    lead: "Hoe een embed je handler verlaat.",
    blocks: [
      {
        type: "ul",
        items: [
          "reply(embed(...)) — alleen de embed",
          "reply(\"Tekst\", embed(...)) — regel boven de embed",
          "edit / followup / bot.send — dezelfde vormen",
          "layout() is een ander bericht. Het deelt geen antwoord met een embed",
        ],
      },
    ],
  },
  "lookup-member": {
    title: "getMember",
    lead: "getUser is het Discord-account. getMember is die persoon in de huidige guild.",
    blocks: [
      {
        type: "ul",
        items: [
          "getUser(author) geeft een User terug, of geeft een foutmelding als die id niet met de interactie meekwam",
          "getMember(author) geeft nick, joinedAt en rollen in een guild",
          "In een DM geeft getMember undefined — er is geen guild-lid",
          "Een user()-optie is al een User. Lookups zijn voor author, de bot en andere ids",
        ],
      },
    ],
  },
  "format-vs-time": {
    title: "formatDate tegenover time()",
    lead: "formatDate is een vaste kalenderdag in UTC. time() is een Discord-tijdstempel die elke lezer in de eigen zone ziet.",
    blocks: [
      {
        type: "ul",
        items: [
          "formatDate(date, Netherlands) → een string zoals 05-03-2020. Het land kiest volgorde en scheidingstekens",
          "time(date, \"date\") in een embed wordt een Discord-stempel <t:…>",
          "Een ongeldige datum of een onbekend land geeft een foutmelding. time() neemt geen land",
        ],
      },
    ],
  },
  "auto-defer": {
    title: "autoDefer",
    lead: "Discord laat de interactie vallen na ongeveer 3 seconden. Draeven defert na 2 seconden, tenzij je dat verandert.",
    blocks: [
      {
        type: "ul",
        items: [
          "Start({ autoDefer: true }) of weggelaten — defer na 2000 ms",
          "Een getal wordt geklemd op 500–2500 ms",
          "Start({ autoDefer: false }) zet het uit voor elk commando",
          "autoDefer: false op één commando zet het alleen voor dat commando uit",
          "defer: true in metadata bevestigt meteen, vóór de handler",
        ],
      },
    ],
  },
  "form-first": {
    title: "Formulier eerst",
    lead: "Een modal moet de eerste bevestiging zijn. Discord opent er geen na een defer.",
    blocks: [
      {
        type: "ul",
        items: [
          "reply(form(...)) als eerste antwoord",
          "wait(), een defer in metadata, transcript(), of een auto-defer die al afging, geeft een foutmelding",
          "Een formulier kan niet privé zijn, en ctx.send kan er geen dragen",
        ],
      },
    ],
  },
  "layout-mix": {
    title: "layout() staat alleen",
    lead: "Een layout is het hele antwoord. Hij deelt dat bericht niet met klassieke inhoud.",
    blocks: [
      {
        type: "ul",
        items: [
          "Geef geen tekst, embed(), poll() of een canvas()-afbeelding naast layout()",
          "reply(\"tekst\", layout(...)) geeft de fout: A reply takes text, an embed, or text and an embed.",
          "{ text, layout } geeft de fout: A layout cannot mix with text, embeds, or polls.",
          "Extra row()-waarden op hetzelfde antwoord mogen wel, net als { private: true }",
        ],
      },
    ],
  },
  "sku-button": {
    title: "sku()",
    lead: "Een premium-koopknop. Discord verkoopt de SKU. Je handler ziet geen press.",
    blocks: [
      {
        type: "ul",
        items: [
          "id is de Discord-SKU-id: 1–20 cijfers",
          "Zet hem in row() naast knoppen en links (hoogstens 5). Geen press, en collect ziet hem nooit",
          "De app heeft een echte SKU nodig in het Developer Portal. Een ongeldige id geeft een foutmelding terwijl de rij wordt gebouwd",
        ],
      },
    ],
  },
  "collect-vs-press": {
    title: "collect tegenover press",
    lead: "collect laat dit commando doorgaan. press antwoordt later, op zichzelf. use() antwoordt na een herstart.",
    blocks: [
      {
        type: "ul",
        items: [
          "ctx.collect({ ids }) wacht in de handler die de componenten toonde",
          "De verzamelaar wint alleen als id, soort en wie kloppen",
          "Daarna: een onthouden inline press of submit, dan use() uit de events-map, dan de tekst Received.",
          "Houd press voor een eenmalige knop. Exporteer use() als de handler een herstart moet overleven",
          "link() en sku() hebben geen press en komen nooit aan in collect",
        ],
      },
    ],
  },
  "start-token": {
    title: "token",
    lead: "Het bot-token dat Start() eist. Een leeg token geeft al vóór de gateway een foutmelding.",
    blocks: [
      {
        type: "ul",
        items: [
          "Lees het uit de omgeving. Start trimt het, en geeft een foutmelding als het leeg is",
          "Het bericht is [Draeven] Missing Discord token",
          "Een reset in het Developer Portal maakt het oude token meteen ongeldig",
        ],
      },
    ],
  },
  "start-commands": {
    title: "commands",
    lead: "Waar Start slash-commando's en contextmenu's vandaan haalt — een map, een array, of draeven.config.",
    blocks: [
      {
        type: "ul",
        items: [
          "Laat commands weg en Draeven leest draeven.config.js (commands: \"./dist/commands\")",
          "Een string of URL is een gecompileerde map die loadCommands() importeert",
          "Een array zoals commands: [ping] blijft in het geheugen — handig in tests; watch kan die niet volgen",
          "Voor watch: true heb je de map-vorm nodig",
        ],
      },
      {
        type: "code",
        code: `await Start({
  token,
  commands: "./dist/commands",
  guildId: process.env.DISCORD_GUILD_ID,
});`,
      },
    ],
  },
  "start-guildId": {
    title: "guildId",
    lead: "Een snowflake. Commando's synchroniseren naar die guild. Weglaten registreert ze globaal.",
    blocks: [
      {
        type: "ul",
        items: [
          "1–20 cijfers. Iets anders geeft een foutmelding bij het opstarten",
          "Guild-sync toont nieuwe commando's binnen seconden",
          "Een globale sync (geen guildId) kan een uur duren",
        ],
      },
    ],
  },
  "start-watch": {
    title: "watch",
    lead: "Herlaadt gecompileerde commando- en eventmappen zonder de gateway te sluiten.",
    blocks: [
      {
        type: "ul",
        items: [
          "Heeft een mappad of draeven.config.js nodig. Een array in het geheugen geeft een foutmelding",
          "Watch volgt de gecompileerde .js. Een TypeScript-wijziging doet niets tot de build dist schrijft",
          "Een events-object is geen map, dus watch vervangt die functies niet",
        ],
      },
    ],
  },
  "start-autoDefer": {
    title: "autoDefer",
    lead: "Hoe snel Start een interactie bevestigt die de handler nog niet heeft beantwoord.",
    blocks: [
      {
        type: "ul",
        items: [
          "true of weggelaten defert na 2000 ms",
          "false zet het uit voor elk commando. Eén commando kan nog autoDefer: false in zijn metadata zetten",
          "Een getal wordt geklemd op 500–2500 ms",
        ],
      },
    ],
  },
  "start-alone": {
    title: "alone",
    lead: "Eén token, één proces. alone beslist wat een tweede start doet.",
    blocks: [
      {
        type: "ul",
        items: [
          '"ask" (standaard) vraagt op een TTY. Het vraagt niets als stdin geen TTY is',
          "true pakt het slot en stopt het andere proces. false slaat de check over",
          "Onder PM2 of systemd geef je alone: true mee",
        ],
      },
    ],
  },
  "start-intents": {
    title: "intents",
    lead: "Het bitmasker van de gateway. intentsFor bouwt het uit eventnamen.",
    blocks: [
      {
        type: "ul",
        items: [
          'intentsFor("memberJoin", "message") verenigt de bits die die events nodig hebben, inclusief geprivilegieerde',
          'intentBits("guilds", "guildMessages") doet een OR van benoemde vlaggen als je het masker al kent',
          "De portaalschakelaar en dit masker moeten allebei aan staan, anders komen de events niet aan",
        ],
      },
    ],
  },
  "command-places": {
    title: "places",
    lead: "Waar Discord het commando aanbiedt: guild, de bot-DM, of andere privécontexten.",
    blocks: [
      {
        type: "ul",
        items: [
          '"guild" is een server. "bot dm" is de eigen DM van de bot. De spatie hoort bij de string',
          '"private" is een groeps-DM, of een user-install-DM die niet de bot-DM is',
          "Laat de sleutel weg voor de standaard van Discord. Een onbekende place geeft een foutmelding",
        ],
      },
    ],
  },
  "command-install": {
    title: "install",
    lead: "Wie het commando kan installeren: een guild, een gebruiker, of beide.",
    blocks: [
      {
        type: "ul",
        items: [
          '"guild" is integratietype 0. "user" is integratietype 1',
          "Laat de sleutel weg voor de standaard van Discord",
          "Een onbekend install-doel geeft een foutmelding",
        ],
      },
    ],
  },
  "command-nsfw": {
    title: "nsfw",
    lead: "Beperk het commando tot leeftijdsbegrensde kanalen.",
    blocks: [
      {
        type: "ul",
        items: [
          "true stuurt nsfw: true. false stuurt nsfw: false",
          "Laat de sleutel weg om hem niet te zetten",
          "Discord dwingt de kanaalvlag nog steeds af. Dit veld registreert alleen de grens",
        ],
      },
    ],
  },
  "command-need": {
    title: "need",
    lead: "Een runtime-rechtenpoort. Die draait in het proces vóór je handler.",
    blocks: [
      {
        type: "ul",
        items: [
          "Hetzelfde type als permissions: een PermissionName, een lijst, een cijferstring of een bigint",
          "Het bitveld van het lid op de interactie moet elke bit bevatten. Administrator slaagt",
          "permissions is wat Discord bewaart. need is de check die jij draait",
        ],
      },
    ],
  },
  "command-defer": {
    title: "defer",
    lead: "Bevestig vóór de handler draait.",
    blocks: [
      {
        type: "ul",
        items: [
          "true is een publieke defer. { private: true } is efemeer",
          "Een form() kan niet na een defer. De modal moet de eerste bevestiging zijn",
          "autoDefer: false op hetzelfde commando zet de auto-defer van 2 seconden alleen voor dat commando uit",
        ],
      },
    ],
  },
  "press-context": {
    title: "PressContext",
    lead: "Het object dat een press-, submit- of use()-handler krijgt. Het is niet de commando-ctx.",
    blocks: [
      {
        type: "ul",
        items: [
          "id is de custom id. messageId is het bericht dat het element droeg, als Discord het meestuurde",
          "author is { id }. values houdt menu- en kiezerselecties. fields houdt formulierwaarden",
          "reply één keer. Een tweede reply geeft een foutmelding. Terugkeren zonder reply geeft ook een foutmelding",
          "Hij kan niet wait, collect, followup of mod-acties aanroepen. Die zitten op de commando-ctx",
        ],
      },
    ],
  },
  "intents-for": {
    title: "intentsFor",
    lead: "Voeg de gateway-bits samen die een lijst camelCase-events nodig heeft.",
    blocks: [
      {
        type: "ul",
        items: [
          'intentsFor("ready") is 0. intentsFor() zonder namen geeft een foutmelding',
          "Geprivilegieerde events hebben nog steeds de bijbehorende portaalschakelaar nodig",
          "Liever dit dan een masker met de hand. intentBits is voor als je de vlagnaam al kent",
        ],
      },
    ],
  },
};

export function getExplainTopic(locale: AppLocale, id: string): ExplainTopic | null {
  const table = locale === "nl" ? NL : EN;
  return table[id] ?? EN[id] ?? null;
}

export function listExplainTopicIds(): string[] {
  return Object.keys(EN);
}
