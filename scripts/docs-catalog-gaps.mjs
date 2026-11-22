import { rest } from "./docs-catalog-gaps-rest.mjs";

/** Catalog entries for the guides that were missing from docs-catalog.mjs. */
export const gaps = [
  {
    slug: "create-cli",
    order: 3,
    en: {
      title: "create-draeven CLI",
      description: "draeven init, the files it writes, and the dashboard scripts.",
      body: `
\`create-draeven\` scaffolds a bot: config, TypeScript, commands, an events folder, and the scripts that compile and start it. You need **Node.js 20+**. The package bins are \`create-draeven\` and \`draeven\`. Both run the same CLI.

The only command is \`init\`. A folder name is optional. Flags are \`--commands\`, \`--events\`, and \`--with-dashboard\`.

<Note>Aligned with @draeven/core **0.1.9**. Field names on this page match that release.</Note>

## Invoke it

\`npm create draeven@latest\` with no extra arguments runs \`init\` in the current directory.

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
pnpm install
pnpm start
\`\`\`

\`npm create\` forwards arguments to the bin. The first of those arguments has to be \`init\`. Put \`--\` before \`init\` when you also pass flags, so npm does not swallow them.

\`\`\`bash
npm create draeven@latest -- init my-bot --commands ./src/slash --events ./src/events --with-dashboard
\`\`\`

The same line after the package is installed:

\`\`\`bash
draeven init my-bot --commands ./src/slash --events ./src/events --with-dashboard
\`\`\`

Anything other than \`init\` prints the usage line and exits. \`draeven init\` with no folder writes into the current directory.

## Files it writes

It creates the folder, \`src/\`, the commands directory, and the events directory. It does **not** overwrite a file that is already there.

| File | Role |
|------|------|
| \`draeven.config.js\` | \`commands\` and \`events\` point at compiled output. See [Config file](/docs/config). |
| \`package.json\` | ESM, \`@draeven/core\` \`^0.1.9\`, the scripts below. |
| \`tsconfig.json\` | \`NodeNext\`, \`strict\`, \`outDir: "dist"\`, \`rootDir: "src"\`. |
| \`.gitignore\` | \`node_modules/\`, \`dist/\`, \`.env\`, \`.draeven.pid\`, \`.draeven/\`. |
| \`.env.example\` | \`DISCORD_TOKEN\`. Dashboard mode adds OAuth and bridge vars. |
| \`README.md\` | Copy \`.env\`, install, start. |
| \`src/main.ts\` | \`Start({ watch: true, intents: intentsFor("ready") })\`. \`events\` is omitted, so the config folder loads. |
| \`src/commands/ping.ts\` | A \`command("ping")\` that replies \`pong\`. The folder follows \`--commands\`. |
| \`src/commands/later.ts\` | A button with inline \`press\`. Fine for a short reply. |
| \`src/commands/letters.ts\` | Posts letter buttons. No \`press\`. |
| \`src/events/ready.ts\` | \`export function ready\`. The folder follows \`--events\`. |
| \`src/events/letters.ts\` | \`use({ ids: "hangman_*", run })\` owns those letter buttons. |
| \`scripts/dev.mjs\` | One \`pnpm build\`, then \`tsc -w\` and \`node dist/main.js\`. |
| \`src/desk-main.ts\` | Only with \`--with-dashboard\`. UI process for \`pnpm desk\`. |

\`package.json\` dev dependencies are \`typescript\` \`^5.9\` and \`@types/node\` \`^22\`.

## Scripts

| Script | Runs |
|--------|------|
| \`pnpm build\` | \`tsc -p tsconfig.json\` |
| \`pnpm start\` | build, then \`node dist/main.js\` |
| \`pnpm watch\` | \`tsc -w\` only |
| \`pnpm dev\` | \`node scripts/dev.mjs\` |
| \`pnpm desk\` | build, then \`node dist/desk-main.js\` (dashboard scaffold only) |
| \`pnpm dev:desk\` | same as \`desk\` |

\`--with-dashboard\` also adds \`@draeven/bridge\` \`^0.1.0\`. The generated \`main.ts\` reads \`DASHBOARD\`: \`embedded\` (default) starts the bot and the UI, \`bridge\` starts the API only, \`off\` is the bot alone, and \`desk\` throws and tells you to run \`pnpm desk\`. Env vars and modes are on [Bridge & desk](/docs/bridge-desk).

## Where commands land

\`--commands\` defaults to \`./src/commands\`. The config does not store that source path. It stores the compiled mirror:

| You pass | \`draeven.config.js\` gets |
|----------|----------------------------|
| \`./src/commands\` (default) | \`./dist/commands\` |
| \`./src/slash\` | \`./dist/slash\` |
| \`src/slash\` | \`./dist/slash\` |
| a path that already contains \`dist\` | that path, unchanged |
| anything else, such as \`./lib/commands\` | \`./dist/commands\` |

\`--events\` defaults to \`./src/events\` and follows the same compiled-path rules (\`./src/events\` becomes \`./dist/events\`).

\`src/main.ts\` turns \`watch\` on and omits \`events\`, so \`pnpm dev\` reloads compiled commands and the events folder from config without dropping the gateway ([Install](/docs/install)). \`later.ts\` keeps an inline \`press\`. \`letters.ts\` posts buttons, and \`events/letters.ts\` answers them with \`use()\`.

<Note>
Init fills gaps. It will not add \`@draeven/bridge\` to a \`package.json\` that already exists, and it will not rewrite \`src/main.ts\`. Scaffold a new folder when you want the dashboard files.
</Note>

## Pitfalls

- \`npm create draeven@latest my-bot\` is not \`init\`. The CLI exits with the usage line. Pass \`init\` first.
- A commands path outside \`src/\` and \`dist/\` still configures \`./dist/commands\`. Pass \`./src/...\` when the source folder is custom. \`--events\` uses the same fallback.
- The scaffold is ESM. Node 20 is the engines floor. Do not compile it to CommonJS.
`,
    },
    nl: {
      title: "create-draeven CLI",
      description: "draeven init, de bestanden die het schrijft, en de dashboard-scripts.",
      body: `
\`create-draeven\` zet een bot neer: config, TypeScript, commando's, een events-map en de scripts die compileren en starten. Je hebt **Node.js 20+** nodig. De bins zijn \`create-draeven\` en \`draeven\`. Beide draaien dezelfde CLI.

Het enige commando is \`init\`. Een mapnaam is optioneel. De vlaggen zijn \`--commands\`, \`--events\` en \`--with-dashboard\`.

<Note>Afgestemd op @draeven/core **0.1.9**. Veldnamen op deze pagina horen bij die release.</Note>

## Aanroepen

\`npm create draeven@latest\` zonder extra argumenten draait \`init\` in de huidige map.

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
pnpm install
pnpm start
\`\`\`

\`npm create\` geeft argumenten door aan de bin. Het eerste argument moet \`init\` zijn. Zet \`--\` vóór \`init\` als je ook vlaggen meegeeft, anders eet npm ze op.

\`\`\`bash
npm create draeven@latest -- init my-bot --commands ./src/slash --events ./src/events --with-dashboard
\`\`\`

Dezelfde regel als het pakket geïnstalleerd is:

\`\`\`bash
draeven init my-bot --commands ./src/slash --events ./src/events --with-dashboard
\`\`\`

Alles behalve \`init\` print de usage-regel en stopt. \`draeven init\` zonder map schrijft in de huidige map.

## Bestanden

Het maakt de map, \`src/\`, de commandomap en de events-map. Een bestand dat er al staat wordt **niet** overschreven.

| Bestand | Rol |
|---------|-----|
| \`draeven.config.js\` | \`commands\` en \`events\` wijzen naar gecompileerde output. Zie [Configbestand](/docs/config). |
| \`package.json\` | ESM, \`@draeven/core\` \`^0.1.9\`, de scripts hieronder. |
| \`tsconfig.json\` | \`NodeNext\`, \`strict\`, \`outDir: "dist"\`, \`rootDir: "src"\`. |
| \`.gitignore\` | \`node_modules/\`, \`dist/\`, \`.env\`, \`.draeven.pid\`, \`.draeven/\`. |
| \`.env.example\` | \`DISCORD_TOKEN\`. Dashboard-modus voegt OAuth- en bridge-variabelen toe. |
| \`README.md\` | Kopieer \`.env\`, installeer, start. |
| \`src/main.ts\` | \`Start({ watch: true, intents: intentsFor("ready") })\`. \`events\` staat er niet, dus de configmap laadt. |
| \`src/commands/ping.ts\` | Een \`command("ping")\` dat \`pong\` antwoordt. De map volgt \`--commands\`. |
| \`src/commands/later.ts\` | Een knop met inline \`press\`. Prima voor een kort antwoord. |
| \`src/commands/letters.ts\` | Plaatst letterknoppen. Geen \`press\`. |
| \`src/events/ready.ts\` | \`export function ready\`. De map volgt \`--events\`. |
| \`src/events/letters.ts\` | \`use({ ids: "hangman_*", run })\` bezit die letterknoppen. |
| \`scripts/dev.mjs\` | Eén \`pnpm build\`, daarna \`tsc -w\` en \`node dist/main.js\`. |
| \`src/desk-main.ts\` | Alleen met \`--with-dashboard\`. UI-proces voor \`pnpm desk\`. |

Dev-dependencies in \`package.json\` zijn \`typescript\` \`^5.9\` en \`@types/node\` \`^22\`.

## Scripts

| Script | Wat het draait |
|--------|----------------|
| \`pnpm build\` | \`tsc -p tsconfig.json\` |
| \`pnpm start\` | build, daarna \`node dist/main.js\` |
| \`pnpm watch\` | alleen \`tsc -w\` |
| \`pnpm dev\` | \`node scripts/dev.mjs\` |
| \`pnpm desk\` | build, daarna \`node dist/desk-main.js\` (alleen dashboard-scaffold) |
| \`pnpm dev:desk\` | hetzelfde als \`desk\` |

\`--with-dashboard\` voegt ook \`@draeven/bridge\` \`^0.1.0\` toe. De gegenereerde \`main.ts\` leest \`DASHBOARD\`: \`embedded\` (standaard) start bot en UI, \`bridge\` start alleen de API, \`off\` is alleen de bot, en \`desk\` faalt en zegt dat je \`pnpm desk\` moet draaien. Variabelen en modi staan bij [Bridge en desk](/docs/bridge-desk).

## Waar commando's landen

\`--commands\` is standaard \`./src/commands\`. De config bewaart dat bronpad niet. Hij bewaart de gecompileerde spiegel:

| Je geeft mee | \`draeven.config.js\` krijgt |
|--------------|------------------------------|
| \`./src/commands\` (standaard) | \`./dist/commands\` |
| \`./src/slash\` | \`./dist/slash\` |
| \`src/slash\` | \`./dist/slash\` |
| een pad dat al \`dist\` bevat | dat pad, ongewijzigd |
| iets anders, zoals \`./lib/commands\` | \`./dist/commands\` |

\`--events\` is standaard \`./src/events\` en volgt dezelfde regels voor het gecompileerde pad (\`./src/events\` wordt \`./dist/events\`).

\`src/main.ts\` zet \`watch\` aan en laat \`events\` weg, zodat \`pnpm dev\` gecompileerde commando's en de events-map uit de config herlaadt zonder de gateway te sluiten ([Installatie](/docs/install)). \`later.ts\` houdt een inline \`press\`. \`letters.ts\` plaatst knoppen, en \`events/letters.ts\` beantwoordt ze met \`use()\`.

<Note>
Init vult gaten. Het voegt \`@draeven/bridge\` niet toe aan een \`package.json\` die al bestaat, en het herschrijft \`src/main.ts\` niet. Maak een nieuwe map als je de dashboard-bestanden wilt.
</Note>

## Valkuilen

- \`npm create draeven@latest my-bot\` is geen \`init\`. De CLI stopt met de usage-regel. Geef eerst \`init\` mee.
- Een commandopad buiten \`src/\` en \`dist/\` configureert toch \`./dist/commands\`. Geef \`./src/...\` mee als de bronmap afwijkt. \`--events\` gebruikt dezelfde terugval.
- De scaffold is ESM. Node 20 is de ondergrens in \`engines\`. Compileer hem niet naar CommonJS.
`,
    },
  },
  {
    slug: "command-meta",
    order: 26,
    en: {
      title: "Command metadata",
      description: "Every CommandMeta field, including the PermissionName list.",
      body: `
The last argument of \`command()\` is an optional \`CommandMeta\`. On \`userMenu()\` and \`messageMenu()\` that object is the argument **before** \`run\`. Registration fields are stored on the Discord command. Gates run in the process before your handler ([Permissions & gates](/docs/permissions)).

<DocTour id="command-meta" />

Omit a field to leave Draeven's or Discord's default. An empty object is not metadata. A misspelled key is not metadata either: \`isMeta\` only accepts the keys in the table below.

<Note>Aligned with @draeven/core **0.1.9**. Field names on this page match that release.</Note>

## Fields

| Field | Kind | What it does |
|-------|------|----------------|
| \`permissions\` | \`PermissionName\`, a list, a digit string, or \`bigint\` | Default member permissions stored on the command. A list ORs the bits. Discord then requires all of them. |
| <Explain topic="command-nsfw">\`nsfw\`</Explain> | \`boolean\` | \`true\` limits the command to age-restricted channels. \`false\` sends \`nsfw: false\`. Omit the key to leave it unset. |
| <Explain topic="command-places">\`places\`</Explain> | \`"guild"\`, \`"bot dm"\`, \`"private"\` | Discord contexts \`0\`, \`1\`, and \`2\`. Omit to keep Discord's default. |
| <Explain topic="command-install">\`install\`</Explain> | \`"guild"\`, \`"user"\` | Integration types \`0\` and \`1\`. Omit to keep Discord's default. |
| \`cooldown\` | number or \`{ seconds, scope?, private? }\` | In-memory wait before \`run\`. See [Cooldowns](/docs/cooldowns). |
| \`locales\` | record of Discord locale to \`{ name?, description? }\` | Registration strings, not \`say()\`. See [Locales](/docs/locales). |
| <Explain topic="command-need">\`need\`</Explain> | same type as \`permissions\` | Runtime gate. The member bitfield on the interaction must include every bit. |
| \`ownerOnly\` | \`boolean\` | Runtime gate. \`author.id\` must be the guild owner id. |
| \`when\` | \`(ctx) => boolean\` | Runtime gate. Return \`false\` to block. \`ctx\` has \`author\`, \`locale\`, and lookups, not \`reply\`. |
| <Explain topic="command-defer">\`defer\`</Explain> | \`true\` or \`{ private?: boolean }\` | Defer before the handler. \`true\` is public. \`{ private: true }\` is ephemeral. |
| \`autoDefer\` | \`boolean\` | \`false\` turns off the 2-second auto-defer for this command only. \`true\` does not override \`Start({ autoDefer: false })\`. |

\`hasPermissions\` treats the Administrator bit as a pass for \`need\`. Discord still has to put that bit on the interaction. \`permissionBitfield\` throws \`[Draeven] Unknown permission …\` for a name that is not in the list below. A string of digits is a raw bitfield.

## PermissionName

These are the only names. \`ManageEmojisAndStickers\` and \`ManageGuildExpressions\` are the same bit.

| Group | Names |
|-------|--------|
| Server | \`CreateInstantInvite\`, \`KickMembers\`, \`BanMembers\`, \`Administrator\`, \`ManageChannels\`, \`ManageGuild\`, \`ViewAuditLog\`, \`ViewGuildInsights\`, \`ManageWebhooks\`, \`ManageEmojisAndStickers\`, \`ManageGuildExpressions\`, \`ViewCreatorMonetizationAnalytics\` |
| Chat | \`ViewChannel\`, \`SendMessages\`, \`SendTTSMessages\`, \`ManageMessages\`, \`EmbedLinks\`, \`AttachFiles\`, \`ReadMessageHistory\`, \`MentionEveryone\`, \`AddReactions\`, \`UseExternalEmojis\`, \`UseExternalStickers\`, \`SendMessagesInThreads\`, \`SendVoiceMessages\`, \`SendPolls\`, \`UseExternalApps\` |
| Voice | \`Connect\`, \`Speak\`, \`Stream\`, \`PrioritySpeaker\`, \`MuteMembers\`, \`DeafenMembers\`, \`MoveMembers\`, \`UseVAD\`, \`RequestToSpeak\`, \`UseSoundboard\`, \`UseExternalSounds\`, \`UseEmbeddedActivities\` |
| People | \`ChangeNickname\`, \`ManageNicknames\`, \`ManageRoles\`, \`ModerateMembers\`, \`UseApplicationCommands\` |
| Threads and events | \`ManageThreads\`, \`CreatePublicThreads\`, \`CreatePrivateThreads\`, \`ManageEvents\`, \`CreateEvents\`, \`CreateGuildExpressions\` |

## places, install, and nsfw

\`\`\`js
import { command } from "@draeven/core";

export const guildOnly = command(
  "guild-only",
  "Servers only",
  async (ctx) => ctx.reply("guild"),
  { places: ["guild"], install: ["guild"] }
);

export const anywhere = command(
  "anywhere",
  "Guilds, the bot DM, and other private contexts",
  async (ctx) => ctx.reply("ok"),
  { places: ["guild", "bot dm", "private"], install: ["guild", "user"] }
);

export const ageGated = command(
  "age-gated",
  "Age-restricted channels only",
  async (ctx) => ctx.reply("ok"),
  { nsfw: true, places: ["guild"] }
);
\`\`\`

\`"bot dm"\` is the bot's own DM. The space is part of the string. \`"private"\` is the other private context (a group DM, or a user-install DM that is not the bot DM). \`"guild"\` on \`install\` is a server install. \`"user"\` is a user install. An unknown place throws \`A place is guild, bot dm, or private.\` An unknown install target throws \`An install target is guild or user.\`

## defer and autoDefer

\`\`\`js
export const quiet = command(
  "quiet",
  "Ack first, privately",
  async (ctx) => {
    const guild = ctx.getGuild();
    return ctx.reply(guild ? guild.name : "dm");
  },
  {
    defer: { private: true },
    autoDefer: false,
    locales: {
      nl: { name: "stil", description: "Eerst bevestigen, privé" },
    },
    cooldown: 5,
    need: "SendMessages",
    when: (ctx) => Boolean(ctx.getGuild()),
  }
);
\`\`\`

A localized \`name\` is 1–32 characters: lowercase letters, numbers, hyphens. A localized \`description\` is 1–100 characters. Locale keys look like \`nl\` or \`nl-NL\`.

<Warn fix="Set autoDefer: false and reply with form() first." href="/docs/why-failing">
A form has to be the first acknowledgement. \`defer\`, and an auto-defer that already fired, both consume the token. Set \`autoDefer: false\` on a command that opens a \`form()\`, and do not set \`defer\`.
</Warn>

## Pitfalls

- \`permissions\` is not \`need\`. An admin can still invoke a command Discord would have hidden. \`need\` is the check you run.
- \`need\`, \`ownerOnly\`, \`when\`, and \`cooldown\` belong on the parent \`command()\`, not on \`sub()\`.
- \`places: []\` sends an empty context list. Omit \`places\` when you want Discord's default.
- \`ownerOnly\` fails in a DM: there is no guild owner id on that interaction.
`,
    },
    nl: {
      title: "Commando-metadata",
      description: "Elk CommandMeta-veld, inclusief de PermissionName-lijst.",
      body: `
Het laatste argument van \`command()\` is een optionele \`CommandMeta\`. Bij \`userMenu()\` en \`messageMenu()\` staat dat object **vóór** \`run\`. Registratievelden gaan naar het Discord-commando. Gates draaien in het proces vóór je handler ([Rechten & gates](/docs/permissions)).

<DocTour id="command-meta" />

Laat een veld weg om de standaard van Draeven of Discord te houden. Een leeg object is geen metadata. Een verkeerd gespelde sleutel ook niet: \`isMeta\` accepteert alleen de sleutels in de tabel hieronder.

<Note>Afgestemd op @draeven/core **0.1.9**. Veldnamen op deze pagina horen bij die release.</Note>

## Velden

| Veld | Soort | Wat het doet |
|------|-------|----------------|
| \`permissions\` | \`PermissionName\`, een lijst, een cijferstring of \`bigint\` | Standaard lid-rechten op het commando. Een lijst OR't de bits. Discord eist daarna alle bits. |
| <Explain topic="command-nsfw">\`nsfw\`</Explain> | \`boolean\` | \`true\` beperkt het commando tot leeftijdsbegrensde kanalen. \`false\` stuurt \`nsfw: false\`. Laat de sleutel weg om hem niet te zetten. |
| <Explain topic="command-places">\`places\`</Explain> | \`"guild"\`, \`"bot dm"\`, \`"private"\` | Discord-contexts \`0\`, \`1\` en \`2\`. Weglaten houdt de standaard van Discord. |
| <Explain topic="command-install">\`install\`</Explain> | \`"guild"\`, \`"user"\` | Integratietypes \`0\` en \`1\`. Weglaten houdt de standaard van Discord. |
| \`cooldown\` | getal of \`{ seconds, scope?, private? }\` | Wachttijd in het geheugen vóór \`run\`. Zie [Wachttijden](/docs/cooldowns). |
| \`locales\` | record van Discord-locale naar \`{ name?, description? }\` | Registratieteksten, niet \`say()\`. Zie [Taalvarianten](/docs/locales). |
| <Explain topic="command-need">\`need\`</Explain> | hetzelfde type als \`permissions\` | Runtime-gate. Het bitveld van het lid op de interactie moet elke bit bevatten. |
| \`ownerOnly\` | \`boolean\` | Runtime-gate. \`author.id\` moet de guild-owner-id zijn. |
| \`when\` | \`(ctx) => boolean\` | Runtime-gate. Geef \`false\` terug om te blokkeren. \`ctx\` heeft \`author\`, \`locale\` en lookups, geen \`reply\`. |
| <Explain topic="command-defer">\`defer\`</Explain> | \`true\` of \`{ private?: boolean }\` | Defer vóór de handler. \`true\` is publiek. \`{ private: true }\` is efemeer. |
| \`autoDefer\` | \`boolean\` | \`false\` zet de auto-defer van 2 seconden uit voor dit commando alleen. \`true\` overschrijft \`Start({ autoDefer: false })\` niet. |

\`hasPermissions\` behandelt de Administrator-bit als een pass voor \`need\`. Discord moet die bit wel op de interactie zetten. \`permissionBitfield\` geeft de fout \`[Draeven] Unknown permission …\` voor een naam die niet in de lijst hieronder staat. Een string van cijfers is een ruw bitveld.

## PermissionName

Dit zijn de enige namen. \`ManageEmojisAndStickers\` en \`ManageGuildExpressions\` zijn dezelfde bit.

| Groep | Namen |
|-------|--------|
| Server | \`CreateInstantInvite\`, \`KickMembers\`, \`BanMembers\`, \`Administrator\`, \`ManageChannels\`, \`ManageGuild\`, \`ViewAuditLog\`, \`ViewGuildInsights\`, \`ManageWebhooks\`, \`ManageEmojisAndStickers\`, \`ManageGuildExpressions\`, \`ViewCreatorMonetizationAnalytics\` |
| Chat | \`ViewChannel\`, \`SendMessages\`, \`SendTTSMessages\`, \`ManageMessages\`, \`EmbedLinks\`, \`AttachFiles\`, \`ReadMessageHistory\`, \`MentionEveryone\`, \`AddReactions\`, \`UseExternalEmojis\`, \`UseExternalStickers\`, \`SendMessagesInThreads\`, \`SendVoiceMessages\`, \`SendPolls\`, \`UseExternalApps\` |
| Spraak | \`Connect\`, \`Speak\`, \`Stream\`, \`PrioritySpeaker\`, \`MuteMembers\`, \`DeafenMembers\`, \`MoveMembers\`, \`UseVAD\`, \`RequestToSpeak\`, \`UseSoundboard\`, \`UseExternalSounds\`, \`UseEmbeddedActivities\` |
| Mensen | \`ChangeNickname\`, \`ManageNicknames\`, \`ManageRoles\`, \`ModerateMembers\`, \`UseApplicationCommands\` |
| Threads en events | \`ManageThreads\`, \`CreatePublicThreads\`, \`CreatePrivateThreads\`, \`ManageEvents\`, \`CreateEvents\`, \`CreateGuildExpressions\` |

## places, install en nsfw

\`\`\`js
import { command } from "@draeven/core";

export const guildOnly = command(
  "guild-only",
  "Alleen servers",
  async (ctx) => ctx.reply("guild"),
  { places: ["guild"], install: ["guild"] }
);

export const anywhere = command(
  "anywhere",
  "Guilds, de bot-DM en andere privécontexten",
  async (ctx) => ctx.reply("ok"),
  { places: ["guild", "bot dm", "private"], install: ["guild", "user"] }
);

export const ageGated = command(
  "age-gated",
  "Alleen leeftijdsbegrensde kanalen",
  async (ctx) => ctx.reply("ok"),
  { nsfw: true, places: ["guild"] }
);
\`\`\`

\`"bot dm"\` is de eigen DM van de bot. De spatie hoort bij de string. \`"private"\` is de andere privécontext (een groeps-DM, of een user-install-DM die niet de bot-DM is). \`"guild"\` op \`install\` is een serverinstallatie. \`"user"\` is een gebruikersinstallatie. Een onbekende place geeft de fout \`A place is guild, bot dm, or private.\` Een onbekend install-doel geeft de fout \`An install target is guild or user.\`

## defer en autoDefer

\`\`\`js
export const quiet = command(
  "quiet",
  "Eerst bevestigen, privé",
  async (ctx) => {
    const guild = ctx.getGuild();
    return ctx.reply(guild ? guild.name : "dm");
  },
  {
    defer: { private: true },
    autoDefer: false,
    locales: {
      nl: { name: "stil", description: "Eerst bevestigen, privé" },
    },
    cooldown: 5,
    need: "SendMessages",
    when: (ctx) => Boolean(ctx.getGuild()),
  }
);
\`\`\`

Een gelokaliseerde \`name\` is 1–32 tekens: kleine letters, cijfers, koppeltekens. Een gelokaliseerde \`description\` is 1–100 tekens. Locale-sleutels zien eruit als \`nl\` of \`nl-NL\`.

<Warn fix="Zet autoDefer: false en antwoord eerst met form()." href="/docs/why-failing">
Een formulier moet de eerste bevestiging zijn. \`defer\`, en een auto-defer die al is afgegaan, verbruiken allebei het token. Zet \`autoDefer: false\` op een commando dat een \`form()\` opent, en zet geen \`defer\`.
</Warn>

## Valkuilen

- \`permissions\` is niet \`need\`. Een beheerder kan een commando nog aanroepen dat Discord verborgen zou hebben. \`need\` is de check die jij draait.
- \`need\`, \`ownerOnly\`, \`when\` en \`cooldown\` horen op de parent \`command()\`, niet op \`sub()\`.
- \`places: []\` stuurt een lege contextlijst. Laat \`places\` weg als je de standaard van Discord wilt.
- \`ownerOnly\` faalt in een DM: er is geen guild-owner-id op die interactie.
`,
    },
  },
  ...rest,
];
