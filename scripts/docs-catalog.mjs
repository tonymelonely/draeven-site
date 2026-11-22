import { gaps } from "./docs-catalog-gaps.mjs";
import { more } from "./docs-catalog-gaps-more.mjs";
import { extras } from "./docs-catalog-extras.mjs";

/** @type {ReadonlyArray<{ slug: string; order: number; en: { title: string; description: string; body: string }; nl: { title: string; description: string; body: string } }>} */
export const catalog = [
  {
    slug: "welcome",
    order: 1,
    en: {
      title: "Welcome",
      description: "What Draeven is, and how a bot is put together.",
      body: `
Draeven is a Discord bot framework written from scratch. You describe slash commands with \`command()\`, start the gateway with \`Start()\`, and answer from one \`ctx\` (\`reply\`, \`edit\`, \`wait\`, \`followup\`, \`collect\`).

Use it when you want a small, typed command layer. It is not discord.js: there is no \`Client\`, no \`EmbedBuilder\`, and no shared plugin ecosystem.

<FiveMinPath />

Examples across the docs reuse the same shapes: \`/ping\` → \`pong\`, and \`/greet\` when options appear. Starter bots (mod, ticket, welcome) live on [Starter bots](/docs/starters).

The path from \`Start()\` to a reply is [How it fits](/docs/architecture). Names you already know from discord.js are on [From discord.js](/docs/from-discordjs). When a command or event misbehaves, open [Why is this failing?](/docs/why-failing) or [Troubleshooting](/docs/troubleshooting). Words like \`ctx\`, \`wait()\`, and \`leaf\` are in the [Glossary](/docs/glossary).

## What you get

- **One context.** Options, lookups, replies, collectors, and moderation helpers sit on \`ctx\`.
- **Declarative commands.** Export \`command()\`, \`userMenu()\`, or \`messageMenu()\` from a file. Draeven registers them.
- **Stay connected while you edit.** \`Start({ watch: true })\` reloads compiled commands without dropping the gateway.
- **Test the handler offline.** \`simulate()\` runs a command with no token.

<Note>
Draeven talks to Discord through \`@draeven/discord\` (gateway and REST). You normally install only \`@draeven/core\`.
</Note>

## Packages

| Package | Role |
|---------|------|
| \`@draeven/core\` | \`Start\`, \`command\`, collectors, \`embed\`, \`layout\`, \`poll\`, \`guard\` |
| \`@draeven/discord\` | Gateway session. Core depends on it. |
| \`@draeven/bridge\` | Optional owner desk for *your* process |
| \`create-draeven\` | \`npm create draeven@latest\` |

The open-source box is the framework plus an optional owner desk. A hosted guild dashboard is a separate product and is not included.

## How a command runs

\`loadCommands()\` reads compiled files, Discord stores the application commands, and a slash run arrives as one \`ctx\`.

\`\`\`text
 dist/commands/*.js
        │
        ▼
 loadCommands() ──► Discord application commands
        │
 user runs /cmd
        ▼
 gateway interaction ──► ctx (options, reply, collect, …)
        │
        ├── reply / wait+edit
        ├── collect (buttons/menus/forms)
        └── followup / send
\`\`\`

Commands must be **compiled JavaScript**. Point \`draeven.config.js\` at \`./dist/commands\`, not at TypeScript sources. Discord also gives you about **3 seconds** to acknowledge an interaction. Draeven auto-defers at 2 seconds unless you turn that off ([Replies](/docs/replies)). The hard constraints are on [Rules of thumb](/docs/rules).
`,
    },
    nl: {
      title: "Welkom",
      description: "Wat Draeven is, en hoe een bot in elkaar zit.",
      body: `
Draeven is een Discord-botframework dat vanaf nul is gebouwd. Je beschrijft slash-commando's met \`command()\`, start de gateway met \`Start()\`, en antwoordt vanuit één \`ctx\` (\`reply\`, \`edit\`, \`wait\`, \`followup\`, \`collect\`).

Gebruik het als je een kleine, getypeerde commandolaag wilt. Het is geen discord.js: geen \`Client\`, geen \`EmbedBuilder\`, en geen gedeeld plugin-ecosysteem.

<FiveMinPath />

Voorbeelden in de docs hergebruiken dezelfde vormen: \`/ping\` → \`pong\`, en \`/greet\` als er opties zijn. Starter-bots (mod, ticket, welkom) staan op [Starter-bots](/docs/starters).

Het pad van \`Start()\` naar een antwoord is [Hoe het in elkaar zit](/docs/architecture). Namen die je al kent uit discord.js staan op [Vanuit discord.js](/docs/from-discordjs). Als een commando of event dwarszit, open [Waarom faalt dit?](/docs/why-failing) of [Problemen oplossen](/docs/troubleshooting). Woorden als \`ctx\`, \`wait()\` en \`leaf\` staan in het [Glossarium](/docs/glossary).

## Wat je krijgt

- **Eén context.** Opties, lookups, antwoorden, verzamelaars en moderatiehelpers zitten op \`ctx\`.
- **Declaratieve commando's.** Exporteer \`command()\`, \`userMenu()\` of \`messageMenu()\`. Draeven registreert ze.
- **Verbonden blijven tijdens het bewerken.** \`Start({ watch: true })\` herlaadt gecompileerde commando's zonder de gateway te sluiten.
- **De handler offline testen.** \`simulate()\` draait een commando zonder token.

<Note>
Draeven praat met Discord via \`@draeven/discord\` (gateway en REST). Je installeert normaal alleen \`@draeven/core\`.
</Note>

## Packages

| Package | Rol |
|---------|-----|
| \`@draeven/core\` | \`Start\`, \`command\`, verzamelaars, \`embed\`, \`layout\`, \`poll\`, \`guard\` |
| \`@draeven/discord\` | Gateway-sessie. Core hangt ervan af. |
| \`@draeven/bridge\` | Optionele owner-desk voor *jouw* proces |
| \`create-draeven\` | \`npm create draeven@latest\` |

De open-source doos is het framework plus een optionele owner-desk. Een gehost guild-dashboard is een apart product en zit er niet bij.

## Hoe een commando loopt

\`loadCommands()\` leest gecompileerde bestanden, Discord bewaart de applicatiecommando's, en een slash-aanroep komt binnen als één \`ctx\`.

\`\`\`text
 dist/commands/*.js
        │
        ▼
 loadCommands() ──► Discord application commands
        │
 user runs /cmd
        ▼
 gateway interaction ──► ctx (options, reply, collect, …)
        │
        ├── reply / wait+edit
        ├── collect (buttons/menus/forms)
        └── followup / send
\`\`\`

Commando's moeten **gecompileerde JavaScript** zijn. Wijs \`draeven.config.js\` naar \`./dist/commands\`, niet naar TypeScript-bronnen. Discord geeft je ongeveer **3 seconden** om een interactie te bevestigen. Draeven doet standaard na 2 seconden een auto-defer, tenzij je dat uitzet ([Antwoorden](/docs/replies)). De harde regels staan bij [Vuistregels](/docs/rules).
`,
    },
  },
  {
    slug: "install",
    order: 2,
    en: {
      title: "Install",
      description: "Node 20, the scaffold, and a manual install.",
      body: `
Install Draeven when you are starting a bot or adding the framework to an existing Node project. You need **Node.js 20+** (ESM and \`node:fs\` watch). A bot token comes later ([Creating an app](/docs/creating-app)).

## Scaffold

\`create-draeven\` writes \`draeven.config.js\`, \`src/main.ts\`, a \`ping\` command, and the scripts below.

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
pnpm install
pnpm build
pnpm start
\`\`\`

| Script | What it runs |
|--------|----------------|
| \`pnpm build\` | \`tsc -p tsconfig.json\` |
| \`pnpm start\` | build, then \`node dist/main.js\` |
| \`pnpm watch\` | \`tsc -w\` only |
| \`pnpm dev\` | one build, then \`tsc -w\` plus the bot |

### Owner desk

\`\`\`bash
npm create draeven@latest -- init my-bot --with-dashboard
\`\`\`

That adds \`@draeven/bridge\`, \`pnpm desk\`, and desk env vars. See [Bridge & desk](/docs/bridge-desk).

### Commands folder

\`\`\`bash
npm create draeven@latest -- init my-bot --commands ./src/slash
\`\`\`

The config still points at the compiled \`dist/\` mirror of that path. Flags, the file list, and the \`init\` argument are on [create-draeven CLI](/docs/create-cli).

## Add core yourself

\`\`\`bash
pnpm add @draeven/core
\`\`\`

You do not install \`@draeven/discord\` separately. Add \`@draeven/bridge\` only for the desk.

## Check the version

\`\`\`bash
node -e "import('@draeven/core').then(m => console.log('Draeven core', m.version))"
\`\`\`

Core **0.1.9** is the version these guides describe. Pin it in production. The API is still beta.

<Warn fix="Point commands (and events) at dist/ after tsc." href="/docs/why-failing">
\`Start()\` loads \`.js\` from the commands folder. Pointing \`draeven.config.js\` at \`./src/commands\` before \`tsc\` fails.
</Warn>

## Pitfalls

- On Windows, \`alone: "ask"\` needs a real TTY. In CI set \`alone: false\` or \`alone: true\` ([One process](/docs/alone)).
- Scaffolds are ESM. Do not compile to CommonJS.

## Related

- [Project layout](/docs/project-layout) · [Quickstart](/docs/quickstart)
`,
    },
    nl: {
      title: "Installatie",
      description: "Node 20, de scaffold en een handmatige installatie.",
      body: `
Installeer Draeven als je een bot start of het framework aan een bestaand Node-project toevoegt. Je hebt **Node.js 20+** nodig (ESM en \`node:fs\` watch). Het bot-token komt later ([App aanmaken](/docs/creating-app)).

## Scaffold

\`create-draeven\` schrijft \`draeven.config.js\`, \`src/main.ts\`, een \`ping\`-commando en de scripts hieronder.

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
pnpm install
pnpm build
pnpm start
\`\`\`

| Script | Wat het doet |
|--------|----------------|
| \`pnpm build\` | \`tsc -p tsconfig.json\` |
| \`pnpm start\` | build, daarna \`node dist/main.js\` |
| \`pnpm watch\` | alleen \`tsc -w\` |
| \`pnpm dev\` | één build, daarna \`tsc -w\` plus de bot |

### Owner-desk

\`\`\`bash
npm create draeven@latest -- init my-bot --with-dashboard
\`\`\`

Dat voegt \`@draeven/bridge\`, \`pnpm desk\` en desk-variabelen toe. Zie [Bridge en desk](/docs/bridge-desk).

### Commando-map

\`\`\`bash
npm create draeven@latest -- init my-bot --commands ./src/slash
\`\`\`

De config wijst nog steeds naar de gecompileerde \`dist/\`-spiegel van dat pad. Vlaggen, de bestandslijst en het \`init\`-argument staan bij [create-draeven CLI](/docs/create-cli).

## Core zelf toevoegen

\`\`\`bash
pnpm add @draeven/core
\`\`\`

\`@draeven/discord\` installeer je niet apart. \`@draeven/bridge\` alleen voor de desk.

## Versie controleren

\`\`\`bash
node -e "import('@draeven/core').then(m => console.log('Draeven core', m.version))"
\`\`\`

Deze gidsen beschrijven core **0.1.9**. Pin die versie in productie. De API is nog beta.

<Warn fix="Wijs commands (en events) na tsc naar dist/." href="/docs/why-failing">
\`Start()\` laadt \`.js\` uit de commando-map. \`draeven.config.js\` naar \`./src/commands\` wijzen vóór \`tsc\` mislukt.
</Warn>

## Valkuilen

- Op Windows heeft \`alone: "ask"\` een echte TTY nodig. In CI zet je \`alone: false\` of \`alone: true\` ([Één proces](/docs/alone)).
- Scaffolds zijn ESM. Niet naar CommonJS compileren.

## Verder

- [Projectstructuur](/docs/project-layout) · [Snelstart](/docs/quickstart)
`,
    },
  },
  {
    slug: "creating-app",
    order: 4,
    en: {
      title: "Creating an app",
      description: "Portal token, invite URL, guild id, and intents.",
      body: `
Create a Discord application before \`Start()\` can log in. You need a bot token, an invite that includes slash commands, and — while you are iterating — one guild id so command updates show up immediately.

## Create the application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications).
2. **New Application**, pick a name, **Create**.
3. **Bot** → **Reset Token**. Store it as \`DISCORD_TOKEN\` in \`.env\`.

Never commit the token. The scaffold gitignores \`.env\`.

## Invite the bot

**OAuth2 → URL Generator**:

- Scopes: \`bot\` and \`applications.commands\`. Both are required for slash commands.
- Bot permissions: only what the commands use. A typical dev bot needs Send Messages, Read Message History, Embed Links, and Use Application Commands. Moderation also needs Kick Members, Ban Members, Moderate Members, or Manage Messages.

Open the URL, pick a server, and authorize.

## Guild id for fast sync

Global commands can take up to about an hour to propagate. During development, register to one guild:

1. Turn on **Developer Mode** (User Settings → Advanced).
2. Right-click the server → **Copy Server ID**.
3. Set \`DISCORD_GUILD_ID\` and pass it as \`guildId\` to \`Start()\`.

\`\`\`bash
DISCORD_TOKEN=...
DISCORD_GUILD_ID=123456789012345678
\`\`\`

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("ready"),
});
\`\`\`

Omit \`guildId\` only when you are ready for a global rollout.

## Privileged intents

Enable a privileged intent in the **Bot** tab only when a handler needs it. Portal and code must match. Portal off means Discord will not deliver the events. Omit \`intents\` and the bitmask is \`0\`. Discord does not dispatch those gateway events. You do not get empty payloads.

| Portal toggle | \`intentBits\` name | Typical events |
|---------------|---------------------|----------------|
| Server Members Intent | \`guildMembers\` | \`memberJoin\`, \`memberLeave\`, \`memberUpdate\` |
| Message Content Intent | \`messageContent\` | \`message\`, \`messageEdit\` (with \`content\`) |
| Presence Intent | \`guildPresences\` | \`presenceUpdate\` |

\`intentsFor("memberJoin", "message")\` turns on \`guildMembers\`, \`guildMessages\`, \`directMessages\`, and \`messageContent\` for you. Prefer that over hand-written bitfields ([Events & intents](/docs/events-intents)).

<Tip>
Keep the first bot private to a test guild. You can decide public install contexts (\`install\` / \`places\` on a command) after the happy path works.
</Tip>

## Pitfalls

- A token reset invalidates the old one immediately. Update \`.env\` and restart.
- Invite scopes without \`applications.commands\` produce a bot that cannot register slash commands.
- \`ready\` needs no intent bits. \`intentsFor("ready")\` is \`0\`, which is valid for a slash-only bot.

## Related

- [Quickstart](/docs/quickstart) · [Permissions](/docs/permissions) · [Known limits](/docs/known-limits)
`,
    },
    nl: {
      title: "App aanmaken",
      description: "Portaal-token, uitnodigings-URL, guild-id en intents.",
      body: `
Maak een Discord-applicatie voordat \`Start()\` kan inloggen. Je hebt een bot-token nodig, een uitnodiging die slash-commando's toestaat, en — zolang je itereert — één guild-id zodat commando-updates meteen zichtbaar zijn.

## Applicatie maken

1. Open het [Discord Developer Portal](https://discord.com/developers/applications).
2. **New Application**, kies een naam, **Create**.
3. **Bot** → **Reset Token**. Zet het in \`.env\` als \`DISCORD_TOKEN\`.

Commit het token nooit. De scaffold zet \`.env\` in \`.gitignore\`.

## Bot uitnodigen

**OAuth2 → URL Generator**:

- Scopes: \`bot\` en \`applications.commands\`. Beide zijn nodig voor slash-commando's.
- Bot-rechten: alleen wat de commando's gebruiken. Een typische dev-bot heeft Send Messages, Read Message History, Embed Links en Use Application Commands nodig. Moderatie vraagt ook Kick Members, Ban Members, Moderate Members of Manage Messages.

Open de URL, kies een server en autoriseer.

## Guild-id voor snelle sync

Globale commando's kunnen ongeveer een uur nodig hebben. Tijdens ontwikkeling registreer je op één guild:

1. Zet **Developer Mode** aan (User Settings → Advanced).
2. Rechtermuisklik op de server → **Copy Server ID**.
3. Zet \`DISCORD_GUILD_ID\` en geef die als \`guildId\` aan \`Start()\`.

\`\`\`bash
DISCORD_TOKEN=...
DISCORD_GUILD_ID=123456789012345678
\`\`\`

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("ready"),
});
\`\`\`

Laat \`guildId\` alleen weg als je bewust globaal wilt publiceren.

## Privileged intents

Zet een privileged intent op het tabblad **Bot** alleen aan als een handler hem nodig heeft. Portaal en code moeten overeenkomen. Portaal uit betekent dat Discord de events niet levert. Laat je \`intents\` weg, dan is het bitmasker \`0\`. Discord verstuurt die gateway-events niet. Je krijgt geen lege payloads.

| Portaal | \`intentBits\`-naam | Typische events |
|---------|---------------------|-----------------|
| Server Members Intent | \`guildMembers\` | \`memberJoin\`, \`memberLeave\`, \`memberUpdate\` |
| Message Content Intent | \`messageContent\` | \`message\`, \`messageEdit\` (met \`content\`) |
| Presence Intent | \`guildPresences\` | \`presenceUpdate\` |

\`intentsFor("memberJoin", "message")\` zet \`guildMembers\`, \`guildMessages\`, \`directMessages\` en \`messageContent\` voor je aan. Liever dat dan een bitveld met de hand ([Events en intents](/docs/events-intents)).

<Tip>
Houd de eerste bot privé op een testguild. Installatiecontexten (\`install\` / \`places\` op een commando) kun je later vastleggen.
</Tip>

## Valkuilen

- Een token-reset maakt het oude token meteen ongeldig. Werk \`.env\` bij en herstart.
- Een uitnodiging zonder \`applications.commands\` levert een bot die geen slash-commando's kan registreren.
- \`ready\` heeft geen intent-bits. \`intentsFor("ready")\` is \`0\`, en dat is geldig voor een bot die alleen slash-commando's gebruikt.

## Verder

- [Snelstart](/docs/quickstart) · [Rechten](/docs/permissions) · [Bekende limieten](/docs/known-limits)
`,
    },
  },
  {
    slug: "quickstart",
    order: 5,
    en: {
      title: "Quickstart",
      description: "A bot that answers /ping.",
      body: `
This page gets a scaffolded bot online and adds one command with an option. Do this after you have a token and, for fast updates, a guild id ([Creating an app](/docs/creating-app)).

## Run the scaffold

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
cp .env.example .env
# DISCORD_TOKEN=...
# DISCORD_GUILD_ID=...
pnpm install
pnpm start
\`\`\`

In Discord, run **/ping**. The sample command replies \`pong\`.

\`pnpm start\` runs \`tsc\`, then \`node dist/main.js\`. \`src/main.ts\` calls \`Start()\`. \`draeven.config.js\` points at \`./dist/commands\`.

## Minimal Start

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("ready"),
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
});

console.log(\`Ready — \${bot.commands.length} command(s) loaded.\`);
\`\`\`

\`watch: true\` reloads the commands folder when \`dist/\` changes. \`watch: true\` with an in-memory \`commands: [...]\` throws \`[Draeven] watch: true needs commands from a folder path or draeven.config.\`

## Development loop

\`\`\`bash
pnpm dev
\`\`\`

That builds once, then runs \`tsc -w\` beside the bot. Edit \`src/commands\`, save, and the new \`.js\` is picked up while the gateway stays up ([Hot-reload & guard](/docs/hot-reload-guard)).

## A command with an option

\`\`\`js
import { command, text } from "@draeven/core";

export const echo = command(
  "echo",
  "Repeat your text",
  { line: text("Say what?").required() },
  async (ctx) => ctx.reply(ctx.line)
);
\`\`\`

Put the file in \`src/commands\`, let the watcher compile it, and run \`/echo\` in the guild you registered.

<Tip>
\`text()\` is optional until you call \`.required()\`. The question string is the description Discord shows (1–100 characters). The object key \`line\` is the name you read as \`ctx.line\`.
</Tip>

## Before you share the bot

- Token only in \`.env\`.
- \`guildId\` set while you are still editing commands.
- Intents matched to any [events](/docs/events-intents) you add.
- \`need\` or \`cooldown\` on anything destructive ([Permissions](/docs/permissions), [Cooldowns](/docs/cooldowns)).

## Pitfalls

- \`/ping\` missing after a restart usually means the guild id changed, or you registered globally and Discord has not propagated yet.
- A command name must match \`^[a-z0-9-]{1,32}$\`. \`Echo\` and spaces are rejected at registration.

## Related

- [Commands](/docs/commands) · [Options](/docs/options) · [Project layout](/docs/project-layout)
`,
    },
    nl: {
      title: "Snelstart",
      description: "Een bot die /ping beantwoordt.",
      body: `
Deze pagina zet een scaffold-bot online en voegt één commando met een optie toe. Doe dit nadat je een token hebt en, voor snelle updates, een guild-id ([App aanmaken](/docs/creating-app)).

## Scaffold draaien

\`\`\`bash
npm create draeven@latest -- init my-bot
cd my-bot
cp .env.example .env
# DISCORD_TOKEN=...
# DISCORD_GUILD_ID=...
pnpm install
pnpm start
\`\`\`

Voer in Discord **/ping** uit. Het voorbeeldantwoord is \`pong\`.

\`pnpm start\` draait \`tsc\` en daarna \`node dist/main.js\`. \`src/main.ts\` roept \`Start()\` aan. \`draeven.config.js\` wijst naar \`./dist/commands\`.

## Minimale Start

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("ready"),
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
});

console.log(\`Klaar — \${bot.commands.length} commando('s) geladen.\`);
\`\`\`

\`watch: true\` herlaadt de commando-map als \`dist/\` verandert. \`watch: true\` met een array \`commands: [...]\` in het geheugen gooit \`[Draeven] watch: true needs commands from a folder path or draeven.config.\`

## Ontwikkel-loop

\`\`\`bash
pnpm dev
\`\`\`

Dat bouwt één keer en draait daarna \`tsc -w\` naast de bot. Bewerk \`src/commands\`, sla op, en de nieuwe \`.js\` wordt opgepakt terwijl de gateway open blijft ([Hot-reload en guard](/docs/hot-reload-guard)).

## Een commando met een optie

\`\`\`js
import { command, text } from "@draeven/core";

export const echo = command(
  "echo",
  "Herhaal je tekst",
  { line: text("Wat zeg je?").required() },
  async (ctx) => ctx.reply(ctx.line)
);
\`\`\`

Zet het bestand in \`src/commands\`, laat de watcher compileren, en voer \`/echo\` uit in de guild waarop je registreerde.

<Tip>
\`text()\` is optioneel tot je \`.required()\` aanroept. De vraag is de beschrijving die Discord toont (1–100 tekens). De sleutel \`line\` is de naam die je als \`ctx.line\` leest.
</Tip>

## Voordat je de bot deelt

- Token alleen in \`.env\`.
- \`guildId\` aan zolang je commando's nog wijzigt.
- Intents gelijk aan de [events](/docs/events-intents) die je toevoegt.
- \`need\` of \`cooldown\` op alles wat schade kan doen ([Rechten](/docs/permissions), [Wachttijden](/docs/cooldowns)).

## Valkuilen

- \`/ping\` ontbreekt na een herstart meestal omdat de guild-id veranderde, of omdat je globaal registreerde en Discord nog niet heeft doorgevoerd.
- Een commandonaam moet \`^[a-z0-9-]{1,32}$\` zijn. \`Echo\` en spaties worden bij registratie geweigerd.

## Verder

- [Commando's](/docs/commands) · [Opties](/docs/options) · [Projectstructuur](/docs/project-layout)
`,
    },
  },
  {
    slug: "project-layout",
    order: 6,
    en: {
      title: "Project layout",
      description: "Folders and files of a Draeven app — entry, commands, events, env, scripts.",
      body: `
A Draeven app is a small Node project: one \`Start()\` entry, a folder of compiled commands, an events folder, and a config file that points at those folders. Use this layout whether you scaffolded or added core by hand.

## Tree

\`\`\`text
my-bot/
  draeven.config.js     # or draeven.config.mjs
  package.json
  tsconfig.json
  src/
    main.ts             # Start()
    commands/
      ping.ts           # export const ping = command(...)
      later.ts          # inline press
    events/
      ready.ts          # export function ready
      letters.ts        # use()
  dist/                 # tsc output — this is what Draeven loads
  scripts/
    dev.mjs             # tsc -w + bot
  .env
  .env.example
\`\`\`

## draeven.config.js

\`\`\`js
export default {
  commands: "./dist/commands",
  events: "./dist/events",
};
\`\`\`

\`Start()\` calls \`readConfig()\` when you omit \`commands\`. The search walks from the working directory upward for \`draeven.config.js\` or \`draeven.config.mjs\`. With no file, the commands folder defaults to \`./commands\` next to the process. Omit \`events\` on \`Start\` and Draeven uses \`events\` from this file when that field is set. A missing \`events\` field loads no events folder.

You can also pass commands inline and skip the folder (hot reload will not see them):

\`\`\`js
import { Start } from "@draeven/core";
import { ping } from "./dist/commands/ping.js";

await Start({ token: process.env.DISCORD_TOKEN, commands: [ping] });
\`\`\`

A string or \`URL\` is a folder path, same as the config.

## What gets loaded

\`loadCommands()\` imports every \`.js\` file in the folder, skips tests (\`.test.js\`), names that end with \`old.js\` (so \`fold.js\` too, not only \`file.old.js\`), and dotfiles, and keeps every export for which \`isCommand()\` or \`isMenu()\` is true. A default export is loaded when it is a command or menu. Named exports stay easier to scan.

Duplicate slash names throw at startup. So do two user menus with the same name, and two message menus with the same name.

## src/main.ts

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  watch: process.env.NODE_ENV !== "production",
  intents: intentsFor("ready"),
});
\`\`\`

## Environment

| Variable | Purpose |
|----------|---------|
| \`DISCORD_TOKEN\` | Bot token. Required by your \`Start({ token })\` call. |
| \`DISCORD_GUILD_ID\` | Guild command sync while developing. |
| \`DASHBOARD\` | \`embedded\`, \`off\`, \`bridge\`, or \`desk\` when bridge is installed. |
| \`BRIDGE_URL\`, \`BRIDGE_SECRET\` | Desk process talking to the bot host. |

\`DASHBOARD\` is read by \`@draeven/bridge\`, not by \`Start()\`. See [Bridge & desk](/docs/bridge-desk).

## Optional events folder

Pass \`events: "./dist/events"\`, or set that path in \`draeven.config.js\` and omit \`events\` on \`Start\`. The folder loads two kinds of export:

- A function whose **name is an event name** (\`export function memberJoin...\`)
- A value built with \`use()\` — a durable button, menu, or form handler

The same \`watch: true\` flag reloads that folder ([Events & intents](/docs/events-intents), [Press & submit](/docs/press-handlers)).

<Note>
\`timeZone\` on \`Start\` is an IANA zone used when a transcript does not set its own. It does not change \`time()\` stamps inside embeds.
</Note>

## Pitfalls

- Editing \`src/commands/ping.ts\` does nothing until \`tsc\` writes \`dist/commands/ping.js\`.
- \`watch: true\` with \`commands: [ping]\` throws \`[Draeven] watch: true needs commands from a folder path or draeven.config.\` There is no folder to watch.

## Related

- [Start options](/docs/start-options) · [Commands](/docs/commands) · [Hot-reload & guard](/docs/hot-reload-guard)
`,
    },
    nl: {
      title: "Projectstructuur",
      description: "Mappen en bestanden van een Draeven-app — entry, commando's, events, env, scripts.",
      body: `
Een Draeven-app is een klein Node-project: één \`Start()\`-ingang, een map met gecompileerde commando's, een events-map, en een config die naar die mappen wijst. Gebruik deze indeling of je nu scaffoldde of core met de hand toevoegde.

## Boom

\`\`\`text
my-bot/
  draeven.config.js     # of draeven.config.mjs
  package.json
  tsconfig.json
  src/
    main.ts             # Start()
    commands/
      ping.ts
      later.ts          # inline press
    events/
      ready.ts          # export function ready
      letters.ts        # use()
  dist/                 # tsc-output — dit laadt Draeven
  scripts/
    dev.mjs
  .env
  .env.example
\`\`\`

## draeven.config.js

\`\`\`js
export default {
  commands: "./dist/commands",
  events: "./dist/events",
};
\`\`\`

\`Start()\` roept \`readConfig()\` aan als je \`commands\` weglaat. Gezocht wordt vanaf de werkmap omhoog naar \`draeven.config.js\` of \`draeven.config.mjs\`. Zonder bestand is de commandomap \`./commands\` naast het proces. Laat je \`events\` weg op \`Start\`, dan gebruikt Draeven \`events\` uit dit bestand als dat veld er staat. Zonder \`events\`-veld laadt er geen events-map.

Je kunt commando's ook inline geven (hot reload ziet ze dan niet):

\`\`\`js
import { Start } from "@draeven/core";
import { ping } from "./dist/commands/ping.js";

await Start({ token: process.env.DISCORD_TOKEN, commands: [ping] });
\`\`\`

Een string of \`URL\` is een mappad, net als de config.

## Wat wordt geladen

\`loadCommands()\` importeert elk \`.js\`-bestand, slaat tests (\`.test.js\`), namen die eindigen op \`old.js\` (dus ook \`fold.js\`, niet alleen \`file.old.js\`) en dotfiles over, en houdt elke export waarvoor \`isCommand()\` of \`isMenu()\` waar is. Een default export wordt geladen als het een commando of menu is. Named exports blijven overzichtelijker.

Dubbele slash-namen gooien bij het opstarten. Twee user-menu's met dezelfde naam ook, en twee berichtmenu's met dezelfde naam ook.

## src/main.ts

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  watch: process.env.NODE_ENV !== "production",
  intents: intentsFor("ready"),
});
\`\`\`

## Omgeving

| Variabele | Doel |
|-----------|------|
| \`DISCORD_TOKEN\` | Bot-token. Verplicht in jouw \`Start({ token })\`. |
| \`DISCORD_GUILD_ID\` | Guild-sync tijdens ontwikkeling. |
| \`DASHBOARD\` | \`embedded\`, \`off\`, \`bridge\` of \`desk\` als bridge geïnstalleerd is. |
| \`BRIDGE_URL\`, \`BRIDGE_SECRET\` | Desk-proces dat met de bot-host praat. |

\`DASHBOARD\` wordt gelezen door \`@draeven/bridge\`, niet door \`Start()\`. Zie [Bridge en desk](/docs/bridge-desk).

## Optionele events-map

Geef \`events: "./dist/events"\` mee, of zet dat pad in \`draeven.config.js\` en laat \`events\` weg op \`Start\`. De map laadt twee soorten exports:

- Een functie waarvan de **naam een eventnaam is** (\`export function memberJoin...\`)
- Een waarde gebouwd met \`use()\` — een duurzame knop-, menu- of formulierhandler

Dezelfde \`watch: true\` herlaadt die map ([Events en intents](/docs/events-intents), [Press & submit](/docs/press-handlers)).

<Note>
\`timeZone\` op \`Start\` is een IANA-zone voor een transcript dat er zelf geen zet. Het verandert \`time()\`-stempels in embeds niet.
</Note>

## Valkuilen

- \`src/commands/ping.ts\` bewerken doet niets tot \`tsc\` \`dist/commands/ping.js\` schrijft.
- \`watch: true\` met \`commands: [ping]\` gooit \`[Draeven] watch: true needs commands from a folder path or draeven.config.\` Er is geen map om te bekijken.

## Verder

- [Start-opties](/docs/start-options) · [Commando's](/docs/commands) · [Hot-reload en guard](/docs/hot-reload-guard)
`,
    },
  },
  {
    slug: "start-options",
    order: 7,
    en: {
      title: "Start options",
      description: "Every field Start() accepts.",
      body: `
\`Start()\` opens the gateway and answers interactions. <Explain topic="start-token">token</Explain> is required.

<DocTour id="start-options" />

## The call

\`\`\`js
import { Start, guard, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  timeZone: "Europe/Amsterdam",
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
  intents: intentsFor("ready", "message"),
  events: "./dist/events",
  watch: process.env.NODE_ENV !== "production",
  guard: guard({ via: "console", of: "all" }),
  alone: "ask",
  autoDefer: true,
});
\`\`\`

\`commands\` is omitted here, so Draeven reads \`draeven.config.js\` ([Config](/docs/config)). \`events\` is passed as a folder on this call, so the config \`events\` field is not used. Omit \`events\` as well when the file already points at \`./dist/events\`. \`bot\` is the [running handle](/docs/bot-handle): \`setPresence\`, \`send\`, \`stop\`, and \`syncState\`.

## Fields

| Field | What it does |
|-------|----------------|
| <Explain topic="start-token">\`token\`</Explain> | Bot token. Blank throws before the gateway opens. |
| <Explain topic="start-commands">\`commands\`</Explain> | An array of commands and menus, a folder path or \`URL\`, or omit to use \`draeven.config\`. |
| <Explain topic="start-guildId">\`guildId\`</Explain> | Snowflake (1–20 digits). Commands sync to that guild. Omit it and the next sync is global. Guild commands already registered stay in that server. |
| \`timeZone\` | IANA name, such as \`Europe/Amsterdam\`. Used when \`ctx.transcript()\` does not pass its own. |
| \`presence\` | Initial status and activity. See [Presence](/docs/presence). |
| <Explain topic="start-intents">\`intents\`</Explain> | Gateway bitmask. Omitted is \`0\`. \`intentsFor(...events)\` from event names, or \`intentBits(...names)\` from \`intents.*\`. |
| \`events\` | A handlers object, a folder of compiled modules, or omit to use \`events\` from \`draeven.config\` when that field is set. \`watch\` reloads a folder. An inline object does not load \`use()\`. |
| <Explain topic="start-watch">\`watch\`</Explain> | Default \`false\`. \`true\` reloads the commands folder and an events folder. An in-memory array throws. |
| \`guard\` | The object \`guard({...})\` returns. Keeps the process alive and logs failures. |
| <Explain topic="start-alone">\`alone\`</Explain> | Default \`"ask"\`. Also \`true\` or \`false\`. See [One process](/docs/alone). |
| <Explain topic="start-autoDefer">\`autoDefer\`</Explain> | Default **2000 ms**. \`false\` turns it off. A number is clamped to **500–2500** ms. |

Defaults when you omit them: \`intents\` \`0\`, \`watch\` \`false\`, \`alone\` \`"ask"\`, \`autoDefer\` \`2000\`.

## Commands and guild sync

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  commands: "./dist/commands",
  guildId: process.env.DISCORD_GUILD_ID,
});
\`\`\`

A string or \`URL\` is a folder, same as the \`commands\` path in config. An array (\`commands: [ping]\`) is the list in memory. That form is useful in a test. \`watch: true\` with that array throws. There is no folder.

Guild sync shows new commands in that server within seconds. A global sync (no \`guildId\`) can take up to an hour. Pass the guild id while you edit. Dropping it later registers the global list. Commands already registered on the guild stay there. Discord does not delete them. A non-snowflake throws at startup.

## Intents and events

\`intentsFor("memberJoin", "message")\` unions the bits those events need, including privileged intents Discord requires. \`intentBits("guilds", "guildMessages")\` ORs named flags when you already know the mask. Event handlers still need the bits their names list ([Events & intents](/docs/events-intents)).

\`events\` as an object is fixed for the process. That object does not load \`use()\`. \`events: "./dist/events"\` loads modules whose export names are the event names, plus \`use()\` handlers in those files. Omit \`events\` and Draeven uses the \`events\` path from \`draeven.config.js\` when the file sets one. \`watch: true\` reloads that folder when the files change.

## Auto-defer

Discord gives the handler about 3 seconds. The default <Explain topic="auto-defer">auto-defer</Explain> fires at 2 seconds so a slow \`await\` still acknowledges. \`autoDefer: 800\` defers sooner. Values under 500 become 500. Values over 2500 become 2500. \`autoDefer: false\` on \`Start\` disables it for every command. One command can still set \`autoDefer: false\` in its own metadata ([Replies](/docs/replies)).

<Note>
\`timeZone\` does not change \`time()\` stamps inside an embed. Those render in the reader's zone. The start zone is only the fallback for a transcript.
</Note>

## Pitfalls

- \`watch: true\` with \`commands: [ping]\` throws. There is no folder to watch.
- \`guard\` must be the value \`guard()\` returns. A plain \`{ via, of }\` throws.
- \`alone: "ask"\` does not prompt when stdin is not a TTY. A live sibling then throws unless you pass \`alone: true\`.
- A bad zone name (\`"Amsterdam"\`) throws at startup. Use \`Europe/Amsterdam\`.

## Related

- [Install](/docs/install) · [Project layout](/docs/project-layout) · [Events & intents](/docs/events-intents) · [Presence](/docs/presence) · [One process](/docs/alone) · [Hot-reload & guard](/docs/hot-reload-guard) · [Transcripts](/docs/transcript)
`,
    },
    nl: {
      title: "Start-opties",
      description: "Elk veld dat Start() aanneemt.",
      body: `
\`Start()\` opent de gateway en beantwoordt interacties. <Explain topic="start-token">token</Explain> is verplicht.

<DocTour id="start-options" />

## De aanroep

\`\`\`js
import { Start, guard, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  timeZone: "Europe/Amsterdam",
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
  intents: intentsFor("ready", "message"),
  events: "./dist/events",
  watch: process.env.NODE_ENV !== "production",
  guard: guard({ via: "console", of: "all" }),
  alone: "ask",
  autoDefer: true,
});
\`\`\`

\`commands\` staat hier niet, dus Draeven leest \`draeven.config.js\` ([Config](/docs/config)). \`events\` staat hier als map, dus het \`events\`-veld uit de config wordt niet gebruikt. Laat \`events\` ook weg als het bestand al naar \`./dist/events\` wijst. \`bot\` is het [lopende handvat](/docs/bot-handle): \`setPresence\`, \`send\`, \`stop\` en \`syncState\`.

## Velden

| Veld | Wat het doet |
|------|----------------|
| <Explain topic="start-token">\`token\`</Explain> | Bot-token. Een lege token gooit al vóór de gateway opent. |
| <Explain topic="start-commands">\`commands\`</Explain> | Een array van commando's en menu's, een mappad of \`URL\`, of weglaten voor \`draeven.config\`. |
| <Explain topic="start-guildId">\`guildId\`</Explain> | Snowflake (1–20 cijfers). Commando's synchroniseren naar die guild. Weglaten maakt de volgende sync globaal. Guild-commando's die al staan, blijven in die server. |
| \`timeZone\` | IANA-naam, zoals \`Europe/Amsterdam\`. Gebruikt als \`ctx.transcript()\` er zelf geen meegeeft. |
| \`presence\` | Beginstatus en activiteit. Zie [Presence](/docs/presence). |
| <Explain topic="start-intents">\`intents\`</Explain> | Bitmask voor de gateway. Weggelaten is \`0\`. \`intentsFor(...events)\` vanuit eventnamen, of \`intentBits(...names)\` vanuit \`intents.*\`. |
| \`events\` | Een handlers-object, een map met gecompileerde modules, of weglaten om \`events\` uit \`draeven.config\` te gebruiken als dat veld er staat. \`watch\` herlaadt een map. Een inline object laadt geen \`use()\`. |
| <Explain topic="start-watch">\`watch\`</Explain> | Standaard \`false\`. \`true\` herlaadt de commandomap en een events-map. Een array in het geheugen gooit. |
| \`guard\` | Het object dat \`guard({...})\` teruggeeft. Houdt het proces in leven en logt fouten. |
| <Explain topic="start-alone">\`alone\`</Explain> | Standaard \`"ask"\`. Ook \`true\` of \`false\`. Zie [Eén proces](/docs/alone). |
| <Explain topic="start-autoDefer">\`autoDefer\`</Explain> | Standaard **2000 ms**. \`false\` zet het uit. Een getal wordt geklemd op **500–2500** ms. |

Standaard als je ze weglaat: \`intents\` \`0\`, \`watch\` \`false\`, \`alone\` \`"ask"\`, \`autoDefer\` \`2000\`.

## Commando's en guild-sync

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  commands: "./dist/commands",
  guildId: process.env.DISCORD_GUILD_ID,
});
\`\`\`

Een string of \`URL\` is een map, net als het \`commands\`-pad in de config. Een array (\`commands: [ping]\`) is de lijst in het geheugen. Handig in een test. \`watch: true\` met die array gooit. Er is geen map.

Guild-sync toont nieuwe commando's binnen seconden in die server. Een globale sync (geen \`guildId\`) kan een uur duren. Geef de guild-id mee terwijl je bewerkt. Laat je hem later weg, dan registreert Draeven de globale lijst. Commando's die al op de guild staan, blijven daar. Discord verwijdert ze niet. Een id die geen snowflake is gooit bij het opstarten.

## Intents en events

\`intentsFor("memberJoin", "message")\` verenigt de bits die die events nodig hebben, inclusief geprivilegieerde intents die Discord eist. \`intentBits("guilds", "guildMessages")\` doet een OR van benoemde vlaggen als je het masker al kent. Event-handlers hebben nog steeds de bits van hun naam nodig ([Events en intents](/docs/events-intents)).

\`events\` als object staat vast voor het proces. Dat object laadt geen \`use()\`. \`events: "./dist/events"\` laadt modules waarvan de exportnaam de eventnaam is, plus \`use()\`-handlers in die bestanden. Laat je \`events\` weg, dan gebruikt Draeven het \`events\`-pad uit \`draeven.config.js\` als het bestand er een zet. \`watch: true\` herlaadt die map als de bestanden veranderen.

## Auto-defer

Discord geeft de handler ongeveer 3 seconden. De standaard <Explain topic="auto-defer">auto-defer</Explain> vuurt na 2 seconden, zodat een trage \`await\` alsnog bevestigt. \`autoDefer: 800\` defert eerder. Waarden onder 500 worden 500. Waarden boven 2500 worden 2500. \`autoDefer: false\` op \`Start\` zet het uit voor elk commando. Eén commando kan nog \`autoDefer: false\` in zijn eigen metadata zetten ([Antwoorden](/docs/replies)).

<Note>
\`timeZone\` verandert \`time()\`-stempels in een embed niet. Die renderen in de zone van de lezer. De startzone is alleen de terugval voor een transcript.
</Note>

## Valkuilen

- \`watch: true\` met \`commands: [ping]\` gooit. Er is geen map om te bekijken.
- \`guard\` moet de waarde zijn die \`guard()\` teruggeeft. Een kaal \`{ via, of }\` gooit.
- \`alone: "ask"\` vraagt niets als stdin geen TTY is. Een levende tweede instantie gooit dan, tenzij je \`alone: true\` meegeeft.
- Een foute zonenaam (\`"Amsterdam"\`) gooit bij het opstarten. Gebruik \`Europe/Amsterdam\`.

## Verder

- [Installatie](/docs/install) · [Projectstructuur](/docs/project-layout) · [Events en intents](/docs/events-intents) · [Presence](/docs/presence) · [Eén proces](/docs/alone) · [Hot-reload en guard](/docs/hot-reload-guard) · [Transcripten](/docs/transcript)
`,
    },
  },
  {
    slug: "recipes",
    order: 8,
    en: {
      title: "Recipes",
      description: "Copy-paste commands for common bot jobs.",
      body: `
Copy-paste command files for \`src/commands\`. Letters also needs a \`use()\` file in \`src/events\`.

<RecipeFiles />

## How to drop one in

1. Save as \`src/commands/<name>.ts\` (named \`export\`).
2. \`pnpm build\`, then start (\`watch: true\` reloads).

| Recipe | What it shows |
|--------|----------------|
| Ping | \`cooldown: 5\` per user |
| Confirm | \`button\` + \`ctx.collect\` |
| Letters | buttons with no \`press\`, \`use()\` in the events folder |
| Report | \`form\` + \`kind: "submit"\` |
| Status | \`embed()\` with \`header\`, \`fields\`, \`breakline\`, \`wide\` |
| Mute | \`ctx.timeout\` behind \`need\` |
| Panel | testbot \`layout()\`: \`show\`, \`divide\`, \`pack\`, \`beside\`, \`thumb\`, \`album\` |

## Ping with a cooldown

Five seconds per user. Inside that window the handler does not run.

<CodeResult id="ping" />

\`\`\`js
import { command } from "@draeven/core";

export const ping = command(
  "ping",
  "Checks whether the bot is alive",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);
\`\`\`

[Cooldowns](/docs/cooldowns)

## Confirm with buttons

Ask, then \`collect\`. Timeout → \`undefined\`. Text-only \`reply()\` does not clear the row.

<CodeResult id="confirm" />

\`\`\`js
import { button, command, row } from "@draeven/core";

export const confirm = command("confirm", "Confirm a cleanup", async (ctx) => {
  ctx.reply({
    text: "Remove the pinned notice?",
    rows: [
      row(
        button({ id: "yes", label: "Remove", color: "red" }),
        button({ id: "no", label: "Keep", color: "grey" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 20 });
  if (!pick || pick.id !== "yes") return ctx.reply("Kept.");
  return ctx.reply("Notice removed.");
});
\`\`\`

Do not reply with the exact text \`"Removed."\` — that is the \`remove()\` sentinel. [Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors)

## Letters that survive a restart

Command posts buttons. \`use()\` in the events folder answers \`hangman_*\` after a restart too.

<CodeResult id="letters" />

\`src/commands/letters.ts\`:

\`\`\`js
import { button, command, row } from "@draeven/core";

export const letters = command("letters", "Posts letter buttons", async (ctx) =>
  ctx.reply({
    text: "Pick a letter.",
    rows: [
      row(
        button({ id: "hangman_A", label: "A" }),
        button({ id: "hangman_B", label: "B" }),
        button({ id: "hangman_C", label: "C" })
      ),
    ],
  })
);
\`\`\`

\`src/events/letters.ts\`:

\`\`\`js
import { button, row, use } from "@draeven/core";

export const letters = use({
  ids: "hangman_*",
  run(ctx) {
    const letter = ctx.id.slice("hangman_".length);
    return ctx.reply({
      text: \`You picked **\${letter}**\`,
      rows: [row(button({ id: "hangman_A", label: "A" }))],
    });
  },
});
\`\`\`

[Press & submit](/docs/press-handlers) · [Events & intents](/docs/events-intents)

## Modal form

The form is the whole first reply. Do not \`wait()\` first. \`kind: "submit"\` waits for the modal, and \`fields\` is keyed by field id.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const report = command("report", "File a short report", async (ctx) => {
  ctx.reply(
    form({
      id: "report-form",
      title: "Report",
      fields: [
        { id: "title", label: "Title", style: fieldStyles.short, max: 80 },
        { id: "body", label: "What happened", style: fieldStyles.long, max: 1000 },
      ],
    })
  );

  const sent = await ctx.collect({
    ids: "report-form",
    kind: "submit",
    seconds: 180,
  });

  if (!sent) return ctx.reply("Timed out.");
  return ctx.reply(\`\${sent.fields.title}\\n\${sent.fields.body}\`);
});
\`\`\`

A submit is a new interaction. The reply after \`collect\` answers the modal. A timeout is \`undefined\`, and that reply edits the original interaction. Do not read \`sent?.fields\` on the timeout path.

[Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors)

## Status embed

An embed is \`embed({ ... })\`. The title lives on \`header\`. \`breakline\` starts a new field row. \`wide: true\` takes that row alone. \`time()\` renders in the reader's zone.

\`\`\`js
import { breakline, colors, command, embed, time } from "@draeven/core";

export const status = command("status", "Show bot status", async (ctx) => {
  const guild = ctx.getGuild();
  const you = ctx.getUser(ctx.author);

  return ctx.reply(
    embed({
      color: colors.blurple,
      header: { title: guild?.name ?? "Direct message" },
      description: \`Checked \${time(new Date(), "relative")}.\`,
      fields: [
        { name: "Member", value: you.name },
        { name: "Online", value: String(guild?.online ?? "—") },
        breakline,
        { name: "Note", value: "Slash commands are live.", wide: true },
      ],
      footer: { text: "Draeven" },
    })
  );
});
\`\`\`

[Embeds & layout](/docs/embeds-layout)

## Timeout a member

\`need\` checks the caller before the handler. \`minutes\` is 1–40320 (28 days). \`timeout\` takes seconds, so multiply. \`places: ["guild"]\` hides the command in DMs, where a timeout cannot run.

\`\`\`js
import { command, number, user } from "@draeven/core";

export const mute = command(
  "mute",
  "Timeout a member",
  {
    who: user("Member").required(),
    minutes: number("Minutes", { min: 1, max: 40320 }).required(),
  },
  async (ctx) => {
    await ctx.timeout(ctx.who, ctx.minutes * 60, "Timed out via /mute");
    return ctx.reply(\`Timed out \${ctx.who.name} for \${ctx.minutes} minutes.\`);
  },
  { need: "ModerateMembers", places: ["guild"] }
);
\`\`\`

The bot's role still needs Moderate Members. \`need\` does not grant it. [Permissions](/docs/permissions) · [Moderation actions](/docs/mod-actions)

## Layout panel

\`layout()\` is the whole reply. This file is \`src/commands/panel.ts\` from the public testbot. \`show\` is text, \`divide\` is a separator, \`pack\` groups parts and can set an accent color, \`beside\` places a \`thumb\` next to text, and \`album\` is a row of images. Do not add an embed or a canvas picture on this same reply.

\`\`\`js
import {
  album,
  beside,
  colors,
  command,
  divide,
  layout,
  pack,
  show,
  thumb,
} from "@draeven/core";

export const panel = command("panel", "Shows a Components V2 layout", async (ctx) => {
  const { reply } = ctx;

  return reply(
    layout(
      show("**Draeven** layout"),
      divide({ line: true }),
      pack(
        { color: colors.blurple },
        show("Containers group related parts."),
        beside({
          text: "Thumbnails sit beside text.",
          with: thumb("https://cdn.discordapp.com/embed/avatars/0.png"),
        })
      ),
      album(
        "https://cdn.discordapp.com/embed/avatars/1.png",
        "https://cdn.discordapp.com/embed/avatars/2.png"
      )
    )
  );
});
\`\`\`

[Embeds & layout](/docs/embeds-layout)

## From the Draeven testbot

These three files mirror the public testbot (\`src/commands/*.ts\`). The layout panel above is the fourth, \`panel.ts\`.

### Ping with wait, edit, say, and a cooldown

\`wait\` acknowledges, \`edit\` fills the deferred message, and \`say\` picks a line from \`ctx.locale\`. \`cooldown: 5\` is per user. The Dutch description is registration text, not the \`say\` map.

\`\`\`js
import { command, say } from "@draeven/core";

export const ping = command(
  "ping",
  "Checks the bot with a short wait",
  async (ctx) => {
    const { wait, edit, reply, locale } = ctx;

    await wait();
    await edit(say({ en: "Thinking…", nl: "Even denken…" }, locale));
    await new Promise((resolve) => setTimeout(resolve, 400));
    return reply(say({ en: "Pong.", nl: "Pong." }, locale));
  },
  {
    cooldown: 5,
    locales: {
      nl: { description: "Checkt de bot met een korte wachttijd" },
    },
  }
);
\`\`\`

[Cooldowns](/docs/cooldowns) · [Locales](/docs/locales) · [Replies](/docs/replies)

### Choose with buttons

\`wait\` + \`edit\` shows the row. \`collect\` waits for one of the two ids. The buttons have no \`press\`: this command keeps the interaction.

\`\`\`js
import { button, command, row } from "@draeven/core";

export const choose = command("choose", "Asks yes or no and waits for a press", async (ctx) => {
  const { wait, edit, collect, reply } = ctx;

  await wait();
  await edit({
    text: "Pick one.",
    rows: [
      row(
        button({ id: "choose-yes", label: "Yes", color: "green" }),
        button({ id: "choose-no", label: "No", color: "red" })
      ),
    ],
  });

  const pick = await collect({ ids: ["choose-yes", "choose-no"], seconds: 30 });

  if (!pick) {
    return reply("Timed out.");
  }

  return reply(pick.id === "choose-yes" ? "You chose yes." : "You chose no.");
});
\`\`\`

[Collectors](/docs/collectors) · [Buttons, menus & forms](/docs/pieces)

### Ask with a form

The form is the first reply. \`kind: "submit"\` waits for that modal. \`fields\` is keyed by field id.

\`\`\`js
import { command, form, fieldStyles } from "@draeven/core";

export const ask = command("ask", "Opens a short form and waits for the answer", async (ctx) => {
  const { reply, collect } = ctx;

  reply(
    form({
      id: "ask-form",
      title: "Quick ask",
      fields: [
        {
          id: "note",
          label: "Your note",
          style: fieldStyles.short,
          required: true,
        },
      ],
    })
  );

  const submitted = await collect({ ids: "ask-form", kind: "submit", seconds: 120 });

  if (!submitted) {
    return reply("Timed out.");
  }

  return reply(\`Got it: \${submitted.fields.note ?? ""}\`);
});
\`\`\`

[Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors)

## Pitfalls

- The cooldown book is process memory. A restart clears it. \`simulate()\` does not apply cooldowns.
- A second \`reply()\` throws only when a reply is already stored and you have neither \`wait()\`ed nor flushed a \`collect\`. After \`wait()\`, \`edit()\` or another \`reply()\` fills the defer. After a collect flush, another \`reply()\` replaces the stored reply.
- A \`form()\` after \`wait()\`, \`defer\`, or \`transcript()\` throws. The modal has to be the first acknowledgement.
- There is no root \`title\` on \`embed()\`. Put it in \`header: { title }\`.
- \`layout()\` cannot share the reply with text, an embed, a poll, or a canvas picture.

## Related

- [Commands](/docs/commands) · [Cooldowns](/docs/cooldowns) · [Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors) · [Embeds & layout](/docs/embeds-layout) · [Moderation actions](/docs/mod-actions)
`,
    },
    nl: {
      title: "Recepten",
      description: "Kant-en-klare commando's om te kopiëren.",
      body: `
Kant-en-klare commandobestanden voor \`src/commands\`. Letters heeft ook een \`use()\`-bestand in \`src/events\` nodig.

<RecipeFiles />

## Eén bestand plaatsen

1. Sla op als \`src/commands/<name>.ts\` (named \`export\`).
2. \`pnpm build\`, daarna starten (\`watch: true\` herlaadt).

| Recept | Wat het toont |
|--------|----------------|
| Ping | \`cooldown: 5\` per gebruiker |
| Bevestigen | \`button\` + \`ctx.collect\` |
| Letters | knoppen zonder \`press\`, \`use()\` in de events-map |
| Melding | \`form\` + \`kind: "submit"\` |
| Status | \`embed()\` met \`header\`, \`fields\`, \`breakline\`, \`wide\` |
| Timeout | \`ctx.timeout\` achter \`need\` |
| Paneel | testbot-\`layout()\`: \`show\`, \`divide\`, \`pack\`, \`beside\`, \`thumb\`, \`album\` |

## Ping met een wachttijd

Vijf seconden per gebruiker. Binnen dat venster draait de handler niet.

<CodeResult id="ping" />

\`\`\`js
import { command } from "@draeven/core";

export const ping = command(
  "ping",
  "Checkt of de bot leeft",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);
\`\`\`

[Wachttijden](/docs/cooldowns)

## Bevestigen met knoppen

Vraag, dan \`collect\`. Timeout → \`undefined\`. Alleen-tekst-\`reply()\` haalt de rij niet weg.

<CodeResult id="confirm" />

\`\`\`js
import { button, command, row } from "@draeven/core";

export const confirm = command("confirm", "Bevestig een opruiming", async (ctx) => {
  ctx.reply({
    text: "De vastgezette mededeling weghalen?",
    rows: [
      row(
        button({ id: "yes", label: "Weghalen", color: "red" }),
        button({ id: "no", label: "Laten", color: "grey" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 20 });
  if (!pick || pick.id !== "yes") return ctx.reply("Blijft staan.");
  return ctx.reply("Mededeling weggehaald.");
});
\`\`\`

Antwoord niet met exact \`"Removed."\` — dat is de \`remove()\`-sentinel. [Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors)

## Letters die een herstart overleven

Commando plaatst knoppen. \`use()\` in de events-map beantwoordt \`hangman_*\`, ook na een herstart.

<CodeResult id="letters" />

\`src/commands/letters.ts\`:

\`\`\`js
import { button, command, row } from "@draeven/core";

export const letters = command("letters", "Posts letter buttons", async (ctx) =>
  ctx.reply({
    text: "Pick a letter.",
    rows: [
      row(
        button({ id: "hangman_A", label: "A" }),
        button({ id: "hangman_B", label: "B" }),
        button({ id: "hangman_C", label: "C" })
      ),
    ],
  })
);
\`\`\`

\`src/events/letters.ts\`:

\`\`\`js
import { button, row, use } from "@draeven/core";

export const letters = use({
  ids: "hangman_*",
  run(ctx) {
    const letter = ctx.id.slice("hangman_".length);
    return ctx.reply({
      text: \`You picked **\${letter}**\`,
      rows: [row(button({ id: "hangman_A", label: "A" }))],
    });
  },
});
\`\`\`

[Press & submit](/docs/press-handlers) · [Events en intents](/docs/events-intents)

## Modaal formulier

Het formulier is het hele eerste antwoord. Roep niet eerst \`wait()\` aan. \`kind: "submit"\` wacht op de modal, en \`fields\` is gekeyed op veld-id.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const report = command("report", "Dien een korte melding in", async (ctx) => {
  ctx.reply(
    form({
      id: "report-form",
      title: "Melding",
      fields: [
        { id: "title", label: "Titel", style: fieldStyles.short, max: 80 },
        { id: "body", label: "Wat er gebeurde", style: fieldStyles.long, max: 1000 },
      ],
    })
  );

  const sent = await ctx.collect({
    ids: "report-form",
    kind: "submit",
    seconds: 180,
  });

  if (!sent) return ctx.reply("Timeout.");
  return ctx.reply(\`\${sent.fields.title}\\n\${sent.fields.body}\`);
});
\`\`\`

Een submit is een nieuwe interactie. Het antwoord na \`collect\` beantwoordt de modal. Een timeout is \`undefined\`, en dat antwoord bewerkt de oorspronkelijke interactie. Lees \`sent?.fields\` niet op het timeout-pad.

[Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors)

## Status-embed

Een embed is \`embed({ ... })\`. De titel staat op \`header\`. \`breakline\` begint een nieuwe veldrij. \`wide: true\` neemt die rij alleen. \`time()\` rendert in de zone van de lezer.

\`\`\`js
import { breakline, colors, command, embed, time } from "@draeven/core";

export const status = command("status", "Toon de botstatus", async (ctx) => {
  const guild = ctx.getGuild();
  const you = ctx.getUser(ctx.author);

  return ctx.reply(
    embed({
      color: colors.blurple,
      header: { title: guild?.name ?? "Privébericht" },
      description: \`Gecontroleerd \${time(new Date(), "relative")}.\`,
      fields: [
        { name: "Lid", value: you.name },
        { name: "Online", value: String(guild?.online ?? "—") },
        breakline,
        { name: "Notitie", value: "Slash-commando's zijn live.", wide: true },
      ],
      footer: { text: "Draeven" },
    })
  );
});
\`\`\`

[Embeds en layout](/docs/embeds-layout)

## Timeout voor een lid

\`need\` controleert de aanroeper vóór de handler. \`minutes\` is 1–40320 (28 dagen). \`timeout\` verwacht seconden, dus vermenigvuldig. \`places: ["guild"]\` verbergt het commando in DM's, waar een timeout niet kan.

\`\`\`js
import { command, number, user } from "@draeven/core";

export const mute = command(
  "mute",
  "Geef een lid een timeout",
  {
    who: user("Lid").required(),
    minutes: number("Minuten", { min: 1, max: 40320 }).required(),
  },
  async (ctx) => {
    await ctx.timeout(ctx.who, ctx.minutes * 60, "Timeout via /mute");
    return ctx.reply(\`Timeout voor \${ctx.who.name}: \${ctx.minutes} minuten.\`);
  },
  { need: "ModerateMembers", places: ["guild"] }
);
\`\`\`

De rol van de bot heeft nog steeds Moderate Members nodig. \`need\` geeft dat recht niet. [Rechten](/docs/permissions) · [Mod-acties](/docs/mod-actions)

## Layout-paneel

\`layout()\` is het hele antwoord. Dit bestand is \`src/commands/panel.ts\` uit de publieke testbot. \`show\` is tekst, \`divide\` is een scheiding, \`pack\` groepeert onderdelen en kan een accentkleur zetten, \`beside\` zet een \`thumb\` naast tekst, en \`album\` is een rij afbeeldingen. Zet op ditzelfde antwoord geen embed en geen canvas-afbeelding. De teksten hieronder zijn die van de testbot.

\`\`\`js
import {
  album,
  beside,
  colors,
  command,
  divide,
  layout,
  pack,
  show,
  thumb,
} from "@draeven/core";

export const panel = command("panel", "Shows a Components V2 layout", async (ctx) => {
  const { reply } = ctx;

  return reply(
    layout(
      show("**Draeven** layout"),
      divide({ line: true }),
      pack(
        { color: colors.blurple },
        show("Containers group related parts."),
        beside({
          text: "Thumbnails sit beside text.",
          with: thumb("https://cdn.discordapp.com/embed/avatars/0.png"),
        })
      ),
      album(
        "https://cdn.discordapp.com/embed/avatars/1.png",
        "https://cdn.discordapp.com/embed/avatars/2.png"
      )
    )
  );
});
\`\`\`

[Embeds en layout](/docs/embeds-layout)

## Uit de Draeven-testbot

Deze drie bestanden spiegelen de publieke testbot (\`src/commands/*.ts\`). Het layout-paneel hierboven is het vierde, \`panel.ts\`.

### Ping met wait, edit, say en een wachttijd

\`wait\` bevestigt, \`edit\` vult het uitgestelde bericht, en \`say\` kiest een regel uit \`ctx.locale\`. \`cooldown: 5\` is per gebruiker. De Nederlandse description is registratietekst, niet de \`say\`-map.

\`\`\`js
import { command, say } from "@draeven/core";

export const ping = command(
  "ping",
  "Checks the bot with a short wait",
  async (ctx) => {
    const { wait, edit, reply, locale } = ctx;

    await wait();
    await edit(say({ en: "Thinking…", nl: "Even denken…" }, locale));
    await new Promise((resolve) => setTimeout(resolve, 400));
    return reply(say({ en: "Pong.", nl: "Pong." }, locale));
  },
  {
    cooldown: 5,
    locales: {
      nl: { description: "Checkt de bot met een korte wachttijd" },
    },
  }
);
\`\`\`

[Wachttijden](/docs/cooldowns) · [Taalvarianten](/docs/locales) · [Antwoorden](/docs/replies)

### Kiezen met knoppen

\`wait\` + \`edit\` toont de rij. \`collect\` wacht op een van de twee ids. De knoppen hebben geen \`press\`: dit commando houdt de interactie.

\`\`\`js
import { button, command, row } from "@draeven/core";

export const choose = command("choose", "Asks yes or no and waits for a press", async (ctx) => {
  const { wait, edit, collect, reply } = ctx;

  await wait();
  await edit({
    text: "Pick one.",
    rows: [
      row(
        button({ id: "choose-yes", label: "Yes", color: "green" }),
        button({ id: "choose-no", label: "No", color: "red" })
      ),
    ],
  });

  const pick = await collect({ ids: ["choose-yes", "choose-no"], seconds: 30 });

  if (!pick) {
    return reply("Timed out.");
  }

  return reply(pick.id === "choose-yes" ? "You chose yes." : "You chose no.");
});
\`\`\`

[Verzamelaars](/docs/collectors) · [Knoppen, menu's & formulieren](/docs/pieces)

### Vragen met een formulier

Het formulier is het eerste antwoord. \`kind: "submit"\` wacht op die modal. \`fields\` is gekeyed op veld-id.

\`\`\`js
import { command, form, fieldStyles } from "@draeven/core";

export const ask = command("ask", "Opens a short form and waits for the answer", async (ctx) => {
  const { reply, collect } = ctx;

  reply(
    form({
      id: "ask-form",
      title: "Quick ask",
      fields: [
        {
          id: "note",
          label: "Your note",
          style: fieldStyles.short,
          required: true,
        },
      ],
    })
  );

  const submitted = await collect({ ids: "ask-form", kind: "submit", seconds: 120 });

  if (!submitted) {
    return reply("Timed out.");
  }

  return reply(\`Got it: \${submitted.fields.note ?? ""}\`);
});
\`\`\`

[Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors)

## Valkuilen

- Het wachttijdboek zit in het procesgeheugen. Een herstart wist het. \`simulate()\` past wachttijden niet toe.
- Een tweede \`reply()\` gooit alleen als er al een antwoord is opgeslagen en je noch \`wait()\` hebt gedaan, noch een \`collect\` hebt geflusht. Na \`wait()\` vult \`edit()\` of een nieuwe \`reply()\` de defer. Na een collect-flush vervangt een nieuwe \`reply()\` het opgeslagen antwoord.
- Een \`form()\` na \`wait()\`, \`defer\` of \`transcript()\` gooit. De modal moet de eerste bevestiging zijn.
- \`embed()\` heeft geen titel op de wortel. Zet die in \`header: { title }\`.
- \`layout()\` deelt het antwoord niet met tekst, een embed, een peiling of een canvas-afbeelding.

## Verder

- [Commando's](/docs/commands) · [Wachttijden](/docs/cooldowns) · [Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors) · [Embeds en layout](/docs/embeds-layout) · [Mod-acties](/docs/mod-actions)
`,
    },
  },
  {
    slug: "config",
    order: 9,
    en: {
      title: "Config file",
      description: "draeven.config.js — commands and events folders Start() loads when you omit them.",
      body: `
\`draeven.config.js\` (or \`.mjs\`) is how \`Start()\` finds compiled commands when you omit \`commands\`, and the events folder when you omit \`events\`. You edit TypeScript under \`src/\`. \`tsc\` writes JavaScript under \`dist/\`. This file names those output folders so the process never imports the sources.

\`readConfig\` reads \`commands\` and \`events\`. A scaffold writes both. Without a file, commands fall back to \`./commands\` under the directory you started from. \`events\` has no fallback. Leave it unset and \`Start\` loads no events folder.

## The file

\`\`\`js
export default {
  commands: "./dist/commands",
  events: "./dist/events",
};
\`\`\`

\`commands\` and \`events\` are folder paths. A relative path is resolved **next to the config file**, even when \`process.cwd()\` is somewhere else. An absolute path is used as written. \`resolveCommandsFolder(folder, baseDir)\` applies that rule without reading a file. An empty path throws \`[Draeven] A folder path cannot be empty.\` A blank \`events\` string is skipped, so no events folder is loaded.

\`readConfig(cwd)\` starts at \`cwd\` (default \`process.cwd()\`) and walks parent directories until it finds \`draeven.config.js\` or \`draeven.config.mjs\`. It imports that module and reads the default export. When no file exists, the commands folder is \`./commands\` under the directory you started from — not under a parent that happens to contain a config. There is still no events folder.

\`Start()\` calls \`readConfig()\` when you omit \`commands\`. It does the same when you omit \`events\`, and uses that folder when the file sets \`events\`. A string or \`URL\` on \`Start\` for either field is a folder of its own and skips that field in the file.

## Worked example

Leave \`commands\` and \`events\` off \`Start\` and let the file choose the folders. \`pnpm build\` (or \`tsc\`) must have already filled \`dist/commands\` and \`dist/events\`.

\`\`\`js
import { Start } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
});
\`\`\`

\`loadCommands\` then imports every \`.js\` file in the commands folder. It skips \`.ts\`, \`.test.js\`, names that end with \`old.js\` (so \`fold.js\` too), and names that start with a dot. Export \`command()\`, \`userMenu()\`, or \`messageMenu()\` from those modules. Other exports are ignored. Duplicate slash names throw. So do two user menus with the same name, and two message menus with the same name.

When the file sets \`events\`, \`loadEvents\` imports that folder the same way. It keeps a function whose name is a gateway event, and every value built with \`use()\`. Other exports are ignored ([Events & intents](/docs/events-intents)).

To ignore the config for one process, pass the folders yourself. Those paths are resolved from the current working directory:

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  commands: "./dist/commands",
  events: "./dist/events",
});
\`\`\`

## Limits

| Rule | Detail |
|------|--------|
| File names | \`draeven.config.js\` or \`draeven.config.mjs\` only |
| Fields read | \`commands\` and \`events\`. Other keys are ignored |
| Relative path | Resolved beside the config file |
| Absolute path | Used as written |
| Missing file | \`./commands\` under the directory you started from. No events folder |
| Missing \`events\` | No events folder. Commands still load |
| Empty path | Throws |
| What loads | \`.js\` only. \`.ts\` is skipped |
| Watch | \`watch: true\` reloads the commands folder, and the events folder when \`events\` is set |

## Pitfalls

- \`draeven.config.ts\` and \`.cjs\` are ignored. The names are \`draeven.config.js\` and \`draeven.config.mjs\`.
- A missing directory throws \`Cannot read commands folder\`. Create \`dist/commands\` in the build, or the process stops at startup.
- A set \`events\` path that is missing throws \`Cannot read events folder\`. Create \`dist/events\`, or leave \`events\` out of the config.
- An empty folder, or a folder that still only has TypeScript, loads zero commands. The next sync then clears the commands Discord already had.
- Pointing \`commands\` at \`./src/commands\` looks right in the editor and loads nothing, because those files are still \`.ts\`.
- Pointing \`events\` at \`./src/events\` does the same. The config path is \`./dist/events\`.
- \`watch: true\` with an in-memory array throws \`[Draeven] watch: true needs commands from a folder path or draeven.config.\` Pass this folder, or a \`commands\` path ([Hot-reload & guard](/docs/hot-reload-guard)).
`,
    },
    nl: {
      title: "Configbestand",
      description: "draeven.config.js — commando- en events-mappen die Start() laadt als je ze weglaat.",
      body: `
\`draeven.config.js\` (of \`.mjs\`) is hoe \`Start()\` gecompileerde commando's vindt als je \`commands\` weglaat, en de events-map als je \`events\` weglaat. Je bewerkt TypeScript onder \`src/\`. \`tsc\` schrijft JavaScript onder \`dist/\`. Dit bestand noemt die uitvoermappen, zodat het proces de bronnen nooit importeert.

\`readConfig\` leest \`commands\` en \`events\`. Een scaffold schrijft beide. Zonder bestand vallen commando's terug op \`./commands\` onder de map waar je begon. \`events\` heeft geen terugval. Laat het weg en \`Start\` laadt geen events-map.

## Het bestand

\`\`\`js
export default {
  commands: "./dist/commands",
  events: "./dist/events",
};
\`\`\`

\`commands\` en \`events\` zijn mappaden. Een relatief pad wordt opgelost **naast het configbestand**, ook als \`process.cwd()\` ergens anders staat. Een absoluut pad wordt gebruikt zoals het er staat. \`resolveCommandsFolder(folder, baseDir)\` doet die regel zonder een bestand te lezen. Een leeg pad gooit \`[Draeven] A folder path cannot be empty.\` Een lege \`events\`-string wordt overgeslagen, dus er laadt geen events-map.

\`readConfig(cwd)\` begint bij \`cwd\` (standaard \`process.cwd()\`) en loopt omhoog door ouder-mappen tot het \`draeven.config.js\` of \`draeven.config.mjs\` vindt. Het importeert die module en leest de default export. Zonder bestand is de commandomap \`./commands\` onder de map waar je begon — niet onder een ouder die toevallig een config bevat. Er is dan nog steeds geen events-map.

\`Start()\` roept \`readConfig()\` aan als je \`commands\` weglaat. Hetzelfde geldt als je \`events\` weglaat, en dan gebruikt het die map als het bestand \`events\` zet. Een string of \`URL\` op \`Start\` voor een van beide velden is zelf een map en slaat dat veld in het bestand over.

## Uitgewerkt voorbeeld

Laat \`commands\` en \`events\` weg op \`Start\` en laat het bestand de mappen kiezen. \`pnpm build\` (of \`tsc\`) moet \`dist/commands\` en \`dist/events\` al gevuld hebben.

\`\`\`js
import { Start } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
});
\`\`\`

\`loadCommands\` importeert daarna elk \`.js\`-bestand in de commandomap. Het slaat \`.ts\`, \`.test.js\`, namen die eindigen op \`old.js\` (dus ook \`fold.js\`), en namen die met een punt beginnen over. Exporteer \`command()\`, \`userMenu()\` of \`messageMenu()\` uit die modules. Andere exports worden genegeerd. Dubbele slash-namen gooien. Twee user-menu's met dezelfde naam ook, en twee berichtmenu's met dezelfde naam ook.

Als het bestand \`events\` zet, importeert \`loadEvents\` die map op dezelfde manier. Het houdt een functie waarvan de naam een gateway-event is, en elke waarde gebouwd met \`use()\`. Andere exports worden genegeerd ([Events en intents](/docs/events-intents)).

Om de config voor één proces te negeren, geef je de mappen zelf mee. Die paden worden opgelost vanuit de huidige werkmap:

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  commands: "./dist/commands",
  events: "./dist/events",
});
\`\`\`

## Grenzen

| Regel | Detail |
|-------|--------|
| Bestandsnamen | Alleen \`draeven.config.js\` of \`draeven.config.mjs\` |
| Velden die worden gelezen | \`commands\` en \`events\`. Andere sleutels worden genegeerd |
| Relatief pad | Opgelost naast het configbestand |
| Absoluut pad | Gebruikt zoals het er staat |
| Ontbrekend bestand | \`./commands\` onder de map waar je begon. Geen events-map |
| \`events\` ontbreekt | Geen events-map. Commando's laden nog wel |
| Leeg pad | Gooit |
| Wat laadt | Alleen \`.js\`. \`.ts\` wordt overgeslagen |
| Watch | \`watch: true\` herlaadt de commandomap, en de events-map als \`events\` gezet is |

## Valkuilen

- \`draeven.config.ts\` en \`.cjs\` worden genegeerd. De namen zijn \`draeven.config.js\` en \`draeven.config.mjs\`.
- Een ontbrekende map gooit \`Cannot read commands folder\`. Maak \`dist/commands\` in de build, anders stopt het proces bij het opstarten.
- Een gezet \`events\`-pad dat ontbreekt gooit \`Cannot read events folder\`. Maak \`dist/events\`, of laat \`events\` uit de config.
- Een lege map, of een map die alleen nog TypeScript bevat, laadt nul commando's. De volgende sync wist dan de commando's die Discord al had.
- \`commands\` naar \`./src/commands\` wijzen oogt goed in de editor en laadt niets, omdat die bestanden nog \`.ts\` zijn.
- \`events\` naar \`./src/events\` wijzen doet hetzelfde. Het configpad is \`./dist/events\`.
- \`watch: true\` met een array in het geheugen gooit \`[Draeven] watch: true needs commands from a folder path or draeven.config.\` Geef deze map mee, of een \`commands\`-pad ([Hot-reload en guard](/docs/hot-reload-guard)).
`,
    },
  },
  {
    slug: "rules",
    order: 10,
    en: {
      title: "Rules of thumb",
      description: "Hard constraints that show up as [Draeven] errors if you break them.",
      body: `
These are the constraints Draeven enforces in code. Break one and the throw starts with \`[Draeven]\`. Each section links the guide that shows the shape that works. The same lines are indexed on [Errors & debugging](/docs/debugging).

## Acknowledge within ~3 seconds

Discord drops the interaction after about 3 seconds. <Explain topic="auto-defer">Auto-defer</Explain> fires at 2 seconds so a slow \`await\` still acknowledges. Leave it on unless this command must open a form.

\`Start({ autoDefer: false })\` turns it off for every command. A number is clamped to 500–2500 ms. \`autoDefer: false\` on one command turns it off for that command only. \`defer: true\` in metadata acknowledges immediately, before the handler. \`defer: { private: true }\` does that ephemerally.

When you know the work is slow, call \`wait()\` yourself, then \`edit()\`:

\`\`\`js
import { command } from "@draeven/core";

export const slow = command("slow", "Works a while", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Working…");
  await ctx.edit("Done.");
});
\`\`\`

\`wait()\` after \`reply()\` throws. \`edit()\` before \`wait()\` or \`reply()\` throws. Full surface: [Replies](/docs/replies).

## Form must be the first reply

A modal has to be the first acknowledgement. <Explain topic="form-first">A form() cannot follow a defer</Explain>. Do not call \`wait()\`, set metadata \`defer\`, or call \`transcript()\` before \`form()\`. An auto-defer that already fired counts too: it has consumed the token. Discord will not open a modal after that, and flush throws \`A form cannot follow wait()\`.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const note = command("note", "Write a note", async (ctx) => {
  ctx.reply(
    form({
      id: "note-form",
      title: "Note",
      fields: [{ id: "body", label: "Note", style: fieldStyles.long, max: 500 }],
    })
  );

  const sent = await ctx.collect({ ids: "note-form", kind: "submit", seconds: 120 });
  if (!sent) return ctx.reply("Timed out.");
  return ctx.reply(sent.fields.body);
});
\`\`\`

A submit answers on the modal. That is a new interaction token. A timeout is \`undefined\`, and that reply edits the original interaction. Do not fold both paths into \`sent?.fields\`.

A form cannot be \`{ private: true }\`, and \`ctx.send\` cannot carry one. [Buttons, menus & forms](/docs/pieces).

## layout() cannot mix

<Explain topic="layout-mix">A layout() is the whole reply</Explain>. It cannot share that message with text, an \`embed()\`, a \`poll()\`, or a \`canvas()\` picture. \`reply("text", layout(...))\` throws \`A reply takes text, an embed, or text and an embed.\` The mix error \`A layout cannot mix with text, embeds, or polls.\` is for an object such as \`{ text, layout }\`.

You can still mark the layout private with \`{ private: true }\`, and you can append extra \`row()\` values on the same reply object. Those action rows are sent after the layout parts. A poll is its own whole reply, and so is a form. [Embeds & layout](/docs/embeds-layout).

## One reply token

The interaction has one reply token. A second \`reply()\` throws \`A command can only reply once.\` only when a reply is already stored and you have neither \`wait()\`ed nor flushed a \`collect\`. After \`wait()\`, \`edit()\` or another \`reply()\` fills the defer. \`followup()\` adds another message.

\`collect()\` flushes the pending reply before it waits. After that flush, another \`reply()\` replaces the stored reply. It does not throw. A form submit is answered on the modal. A button or menu press, and a timeout, edit the original interaction. A text-only replacement does not clear the button row.

A second \`reply()\` before \`wait()\` and before that flush still throws. [Replies](/docs/replies) · [Collectors](/docs/collectors).

## ctx.collect vs press

<Explain topic="collect-vs-press">ctx.collect continues this command. press answers later, on its own.</Explain> The collector wins only when the custom id, the kind, and the user all match.

If it does not, Draeven tries the next match in this order: the inline \`press\` or \`submit\` remembered on that id, then a \`use()\` from the events folder, then the text \`Received.\`. The remembered function wins over \`use()\` while this process is running. \`use()\` is what still runs after a restart.

Use \`collect\` when the same command should continue. Use inline \`press\` or \`submit\` for a one-off in this process. Use \`use()\` when the handler should survive a restart. \`link()\` and \`sku()\` have no \`press\` and never arrive in \`collect\`. [Collectors](/docs/collectors) · [Press & submit](/docs/press-handlers).

## header: { title }

An embed has no root \`title\` and no \`inline\` flag. The title lives on <Explain topic="embed-header">header</Explain>: \`header: { title }\`. A header needs a title or an image. A \`link\` on the header needs a title.

Fields share a row until you say otherwise. \`breakline\` starts the next row. \`wide: true\` takes that row alone. \`inline: true\` is a discord.js habit and is not a Draeven field.

\`\`\`js
import { breakline, embed } from "@draeven/core";

embed({
  header: { title: "Bot status" },
  fields: [
    { name: "Ping", value: "42ms" },
    breakline,
    { name: "Notes", value: "This row is wide.", wide: true },
  ],
});
\`\`\`

[Embeds & layout](/docs/embeds-layout).

## Compiled JavaScript

\`loadCommands\` imports \`.js\` from the commands folder. It skips \`.ts\`, \`.test.js\`, names that end with \`old.js\` (so \`fold.js\` too), and names that start with a dot. Point \`draeven.config.js\` at \`./dist/commands\` after \`tsc\`, not at \`./src/commands\`.

A missing folder throws \`Cannot read commands folder\`. A folder that only has TypeScript loads zero commands, and the next sync clears the commands Discord already had. [Config file](/docs/config) · [Deploy](/docs/deploy).
`,
    },
    nl: {
      title: "Vuistregels",
      description: "Harde regels die als [Draeven]-fout verschijnen als je ze breekt.",
      body: `
Dit zijn de grenzen die Draeven in code afdwingt. Breek je er een, dan begint de throw met \`[Draeven]\`. Elke sectie linkt de gids die de vorm toont die wél werkt. Dezelfde regels staan op een rij bij [Fouten & debuggen](/docs/debugging).

## Bevestig binnen ongeveer 3 seconden

Discord laat de interactie vallen na ongeveer 3 seconden. <Explain topic="auto-defer">Auto-defer</Explain> vuurt na 2 seconden, zodat een trage \`await\` alsnog bevestigt. Laat het aan, tenzij dit commando een formulier moet openen.

\`Start({ autoDefer: false })\` zet het uit voor elk commando. Een getal wordt geklemd op 500–2500 ms. \`autoDefer: false\` op één commando zet het alleen voor dat commando uit. \`defer: true\` in metadata bevestigt meteen, vóór de handler. \`defer: { private: true }\` doet dat efemeer.

Weet je dat het werk traag is, roep dan zelf \`wait()\` aan en daarna \`edit()\`:

\`\`\`js
import { command } from "@draeven/core";

export const slow = command("slow", "Duurt even", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Bezig…");
  await ctx.edit("Klaar.");
});
\`\`\`

\`wait()\` na \`reply()\` gooit. \`edit()\` vóór \`wait()\` of \`reply()\` gooit. Het hele oppervlak: [Antwoorden](/docs/replies).

## Het formulier is het eerste antwoord

Een modal moet de eerste bevestiging zijn. <Explain topic="form-first">Een form() kan niet na een defer</Explain>. Roep geen \`wait()\` aan, zet geen \`defer\` in metadata, en roep geen \`transcript()\` aan vóór \`form()\`. Een auto-defer die al is afgegaan telt ook: het token is dan al verbruikt. Discord opent daarna geen modal, en flush gooit \`A form cannot follow wait()\`.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const note = command("note", "Schrijf een notitie", async (ctx) => {
  ctx.reply(
    form({
      id: "note-form",
      title: "Notitie",
      fields: [{ id: "body", label: "Notitie", style: fieldStyles.long, max: 500 }],
    })
  );

  const sent = await ctx.collect({ ids: "note-form", kind: "submit", seconds: 120 });
  if (!sent) return ctx.reply("Timeout.");
  return ctx.reply(sent.fields.body);
});
\`\`\`

Een submit beantwoordt de modal. Dat is een nieuw interactietoken. Een timeout is \`undefined\`, en dat antwoord bewerkt de oorspronkelijke interactie. Vouw beide paden niet samen in \`sent?.fields\`.

Een formulier kan niet \`{ private: true }\` zijn, en \`ctx.send\` kan er geen dragen. [Knoppen, menu's & formulieren](/docs/pieces).

## layout() mengt niet

<Explain topic="layout-mix">Een layout() is het hele antwoord</Explain>. Het deelt dat bericht niet met tekst, een \`embed()\`, een \`poll()\` of een \`canvas()\`-afbeelding. \`reply("tekst", layout(...))\` gooit \`A reply takes text, an embed, or text and an embed.\` De mix-fout \`A layout cannot mix with text, embeds, or polls.\` is voor een object zoals \`{ text, layout }\`.

Je mag de layout wel privé maken met \`{ private: true }\`, en extra \`row()\`-waarden aan hetzelfde antwoord hangen. Die actierijen gaan ná de layout-onderdelen mee. Een peiling is ook een eigen antwoord, en een formulier ook. [Embeds en layout](/docs/embeds-layout).

## Eén antwoordtoken

De interactie heeft één antwoordtoken. Een tweede \`reply()\` gooit \`A command can only reply once.\` alleen als er al een antwoord is opgeslagen en je noch \`wait()\` hebt gedaan, noch een \`collect\` hebt geflusht. Na \`wait()\` vult \`edit()\` of een nieuwe \`reply()\` de defer. \`followup()\` voegt een extra bericht toe.

\`collect()\` flusht het openstaande antwoord vóór het wacht. Na die flush vervangt een nieuwe \`reply()\` het opgeslagen antwoord. Dat gooit niet. Een formulier-submit wordt op de modal beantwoord. Een knop of menu, en een timeout, bewerken de oorspronkelijke interactie. Een vervanging die alleen tekst is, haalt de knoppenrij niet weg.

Een tweede \`reply()\` vóór \`wait()\` en vóór die flush gooit nog steeds. [Antwoorden](/docs/replies) · [Verzamelaars](/docs/collectors).

## ctx.collect tegenover press

<Explain topic="collect-vs-press">ctx.collect laat dit commando doorgaan. press antwoordt later, op zichzelf.</Explain> De verzamelaar wint alleen als de custom id, de soort en de gebruiker alle drie kloppen.

Doet hij dat niet, dan probeert Draeven de volgende treffer in deze volgorde: de inline \`press\` of \`submit\` die op die id is onthouden, dan een \`use()\` uit de events-map, dan de tekst \`Received.\`. De onthouden functie wint van \`use()\` zolang dit proces draait. \`use()\` is wat na een herstart nog draait.

Gebruik \`collect\` als hetzelfde commando moet doorgaan. Gebruik inline \`press\` of \`submit\` voor een eenmalige knop in dit proces. Gebruik \`use()\` als de handler een herstart moet overleven. \`link()\` en \`sku()\` hebben geen \`press\` en komen nooit aan in \`collect\`. [Verzamelaars](/docs/collectors) · [Press & submit](/docs/press-handlers).

## header: { title }

Een embed heeft geen titel op de wortel en geen \`inline\`-vlag. De titel staat op <Explain topic="embed-header">header</Explain>: \`header: { title }\`. Een header heeft een titel of een afbeelding nodig. Een \`link\` op de header heeft een titel nodig.

Velden delen een rij tot je iets anders zegt. \`breakline\` begint de volgende rij. \`wide: true\` neemt die rij alleen. \`inline: true\` is een discord.js-gewoonte en is geen Draeven-veld.

\`\`\`js
import { breakline, embed } from "@draeven/core";

embed({
  header: { title: "Botstatus" },
  fields: [
    { name: "Ping", value: "42ms" },
    breakline,
    { name: "Notities", value: "Deze rij is breed.", wide: true },
  ],
});
\`\`\`

[Embeds en layout](/docs/embeds-layout).

## Gecompileerde JavaScript

\`loadCommands\` importeert \`.js\` uit de commandomap. Het slaat \`.ts\`, \`.test.js\`, namen die eindigen op \`old.js\` (dus ook \`fold.js\`), en namen die met een punt beginnen over. Wijs \`draeven.config.js\` na \`tsc\` naar \`./dist/commands\`, niet naar \`./src/commands\`.

Een ontbrekende map gooit \`Cannot read commands folder\`. Een map die alleen TypeScript bevat laadt nul commando's, en de volgende sync wist de commando's die Discord al had. [Configbestand](/docs/config) · [Deployen](/docs/deploy).
`,
    },
  },
  {
    slug: "commands",
    order: 20,
    en: {
      title: "Commands",
      description: "command(), ctx, and command metadata.",
      body: `
\`command()\` builds a slash command. \`Start()\` registers it and calls your handler with one \`ctx\`.

Related actions → [subcommands](/docs/subcommands). Right-click → [context menus](/docs/context-menus).

## Without options · With options

Name 1–32 (\`a-z\`, digits, hyphens). Description 1–100. Option keys land on \`ctx\`.

<Compare id="cmd-options" />

## Metadata is the last argument

Gates, cooldowns, locales, and defer flags are \`CommandMeta\`, never mixed into the options object.

\`\`\`js
export const secret = command(
  "secret",
  "Server owner only",
  async (ctx) => ctx.reply("ok"),
  {
    ownerOnly: true,
    defer: { private: true },
    cooldown: 10,
    need: "ManageGuild",
  }
);
\`\`\`

| Field | When it runs |
|-------|----------------|
| \`permissions\` | Registration. Default member permissions Discord stores on the command. |
| \`need\` | Before the handler. Caller must hold these permission bits. |
| \`ownerOnly\` | Before the handler. Caller must be the **server owner**. |
| \`when\` | Before the handler. Return \`false\` to block. |
| \`cooldown\` | Before the handler. In-memory wait ([Cooldowns](/docs/cooldowns)). |
| \`locales\` | Registration. Translated name and description. |
| \`defer\` | \`true\` defers publicly. \`{ private: true }\` defers ephemerally. |
| \`autoDefer\` | \`false\` turns off the 2s safety defer for this command. |
| \`nsfw\` | Only in age-restricted channels. |
| \`places\` | \`"guild"\`, \`"bot dm"\`, \`"private"\`. |
| \`install\` | \`"guild"\`, \`"user"\`. |

Details: [Permissions](/docs/permissions).

## What is on ctx

| Area | Members |
|------|---------|
| Caller | \`author\` (\`{ id }\`), \`locale\`, \`opt\` (the raw option bag) |
| Options | One property per key, already resolved (\`ctx.who\` is a \`User\`) |
| Lookups | \`getUser\`, \`getMember\`, \`getBot\`, \`getGuild\`, \`getChannel\`, \`getRole\`, \`getRoles\`, \`getFile\` |
| Replies | \`reply\`, \`followup\`, \`wait\`, \`edit\`, \`remove\`, \`transcript\` |
| Channel post | \`send(channel, ...)\` — not ephemeral ([Sending messages](/docs/sending-messages)) |
| Components | \`collect\` — not a package import ([Collectors](/docs/collectors)) |
| Moderation | \`timeout\`, \`kick\`, \`ban\`, \`purge\`, \`pin\`, \`unpin\`, \`react\`, \`editMessage\`, \`deleteMessage\`, \`moveVoice\` |

\`getGuild()\` and \`getMember()\` are \`undefined\` in a DM.

<Warn>
Option names use the same pattern as command names, and these keys are reserved: \`author\`, \`opt\`, \`reply\`, \`followup\`, \`send\`, \`wait\`, \`edit\`, \`remove\`, \`collect\`, \`locale\`, \`transcript\`, and the lookup names (\`getuser\`, \`getguild\`, …).
</Warn>

## Pitfalls

- Returning the \`Reply\` from \`ctx.reply()\` is enough. You do not also \`await\` a second send.
- \`reply()\` throws \`A command can only reply once.\` only when a reply is already stored and you have neither \`wait()\`ed nor flushed a \`collect\`. After \`wait()\`, use \`edit()\` or another \`reply()\` to fill. After a collect flush, another \`reply()\` replaces the stored reply. Use \`followup()\` for an extra message.
- Slow work should \`await ctx.wait()\` then \`ctx.edit(...)\`, or rely on the default auto-defer at 2 seconds ([Replies](/docs/replies)).

## Related

- [Options](/docs/options) · [Subcommands](/docs/subcommands) · [Locales](/docs/locales)
`,
    },
    nl: {
      title: "Commando's",
      description: "command(), ctx en metadata.",
      body: `
\`command()\` bouwt een slash-commando. \`Start()\` registreert het en roept je handler aan met één \`ctx\`.

Verwante acties → [subcommando's](/docs/subcommands). Rechtermuisklik → [contextmenu's](/docs/context-menus).

## Zonder opties · Met opties

Naam: 1–32 tekens, \`a-z\`, cijfers, koppeltekens. Beschrijving: 1–100 tekens. Optie-sleutels landen op \`ctx\` naast \`author\`. \`user()\` zonder \`.required()\` mag \`undefined\` zijn; \`getUser(ctx.author)\` haalt de aanroeper op uit de ids die Discord meegaf.

<Compare id="cmd-options-nl" />

## Metadata is het laatste argument

Gates, wachttijden, vertalingen en defer horen in \`CommandMeta\`, niet in het optie-object.

\`\`\`js
export const secret = command(
  "secret",
  "Alleen de servereigenaar",
  async (ctx) => ctx.reply("ok"),
  {
    ownerOnly: true,
    defer: { private: true },
    cooldown: 10,
    need: "ManageGuild",
  }
);
\`\`\`

| Veld | Wanneer |
|------|---------|
| \`permissions\` | Registratie. Standaard lid-rechten die Discord op het commando zet. |
| \`need\` | Vóór de handler. De aanroeper moet deze bits hebben. |
| \`ownerOnly\` | Vóór de handler. De aanroeper moet de **servereigenaar** zijn. |
| \`when\` | Vóór de handler. \`false\` blokkeert. |
| \`cooldown\` | Vóór de handler. Wacht in het geheugen ([Wachttijden](/docs/cooldowns)). |
| \`locales\` | Registratie. Vertaalde naam en beschrijving. |
| \`defer\` | \`true\` is publiek. \`{ private: true }\` is efemeer. |
| \`autoDefer\` | \`false\` zet de veiligheids-defer van 2s uit voor dit commando. |
| \`nsfw\` | Alleen in leeftijdsbegrensde kanalen. |
| \`places\` | \`"guild"\`, \`"bot dm"\`, \`"private"\`. |
| \`install\` | \`"guild"\`, \`"user"\`. |

Details: [Rechten](/docs/permissions).

## Wat er op ctx zit

| Onderdeel | Leden |
|-----------|-------|
| Aanroeper | \`author\` (\`{ id }\`), \`locale\`, \`opt\` |
| Opties | Eén eigenschap per sleutel, al opgelost |
| Lookups | \`getUser\`, \`getMember\`, \`getBot\`, \`getGuild\`, \`getChannel\`, \`getRole\`, \`getRoles\`, \`getFile\` |
| Antwoorden | \`reply\`, \`followup\`, \`wait\`, \`edit\`, \`remove\`, \`transcript\` |
| Kanaalbericht | \`send(channel, ...)\` — niet efemeer |
| Componenten | \`collect\` — geen package-import |
| Moderatie | \`timeout\`, \`kick\`, \`ban\`, \`purge\`, \`pin\`, \`unpin\`, \`react\`, \`editMessage\`, \`deleteMessage\`, \`moveVoice\` |

\`getGuild()\` en \`getMember()\` zijn \`undefined\` in een DM.

<Warn>
Optienamen volgen hetzelfde patroon als commandonamen, en deze sleutels zijn gereserveerd: \`author\`, \`opt\`, \`reply\`, \`followup\`, \`send\`, \`wait\`, \`edit\`, \`remove\`, \`collect\`, \`locale\`, \`transcript\` en de lookup-namen (\`getuser\`, \`getguild\`, …).
</Warn>

## Valkuilen

- De \`Reply\` van \`ctx.reply()\` teruggeven is genoeg. Je hoeft niet nog een keer te versturen.
- \`reply()\` gooit \`A command can only reply once.\` alleen als er al een antwoord is opgeslagen en je noch \`wait()\` hebt gedaan, noch een \`collect\` hebt geflusht. Na \`wait()\` vul je met \`edit()\` of een nieuwe \`reply()\`. Na een collect-flush vervangt een nieuwe \`reply()\` het opgeslagen antwoord. Gebruik \`followup()\` voor een extra bericht.
- Traag werk hoort \`await ctx.wait()\` en daarna \`ctx.edit(...)\`, of leunt op de standaard auto-defer na 2 seconden ([Antwoorden](/docs/replies)).

## Verder

- [Opties](/docs/options) · [Subcommando's](/docs/subcommands) · [Taalvarianten](/docs/locales)
`,
    },
  },
  {
    slug: "options",
    order: 21,
    en: {
      title: "Options",
      description: "text, user, number, choice, file, and the rest.",
      body: `
Options are the inputs Discord shows under a slash command. Build them with \`text()\`, \`user()\`, and the other helpers, then pass the object as the third argument of \`command()\`. The key is the name on \`ctx\`. The string you pass to the helper is the description the user reads.

Call \`.required()\` when the command cannot run without that value. Optional values are \`undefined\` in the handler.

## Builders

| Builder | Discord type | Resolved on \`ctx\` |
|---------|--------------|---------------------|
| \`text(question, { min, max })\` | STRING | \`string\` |
| \`user(question)\` | USER | \`User\` (\`id\`, \`name\`, \`bot\`, \`createdAt\`, \`icon?\`) |
| \`role(question)\` | ROLE | \`Role\` |
| \`channel(question, { kinds })\` | CHANNEL | \`Channel\`. \`kinds\` filters with \`channelKinds\` |
| \`mentionable(question)\` | MENTIONABLE | \`User\` or \`Role\` |
| \`number(question, { min, max, choices })\` | INTEGER | \`number\` |
| \`decimal(question, { min, max, choices })\` | NUMBER | \`number\` |
| \`flag(question)\` | BOOLEAN | \`boolean\` |
| \`file(question)\` | ATTACHMENT | \`File\` |
| \`choice(question, items)\` | STRING + choices | the choice \`value\` |

\`channelKinds\` is \`text\`, \`voice\`, \`category\`, \`announcement\`, \`announcement thread\`, \`thread\`, \`private thread\`, \`stage\`, \`forum\`, and \`media\`.

\`choice()\` takes 1–25 entries. A string becomes both label and value. An object is \`{ label, value, note? }\`. Values must be unique and 1–100 characters. Discord only shows label and value. \`note\` is stored on the option and never sent.

\`number()\` / \`decimal()\` may list numeric \`choices\`. Do not combine those fixed choices with \`.suggest()\`.

## Worked example

\`\`\`js
import { command, text, user, decimal, choice, channel, channelKinds, flag } from "@draeven/core";

export const tip = command(
  "tip",
  "Send a tip note",
  {
    who: user("Who?").required(),
    amount: decimal("Amount?", { min: 0.5, max: 50 }),
    note: text("Note?", { max: 200 }),
    tier: choice("Tier", [
      { label: "Bronze", value: "b" },
      { label: "Gold", value: "g" },
    ]),
    room: channel("Channel?", { kinds: [channelKinds.text] }),
    loud: flag("Announce it?"),
  },
  async (ctx) =>
    ctx.reply(\`\${ctx.who.name} · \${ctx.amount ?? 1} · \${ctx.tier ?? "none"}\`)
);
\`\`\`

## User or role

\`\`\`js
import { command, mentionable } from "@draeven/core";

export const poke = command(
  "poke",
  "Ping a user or role",
  { target: mentionable("Who or which role?").required() },
  async (ctx) => {
    if ("bot" in ctx.target) return ctx.reply(\`User \${ctx.target.name}\`);
    return ctx.reply(\`Role \${ctx.target.name}\`);
  }
);
\`\`\`

A \`User\` has \`bot\`. A \`Role\` does not. That is the split.

<Tip>
Autocomplete is \`.suggest()\` on \`text()\`, \`number()\`, or \`decimal()\` — not a separate option type. Static lists should stay on \`choice()\`. See [Autocomplete](/docs/autocomplete).
</Tip>

## Limits

| Rule | Value |
|------|--------|
| Options on one command | 25, shared with the subcommand tree |
| Question (description) | 1–100 characters |
| Option name | \`^[a-z0-9-]{1,32}$\`, not a reserved \`ctx\` key |
| \`text\` min / max | integers, min 0–6000, max 1–6000 |
| \`choice\` list | 1–25, value ≤ 100 |

Localized option copy uses \`withLocales()\` ([Locales](/docs/locales)). The JavaScript key does not change.

## Pitfalls

- There is no \`attachment()\` helper. Use \`file()\`.
- \`flag()\` is a yes/no option, not a permissions bit.
- Optional numbers stay \`undefined\` when the user skips them. Default in the handler (\`ctx.amount ?? 1\`), not inside the builder.

## Related

- [Commands](/docs/commands) · [Subcommands](/docs/subcommands) · [Autocomplete](/docs/autocomplete)
`,
    },
    nl: {
      title: "Opties",
      description: "text, user, number, choice, file en de rest.",
      body: `
Opties zijn de invoer die Discord onder een slash-commando toont. Bouw ze met \`text()\`, \`user()\` en de andere helpers, en geef het object als derde argument aan \`command()\`. De sleutel is de naam op \`ctx\`. De string die je aan de helper geeft is de beschrijving die de gebruiker leest.

Roep \`.required()\` aan als het commando zonder die waarde niet kan. Optionele waarden zijn \`undefined\` in de handler.

## Builders

| Builder | Discord-type | Op \`ctx\` |
|---------|--------------|------------|
| \`text(question, { min, max })\` | STRING | \`string\` |
| \`user(question)\` | USER | \`User\` (\`id\`, \`name\`, \`bot\`, \`createdAt\`, \`icon?\`) |
| \`role(question)\` | ROLE | \`Role\` |
| \`channel(question, { kinds })\` | CHANNEL | \`Channel\`. \`kinds\` filtert met \`channelKinds\` |
| \`mentionable(question)\` | MENTIONABLE | \`User\` of \`Role\` |
| \`number(question, { min, max, choices })\` | INTEGER | \`number\` |
| \`decimal(question, { min, max, choices })\` | NUMBER | \`number\` |
| \`flag(question)\` | BOOLEAN | \`boolean\` |
| \`file(question)\` | ATTACHMENT | \`File\` |
| \`choice(question, items)\` | STRING + choices | de \`value\` van de keuze |

\`channelKinds\` is \`text\`, \`voice\`, \`category\`, \`announcement\`, \`announcement thread\`, \`thread\`, \`private thread\`, \`stage\`, \`forum\` en \`media\`.

\`choice()\` neemt 1–25 items. Een string wordt label én waarde. Een object is \`{ label, value, note? }\`. Waarden zijn uniek en 1–100 tekens. Discord toont alleen label en waarde. \`note\` wordt opgeslagen op de optie en nooit meegestuurd.

\`number()\` / \`decimal()\` mogen numerieke \`choices\` hebben. Meng die niet met \`.suggest()\`.

## Voorbeeld

\`\`\`js
import { command, text, user, decimal, choice, channel, channelKinds, flag } from "@draeven/core";

export const tip = command(
  "tip",
  "Stuur een tip",
  {
    who: user("Wie?").required(),
    amount: decimal("Bedrag?", { min: 0.5, max: 50 }),
    note: text("Notitie?", { max: 200 }),
    tier: choice("Niveau", [
      { label: "Brons", value: "b" },
      { label: "Goud", value: "g" },
    ]),
    room: channel("Kanaal?", { kinds: [channelKinds.text] }),
    loud: flag("Hardop?"),
  },
  async (ctx) =>
    ctx.reply(\`\${ctx.who.name} · \${ctx.amount ?? 1} · \${ctx.tier ?? "geen"}\`)
);
\`\`\`

## Gebruiker of rol

\`\`\`js
import { command, mentionable } from "@draeven/core";

export const poke = command(
  "poke",
  "Noem een gebruiker of rol",
  { target: mentionable("Wie of welke rol?").required() },
  async (ctx) => {
    if ("bot" in ctx.target) return ctx.reply(\`Gebruiker \${ctx.target.name}\`);
    return ctx.reply(\`Rol \${ctx.target.name}\`);
  }
);
\`\`\`

Een \`User\` heeft \`bot\`. Een \`Role\` niet. Dat is het onderscheid.

<Tip>
Automatisch aanvullen is \`.suggest()\` op \`text()\`, \`number()\` of \`decimal()\`. Vaste lijsten blijven \`choice()\`. Zie [Automatisch aanvullen](/docs/autocomplete).
</Tip>

## Limieten

| Regel | Waarde |
|-------|--------|
| Opties op één commando | 25, gedeeld met de subcommando-boom |
| Vraag (beschrijving) | 1–100 tekens |
| Optienaam | \`^[a-z0-9-]{1,32}$\`, geen gereserveerde \`ctx\`-sleutel |
| \`text\` min / max | integers, min 0–6000, max 1–6000 |
| \`choice\`-lijst | 1–25, waarde ≤ 100 |

Vertaalde optietekst gaat via \`withLocales()\` ([Taalvarianten](/docs/locales)). De JavaScript-sleutel verandert niet.

## Valkuilen

- Er is geen \`attachment()\`-helper. Gebruik \`file()\`.
- \`flag()\` is een ja/nee-optie, geen rechtenbit.
- Een overgeslagen getal blijft \`undefined\`. Geef de standaard in de handler (\`ctx.amount ?? 1\`), niet in de builder.

## Verder

- [Commando's](/docs/commands) · [Subcommando's](/docs/subcommands) · [Automatisch aanvullen](/docs/autocomplete)
`,
    },
  },
  {
    slug: "subcommands",
    order: 22,
    en: {
      title: "Subcommands",
      description: "Flat subs and one group level.",
      body: `
Subcommands split one slash name into leaves: \`/mod kick\`, \`/mod ban\`. Discord allows options on the leaf, and **one** group level under the parent (\`/mod user ban\`). Use them when several actions share a name. Unrelated tools should stay separate top-level commands.

\`command()\` takes a map of \`sub()\` and \`group()\` instead of a handler. The parent has **no** top-level \`run\`.

<DocMedia id="subcommands" />

## Flat leaves

\`sub(description, options?, run, locales?)\` — description first, then options, then the handler. The fourth argument is only \`{ locales }\`. It is not \`need\` or \`cooldown\`.

\`timeout(user, 0)\` clears a timeout. Both leaves share the parent gate: \`need\`, \`ownerOnly\`, \`when\`, \`cooldown\`, and \`defer\` live on \`command()\`, and they apply to every leaf.

## One group

\`group(description, { leaf: sub(...) })\` nests a single level. A group only holds \`sub()\` entries, not more groups. That registers \`/mod user kick\`. The \`locales\` value may be a string (description only) or \`{ description, name }\`.

<Compare id="sub-shapes" />

\`\`\`text
/mod
 ├── timeout          sub + options + handler
 ├── clear            sub + options + handler
 └── user             group
      └── kick        sub
\`\`\`

<Warn>
Do not pass \`group({ kick: sub(...) })\` with a single object. \`group\` wants a description string first. Do not put \`{ need: "BanMembers" }\` on \`sub()\`. \`need\` is not read as locales. It is dropped. Only \`.locales\` is read.
</Warn>

## When gates differ

\`need\` cannot differ per leaf. If kick needs \`KickMembers\` and ban needs \`BanMembers\`, register two commands. A shared \`ModerateMembers\` parent is fine when every leaf is a timeout.

Leaf descriptions follow the same 1–100 rule. Leaf and group names follow \`^[a-z0-9-]{1,32}$\`.

## Pitfalls

- Options on the parent \`command()\` are not allowed once the third argument is a sub map.
- A group with zero subs throws. A group that contains another group throws.
- Parent \`cooldown: 10\` buckets the whole \`/mod\` name, not each leaf separately.

## Related

- [Commands](/docs/commands) · [Moderation actions](/docs/mod-actions) · [Permissions](/docs/permissions)
`,
    },
    nl: {
      title: "Subcommando's",
      description: "Platte subs en één groepsniveau.",
      body: `
Subcommando's splitsen één slash-naam in bladeren: \`/mod kick\`, \`/mod ban\`. Discord staat opties op het blad toe, en **één** groepsniveau onder de parent (\`/mod user ban\`). Gebruik ze als meerdere acties een naam delen. Losse tools blijven aparte top-level commando's.

\`command()\` krijgt een map van \`sub()\` en \`group()\` in plaats van een handler. De parent heeft **geen** eigen \`run\`.

<DocMedia id="subcommands" />

## Platte bladeren

\`sub(description, options?, run, locales?)\` — eerst de beschrijving, dan opties, dan de handler. Het vierde argument is alleen \`{ locales }\`. Geen \`need\` en geen \`cooldown\`.

\`timeout(user, 0)\` heft een timeout op. Beide bladeren delen de parent-gate: \`need\`, \`ownerOnly\`, \`when\`, \`cooldown\` en \`defer\` staan op \`command()\` en gelden voor elk blad.

## Eén groep

\`group(description, { blad: sub(...) })\` nest één niveau. Een groep bevat alleen \`sub()\`, geen groepen. Dat registreert \`/mod user kick\`. \`locales\` mag een string zijn (alleen beschrijving) of \`{ description, name }\`.

<Compare id="sub-shapes-nl" />

\`\`\`text
/mod
 ├── timeout          sub + opties + handler
 ├── clear            sub + opties + handler
 └── user             groep
      └── kick        sub
\`\`\`

<Warn>
Geef niet \`group({ kick: sub(...) })\` met één object. \`group\` wil eerst een beschrijving. Zet \`{ need: "BanMembers" }\` niet op \`sub()\`. \`need\` wordt niet als locales gelezen. Het valt weg. Alleen \`.locales\` wordt gelezen.
</Warn>

## Als gates verschillen

\`need\` kan niet per blad verschillen. Als kick \`KickMembers\` nodig heeft en ban \`BanMembers\`, registreer je twee commando's. Een gedeelde \`ModerateMembers\` op de parent is prima als elk blad een timeout is.

## Valkuilen

- Opties op de parent \`command()\` mogen niet als het derde argument een sub-map is.
- Een groep zonder subs gooit. Een groep die weer een groep bevat gooit.
- \`cooldown: 10\` op de parent geldt voor de hele naam \`/mod\`, niet per blad.

## Verder

- [Commando's](/docs/commands) · [Mod-acties](/docs/mod-actions) · [Rechten](/docs/permissions)
`,
    },
  },
  {
    slug: "context-menus",
    order: 23,
    en: {
      title: "Context menus",
      description: "User and message right-click commands.",
      body: `
Context menus are commands that appear under **Apps** when you right-click a user or a message. They have no slash options. The target arrives on \`ctx.target\`. Use them for "do this to *that* person or message" without asking the user to type an id.

They load from the same folder as slash commands. \`loadCommands()\` keeps any export where \`isMenu()\` is true.

## Two builders

| Builder | \`ctx.target\` |
|---------|----------------|
| \`userMenu(name, run)\` | \`User\` (\`id\`, \`name\`, \`bot\`, \`createdAt\`, \`icon?\`) |
| \`messageMenu(name, run)\` | \`{ id, content, authorId }\` |

The name is 1–32 characters and may include spaces, letters, digits, underscores, and hyphens (\`[\\w -]\`). That is looser than a slash name.

Metadata, when you need it, sits **between** the name and the handler: \`userMenu(name, meta, run)\`. You can pass \`ownerOnly\`, \`cooldown\`, \`locales\`, and \`defer\`. Do not rely on \`need\` here: menus do not get \`memberPermissions\`, so any non-zero \`need\` always blocks.

## Inspect a user

\`\`\`js
import { userMenu, embed, colors } from "@draeven/core";

export const whois = userMenu("Who is this", async (ctx) => {
  const u = ctx.target;
  return ctx.reply(
    embed({
      header: { title: u.name },
      description: \`ID \${u.id}\`,
      color: colors.blurple,
    })
  );
});
\`\`\`

## Quote a message

\`\`\`js
import { messageMenu } from "@draeven/core";

export const quote = messageMenu("Quote", async (ctx) => {
  const msg = ctx.target;
  return ctx.reply(\`> \${msg.content}\\n— <@\${msg.authorId}>\`);
});
\`\`\`

## Menu reply

\`\`\`js
import { form, userMenu } from "@draeven/core";

export const report = userMenu("Report", { defer: { private: true } }, async (ctx) =>
  ctx.reply(
    form({
      id: "report-form",
      title: "Report",
      fields: [{ id: "why", label: "Why?" }],
    })
  )
);
\`\`\`

The menu context has \`reply\`, \`wait\`, \`edit\`, lookups, \`author\`, and \`locale\`. It does not have slash option fields, \`followup\`, \`collect\`, or the moderation helpers. \`reply(form())\` works from a menu. A form is not limited to slash commands. Menu \`reply\` does not take \`poll()\`, \`layout()\`, or a \`{ private: true }\` options object. That second argument must be an embed. For an ephemeral menu, call \`await ctx.wait({ private: true })\` and then \`edit\`, or set \`defer: { private: true }\` in metadata.

Menu \`need\` does not receive \`memberPermissions\`. The bitfield is \`0\`. Any non-zero \`need\` always blocks, including \`Administrator\`. Use \`ownerOnly\` or \`when\` when you need a gate.

<Note>
Menus sync with the same guild or global rules as slash commands. A missing menu after deploy is usually a stale global registration, not a failed export.
</Note>

## Pitfalls

- \`ctx.target\` on a message menu is not a full message object. You get \`id\`, \`content\`, and \`authorId\` only.
- Two user menus with the same name throw when the folder loads. Two message menus with the same name throw too.
- Do not invent slash options on a menu. Discord will not show them.

## Related

- [Commands](/docs/commands) · [Embeds & layout](/docs/embeds-layout) · [Replies](/docs/replies)
`,
    },
    nl: {
      title: "Contextmenu's",
      description: "User- en berichtmenu's via rechtermuisklik.",
      body: `
Contextmenu's zijn commando's onder **Apps** als je met rechts op een gebruiker of een bericht klikt. Ze hebben geen slash-opties. Het doel komt binnen op \`ctx.target\`. Gebruik ze voor "doe dit met *die* persoon of dat bericht" zonder dat iemand een id typt.

Ze laden uit dezelfde map als slash-commando's. \`loadCommands()\` houdt elke export waar \`isMenu()\` waar is.

## Twee builders

| Builder | \`ctx.target\` |
|---------|----------------|
| \`userMenu(name, run)\` | \`User\` (\`id\`, \`name\`, \`bot\`, \`createdAt\`, \`icon?\`) |
| \`messageMenu(name, run)\` | \`{ id, content, authorId }\` |

De naam is 1–32 tekens en mag spaties, letters, cijfers, underscores en koppeltekens bevatten (\`[\\w -]\`). Dat is ruimer dan een slash-naam.

Metadata staat **tussen** de naam en de handler: \`userMenu(name, meta, run)\`. Je kunt \`ownerOnly\`, \`cooldown\`, \`locales\` en \`defer\` meegeven. Vertrouw hier niet op \`need\`: menu's krijgen geen \`memberPermissions\`, dus elke \`need\` die niet nul is blokkeert altijd.

## Gebruiker bekijken

\`\`\`js
import { userMenu, embed, colors } from "@draeven/core";

export const wieisdit = userMenu("Wie is dit", async (ctx) => {
  const u = ctx.target;
  return ctx.reply(
    embed({
      header: { title: u.name },
      description: \`ID \${u.id}\`,
      color: colors.blurple,
    })
  );
});
\`\`\`

## Bericht citeren

\`\`\`js
import { messageMenu } from "@draeven/core";

export const quote = messageMenu("Citeer", async (ctx) => {
  const msg = ctx.target;
  return ctx.reply(\`> \${msg.content}\\n— <@\${msg.authorId}>\`);
});
\`\`\`

## Menu-antwoord

\`\`\`js
import { form, userMenu } from "@draeven/core";

export const report = userMenu("Rapporteer", { defer: { private: true } }, async (ctx) =>
  ctx.reply(
    form({
      id: "report-form",
      title: "Melding",
      fields: [{ id: "why", label: "Waarom?" }],
    })
  )
);
\`\`\`

De menucontext heeft \`reply\`, \`wait\`, \`edit\`, lookups, \`author\` en \`locale\`. Geen slash-opties, geen \`followup\`, geen \`collect\` en geen moderatiehelpers. \`reply(form())\` werkt vanuit een menu. Een formulier is niet beperkt tot slash-commando's. Menu-\`reply\` neemt geen \`poll()\`, \`layout()\` of een \`{ private: true }\`-optieobject. Dat tweede argument moet een embed zijn. Voor een efemeer menu roep je \`await ctx.wait({ private: true })\` aan en daarna \`edit\`, of zet je \`defer: { private: true }\` in metadata.

Menu-\`need\` krijgt geen \`memberPermissions\`. Het bitveld is \`0\`. Elke \`need\` die niet nul is blokkeert altijd, ook \`Administrator\`. Gebruik \`ownerOnly\` of \`when\` als je een gate nodig hebt.

<Note>
Menu's synchroniseren met dezelfde guild- of globale regels als slash-commando's. Een ontbrekend menu na een deploy is meestal een verouderde globale registratie, geen mislukte export.
</Note>

## Valkuilen

- \`ctx.target\` bij een berichtmenu is geen volledig bericht. Je krijgt alleen \`id\`, \`content\` en \`authorId\`.
- Twee user-menu's met dezelfde naam gooien bij het laden van de map. Twee berichtmenu's met dezelfde naam gooien ook.
- Verzin geen slash-opties op een menu. Discord toont ze niet.

## Verder

- [Commando's](/docs/commands) · [Embeds en layout](/docs/embeds-layout) · [Antwoorden](/docs/replies)
`,
    },
  },
  {
    slug: "autocomplete",
    order: 24,
    en: {
      title: "Autocomplete",
      description: "Suggestions while a user types an option.",
      body: `
Autocomplete fills a focused option while the user is still typing. Attach \`.suggest(handler)\` to \`text()\`, \`number()\`, or \`decimal()\`. Discord calls that handler on each keystroke. The command handler still runs later, with whatever value was submitted.

Use \`choice()\` instead when the list is fixed and short. Suggestions are for search, not for validation.

## Suggest context

The handler receives lookups plus:

| Field | Meaning |
|-------|---------|
| \`typed\` | What they have typed so far. Not \`value\`. |
| \`focused\` | Option name Discord is editing. |
| \`author\` | Caller \`{ id }\`. |

Return at most **25** items. Extra items are dropped. Each item is a string or \`{ label, value }\`. String values must be 1–100 characters. A number suggestion is a string such as \`"5"\`, or \`{ label, value }\` with a numeric \`value\`. A bare number throws.

## Worked example

\`\`\`js
import { command, text } from "@draeven/core";

const NAMES = ["alpha", "beta", "gamma", "delta"];

export const find = command(
  "find",
  "Find something",
  {
    query: text("Query?").required().suggest(async (ctx) => {
      const q = ctx.typed.toLowerCase();
      return NAMES.filter((name) => name.includes(q))
        .slice(0, 25)
        .map((name) => ({ label: name, value: name }));
    }),
  },
  async (ctx) => ctx.reply(\`Picked \${ctx.query}\`)
);
\`\`\`

A plain string list is enough when label and value match:

\`\`\`js
.suggest((ctx) => NAMES.filter((name) => name.startsWith(ctx.typed)).slice(0, 25))
\`\`\`

## Numbers

\`\`\`js
import { command, number } from "@draeven/core";

export const qty = command(
  "qty",
  "Pick a size",
  {
    n: number("How many?").required().suggest((ctx) => {
      const prefix = ctx.typed.trim();
      return ["1", "5", "10", "25"].filter((n) => n.startsWith(prefix));
    }),
  },
  async (ctx) => ctx.reply(String(ctx.n))
);
\`\`\`

Fixed \`choices\` on \`number()\` or \`decimal()\` cannot be combined with \`.suggest()\`. Draeven throws when you build that option.

<Warn>
The handler is not a validator. A user can submit text that never appeared in the list. Check \`ctx.query\` again in the command if only known ids are legal.
</Warn>

## Keep it fast

Discord expects the suggestion response inside a short window, separate from the 3-second command ack. Filter memory. Do not open a fresh database round-trip on every character. Cache the list outside the handler.

## Pitfalls

- \`.suggest()\` does not exist on \`user()\`, \`role()\`, \`channel()\`, \`choice()\`, or \`flag()\`.
- Empty \`typed\` should still return a useful first page, or the menu looks broken on focus.
- More than 25 items is silent truncation, not an error. Slice yourself so the order is the one you want.

## Related

- [Options](/docs/options) · [Commands](/docs/commands)
`,
    },
    nl: {
      title: "Automatisch aanvullen",
      description: "Suggesties terwijl iemand een optie typt.",
      body: `
Automatisch aanvullen vult een gefocuste optie terwijl de gebruiker nog typt. Hang \`.suggest(handler)\` aan \`text()\`, \`number()\` of \`decimal()\`. Discord roept die handler aan bij elke toets. De commandohandler draait later, met de waarde die werd verstuurd.

Gebruik \`choice()\` als de lijst vast en kort is. Suggesties zijn om te zoeken, niet om te valideren.

## Suggest-context

De handler krijgt lookups plus:

| Veld | Betekenis |
|------|-----------|
| \`typed\` | Wat er tot nu toe is getypt. Niet \`value\`. |
| \`focused\` | Optienaam die Discord bewerkt. |
| \`author\` | Aanroeper \`{ id }\`. |

Geef maximaal **25** items terug. De rest valt weg. Elk item is een string of \`{ label, value }\`. Stringwaarden zijn 1–100 tekens. Een getalsuggestie is een string zoals \`"5"\`, of \`{ label, value }\` met een numerieke \`value\`. Een kaal getal gooit.

## Voorbeeld

\`\`\`js
import { command, text } from "@draeven/core";

const NAMES = ["alpha", "beta", "gamma", "delta"];

export const find = command(
  "find",
  "Zoek iets",
  {
    query: text("Zoekterm?").required().suggest(async (ctx) => {
      const q = ctx.typed.toLowerCase();
      return NAMES.filter((name) => name.includes(q))
        .slice(0, 25)
        .map((name) => ({ label: name, value: name }));
    }),
  },
  async (ctx) => ctx.reply(\`Gekozen: \${ctx.query}\`)
);
\`\`\`

Een lijst strings is genoeg als label en waarde gelijk zijn:

\`\`\`js
.suggest((ctx) => NAMES.filter((name) => name.startsWith(ctx.typed)).slice(0, 25))
\`\`\`

## Getallen

\`\`\`js
import { command, number } from "@draeven/core";

export const qty = command(
  "qty",
  "Kies een maat",
  {
    n: number("Hoeveel?").required().suggest((ctx) => {
      const prefix = ctx.typed.trim();
      return ["1", "5", "10", "25"].filter((n) => n.startsWith(prefix));
    }),
  },
  async (ctx) => ctx.reply(String(ctx.n))
);
\`\`\`

Vaste \`choices\` op \`number()\` of \`decimal()\` kunnen niet samen met \`.suggest()\`. Draeven gooit bij het bouwen van die optie.

<Warn>
De handler valideert niet. Iemand kan tekst insturen die nooit in de lijst stond. Controleer \`ctx.query\` opnieuw in het commando als alleen bekende ids geldig zijn.
</Warn>

## Snel houden

Discord verwacht het suggestie-antwoord in een kort venster, los van de 3 seconden van het commando. Filter in het geheugen. Open geen nieuwe database-ronde per teken. Cache de lijst buiten de handler.

## Valkuilen

- \`.suggest()\` bestaat niet op \`user()\`, \`role()\`, \`channel()\`, \`choice()\` of \`flag()\`.
- Een lege \`typed\` hoort nog steeds een nuttige eerste pagina te geven, anders oogt het menu stuk bij focus.
- Meer dan 25 items wordt stil afgekapt, zonder fout. Snijd zelf zodat de volgorde klopt.

## Verder

- [Opties](/docs/options) · [Commando's](/docs/commands)
`,
    },
  },
  {
    slug: "permissions",
    order: 25,
    en: {
      title: "Permissions & gates",
      description: "Registration permissions, need, ownerOnly, and when.",
      body: `
**Registration** hides the command in Discord’s picker. **Gates** (\`ownerOnly\` → \`need\` → \`when\`) block \`run\` inside your process.

<WhenToUse topic="permissions" />

## need

\`need\` is one \`PermissionName\`, a list (all required), or a raw bitfield (\`string\` or \`bigint\`). Names match Discord's PascalCase flags, including \`BanMembers\`, \`KickMembers\`, \`ModerateMembers\`, \`ManageMessages\`, \`ManageGuild\`, and \`SendPolls\`.

\`\`\`js
import { command, user } from "@draeven/core";

export const ban = command(
  "ban",
  "Ban a member",
  { who: user("Who?").required() },
  async (ctx) => {
    await ctx.ban(ctx.who, { reason: "Moderation" });
    return ctx.reply(\`Banned \${ctx.who.name}.\`);
  },
  { need: "BanMembers" }
);
\`\`\`

The bitfield is the member's permissions in the channel, as Discord put them on the interaction. Draeven does not recompute role hierarchy.

## ownerOnly

\`ownerOnly: true\` allows only the **server owner** (\`author.id\` must equal the guild owner id). The framework string is "Only the server owner can use this." It is not the Discord application owner. In a DM there is no owner id, so the gate fails.

## when

\`when(ctx)\` returns \`false\` to block. \`ctx\` here is a gate context: \`author\`, \`locale\`, and the lookups. It is not the full command \`ctx\` (no \`reply\` yet — the handler has not started). \`getChannel()\` is always \`undefined\` here. The dispatcher does not pass a channel. \`getGuild()\` works when the interaction has a guild.

\`\`\`js
{
  need: "ManageMessages",
  when: (ctx) => ctx.getGuild()?.id === "123456789012345678",
}
\`\`\`

Use \`when\` for "this guild only" or "not in a DM" (\`Boolean(ctx.getGuild())\`). Use \`need\` for permission bits.

## Registration fields

| Field | Effect |
|-------|--------|
| \`permissions\` | Default member permissions stored on the command. Same name type as \`need\`. |
| \`places\` | \`"guild"\`, \`"bot dm"\`, \`"private"\`. |
| \`install\` | \`"guild"\` or \`"user"\` install context. |
| \`nsfw\` | Command only in age-restricted channels. |

\`permissions\` does not replace \`need\`. Discord can still deliver the interaction if an admin overrides the default. \`need\` is the check you control.

<Tip>
Subcommands cannot carry their own \`need\`. Put the gate on the parent \`command()\`. If two leaves need different bits, make two commands ([Subcommands](/docs/subcommands)).
</Tip>

## Pitfalls

- \`Administrator\` passes \`hasPermissions\` and \`need\`. Draeven treats the Administrator bit (\`1 << 3\`) as every permission.
- The auto-defer timer starts after the gates. A slow \`when()\` is not deferred. Keep the gate fast, or the interaction can expire before the handler starts ([Replies](/docs/replies)).
- \`hasPermissions(have, need)\` is exported if you compare bitfields yourself. The command path already calls it for \`need\`.

## Related

- [Commands](/docs/commands) · [Cooldowns](/docs/cooldowns) · [Moderation actions](/docs/mod-actions)
`,
    },
    nl: {
      title: "Rechten & gates",
      description: "Registratierechten, need, ownerOnly en when.",
      body: `
**Registratie** verbergt het commando in Discords kiezer. **Gates** (\`ownerOnly\` → \`need\` → \`when\`) blokkeren \`run\` in jouw proces.

<WhenToUse topic="permissions" />

## need

\`need\` is één \`PermissionName\`, een lijst (allemaal vereist), of een ruw bitveld (\`string\` of \`bigint\`). Namen volgen Discord's PascalCase, waaronder \`BanMembers\`, \`KickMembers\`, \`ModerateMembers\`, \`ManageMessages\`, \`ManageGuild\` en \`SendPolls\`.

\`\`\`js
import { command, user } from "@draeven/core";

export const ban = command(
  "ban",
  "Ban een lid",
  { who: user("Wie?").required() },
  async (ctx) => {
    await ctx.ban(ctx.who, { reason: "Moderatie" });
    return ctx.reply(\`Geband: \${ctx.who.name}.\`);
  },
  { need: "BanMembers" }
);
\`\`\`

Het bitveld is de kanaalrechten van het lid, zoals Discord ze op de interactie zette. Draeven rekent de rolhiërarchie niet opnieuw uit.

## ownerOnly

\`ownerOnly: true\` laat alleen de **servereigenaar** toe (\`author.id\` moet gelijk zijn aan de guild-owner-id). De frameworktekst is "Alleen de servereigenaar kan dit gebruiken." Het is niet de eigenaar van de Discord-applicatie. In een DM is er geen owner-id, dus de gate faalt.

## when

\`when(ctx)\` geeft \`false\` terug om te blokkeren. Deze \`ctx\` is een gate-context: \`author\`, \`locale\` en de lookups. Het is niet de volledige commando-\`ctx\` (nog geen \`reply\` — de handler is niet gestart). \`getChannel()\` is hier altijd \`undefined\`. De dispatcher geeft geen kanaal mee. \`getGuild()\` werkt als de interactie een guild heeft.

\`\`\`js
{
  need: "ManageMessages",
  when: (ctx) => ctx.getGuild()?.id === "123456789012345678",
}
\`\`\`

Gebruik \`when\` voor "alleen deze guild" of "niet in een DM" (\`Boolean(ctx.getGuild())\`). Gebruik \`need\` voor rechtenbits.

## Registratievelden

| Veld | Effect |
|------|--------|
| \`permissions\` | Standaard lid-rechten die op het commando worden opgeslagen. Zelfde naamtype als \`need\`. |
| \`places\` | \`"guild"\`, \`"bot dm"\`, \`"private"\`. |
| \`install\` | Installatiecontext \`"guild"\` of \`"user"\`. |
| \`nsfw\` | Commando alleen in leeftijdsbegrensde kanalen. |

\`permissions\` vervangt \`need\` niet. Discord kan de interactie nog leveren als een beheerder de standaard overschrijft. \`need\` is de check die jij beheert.

<Tip>
Subcommando's kunnen geen eigen \`need\` dragen. Zet de gate op de parent \`command()\`. Als twee bladeren verschillende bits nodig hebben, maak je twee commando's ([Subcommando's](/docs/subcommands)).
</Tip>

## Valkuilen

- \`Administrator\` slaagt voor \`hasPermissions\` en \`need\`. Draeven behandelt de Administrator-bit (\`1 << 3\`) als elk recht.
- De auto-defer-timer start ná de gates. Een trage \`when()\` wordt niet gedefered. Houd de gate snel, anders kan de interactie verlopen vóór de handler start ([Antwoorden](/docs/replies)).
- \`hasPermissions(have, need)\` is geëxporteerd als je bitvelden zelf vergelijkt. Het commandopad roept het al aan voor \`need\`.

## Verder

- [Commando's](/docs/commands) · [Wachttijden](/docs/cooldowns) · [Mod-acties](/docs/mod-actions)
`,
    },
  },
  {
    slug: "cooldowns",
    order: 27,
    en: {
      title: "Cooldowns",
      description: "Per-command waits for a user, channel, or guild.",
      body: `
In-memory wait per command name — not Discord’s rate limit. Cool → private \`frame("cooldown")\`, \`run\` skipped.

<WhenToUse topic="cooldowns" />

Key is \`name:scope:id\` (slash + menu with the same name share a bucket).

## Seconds

A positive number means seconds, scope \`user\`, and a private rejection.

\`\`\`js
import { command } from "@draeven/core";

export const ping = command(
  "ping",
  "Checks whether the bot is alive",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);
\`\`\`

\`0\`, negative numbers, and non-finite values throw when the command runs, not when \`command()\` is built. \`readCooldown\` runs in the dispatcher. Fractional seconds are allowed.

## Scope

\`\`\`js
export const spam = command("spam", "Don't", async (ctx) => ctx.reply("ok"), {
  cooldown: { seconds: 30, scope: "guild", private: true },
});
\`\`\`

| \`scope\` | Key | If the id is missing |
|-----------|-----|----------------------|
| \`user\` (default) | \`name:user:id\` | always present |
| \`guild\` | \`name:guild:id\` | no cooldown in DMs |
| \`channel\` | \`name:channel:id\` | no cooldown when there is no channel |

\`private\` defaults to \`true\`. Set \`private: false\` only when the whole channel should see the wait message.

The English string is \`Wait {seconds}s before using /{name} again.\` Dutch is \`Wacht {seconds}s voor je /{name} opnieuw gebruikt.\`

\`\`\`js
import { frame } from "@draeven/core";

frame("cooldown", "nl", { name: "ping", seconds: 5 });
\`\`\`

Keys are \`cooldown\`, \`need\`, \`when\`, \`owner\`, and \`failed\`. There is no \`cooldown.wait\` key.

<Note>
The book is process memory. A restart clears every cooldown. \`simulate()\` does **not** apply cooldowns — it only runs the handler ([Simulate](/docs/simulate)).
</Note>

## Subcommands

One \`cooldown\` on the parent covers every leaf under that slash name. You cannot attach a cooldown to \`sub()\` alone.

## Pitfalls

- \`take()\` runs before the gates. A failed \`need\`, \`ownerOnly\`, or \`when\` still consumed the cooldown.
- Guild scope with a missing guild id returns no key, so the command runs. Do not use \`guild\` as a DM rate limit.
- Very chatty commands with \`scope: "user"\` still allow the rest of the server to call at the same time. Use \`channel\` or \`guild\` when that matters.
- Cooldown copy is ephemeral by default, which hides it from mods watching the channel.

## Related

- [Permissions](/docs/permissions) · [Locales](/docs/locales) · [Commands](/docs/commands)
`,
    },
    nl: {
      title: "Wachttijden",
      description: "Wachttijd per commando voor een user, kanaal of guild.",
      body: `
Wachttijd in het geheugen per commandonaam — niet Discords rate limit. Nog koel → privé \`frame("cooldown")\`, \`run\` overgeslagen.

<WhenToUse topic="cooldowns" />

Sleutel is \`name:scope:id\` (slash + menu met dezelfde naam delen een emmer).

## Seconden

Een positief getal betekent seconden, scope \`user\`, en een privé-afwijzing.

\`\`\`js
import { command } from "@draeven/core";

export const ping = command(
  "ping",
  "Checkt of de bot leeft",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);
\`\`\`

\`0\`, negatieve getallen en niet-eindige waarden gooien als het commando draait, niet als \`command()\` wordt gebouwd. \`readCooldown\` draait in de dispatcher. Breuken mogen.

## Scope

\`\`\`js
export const spam = command("spam", "Niet doen", async (ctx) => ctx.reply("ok"), {
  cooldown: { seconds: 30, scope: "guild", private: true },
});
\`\`\`

| \`scope\` | Sleutel | Als de id ontbreekt |
|-----------|---------|---------------------|
| \`user\` (standaard) | \`name:user:id\` | altijd aanwezig |
| \`guild\` | \`name:guild:id\` | geen wachttijd in DM's |
| \`channel\` | \`name:channel:id\` | geen wachttijd zonder kanaal |

\`private\` staat standaard op \`true\`. Zet \`private: false\` alleen als het hele kanaal de wachttekst moet zien.

Engels: \`Wait {seconds}s before using /{name} again.\` Nederlands: \`Wacht {seconds}s voor je /{name} opnieuw gebruikt.\`

\`\`\`js
import { frame } from "@draeven/core";

frame("cooldown", "nl", { name: "ping", seconds: 5 });
\`\`\`

Sleutels zijn \`cooldown\`, \`need\`, \`when\`, \`owner\` en \`failed\`. Er is geen sleutel \`cooldown.wait\`.

<Note>
Het boek zit in het procesgeheugen. Een herstart wist elke wachttijd. \`simulate()\` past wachttijden **niet** toe — die draait alleen de handler ([Simuleren](/docs/simulate)).
</Note>

## Subcommando's

Eén \`cooldown\` op de parent dekt elk blad onder die slash-naam. Je kunt geen wachttijd aan alleen \`sub()\` hangen.

## Valkuilen

- \`take()\` draait vóór de gates. Een mislukte \`need\`, \`ownerOnly\` of \`when\` heeft de wachttijd al verbruikt.
- Guild-scope zonder guild-id levert geen sleutel, dus het commando draait. Gebruik \`guild\` niet als DM-limiet.
- Een druk commando met \`scope: "user"\` laat de rest van de server tegelijk aanroepen. Gebruik \`channel\` of \`guild\` als dat uitmaakt.
- De wachttekst is standaard efemeer, dus mods in het kanaal zien hem niet.

## Verder

- [Rechten](/docs/permissions) · [Taalvarianten](/docs/locales) · [Commando's](/docs/commands)
`,
    },
  },
  {
    slug: "locales",
    order: 28,
    en: {
      title: "Locales",
      description: "Translated command text and say().",
      body: `
Discord sends the caller's locale on the interaction (\`en-US\`, \`nl\`, \`nl-NL\`). Draeven copies it to \`ctx.locale\`. You translate three different layers. They do not share one dictionary.

Use this when the same command is shown to more than one language. Framework gate text is already bilingual (English and Dutch).

## Three layers

| Layer | API | What the user sees |
|-------|-----|--------------------|
| Command | \`locales\` on metadata | Slash name and description in the picker |
| Option or sub | \`withLocales()\` or \`sub(..., { locales })\` | That field's name and description |
| Your reply | \`say(map, ctx.locale)\` | The message after they run it |

Locale keys must look like \`nl\` or \`nl-NL\` (\`xx\` or \`xx-YY\`). Empty strings throw.

## Worked example

\`\`\`js
import { command, say, withLocales, user } from "@draeven/core";

export const greet = command(
  "greet",
  "Says hello",
  {
    who: withLocales(user("Who?"), {
      nl: { description: "Wie?", name: "wie" },
    }),
  },
  async (ctx) => ctx.reply(say({ en: "Hello!", nl: "Hallo!" }, ctx.locale)),
  { locales: { nl: { description: "Zegt hallo", name: "groet" } } }
);
\`\`\`

The JavaScript key stays \`who\`. You still read \`ctx.who\`. \`name: "wie"\` is only the label Discord shows for locale \`nl\`.

\`withLocales\` accepts a string too (\`{ nl: "Wie?" }\`), which sets the description only.

## say() order

1. Exact key (\`nl-NL\` if that is what you provided and what Discord sent).
2. Language prefix (\`nl\` from \`nl-NL\`).
3. \`en\`, then \`en-US\`.
4. The first string in the object.

\`say()\` throws if the map is empty or any value is blank. It does not call the network.

## Framework strings

Built-in blocks use \`frame(key, locale, vars?)\`. Only **\`cooldown\`** has placeholders (\`{seconds}\`, \`{name}\`). The other keys are fixed sentences — the \`—\` in the table means no placeholders, not missing text.

| Key | Placeholders | English default |
|-----|----------------|-----------------|
| \`cooldown\` | \`{seconds}\`, \`{name}\` | Wait {seconds}s before using /{name} again. |
| \`need\` | — | You need permission to use this. |
| \`when\` | — | You cannot use this right now. |
| \`owner\` | — | Only the server owner can use this. |
| \`failed\` | — | The command failed. |

Dutch defaults live in the same maps (\`nl\`). You do not pass these through \`say()\` yourself unless you are previewing copy. The live dispatcher already calls \`frame()\`.

<Tip>
Set \`locale: "nl"\` on \`simulate()\` when you want to assert \`say()\` output. Gates and cooldown text are not produced by \`simulate\`.
</Tip>

## Pitfalls

- A localized **command name** must still match Discord's name rules for that locale.
- Translating the option \`name\` does not rename \`ctx.who\`. Handlers that read \`ctx.wie\` will be \`undefined\`.
- \`say\` does not fall through to Dutch just because the machine is Dutch. Add the \`nl\` key.

## Related

- [Commands](/docs/commands) · [Options](/docs/options) · [Cooldowns](/docs/cooldowns)
`,
    },
    nl: {
      title: "Taalvarianten",
      description: "Vertaalde commandotekst en say().",
      body: `
Discord stuurt de locale van de aanroeper mee (\`en-US\`, \`nl\`, \`nl-NL\`). Draeven zet die op \`ctx.locale\`. Je vertaalt drie verschillende lagen. Ze delen geen woordenboek.

Gebruik dit als hetzelfde commando in meer dan één taal verschijnt. Gateteksten van het framework zijn al tweetalig (Engels en Nederlands).

## Drie lagen

| Laag | API | Wat de gebruiker ziet |
|------|-----|------------------------|
| Commando | \`locales\` op metadata | Slash-naam en beschrijving in de kiezer |
| Optie of sub | \`withLocales()\` of \`sub(..., { locales })\` | Naam en beschrijving van dat veld |
| Jouw antwoord | \`say(map, ctx.locale)\` | Het bericht nadat ze het uitvoeren |

Locale-sleutels moeten \`nl\` of \`nl-NL\` lijken (\`xx\` of \`xx-YY\`). Lege strings gooien.

## Voorbeeld

\`\`\`js
import { command, say, withLocales, user } from "@draeven/core";

export const greet = command(
  "greet",
  "Zegt hallo",
  {
    who: withLocales(user("Wie?"), {
      nl: { description: "Wie?", name: "wie" },
    }),
  },
  async (ctx) => ctx.reply(say({ en: "Hello!", nl: "Hallo!" }, ctx.locale)),
  { locales: { nl: { description: "Zegt hallo", name: "groet" } } }
);
\`\`\`

De JavaScript-sleutel blijft \`who\`. Je leest nog steeds \`ctx.who\`. \`name: "wie"\` is alleen het label dat Discord voor locale \`nl\` toont.

\`withLocales\` accepteert ook een string (\`{ nl: "Wie?" }\`), en die zet alleen de beschrijving.

## Volgorde van say()

1. Exacte sleutel (\`nl-NL\` als jij die gaf én Discord die stuurde).
2. Taalprefix (\`nl\` uit \`nl-NL\`).
3. \`en\`, daarna \`en-US\`.
4. De eerste string in het object.

\`say()\` gooit als de map leeg is of een waarde blanco is. Het doet geen netwerkoproep.

## Frameworkteksten

Ingebouwde blokkades gebruiken \`frame(key, locale, vars?)\`. Alleen **\`cooldown\`** heeft placeholders (\`{seconds}\`, \`{name}\`). De andere sleutels zijn vaste zinnen — de \`—\` in de tabel betekent géén placeholders, niet dat tekst ontbreekt.

| Sleutel | Placeholders | Engelse default |
|---------|----------------|-----------------|
| \`cooldown\` | \`{seconds}\`, \`{name}\` | Wait {seconds}s before using /{name} again. |
| \`need\` | — | You need permission to use this. |
| \`when\` | — | You cannot use this right now. |
| \`owner\` | — | Only the server owner can use this. |
| \`failed\` | — | The command failed. |

Nederlandse defaults staan in dezelfde maps (\`nl\`). Je hoeft die niet zelf door \`say()\` te halen, behalve als je de tekst wilt bekijken. De live dispatcher roept \`frame()\` al aan.

<Tip>
Zet \`locale: "nl"\` op \`simulate()\` als je de uitvoer van \`say()\` wilt asserten. Gate- en wachttekst komt niet uit \`simulate\`.
</Tip>

## Valkuilen

- Een gelokaliseerde **commandonaam** moet nog steeds de naamregels van Discord voor die locale volgen.
- De optie-\`name\` vertalen hernoemt \`ctx.who\` niet. Handlers die \`ctx.wie\` lezen krijgen \`undefined\`.
- \`say\` valt niet vanzelf terug op Nederlands omdat de machine Nederlands is. Voeg de sleutel \`nl\` toe.

## Verder

- [Commando's](/docs/commands) · [Opties](/docs/options) · [Wachttijden](/docs/cooldowns)
`,
    },
  },
  {
    slug: "lookups",
    order: 29,
    en: {
      title: "Lookups",
      description: "Users, members, guilds, channels, roles, and files on ctx.",
      body: `
A \`user()\`, \`channel()\`, \`role()\`, or \`file()\` option is already the object. Lookups are for the caller, the bot, and ids that were not options. They are methods on \`ctx\`. Do not import a lookup helper.

## Records

| Type | Fields |
|------|--------|
| \`User\` | \`id\`, \`name\`, \`createdAt\`, \`bot\`, optional \`icon\` |
| \`Member\` | \`id\`, optional \`nick\`, optional \`joinedAt\`, \`roles\` |
| \`Guild\` | \`id\`, \`name\`, optional \`members\`, \`online\`, \`icon\`, \`ownerId\` |
| \`Channel\` | \`id\`, \`name\`, optional \`kind\` |
| \`Role\` | \`id\`, \`name\`, optional \`color\` (\`0\` or missing means no color), optional \`position\` |
| \`File\` | \`id\`, \`name\`, \`url\`, optional \`size\`, optional \`type\` |

## Calls

| Call | Result |
|------|--------|
| \`getUser(ref)\` | \`User\`. Throws when the id is missing or unknown. |
| <Explain topic="lookup-member">\`getMember(ref)\`</Explain> | \`Member\` in this guild. \`undefined\` in a DM. Still throws if that user is unknown. |
| \`getBot()\` | The bot as a \`User\`. Throws when this run has no bot. |
| \`getGuild()\` | \`Guild\`, or \`undefined\` in a direct message. |
| \`getChannel()\` | The channel this interaction is in, or \`undefined\`. |
| \`getChannel(ref)\` | That channel. Throws when it is unknown. |
| \`getRole(ref)\` | \`Role\`. Throws when it is unknown. |
| \`getRoles(ref)\` | That person's roles, or \`[]\`. Throws when the user is unknown. |
| \`getFile(ref)\` | \`File\`. Throws when it is unknown. |

\`ref\` is \`{ id }\`. \`ctx.author\` already has that shape.

\`getChannel()\` with no argument is the channel this slash ran in — the usual input for \`ctx.send\` in a guild command. \`getChannel(ref)\` resolves any channel id Discord attached to this interaction.

## Example

\`\`\`js
import { command } from "@draeven/core";

export const whoami = command("whoami", "Who called this", async (ctx) => {
  const person = ctx.getUser(ctx.author);
  const member = ctx.getMember(ctx.author);
  const roles = ctx.getRoles(ctx.author);
  const name = member?.nick ?? person.name;
  const list = roles.map((role) => role.name).join(", ");
  return ctx.reply(list ? \`\${name} — \${list}\` : name);
});
\`\`\`

A chosen \`user()\` option is the \`User\` already. Call \`getMember\` and \`getRoles\` when you need the nick or the role list for that same id.

## Pitfalls

- \`getUser\` only knows users Discord attached to this interaction. An id you invented throws \`Unknown user …\`.
- \`getMember\` is not a failed lookup of the account. In a DM the user exists and the member does not, so the result is \`undefined\`.
- \`getRoles\` in a DM is \`[]\` when the user is known. It does not throw for "no roles".

## Related

- [Options](/docs/options) · [Commands](/docs/commands) · [formatDate](/docs/format-date)
`,
    },
    nl: {
      title: "Lookups",
      description: "Gebruikers, leden, guilds, kanalen, rollen en bestanden op ctx.",
      body: `
Een optie \`user()\`, \`channel()\`, \`role()\` of \`file()\` is al het object. Lookups zijn voor de aanroeper, de bot, en ids die geen optie waren. Het zijn methodes op \`ctx\`. Importeer geen lookup-helper.

## Records

| Type | Velden |
|------|--------|
| \`User\` | \`id\`, \`name\`, \`createdAt\`, \`bot\`, optioneel \`icon\` |
| \`Member\` | \`id\`, optioneel \`nick\`, optioneel \`joinedAt\`, \`roles\` |
| \`Guild\` | \`id\`, \`name\`, optioneel \`members\`, \`online\`, \`icon\`, \`ownerId\` |
| \`Channel\` | \`id\`, \`name\`, optioneel \`kind\` |
| \`Role\` | \`id\`, \`name\`, optioneel \`color\` (\`0\` of ontbrekend betekent geen kleur), optioneel \`position\` |
| \`File\` | \`id\`, \`name\`, \`url\`, optioneel \`size\`, optioneel \`type\` |

## Aanroepen

| Aanroep | Resultaat |
|---------|-----------|
| \`getUser(ref)\` | \`User\`. Gooit als de id ontbreekt of onbekend is. |
| <Explain topic="lookup-member">\`getMember(ref)\`</Explain> | \`Member\` in deze guild. \`undefined\` in een DM. Gooit nog steeds als die gebruiker onbekend is. |
| \`getBot()\` | De bot als \`User\`. Gooit als deze run geen bot heeft. |
| \`getGuild()\` | \`Guild\`, of \`undefined\` in een privébericht. |
| \`getChannel()\` | Het kanaal van deze interactie, of \`undefined\`. |
| \`getChannel(ref)\` | Dat kanaal. Gooit als het onbekend is. |
| \`getRole(ref)\` | \`Role\`. Gooit als die onbekend is. |
| \`getRoles(ref)\` | De rollen van die persoon, of \`[]\`. Gooit als de gebruiker onbekend is. |
| \`getFile(ref)\` | \`File\`. Gooit als die onbekend is. |

\`ref\` is \`{ id }\`. \`ctx.author\` heeft die vorm al.

\`getChannel()\` zonder argument is het kanaal van deze slash — de gebruikelijke invoer voor \`ctx.send\` in een guild-commando. \`getChannel(ref)\` lost een kanaal-id op die Discord op deze interactie zette.

## Voorbeeld

\`\`\`js
import { command } from "@draeven/core";

export const wiebenik = command("wiebenik", "Wie riep dit aan", async (ctx) => {
  const person = ctx.getUser(ctx.author);
  const member = ctx.getMember(ctx.author);
  const roles = ctx.getRoles(ctx.author);
  const name = member?.nick ?? person.name;
  const list = roles.map((role) => role.name).join(", ");
  return ctx.reply(list ? \`\${name} — \${list}\` : name);
});
\`\`\`

Een gekozen \`user()\`-optie is al de \`User\`. Roep \`getMember\` en \`getRoles\` aan als je de nick of de rollenlijst bij diezelfde id nodig hebt.

## Valkuilen

- \`getUser\` kent alleen gebruikers die Discord aan deze interactie hing. Een id die je zelf verzon gooit \`Unknown user …\`.
- \`getMember\` is geen mislukte lookup van het account. In een DM bestaat de gebruiker wel en het lid niet, dus het resultaat is \`undefined\`.
- \`getRoles\` in een DM is \`[]\` als de gebruiker bekend is. Het gooit niet omdat er geen rollen zijn.

## Verder

- [Opties](/docs/options) · [Commando's](/docs/commands) · [formatDate](/docs/format-date)
`,
    },
  },
  {
    slug: "format-date",
    order: 30,
    en: {
      title: "formatDate utility",
      description: "Helper that formats one UTC calendar day for a country — not Discord time().",
      body: `
\`formatDate(date, country)\` writes one calendar day as a plain string. The day is **UTC**. The country chooses the order, the separators, and the digits. It does not shift the instant into the reader's clock, and it does not include a time of day.

Use it when every reader must see the same characters: a log line, a plain \`reply\`, or an embed field that should not retick. A Discord timestamp that each person sees in their own zone is <Explain topic="format-vs-time">\`time()\`</Explain> inside an embed. \`formatDate\` does not take a style such as \`"relative"\` or \`"long date"\`.

## Worked example

\`person.createdAt\` is a \`Date\`. \`Netherlands\` is the country code \`"NL"\` (\`countries.Netherlands\` is the same value). The embed shows both strings so you can see what stays fixed and what Discord localizes.

\`\`\`js
import { command, embed, formatDate, Netherlands, time } from "@draeven/core";

export const joined = command("joined", "When this account was created", async (ctx) => {
  const person = ctx.getUser(ctx.author);
  const day = formatDate(person.createdAt, Netherlands);
  return ctx.reply(
    embed({
      header: { title: person.name },
      fields: [
        { name: "UTC day", value: day },
        { name: "For the reader", value: time(person.createdAt, "date") },
      ],
    })
  );
});
\`\`\`

For 5 March 2020, 00:00 UTC, \`formatDate\` returns:

| Country | Result |
|---------|--------|
| \`Netherlands\` | \`05-03-2020\` |
| \`UnitedStates\` | \`03/05/2020\` |
| \`UnitedKingdom\` | \`05/03/2020\` |
| \`Japan\` | \`2020/03/05\` |

\`time(person.createdAt, "date")\` becomes a Discord \`<t:…>\` stamp. Each reader sees that stamp in their own zone. The \`formatDate\` cell stays \`05-03-2020\` for everyone when the country is \`Netherlands\`.

## Limits

| Limit | What happens |
|-------|----------------|
| Input | A real \`Date\`. Anything else, including an invalid date, throws \`A date is required.\` |
| Country | A code from \`countries\`. \`Netherlands\` is \`"NL"\`. Anything else throws \`Unknown country.\` |
| Calendar day | UTC. The country only picks order, separators, and digits. |
| Clock | No hours or minutes. The string is one day. |
| Zone | The reader's zone is not applied. \`time()\` does that. |
| Shape | Day and month are 2 digits, year is numeric, calendar is Gregorian. |

Every value in \`countries\` is accepted. The named exports (\`Netherlands\`, \`Japan\`, …) are those codes.

## Pitfalls

- The English name \`"Netherlands"\` is not a code. Pass the constant \`Netherlands\` or \`"NL"\`. \`"ZZ"\` throws \`Unknown country.\`
- A string such as \`"2020-03-05"\` is not a \`Date\`. Wrap it in \`new Date(...)\` first. \`new Date(NaN)\` throws \`A date is required.\`
- Around midnight UTC the calendar day can differ from the date the reader still sees locally. Use \`time()\` when each reader should see their own day.
- \`formatDate\` has no style argument. \`"relative"\` and \`"long date"\` belong to \`time()\`.
`,
    },
    nl: {
      title: "formatDate-hulp",
      description: "Hulpfunctie die één UTC-kalenderdag voor een land formatteert — niet Discord time().",
      body: `
\`formatDate(date, country)\` schrijft één kalenderdag als gewone string. De dag is **UTC**. Het land kiest de volgorde, de scheidingstekens en de cijfers. Het schuift het tijdstip niet naar de klok van de lezer, en het zet er geen tijd van de dag bij.

Gebruik het als elke lezer dezelfde tekens moet zien: een logregel, een gewone \`reply\`, of een embedveld dat niet mag verspringen. Een Discord-tijdstempel die iedereen in de eigen zone ziet is <Explain topic="format-vs-time">\`time()\`</Explain> in een embed. \`formatDate\` neemt geen stijl zoals \`"relative"\` of \`"long date"\`.

## Uitgewerkt voorbeeld

\`person.createdAt\` is een \`Date\`. \`Netherlands\` is de landcode \`"NL"\` (\`countries.Netherlands\` is dezelfde waarde). De embed toont beide strings, zodat je ziet wat vast blijft en wat Discord lokaliseert.

\`\`\`js
import { command, embed, formatDate, Netherlands, time } from "@draeven/core";

export const joined = command("joined", "Wanneer dit account is gemaakt", async (ctx) => {
  const person = ctx.getUser(ctx.author);
  const day = formatDate(person.createdAt, Netherlands);
  return ctx.reply(
    embed({
      header: { title: person.name },
      fields: [
        { name: "UTC-dag", value: day },
        { name: "Voor de lezer", value: time(person.createdAt, "date") },
      ],
    })
  );
});
\`\`\`

Voor 5 maart 2020, 00:00 UTC, geeft \`formatDate\` terug:

| Land | Resultaat |
|------|-----------|
| \`Netherlands\` | \`05-03-2020\` |
| \`UnitedStates\` | \`03/05/2020\` |
| \`UnitedKingdom\` | \`05/03/2020\` |
| \`Japan\` | \`2020/03/05\` |

\`time(person.createdAt, "date")\` wordt een Discord-stempel \`<t:…>\`. Elke lezer ziet die stempel in de eigen zone. De \`formatDate\`-cel blijft \`05-03-2020\` voor iedereen als het land \`Netherlands\` is.

## Grenzen

| Grens | Wat er gebeurt |
|-------|----------------|
| Invoer | Een echte \`Date\`. Al het andere, ook een ongeldige datum, gooit \`A date is required.\` |
| Land | Een code uit \`countries\`. \`Netherlands\` is \`"NL"\`. Al het andere gooit \`Unknown country.\` |
| Kalenderdag | UTC. Het land kiest alleen volgorde, scheidingstekens en cijfers. |
| Klok | Geen uren of minuten. De string is één dag. |
| Zone | De zone van de lezer wordt niet toegepast. Dat doet \`time()\`. |
| Vorm | Dag en maand zijn 2 cijfers, het jaar is numeriek, de kalender is Gregoriaans. |

Elke waarde in \`countries\` is geldig. De benoemde exports (\`Netherlands\`, \`Japan\`, …) zijn die codes.

## Valkuilen

- De Engelse naam \`"Netherlands"\` is geen code. Geef de constante \`Netherlands\` of \`"NL"\` mee. \`"ZZ"\` gooit \`Unknown country.\`
- Een string zoals \`"2020-03-05"\` is geen \`Date\`. Wikkel die eerst in \`new Date(...)\`. \`new Date(NaN)\` gooit \`A date is required.\`
- Rond middernacht UTC kan de kalenderdag afwijken van de datum die de lezer lokaal nog ziet. Gebruik \`time()\` als elke lezer de eigen dag moet zien.
- \`formatDate\` heeft geen stijlargument. \`"relative"\` en \`"long date"\` horen bij \`time()\`.
`,
    },
  },
  {
    slug: "replies",
    order: 40,
    en: {
      title: "Replies & followups",
      description: "reply, wait, edit, followup, and remove.",
      body: `
Acknowledge within about **3 seconds**. Then you have about 15 minutes for follow-ups. Methods on \`ctx\`: \`reply\`, \`wait\`, \`edit\`, \`followup\`, \`remove\`.

<Explain topic="auto-defer">Auto-defer</Explain> fires at 2 seconds unless you turn it off.

## Which method

| Method | When |
|--------|------|
| \`reply(...)\` | Stores the response. A second call throws only when a reply is already stored and you have neither waited nor flushed a collect. After \`wait()\`, \`edit()\` or another \`reply()\` fills it. After a collect flush, another \`reply()\` replaces it. |
| \`wait({ private? })\` | Acknowledge with no content yet. Required before \`edit\` if you have not replied. |
| \`edit(...)\` | Replace the deferred or already sent reply. |
| \`followup(...)\` | Another message after the first reply. Returns a promise. |
| \`remove()\` | Delete the interaction reply. |

\`reply\` and \`edit\` accept a string, an \`embed()\`, both (\`reply(text, embed)\`), or a \`poll()\`, \`layout()\`, \`form()\`, row, or canvas. <Explain topic="layout-mix">A layout() cannot share that reply</Explain> with text, an embed, a canvas picture, or a poll. A poll is the whole reply: no text, embed, rows, picture, or layout beside it. A form is the whole reply too.

## Public vs private acknowledgement

For slow handlers, call \`await ctx.wait()\` (public) or \`await ctx.wait({ private: true })\`, then \`edit()\` when work finishes. <Explain topic="form-first">A form() cannot follow wait()</Explain> — open the modal as the first reply.

<Compare id="defer-privacy" />

<Note>
\`CommandMeta\` still supports \`defer: true\` or \`defer: { private: true }\` to acknowledge before the handler runs. Prefer \`wait()\` + \`edit()\` inside the handler when you can ([Commands](/docs/commands)).
</Note>

## Reply vs channel send

Interaction replies stay on the slash token. \`ctx.send\` posts a normal channel message and cannot be private.

<Compare id="reply-vs-send" />

## Wait, then edit

\`\`\`js
export const slow = command("slow", "Works a while", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Working…");
  await ctx.edit("Done.");
});
\`\`\`

\`wait()\` throws if you already called \`reply()\`. \`edit()\` throws if you have neither waited nor replied. \`remove()\` has the same precondition.

## Follow-up

\`\`\`js
export const two = command("two", "Two messages", async (ctx) => {
  ctx.reply("First line.");
  await ctx.followup("Second line.");
});
\`\`\`

If the first reply was private, keep later copy private yourself when you pass options. \`followup\` before any \`reply\` throws.

<Note>
\`ctx.send(channel, ...)\` posts a normal channel message. It cannot be private and it cannot carry a \`form()\`. That is separate from the interaction reply ([Sending messages](/docs/sending-messages)).
</Note>

## Pitfalls

- A second \`reply()\` throws "A command can only reply once." only when a reply is stored and you have neither \`wait()\`ed nor flushed a collect. After \`wait()\`, \`edit()\` or another \`reply()\` fills the defer. After a collect flush, another \`reply()\` replaces the stored reply.
- \`simulate()\` has no interaction token, so \`wait()\`, \`edit()\`, \`remove()\`, and \`collect()\` throw. \`reply()\` still returns the \`Reply\` object.
- Returning \`ctx.reply(...)\` from the handler is the usual shape. You do not call a separate "send interaction" helper.

## Related

- [Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors) · [Embeds & layout](/docs/embeds-layout) · [Recipes](/docs/recipes)
`,
    },
    nl: {
      title: "Antwoorden & follow-ups",
      description: "reply, wait, edit, followup en remove.",
      body: `
Bevestig binnen ongeveer **3 seconden**. Daarna zo’n 15 minuten voor follow-ups. Methodes op \`ctx\`: \`reply\`, \`wait\`, \`edit\`, \`followup\`, \`remove\`.

<Explain topic="auto-defer">Auto-defer</Explain> vuurt na 2 seconden, tenzij je het uitzet.

## Welke methode

| Methode | Wanneer |
|---------|---------|
| \`reply(...)\` | Slaat het antwoord op. Een tweede aanroep gooit alleen als er al een antwoord is opgeslagen en je noch hebt gewacht, noch een collect hebt geflusht. Na \`wait()\` vult \`edit()\` of een nieuwe \`reply()\` het. Na een collect-flush vervangt een nieuwe \`reply()\` het. |
| \`wait({ private? })\` | Bevestigen zonder inhoud. Nodig vóór \`edit\` als je nog niet hebt geantwoord. |
| \`edit(...)\` | Het uitgestelde of al verstuurde antwoord vervangen. |
| \`followup(...)\` | Nog een bericht na het eerste antwoord. Geeft een promise terug. |
| \`remove()\` | Het interactie-antwoord verwijderen. |

\`reply\` en \`edit\` nemen een string, een \`embed()\`, beide (\`reply(text, embed)\`), of een \`poll()\`, \`layout()\`, \`form()\`, rij of canvas. <Explain topic="layout-mix">Een layout() deelt dat antwoord niet</Explain> met tekst, een embed, een canvas-afbeelding of een peiling. Een peiling is het hele antwoord: geen tekst, embed, rijen, afbeelding of layout ernaast. Een formulier is ook het hele antwoord.

## Publiek vs privé bevestigen

Bij een trage handler roep je \`await ctx.wait()\` (publiek) of \`await ctx.wait({ private: true })\` aan, en daarna \`edit()\` als het klaar is. <Explain topic="form-first">Een form() kan niet na wait()</Explain> — open de modal als de eerste reply.

<Compare id="defer-privacy-nl" />

<Note>
\`CommandMeta\` ondersteunt nog \`defer: true\` of \`defer: { private: true }\` om vóór de handler te bevestigen. Gebruik liever \`wait()\` + \`edit()\` in de handler ([Commando's](/docs/commands)).
</Note>

## Reply vs kanaal-send

Interactie-antwoorden blijven op het slash-token. \`ctx.send\` plaatst een gewoon kanaalbericht en kan niet privé zijn.

<Compare id="reply-vs-send-nl" />

## Wachten, dan bewerken

\`\`\`js
export const slow = command("slow", "Duurt even", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Bezig…");
  await ctx.edit("Klaar.");
});
\`\`\`

\`wait()\` gooit als je al \`reply()\` aanriep. \`edit()\` gooit als je noch wachtte noch antwoordde. \`remove()\` heeft dezelfde voorwaarde.

## Follow-up

\`\`\`js
export const two = command("two", "Twee berichten", async (ctx) => {
  ctx.reply("Eerste regel.");
  await ctx.followup("Tweede regel.");
});
\`\`\`

Was het eerste antwoord privé, geef latere tekst zelf privé mee als je opties doorgeeft. \`followup\` vóór een \`reply\` gooit.

<Note>
\`ctx.send(channel, ...)\` plaatst een gewoon kanaalbericht. Het kan niet privé zijn en geen \`form()\` dragen. Dat staat los van het interactie-antwoord ([Berichten sturen](/docs/sending-messages)).
</Note>

## Valkuilen

- Een tweede \`reply()\` gooit "A command can only reply once." alleen als er een antwoord is opgeslagen en je noch \`wait()\` hebt gedaan, noch een collect hebt geflusht. Na \`wait()\` vult \`edit()\` of een nieuwe \`reply()\` de defer. Na een collect-flush vervangt een nieuwe \`reply()\` het opgeslagen antwoord.
- \`simulate()\` heeft geen interactietoken, dus \`wait()\`, \`edit()\`, \`remove()\` en \`collect()\` gooien. \`reply()\` geeft nog steeds het \`Reply\`-object terug.
- \`ctx.reply(...)\` teruggeven uit de handler is de gewone vorm. Er is geen aparte helper om de interactie te versturen.

## Verder

- [Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors) · [Embeds en layout](/docs/embeds-layout) · [Recepten](/docs/recipes)
`,
    },
  },
  {
    slug: "pieces",
    order: 41,
    en: {
      title: "Buttons, menus & forms",
      description: "Buttons, menus, pickers, and forms on a reply.",
      body: `
Controls on a reply: buttons, links, SKUs, menus, pickers. \`form()\` must be the **whole** first reply.

<InteractChoice />

## A row of buttons

\`\`\`js
import { button, command, link, row } from "@draeven/core";

export const confirm = command("confirm", "Yes or no", async (ctx) => {
  ctx.reply({
    text: "Delete the last report?",
    rows: [
      row(
        button({ id: "yes", label: "Delete", color: "red" }),
        button({ id: "no", label: "Keep", color: "grey" }),
        link({ url: "https://example.com", label: "Docs" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 30 });
  if (!pick) return ctx.edit("Timed out.");
  return ctx.edit(pick.id === "yes" ? "Deleted." : "Kept.");
});
\`\`\`

Rules for layout:

- One row: up to **five** \`button()\`, \`link()\`, or \`sku()\` pieces.
- A \`menu()\`, \`people()\`, \`roles()\`, \`channels()\`, or \`mentions()\` takes that row **alone**.
- One reply: up to **five** rows.
- Every \`id\` on the same message must be unique.

## What \`id\` means

You choose the string yourself: \`"yes"\`, \`"confirm-report"\`, anything you like. Discord (and Draeven) then limit **how long** that string may be:

| Field | Meaning |
|-------|---------|
| \`id\` on \`button\` / menu / picker / form | **Your** custom id string — length **1–100 characters** |
| \`label\` on \`button\` / \`link\` | Text on the control — length **1–80 characters** |
| SKU \`id\` | Discord’s shop SKU — **1–20 digits**, not a custom string |

So \`id: "yes"\` is correct. \`1–100\` is not “pick a number from 1 to 100”.

## Button tour

Use the arrows (or the tabs) to walk colors, id, emoji, disabled, press, links, and how autocomplete works — same surface as discord.js \`ButtonStyle.\`, but Draeven-shaped.

<PieceTour />

### Colors and autocomplete

There are **four** colors: \`blurple\` (default), \`grey\`, \`green\`, \`red\`.

- **TypeScript:** type \`color: "\` and the union lists the four names (like IntelliSense after a dot).
- **JS or TS:** import \`buttonColors\` and use \`buttonColors.green\` — a real property list after \`.\`, including in plain JavaScript.

\`color\` maps to Discord’s button styles. There is no \`ButtonStyle.Primary\`; write \`color: "blurple"\` or \`buttonColors.blurple\`.

## Buttons, links, and SKUs

The tour above walks the surface. Open the cheatsheet when you need field limits.

<CollapsibleCheatsheet title="Button / link / SKU fields">

| Piece | You must pass | Optional / notes |
|-------|---------------|------------------|
| \`button\` | \`id\` (your string, 1–100 chars), \`label\` (1–80 chars) | \`color\` (four names), \`emoji\`, \`disabled\`, \`press\` |
| \`link\` | \`url\` (\`http\`/\`https\`, ≤512 chars), \`label\` (1–80) | \`emoji\`, \`disabled\`. No custom id → \`collect\` never sees it |
| \`sku\` | Discord SKU id (1–20 digits) | Purchase button. No \`press\` ([SKU buttons](/docs/sku)) |

</CollapsibleCheatsheet>

A <Explain topic="sku-button">SKU</Explain> is a purchase control, not a custom id you invent.

## Menus and pickers

\`\`\`js
import { channelKinds, channels, command, row } from "@draeven/core";

export const route = command("route", "Pick a channel", async (ctx) => {
  ctx.reply({
    text: "Where should the log go?",
    rows: [
      row(
        channels({
          id: "log",
          placeholder: "Text channel",
          kinds: [channelKinds.text],
        })
      ),
    ],
  });

  const chosen = await ctx.collect({ ids: "log", seconds: 60 });
  if (!chosen) return ctx.edit("Timed out.");
  return ctx.edit(\`Channel \${chosen.values[0]}\`);
});
\`\`\`

\`menu({ id, placeholder, choices, min?, max?, disabled?, press? })\` needs a placeholder (**1–150 characters**) and **1–25** choices. Each choice: \`label\` + \`value\` (each **1–100 characters**). Optional \`description\` (1–100). \`min\` / \`max\` default to 1. \`max\` cannot exceed 25 or the number of choices. Values on one menu must be unique.

\`people\`, \`roles\`, \`channels\`, and \`mentions\` share \`id\`, optional placeholder, \`min\`, \`max\`, \`disabled\`, and \`press\`. Omit \`kinds\` on \`channels\` to allow every kind. Kind names live on \`channelKinds\`: \`text\`, \`voice\`, \`category\`, \`announcement\`, \`announcement thread\`, \`thread\`, \`private thread\`, \`stage\`, \`forum\`, \`media\`.

After \`collect\`, a button hit has empty \`values\`. A menu or picker fills \`values\` with the selected values or ids. Full shape: [Collectors](/docs/collectors).

## Forms

A form is the entire first reply. Title **1–45 characters**, **1–5** fields. \`fieldStyles.short\` is one line (default). \`fieldStyles.long\` is a paragraph. Field labels **1–45**. \`required\` defaults to true. Field ids must be unique and must not repeat the form id.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const note = command("note", "Write a note", async (ctx) => {
  ctx.reply(
    form({
      id: "note-form",
      title: "Note",
      fields: [
        { id: "body", label: "Note", style: fieldStyles.long, max: 500 },
      ],
    })
  );

  const sent = await ctx.collect({ ids: "note-form", kind: "submit", seconds: 120 });
  if (!sent) return ctx.reply("Timed out.");
  return ctx.reply(sent.fields.body);
});
\`\`\`

A submit answers on the modal. A timeout is \`undefined\`, and that reply edits the original interaction. Do not read \`sent?.fields\` when \`sent\` is missing.

Do not \`wait()\` or set metadata \`defer\` first (<Explain topic="form-first">the form is the first reply</Explain>). Discord will not open a modal after an acknowledgement.

## press and collect

The collector wins only when the custom id, the kind, and the user all match. A wrong user, or the wrong kind, still runs \`press\` or \`submit\`. <Explain topic="collect-vs-press">Use collect when the same command should continue. Use press when the control should answer on its own later.</Explain>

A one-off button can carry \`press\`:

\`\`\`js
button({ id: "yes", label: "Yes", press: (ctx) => ctx.reply("Yes.") })
\`\`\`

For buttons that should still work after a restart, leave \`press\` off and export \`use()\` from the events folder. The command only posts the buttons. \`use()\` owns the ids ([Press & submit](/docs/press-handlers)).

A \`press\` function receives \`id\`, optional \`messageId\`, \`author\`, \`values\`, \`fields\`, and \`reply\`. It returns one reply (same shapes as a command). \`values\` is empty for a button. \`fields\` is filled on a form submit. \`id\` is the custom id.

<Warn fix="Reply with form() first — never wait() or defer before it." href="/docs/why-failing">
A form cannot follow \`wait()\` or a metadata \`defer\`. Reply with the form first. A form cannot be \`{ private: true }\`, and \`ctx.send\` cannot carry one.
</Warn>

## Pitfalls

- A repeated id throws while the row is built.
- \`link()\` never arrives in \`collect\`. Do not list a link in \`ids\`.
- A menu or picker beside a button throws: "A menu takes the whole row."
- After a timeout the controls stay. A text-only \`edit\` keeps the row, because \`components\` is omitted. \`rows: []\` is dropped too. \`remove()\` deletes the reply.
`,
    },
    nl: {
      title: "Knoppen, menu's & formulieren",
      description: "Knoppen, menu's, kiezers en formulieren op een antwoord.",
      body: `
Bediening op een antwoord: knoppen, links, SKU’s, menu’s, kiezers. \`form()\` moet het **hele** eerste antwoord zijn.

<InteractChoice />

## Een rij knoppen

\`\`\`js
import { button, command, link, row } from "@draeven/core";

export const confirm = command("confirm", "Ja of nee", async (ctx) => {
  ctx.reply({
    text: "Het laatste rapport wissen?",
    rows: [
      row(
        button({ id: "yes", label: "Wissen", color: "red" }),
        button({ id: "no", label: "Houden", color: "grey" }),
        link({ url: "https://example.com", label: "Docs" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 30 });
  if (!pick) return ctx.edit("Timeout.");
  return ctx.edit(pick.id === "yes" ? "Gewist." : "Gehouden.");
});
\`\`\`

Regels voor layout:

- Eén rij: hoogstens **vijf** \`button()\`, \`link()\` of \`sku()\`.
- Een \`menu()\`, \`people()\`, \`roles()\`, \`channels()\` of \`mentions()\` neemt die rij **alleen**.
- Eén antwoord: hoogstens **vijf** rijen.
- Elke \`id\` op hetzelfde bericht moet uniek zijn.

## Wat \`id\` betekent

Jij kiest de string zelf: \`"yes"\`, \`"confirm-report"\`, wat je wilt. Discord (en Draeven) beperken daarna **hoe lang** die string mag zijn:

| Veld | Betekenis |
|------|-----------|
| \`id\` op \`button\` / menu / kiezer / form | **Jouw** custom-id-string — lengte **1–100 tekens** |
| \`label\` op \`button\` / \`link\` | Tekst op de knop — lengte **1–80 tekens** |
| SKU \`id\` | Discord-shop-SKU — **1–20 cijfers**, geen eigen string |

Dus \`id: "yes"\` is goed. \`1–100\` betekent niet “kies een getal van 1 tot 100”.

## Knoppen-tour

Gebruik de pijltjes (of de tabs) voor kleuren, id, emoji, disabled, press, links, en hoe autocomplete werkt — hetzelfde gevoel als discord.js \`ButtonStyle.\`, maar in Draeven-vorm.

<PieceTour />

### Kleuren en autocomplete

Er zijn **vier** kleuren: \`blurple\` (standaard), \`grey\`, \`green\`, \`red\`.

- **TypeScript:** typ \`color: "\` en de union toont de vier namen (zoals IntelliSense na een punt).
- **JS of TS:** importeer \`buttonColors\` en gebruik \`buttonColors.green\` — een echte property-lijst na \`.\`, ook in plain JavaScript.

\`color\` mappt naar Discord’s button-styles. Er is geen \`ButtonStyle.Primary\`; schrijf \`color: "blurple"\` of \`buttonColors.blurple\`.

## Knoppen, links en SKU's

De tour hierboven leert het oppervlak. Open de cheatsheet voor veldlimieten.

<CollapsibleCheatsheet title="Velden voor button / link / SKU">

| Stuk | Verplicht | Optioneel / notities |
|------|-----------|----------------------|
| \`button\` | \`id\` (jouw string, 1–100 tekens), \`label\` (1–80) | \`color\` (vier namen), \`emoji\`, \`disabled\`, \`press\` |
| \`link\` | \`url\` (\`http\`/\`https\`, ≤512 tekens), \`label\` (1–80) | \`emoji\`, \`disabled\`. Geen custom id → \`collect\` ziet hem nooit |
| \`sku\` | Discord-SKU-id (1–20 cijfers) | Koopknop. Geen \`press\` ([SKU-knoppen](/docs/sku)) |

</CollapsibleCheatsheet>

Een <Explain topic="sku-button">SKU</Explain> is een aankoop-control, geen id die jij verzint.

## Menu's en kiezers

\`\`\`js
import { channelKinds, channels, command, row } from "@draeven/core";

export const route = command("route", "Kies een kanaal", async (ctx) => {
  ctx.reply({
    text: "Waar moet het log heen?",
    rows: [
      row(
        channels({
          id: "log",
          placeholder: "Tekstkanaal",
          kinds: [channelKinds.text],
        })
      ),
    ],
  });

  const chosen = await ctx.collect({ ids: "log", seconds: 60 });
  if (!chosen) return ctx.edit("Timeout.");
  return ctx.edit(\`Kanaal \${chosen.values[0]}\`);
});
\`\`\`

\`menu({ id, placeholder, choices, min?, max?, disabled?, press? })\` heeft een placeholder nodig (**1–150 tekens**) en **1–25** keuzes. Elke keuze: \`label\` + \`value\` (elk **1–100 tekens**). Optioneel \`description\` (1–100). \`min\` / \`max\` staan standaard op 1. \`max\` kan niet voorbij 25 of het aantal keuzes. Waarden op één menu moeten uniek zijn.

\`people\`, \`roles\`, \`channels\` en \`mentions\` delen \`id\`, optionele placeholder, \`min\`, \`max\`, \`disabled\` en \`press\`. Laat \`kinds\` weg bij \`channels\` om elk soort toe te laten. Soortnamen staan op \`channelKinds\`: \`text\`, \`voice\`, \`category\`, \`announcement\`, \`announcement thread\`, \`thread\`, \`private thread\`, \`stage\`, \`forum\`, \`media\`.

Na \`collect\` is \`values\` leeg bij een knop. Bij een menu of kiezer staan de gekozen waarden of ids erin. Volledige vorm: [Verzamelaars](/docs/collectors).

## Formulieren

Een formulier is het hele eerste antwoord. Titel **1–45 tekens**, **1–5** velden. \`fieldStyles.short\` is één regel (standaard). \`fieldStyles.long\` is een alinea. Veldlabels **1–45**. \`required\` staat standaard op true. Veld-ids moeten uniek zijn en mogen de formulier-id niet herhalen.

\`\`\`js
import { command, fieldStyles, form } from "@draeven/core";

export const note = command("note", "Schrijf een notitie", async (ctx) => {
  ctx.reply(
    form({
      id: "note-form",
      title: "Notitie",
      fields: [
        { id: "body", label: "Notitie", style: fieldStyles.long, max: 500 },
      ],
    })
  );

  const sent = await ctx.collect({ ids: "note-form", kind: "submit", seconds: 120 });
  if (!sent) return ctx.reply("Timeout.");
  return ctx.reply(sent.fields.body);
});
\`\`\`

Een submit beantwoordt de modal. Een timeout is \`undefined\`, en dat antwoord bewerkt de oorspronkelijke interactie. Lees \`sent?.fields\` niet als \`sent\` ontbreekt.

Roep niet eerst \`wait()\` aan en zet geen metadata-\`defer\` (<Explain topic="form-first">het formulier is het eerste antwoord</Explain>). Discord opent geen modal na een bevestiging.

## press en collect

De verzamelaar wint alleen als de custom id, de soort en de gebruiker alle drie kloppen. Een verkeerde gebruiker, of de verkeerde soort, draait \`press\` of \`submit\` nog steeds. <Explain topic="collect-vs-press">Gebruik collect als hetzelfde commando moet doorgaan. Gebruik press als het element later zelf moet antwoorden.</Explain>

Een eenmalige knop mag \`press\` dragen:

\`\`\`js
button({ id: "yes", label: "Yes", press: (ctx) => ctx.reply("Yes.") })
\`\`\`

Voor knoppen die na een herstart nog moeten werken, laat je \`press\` weg en exporteer je \`use()\` uit de events-map. Het commando plaatst alleen de knoppen. \`use()\` bezit de ids ([Press & submit](/docs/press-handlers)).

Een \`press\`-functie krijgt \`id\`, optionele \`messageId\`, \`author\`, \`values\`, \`fields\` en \`reply\`. Ze geeft één antwoord terug, dezelfde vormen als een commando. \`values\` is leeg bij een knop. \`fields\` is gevuld bij een formulier. \`id\` is de custom id.

<Warn fix="Antwoord eerst met form() — nooit wait() of defer ervoor." href="/docs/why-failing">
Een formulier kan niet volgen op \`wait()\` of een \`defer\` in metadata. Antwoord eerst met het formulier. Een formulier kan niet \`{ private: true }\` zijn, en \`ctx.send\` kan er geen dragen.
</Warn>

## Valkuilen

- Een herhaalde id gooit terwijl de rij wordt gebouwd.
- \`link()\` komt nooit aan in \`collect\`. Zet een link niet in \`ids\`.
- Een menu of kiezer naast een knop gooit: "A menu takes the whole row."
- Na een timeout blijven de elementen staan. Een bewerking die alleen tekst is, houdt de rij, want \`components\` wordt weggelaten. \`rows: []\` valt ook weg. \`remove()\` verwijdert het antwoord.

## Verder

- [Verzamelaars](/docs/collectors) · [Antwoorden](/docs/replies) · [Embeds en layout](/docs/embeds-layout)
`,
    },
  },
  {
    slug: "sku",
    order: 42,
    en: {
      title: "SKU buttons",
      description: "A Discord premium purchase button.",
      body: `
<Explain topic="sku-button">\`sku({ id })\`</Explain> is a purchase button for a Discord SKU. You put it on a reply. Discord opens the checkout when someone clicks it. Your handler does not run for that click, and \`ctx.collect\` never sees it. There is no \`press\`.

\`id\` is the SKU id from the Developer Portal, not a custom component id. Draeven checks the shape of that id while the row is built. It does not create the product, and it does not talk to monetization. The application needs a real SKU or the button has nothing to sell.

The button sits in \`row()\` beside \`button()\` and \`link()\`. That row holds at most five of those pieces. A menu or a picker still takes the row alone.

## Worked example

The portal id below is a placeholder (18 digits). Replace it with the id from **Monetization** on your application. The link is an ordinary URL button in the same row. The SKU click never arrives in \`collect\`; the link does not either.

\`\`\`js
import { command, link, row, sku } from "@draeven/core";

export const premium = command("premium", "Supporter button", async (ctx) => {
  return ctx.reply({
    text: "Support the bot.",
    rows: [
      row(
        sku({ id: "123456789012345678" }),
        link({ url: "https://example.com/premium", label: "What you get" })
      ),
    ],
  });
});
\`\`\`

A \`button({ id: "later", label: "Not now" })\` can sit in that same row. That button has a custom id, so \`collect\` or \`press\` can answer it. \`sku()\` still cannot.

## Limits

| Limit | Detail |
|-------|--------|
| \`id\` | 1–20 digits after trim. Empty, letters, or 21 digits throws \`A SKU id is a number of 1-20 digits.\` |
| Row size | At most five \`button()\`, \`link()\`, or \`sku()\` pieces |
| Menu or picker | Takes the row alone. \`sku()\` beside \`menu()\` throws |
| Fields | \`label\`, \`color\`, and \`press\` are not fields on \`sku()\` |
| Collector | \`ctx.collect\` never sees the click. There is no \`press\` |
| Product | The SKU must already exist on the application. Draeven does not create it |

## Pitfalls

- An empty id, letters, or more than 20 digits throws while the row is built, before Discord sees the message.
- It is not a custom button. Copying \`label\` or \`color\` from \`button()\` is not part of \`sku()\`.
- Putting \`sku()\` in the \`ids\` list of \`ctx.collect\` does nothing useful. The click never arrives. Do the same for \`link()\`.
- A test id that is only digits still passes Draeven and fails in Discord if that SKU is not on this application.
`,
    },
    nl: {
      title: "SKU-knoppen",
      description: "Een Discord-koopknop voor een premium-SKU.",
      body: `
<Explain topic="sku-button">\`sku({ id })\`</Explain> is een koopknop voor een Discord-SKU. Je zet hem op een antwoord. Discord opent de checkout als iemand klikt. Je handler draait niet voor die klik, en \`ctx.collect\` ziet hem nooit. Er is geen \`press\`.

\`id\` is de SKU-id uit het Developer Portal, geen eigen component-id. Draeven controleert de vorm van die id terwijl de rij wordt gebouwd. Het maakt het product niet aan, en het praat niet met monetization. De applicatie heeft een echte SKU nodig, anders heeft de knop niets te verkopen.

De knop staat in \`row()\` naast \`button()\` en \`link()\`. Die rij houdt hoogstens vijf van die stukken. Een menu of een kiezer neemt de rij nog steeds alleen.

## Uitgewerkt voorbeeld

De portal-id hieronder is een placeholder (18 cijfers). Vervang hem door de id onder **Monetization** van je applicatie. De link is een gewone URL-knop in dezelfde rij. De SKU-klik komt nooit aan in \`collect\`; de link ook niet.

\`\`\`js
import { command, link, row, sku } from "@draeven/core";

export const premium = command("premium", "Steunknop", async (ctx) => {
  return ctx.reply({
    text: "Steun de bot.",
    rows: [
      row(
        sku({ id: "123456789012345678" }),
        link({ url: "https://example.com/premium", label: "Wat je krijgt" })
      ),
    ],
  });
});
\`\`\`

Een \`button({ id: "later", label: "Niet nu" })\` mag in diezelfde rij. Die knop heeft een eigen id, dus \`collect\` of \`press\` kan hem beantwoorden. \`sku()\` nog steeds niet.

## Grenzen

| Grens | Detail |
|-------|--------|
| \`id\` | 1–20 cijfers na trim. Leeg, letters, of 21 cijfers gooit \`A SKU id is a number of 1-20 digits.\` |
| Rijgrootte | Hoogstens vijf stukken \`button()\`, \`link()\` of \`sku()\` |
| Menu of kiezer | Neemt de rij alleen. \`sku()\` naast \`menu()\` gooit |
| Velden | \`label\`, \`color\` en \`press\` zijn geen velden op \`sku()\` |
| Verzamelaar | \`ctx.collect\` ziet de klik nooit. Er is geen \`press\` |
| Product | De SKU moet al op de applicatie bestaan. Draeven maakt hem niet aan |

## Valkuilen

- Een lege id, letters, of meer dan 20 cijfers gooit terwijl de rij wordt gebouwd, vóór Discord het bericht ziet.
- Het is geen eigen knop. \`label\` of \`color\` overnemen van \`button()\` hoort niet bij \`sku()\`.
- \`sku()\` in de \`ids\`-lijst van \`ctx.collect\` zetten doet niets nuttigs. De klik komt nooit aan. Hetzelfde geldt voor \`link()\`.
- Een test-id die alleen uit cijfers bestaat komt door Draeven en faalt in Discord als die SKU niet op deze applicatie staat.
`,
    },
  },
  {
    slug: "collectors",
    order: 43,
    en: {
      title: "Collectors",
      description: "Wait for a button, menu, or form on ctx.",
      body: `
\`ctx.collect\` waits for a click or form submit on what you just showed. Method on \`ctx\`, not an import.

<InteractChoice />
<WhenToUse topic="collectors" />
<DocTour id="collect" />

No waiter → \`PressContext\` / \`use()\` ([Press & submit](/docs/press-handlers)). Timeout → \`undefined\`. Update with \`ctx.edit\` (no \`.update\`).

<DocMedia id="collectors" />

## Buttons

\`\`\`js
import { command, button, row } from "@draeven/core";

export const confirm = command("confirm", "Yes or no", async (ctx) => {
  await ctx.wait();
  await ctx.edit({
    text: "Pick one.",
    rows: [
      row(
        button({ id: "yes", label: "Yes", color: "green" }),
        button({ id: "no", label: "No", color: "red" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 30 });
  if (!pick) return ctx.edit("Timed out.");
  return ctx.edit(\`You pressed \${pick.id}\`);
});
\`\`\`

Button colors are \`blurple\` (default), \`grey\`, \`green\`, and \`red\`. \`row()\` holds up to five \`button()\`, \`link()\`, or \`sku()\` pieces. A select \`menu()\`, and the pickers \`people()\`, \`roles()\`, \`channels()\`, and \`mentions()\`, each take the row alone.

## Select menu

\`\`\`js
import { command, menu, row } from "@draeven/core";

export const pick = command("pick", "Choose a tool", async (ctx) => {
  await ctx.reply({
    text: "Tool?",
    rows: [
      row(
        menu({
          id: "tool",
          placeholder: "Choose",
          choices: [
            { label: "ESLint", value: "eslint" },
            { label: "Vitest", value: "vitest" },
          ],
        })
      ),
    ],
  });

  const chosen = await ctx.collect({ ids: "tool", seconds: 30 });
  return ctx.reply(chosen?.values[0] ?? "Timed out.");
});
\`\`\`

\`Collected.values\` is empty for a plain button. For a menu it holds the selected values.

## Forms

A form is the **entire** first reply. Do not \`wait()\` first — a defer consumes the interaction and the modal cannot open.

\`\`\`js
import { command, form, fieldStyles } from "@draeven/core";

export const ask = command("ask", "Ask for a note", async (ctx) => {
  ctx.reply(
    form({
      id: "ask-form",
      title: "Details",
      fields: [
        { id: "note", label: "Note", style: fieldStyles.long, required: true },
      ],
    })
  );

  const submitted = await ctx.collect({ ids: "ask-form", kind: "submit", seconds: 120 });
  if (!submitted) return ctx.reply("Timed out.");
  return ctx.reply(submitted.fields.note);
});
\`\`\`

A submit answers on the modal. A timeout edits the original interaction. Do not read \`submitted?.fields\` when the wait returned \`undefined\`.

\`fieldStyles.short\` is one line (the default). \`fieldStyles.long\` is a paragraph. A form title is 1–45 characters, with 1–5 fields. Field ids must be unique and must not repeat the form id.

## Options

| Field | Meaning |
|-------|---------|
| \`ids\` | Custom id or list. Required. At least one. |
| \`seconds\` | Timeout in seconds. Default **60**. \`0\`, a negative number, or a non-finite value throws. |
| \`who\` | Who may answer. Default: the command author. \`false\` allows anyone. A user id or \`{ id }\` restricts to that user. |
| \`kind\` | \`"press"\`, \`"submit"\`, or \`"any"\` (default). |

<Warn fix="Call reply() or wait() before collect()." href="/docs/why-failing">
\`collect\` throws if you have not replied or waited yet, and if the connection cannot collect (including \`simulate()\`).
</Warn>

## Pitfalls

- Finish or time out one \`collect\` before starting another on the same flow. Overlapping waiters are easy to mismatch.
- Custom ids on one message must be unique. Draeven throws while building the row if a button id repeats.
- The collector wins only when the id, the kind, and who all match. A different user or a different kind still runs \`press\`.
- After a timeout, the buttons stay. A text-only edit keeps the row. \`rows: []\` is dropped. \`remove()\` deletes the reply.

## Related

- [Buttons, menus & forms](/docs/pieces) · [Replies](/docs/replies) · [Embeds & layout](/docs/embeds-layout) · [Recipes](/docs/recipes)
`,
    },
    nl: {
      title: "Verzamelaars",
      description: "Wachten op een knop, menu of formulier via ctx.",
      body: `
\`ctx.collect\` wacht op een klik of formulier op wat je net toonde. Methode op \`ctx\`, geen import.

<InteractChoice />
<WhenToUse topic="collectors" />
<DocTour id="collect" />

Geen waiter → \`PressContext\` / \`use()\` ([Press & submit](/docs/press-handlers)). Timeout → \`undefined\`. Wijzig met \`ctx.edit\` (geen \`.update\`).

<DocMedia id="collectors" />

## Knoppen

\`\`\`js
import { command, button, row } from "@draeven/core";

export const confirm = command("confirm", "Ja of nee", async (ctx) => {
  await ctx.wait();
  await ctx.edit({
    text: "Kies.",
    rows: [
      row(
        button({ id: "yes", label: "Ja", color: "green" }),
        button({ id: "no", label: "Nee", color: "red" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 30 });
  if (!pick) return ctx.edit("Timeout.");
  return ctx.edit(\`Gekozen: \${pick.id}\`);
});
\`\`\`

Knopkleuren zijn \`blurple\` (standaard), \`grey\`, \`green\` en \`red\`. \`row()\` houdt hoogstens vijf \`button()\`, \`link()\` of \`sku()\`-stukken. Een selectie-\`menu()\`, en de kiezers \`people()\`, \`roles()\`, \`channels()\` en \`mentions()\`, nemen elk de rij alleen.

## Keuzemenu

\`\`\`js
import { command, menu, row } from "@draeven/core";

export const pick = command("pick", "Kies een tool", async (ctx) => {
  await ctx.reply({
    text: "Tool?",
    rows: [
      row(
        menu({
          id: "tool",
          placeholder: "Kies",
          choices: [
            { label: "ESLint", value: "eslint" },
            { label: "Vitest", value: "vitest" },
          ],
        })
      ),
    ],
  });

  const chosen = await ctx.collect({ ids: "tool", seconds: 30 });
  return ctx.reply(chosen?.values[0] ?? "Timeout.");
});
\`\`\`

\`Collected.values\` is leeg bij een gewone knop. Bij een menu bevat het de gekozen waarden.

## Formulieren

Een formulier is het **hele** eerste antwoord. Roep niet eerst \`wait()\` aan — een defer verbruikt de interactie en de modal kan niet openen.

\`\`\`js
import { command, form, fieldStyles } from "@draeven/core";

export const ask = command("ask", "Vraag om een notitie", async (ctx) => {
  ctx.reply(
    form({
      id: "ask-form",
      title: "Details",
      fields: [
        { id: "note", label: "Notitie", style: fieldStyles.long, required: true },
      ],
    })
  );

  const submitted = await ctx.collect({ ids: "ask-form", kind: "submit", seconds: 120 });
  if (!submitted) return ctx.reply("Timeout.");
  return ctx.reply(submitted.fields.note);
});
\`\`\`

Een submit beantwoordt de modal. Een timeout bewerkt de oorspronkelijke interactie. Lees \`submitted?.fields\` niet als de wachttijd \`undefined\` teruggaf.

\`fieldStyles.short\` is één regel (de standaard). \`fieldStyles.long\` is een alinea. Een formuliertitel is 1–45 tekens, met 1–5 velden. Veld-ids moeten uniek zijn en mogen de formulier-id niet herhalen.

## Opties

| Veld | Betekenis |
|------|-----------|
| \`ids\` | Custom id of lijst. Verplicht. Minstens één. |
| \`seconds\` | Timeout in seconden. Standaard **60**. \`0\`, een negatief getal of een niet-eindige waarde gooit. |
| \`who\` | Wie mag antwoorden. Standaard de auteur van het commando. \`false\` laat iedereen toe. Een user-id of \`{ id }\` beperkt tot die gebruiker. |
| \`kind\` | \`"press"\`, \`"submit"\` of \`"any"\` (standaard). |

<Warn fix="Roep reply() of wait() aan vóór collect()." href="/docs/why-failing">
\`collect\` gooit als je nog niet hebt geantwoord of gewacht, en als de verbinding niet kan verzamelen (ook \`simulate()\`).
</Warn>

## Valkuilen

- Rond één \`collect\` af of laat hem timen voordat je een volgende start in dezelfde flow. Overlappende wachters zijn lastig te matchen.
- Custom ids op één bericht moeten uniek zijn. Draeven gooit bij het bouwen van de rij als een knop-id terugkomt.
- De verzamelaar wint alleen als id, soort en wie alle drie kloppen. Een andere gebruiker of een andere soort draait \`press\` nog steeds.
- Na een timeout blijven de knoppen staan. Een bewerking die alleen tekst is, houdt de rij. \`rows: []\` valt weg. \`remove()\` verwijdert het antwoord.

## Verder

- [Knoppen, menu's & formulieren](/docs/pieces) · [Antwoorden](/docs/replies) · [Embeds en layout](/docs/embeds-layout) · [Recepten](/docs/recipes)
`,
    },
  },
  {
    slug: "embeds-layout",
    order: 45,
    en: {
      title: "Embeds & layout",
      description: "embed() parts, and Components V2 layout() helpers.",
      body: `
## Anatomy of an embed

A Draeven embed is one message block you build with \`embed({ ... })\` and send through <Explain topic="embed-reply">reply</Explain>, \`edit\`, \`followup\`, or \`bot.send\`.

<DocMedia id="embeds" />

It is **not** discord.js: there is no \`EmbedBuilder\`, no root \`title\`, and no \`inline\` flag. You build one with \`embed({ ... })\`.

| Discord.js habit | Draeven |
|------------------|---------|
| \`title: "..."\` | \`header: { title: "..." }\` |
| \`inline: true\` | share the row, or \`wide: true\` |
| \`time(Date.now())\` | \`time(new Date(), "relative")\` |

Click any dotted term — <Explain topic="embed-header">header</Explain>, <Explain topic="embed-fields">fields</Explain>, <Explain topic="embed-footer">footer</Explain>, <Explain topic="embed-time">time()</Explain> — for a popup with rules and copy-paste examples.

## Full example

\`\`\`js
import { command, embed, colors, time, breakline } from "@draeven/core";

export const status = command("status", "Show status", async (ctx) =>
  ctx.reply(
    embed({
      color: colors.green,
      author: { name: "Ops" },
      header: { title: "Bot status" },
      description: \`Online since \${time(new Date(), "relative")}\`,
      fields: [
        { name: "Shard", value: "OK" },
        { name: "Ping", value: "42ms" },
        breakline,
        { name: "Notes", value: "Wide rows use wide: true.", wide: true },
      ],
      footer: { text: "Draeven" },
      timestamp: new Date(),
    })
  )
);
\`\`\`

## Parts of the embed

### color

Left accent bar. Prefer named <Explain topic="embed-colors">colors</Explain> (including \`colors.blurple\`), a \`#RRGGBB\` string, or a number \`0\`–\`0xffffff\`. More: <Explain topic="embed-color">color</Explain>.

### author

Optional name line **above** the title — \`name\` (1–256), optional \`icon\`, optional \`link\`. More: <Explain topic="embed-author">author</Explain>.

### header

The real title block: \`{ title, link?, image? }\`.
**Wrong:** \`title: "…"\` on the embed root. **Right:** \`header: { title: "…" }\`.
A header needs a title or an image. A \`link\` needs a title. More: <Explain topic="embed-header">header</Explain>.

### description

Paragraph under the header (≤ 4096). Markdown and \`time()\` stamps are fine.
More: <Explain topic="embed-description">description</Explain>.

### fields

Array of \`{ name, value, wide? }\` plus <Explain topic="embed-breakline">breakline</Explain> markers.

- Up to **three** fields share a row
- \`breakline\` starts the next row
- \`wide: true\` takes the full width
- \`value\` may be text, number, boolean, \`Date\`, or a \`time()\` string
- \`name\` is 1–256 characters; \`value\` is 1–1024
- There is no \`inline\` flag

More: <Explain topic="embed-fields">fields</Explain>.

### image

Large picture **under** the fields (not the header thumbnail — that is \`header.image\`). The URL must be \`http\` or \`https\`.
More: <Explain topic="embed-image">image</Explain>.

### footer

Bottom line \`{ text, icon? }\`. \`text\` is 1–2048 when set. Pair with \`timestamp: new Date()\` for a clock beside it.
More: <Explain topic="embed-footer">footer</Explain>.

### rows & picture

Buttons and menus that travel with the embed (<Explain topic="embed-rows">rows</Explain>), up to five rows, and an optional \`canvas()\` bitmap (<Explain topic="embed-picture">picture</Explain>). Presses use \`ctx.collect\`.

## Text above an embed

Classic embeds can sit under a content line. \`layout()\` cannot — see below.

\`\`\`js
return ctx.reply(
  "Heads up:",
  embed({ header: { title: "Details" }, color: colors.blurple })
);
\`\`\`

## Components V2 — \`layout()\`

\`layout()\` builds Discord **Components V2** messages (flag \`IS_COMPONENTS_V2\`). That is Discord's name for this UI system — Draeven's entry point is \`layout()\`, not a separate \`section()\` export.

Discord itself has a piece called **Section** (text + one accessory). In Draeven that is \`beside()\`. The other helpers map to Discord's display pieces: text, separator, container, gallery, file, thumbnail, and action row.

On one reply, a layout <Explain topic="layout-mix">cannot mix</Explain> with message text, \`embed()\`, \`poll()\`, or a \`canvas()\` picture. \`reply("text", layout(...))\` throws \`A reply takes text, an embed, or text and an embed.\` The mix error \`A layout cannot mix with text, embeds, or polls.\` is for \`{ text, layout }\`. A \`form()\` is its own reply too. You can still mark the layout private with \`{ private: true }\`, and you can append extra \`row()\` values on the same reply object — those action rows are sent after the layout parts.

\`layout(...parts)\` holds **1–40** parts. Each part comes from \`show\`, \`divide\`, \`pack\`, \`beside\`, \`album\`, \`showFile\`, or \`row\`. \`thumb()\` is not a layout part on its own. It is only the image accessory you pass to \`beside({ with })\`.

| Helper | Discord piece | Shape |
|--------|----------------|--------|
| \`show(text)\` | Text Display | 1–4000 characters |
| \`divide({ size?, line? })\` | Separator | \`size\` is \`"sm"\` (default) or \`"lg"\`. \`line: true\` draws a line |
| \`pack({ color?, spoiler? }, ...parts)\` | Container | At least one nested part. \`color\` is \`colors.*\`, \`#RRGGBB\`, or a number |
| \`beside({ text, with })\` | Section | Text 1–4000. \`with\` is \`thumb()\` or a \`row()\` |
| \`thumb(url \\| { url, description? })\` | Thumbnail | \`https\` URL. Description 1–1024. Only as \`beside\`'s accessory |
| \`album(...items)\` | Media Gallery | 1–10 images. A string URL, or \`{ url, description?, spoiler? }\` |
| \`showFile(name \\| { name, spoiler? })\` | File | An \`https\` URL, or the filename of an attachment already on the message |
| \`row(...)\` | Action Row | The same buttons, links, and menus as a classic row |

\`beside\`'s row accessory uses the **first** component on that row. Give it one button. \`pack()\` may nest the same parts, including another \`beside()\` or \`album()\`.

\`\`\`js
import {
  album,
  beside,
  button,
  colors,
  command,
  divide,
  layout,
  pack,
  row,
  show,
  showFile,
  thumb,
} from "@draeven/core";

export const panel = command("panel", "Show a panel", async (ctx) =>
  ctx.reply(
    layout(
      show("**Welcome**"),
      divide({ size: "sm", line: true }),
      pack(
        { color: colors.blurple },
        show("Inside a container"),
        beside({
          text: "Text plus an accessory. Discord calls this a Section.",
          with: thumb("https://cdn.discordapp.com/embed/avatars/0.png"),
        })
      ),
      album("https://cdn.discordapp.com/embed/avatars/1.png"),
      showFile("https://cdn.discordapp.com/embed/avatars/2.png"),
      row(button({ id: "ok", label: "OK", color: "green" }))
    )
  )
);
\`\`\`

A button beside the text, instead of a thumbnail:

\`\`\`js
beside({
  text: "Confirm?",
  with: row(button({ id: "yes", label: "Yes", color: "green" })),
});
\`\`\`

<Tip>
\`time(new Date(), "relative")\` is the usual stamp inside an embed description or field. Other styles are \`"time"\`, \`"long time"\`, \`"date"\`, \`"long date"\`, \`"date and time"\`, and \`"full"\` — or the short letters \`t\`, \`T\`, \`d\`, \`D\`, \`f\`, \`F\`, \`R\`. \`time()\` needs a \`Date\`, not \`Date.now()\`.
</Tip>

## Limits

- Header title ≤ 256, description ≤ 4096, author name ≤ 256
- Field name ≤ 256, field value ≤ 1024, max **25** fields (blank fillers from short rows count)
- Total visible embed text ≤ 6000 characters
- Footer text 1–2048 when set
- \`layout()\` holds 1–40 parts. \`show()\` and \`beside()\` text are 1–4000. \`album()\` holds 1–10 images
- A layout cannot share its reply with text, an embed, a poll, or a canvas picture

## Related

- [Replies](/docs/replies) · [Collectors](/docs/collectors) · [Polls](/docs/polls) · [Sending messages](/docs/sending-messages)
`,
    },
    nl: {
      title: "Embeds en layout",
      description: "Onderdelen van embed(), en Components V2 via layout().",
      body: `
## Anatomie van een embed

<DocMedia id="embeds" />

Een Draeven-embed bouw je met \`embed({ ... })\` en verstuur je via <Explain topic="embed-reply">reply</Explain>, \`edit\`, \`followup\` of \`bot.send\`.

Dit is **geen** discord.js: geen \`EmbedBuilder\`, geen root-\`title\`, geen \`inline\`. Je bouwt er één met \`embed({ ... })\`.

| discord.js-gewoonte | Draeven |
|---------------------|---------|
| \`title: "..."\` | \`header: { title: "..." }\` |
| \`inline: true\` | rij delen, of \`wide: true\` |
| \`time(Date.now())\` | \`time(new Date(), "relative")\` |

Klik gestippelde termen — <Explain topic="embed-header">header</Explain>, <Explain topic="embed-fields">fields</Explain>, <Explain topic="embed-footer">footer</Explain>, <Explain topic="embed-time">time()</Explain> — voor een popup met regels en voorbeelden.

## Volledig voorbeeld

\`\`\`js
import { command, embed, colors, time, breakline } from "@draeven/core";

export const status = command("status", "Toon status", async (ctx) =>
  ctx.reply(
    embed({
      color: colors.green,
      author: { name: "Ops" },
      header: { title: "Botstatus" },
      description: \`Online sinds \${time(new Date(), "relative")}\`,
      fields: [
        { name: "Shard", value: "OK" },
        { name: "Ping", value: "42ms" },
        breakline,
        { name: "Notities", value: "Brede rijen met wide: true.", wide: true },
      ],
      footer: { text: "Draeven" },
      timestamp: new Date(),
    })
  )
);
\`\`\`

## Onderdelen van de embed

### color

Accentbalk links. Gebruik <Explain topic="embed-colors">colors</Explain> (inclusief \`colors.blurple\`), een \`#RRGGBB\`-string of een getal \`0\`–\`0xffffff\`.
Uitleg: <Explain topic="embed-color">color</Explain>.

### author

Optionele naamregel **boven** de titel — \`name\` (1–256), optioneel \`icon\` en \`link\`.
Uitleg: <Explain topic="embed-author">author</Explain>.

### header

Het echte titelblok: \`{ title, link?, image? }\`.
**Fout:** \`title: "…"\` op de root. **Goed:** \`header: { title: "…" }\`.
Een header heeft een titel of een afbeelding nodig. Een \`link\` heeft een titel nodig.
Uitleg: <Explain topic="embed-header">header</Explain>.

### description

Paragraaf onder de header (≤ 4096). Markdown en \`time()\` mogen.
Uitleg: <Explain topic="embed-description">description</Explain>.

### fields

Array van \`{ name, value, wide? }\` plus <Explain topic="embed-breakline">breakline</Explain>.

- Max **drie** fields per rij
- \`breakline\` start een nieuwe rij
- \`wide: true\` = volle breedte
- \`value\`: tekst, getal, boolean, \`Date\` of \`time()\`-string
- \`name\` is 1–256 tekens; \`value\` is 1–1024
- Er is geen \`inline\`

Uitleg: <Explain topic="embed-fields">fields</Explain>.

### image

Grote afbeelding **onder** de fields (niet \`header.image\`). De URL moet \`http\` of \`https\` zijn.
Uitleg: <Explain topic="embed-image">image</Explain>.

### footer

Onderregel \`{ text, icon? }\`. \`text\` is 1–2048 als gezet. Combineer met \`timestamp: new Date()\`.
Uitleg: <Explain topic="embed-footer">footer</Explain>.

### rows & picture

Knoppen en menu's die met de embed meegaan (<Explain topic="embed-rows">rows</Explain>), hoogstens vijf rijen, en een optionele \`canvas()\`-bitmap (<Explain topic="embed-picture">picture</Explain>). Klikken lopen via \`ctx.collect\`.

## Tekst boven een embed

Een klassieke embed mag onder een contentregel staan. \`layout()\` niet — zie hieronder.

\`\`\`js
return ctx.reply(
  "Let op:",
  embed({ header: { title: "Details" }, color: colors.blurple })
);
\`\`\`

## Components V2 — \`layout()\`

\`layout()\` bouwt Discord **Components V2**-berichten (vlag \`IS_COMPONENTS_V2\`). Dat is Discords naam voor dit UI-systeem — in Draeven begin je met \`layout()\`, er is geen aparte \`section()\`-export.

Discord zelf heeft wel een stuk genaamd **Section** (tekst + één accessory). In Draeven is dat \`beside()\`. De andere helpers zijn de weergavestukken van Discord: tekst, scheiding, container, galerij, bestand, thumbnail en actierij.

Op één antwoord mag een layout <Explain topic="layout-mix">niet mengen</Explain> met berichttekst, \`embed()\`, \`poll()\` of een \`canvas()\`-afbeelding. \`reply("tekst", layout(...))\` gooit \`A reply takes text, an embed, or text and an embed.\` De mix-fout \`A layout cannot mix with text, embeds, or polls.\` is voor \`{ text, layout }\`. Een \`form()\` is ook een eigen antwoord. Je mag de layout wel privé maken met \`{ private: true }\`, en extra \`row()\`-waarden aan hetzelfde antwoord hangen — die actierijen gaan ná de layout-onderdelen mee.

\`layout(...parts)\` houdt **1–40** onderdelen. Elk onderdeel komt van \`show\`, \`divide\`, \`pack\`, \`beside\`, \`album\`, \`showFile\` of \`row\`. \`thumb()\` is zelf geen layout-onderdeel. Het is alleen de afbeelding-accessory die je aan \`beside({ with })\` geeft.

| Helper | Discord-stuk | Vorm |
|--------|----------------|------|
| \`show(text)\` | Text Display | 1–4000 tekens |
| \`divide({ size?, line? })\` | Separator | \`size\` is \`"sm"\` (standaard) of \`"lg"\`. \`line: true\` tekent een lijn |
| \`pack({ color?, spoiler? }, ...parts)\` | Container | Minstens één genest onderdeel. \`color\` is \`colors.*\`, \`#RRGGBB\` of een getal |
| \`beside({ text, with })\` | Section | Tekst 1–4000. \`with\` is \`thumb()\` of een \`row()\` |
| \`thumb(url \\| { url, description? })\` | Thumbnail | \`https\`-URL. Beschrijving 1–1024. Alleen als accessory van \`beside\` |
| \`album(...items)\` | Media Gallery | 1–10 afbeeldingen. Een URL-string, of \`{ url, description?, spoiler? }\` |
| \`showFile(name \\| { name, spoiler? })\` | File | Een \`https\`-URL, of de bestandsnaam van een bijlage die al op het bericht staat |
| \`row(...)\` | Action Row | Dezelfde knoppen, links en menu's als een klassieke rij |

De rij-accessory van \`beside\` gebruikt het **eerste** component van die rij. Zet er één knop op. \`pack()\` mag dezelfde onderdelen nesten, ook een \`beside()\` of \`album()\`.

\`\`\`js
import {
  album,
  beside,
  button,
  colors,
  command,
  divide,
  layout,
  pack,
  row,
  show,
  showFile,
  thumb,
} from "@draeven/core";

export const panel = command("panel", "Toon paneel", async (ctx) =>
  ctx.reply(
    layout(
      show("**Welkom**"),
      divide({ size: "sm", line: true }),
      pack(
        { color: colors.blurple },
        show("Inhoud in een container"),
        beside({
          text: "Tekst plus een accessory. Discord noemt dit een Section.",
          with: thumb("https://cdn.discordapp.com/embed/avatars/0.png"),
        })
      ),
      album("https://cdn.discordapp.com/embed/avatars/1.png"),
      showFile("https://cdn.discordapp.com/embed/avatars/2.png"),
      row(button({ id: "ok", label: "OK", color: "green" }))
    )
  )
);
\`\`\`

Een knop naast de tekst, in plaats van een thumbnail:

\`\`\`js
beside({
  text: "Bevestigen?",
  with: row(button({ id: "yes", label: "Ja", color: "green" })),
});
\`\`\`

<Tip>
\`time(new Date(), "relative")\` is de gebruikelijke stempel in een embed-description of field. Andere stijlen zijn \`"time"\`, \`"long time"\`, \`"date"\`, \`"long date"\`, \`"date and time"\` en \`"full"\` — of de korte letters \`t\`, \`T\`, \`d\`, \`D\`, \`f\`, \`F\`, \`R\`. \`time()\` verwacht een \`Date\`, geen \`Date.now()\`.
</Tip>

## Limieten

- Header-titel ≤ 256, description ≤ 4096, author-naam ≤ 256
- Field-naam ≤ 256, field-waarde ≤ 1024, max **25** fields (lege vulvelden van korte rijen tellen mee)
- Totaal zichtbare embed-tekst ≤ 6000 tekens
- Footer-tekst 1–2048 als gezet
- \`layout()\` houdt 1–40 onderdelen. Tekst van \`show()\` en \`beside()\` is 1–4000. \`album()\` houdt 1–10 afbeeldingen
- Een layout deelt zijn antwoord niet met tekst, een embed, een peiling of een canvas-afbeelding

## Verder

- [Antwoorden](/docs/replies) · [Verzamelaars](/docs/collectors) · [Peilingen](/docs/polls) · [Berichten sturen](/docs/sending-messages)
`,
    },
  },
  {
    slug: "canvas",
    order: 46,
    en: {
      title: "Canvas",
      description: "Draw a PNG with canvas() and send it.",
      body: `
\`canvas({ width, height })\` starts a transparent picture. Chain \`fill\`, \`box\`, \`dot\`, and \`text\`. Colors come from \`colors.*\` or any color an embed accepts: a name such as \`colors.blurple\`, a \`#RRGGBB\` string, or a number \`0\`–\`0xffffff\`. \`png()\` is the file Discord receives. You normally let \`reply\` call it.

## Draw and reply

\`\`\`js
import { canvas, colors, command } from "@draeven/core";

export const badge = command("badge", "Draw a name badge", async (ctx) => {
  const picture = canvas({ width: 280, height: 72 })
    .fill(colors.white)
    .box({ x: 0, y: 0, width: 8, height: 72, color: colors.blurple })
    .text({ value: "DRAEVEN", x: 20, y: 24, color: colors.blurple, size: 3 });

  return ctx.reply(picture);
});
\`\`\`

Each side is a whole number from **1 to 1024**. The bitmap starts fully transparent. Paint past the edge is ignored. \`pixel(x, y)\` reads \`{ r, g, b, a }\` and returns zeros outside the picture.

## Text

Text uses a built-in **5×7** font for ASCII, from space through tilde. Characters outside that range leave a gap and draw nothing. \`size\` is a whole number from **1 to 8** and defaults to **2**. A string is at most **200** characters. Each glyph advances \`6 * size\` pixels, so size 3 is 18 pixels per character.

## How to send it

| Call | Result |
|------|--------|
| \`ctx.reply(picture)\` | The PNG alone, attached as \`picture.png\`. |
| \`ctx.reply({ text: "Badge", picture })\` | A caption plus the PNG. |
| \`ctx.reply(embed({ header: { title: "Badge" }, picture }))\` | The PNG on that embed, via \`picture\`. |
| \`ctx.send(channelId, picture)\` or \`bot.send(channelId, picture)\` | A normal channel message. |

\`followup\` accepts the same shapes. \`ctx.reply("Badge", picture)\` is not an overload. It throws. Put the caption in \`{ text, picture }\`.

<Note>
A canvas picture cannot share a reply with \`layout()\`. \`layout()\` is Components V2. The picture is a file on a classic message. Send one or the other.
</Note>

## Methods

| Method | Arguments |
|--------|-----------|
| \`fill(color)\` | Paint every pixel. |
| \`box({ x, y, width, height, color })\` | A rectangle. Width and height at least 1. |
| \`dot({ x, y, radius, color })\` | A filled circle. Radius is 1–512. |
| \`text({ value, x, y, color, size? })\` | ASCII, size 1–8. |
| \`pixel(x, y)\` | Read one pixel. |
| \`png()\` | PNG bytes. |

Coordinates and sizes are whole numbers. A fractional width throws before anything is drawn.

## Pitfalls

- One reply carries one picture. An embed \`picture\` plus a message \`picture\` throws.
- The font has no emoji and no letters past \`~\`. Draw those as shapes, or put them in the embed text.
- A 1024×1024 canvas is a large PNG. Use the size the badge actually needs.
- \`fill\` covers earlier paint. Draw the background first, then the bar, then the letters.

## Related

- [Embeds & layout](/docs/embeds-layout) · [Replies](/docs/replies)
`,
    },
    nl: {
      title: "Canvas",
      description: "Teken een PNG met canvas() en verstuur die.",
      body: `
\`canvas({ width, height })\` begint een doorzichtige afbeelding. Roep \`fill\`, \`box\`, \`dot\` en \`text\` achter elkaar aan. Kleuren komen uit \`colors.*\` of elke kleur die een embed aanneemt: een naam zoals \`colors.blurple\`, een \`#RRGGBB\`-string, of een getal \`0\`–\`0xffffff\`. \`png()\` is het bestand dat Discord ontvangt. Normaal roept \`reply\` dat voor je aan.

## Tekenen en antwoorden

\`\`\`js
import { canvas, colors, command } from "@draeven/core";

export const badge = command("badge", "Teken een naambordje", async (ctx) => {
  const picture = canvas({ width: 280, height: 72 })
    .fill(colors.white)
    .box({ x: 0, y: 0, width: 8, height: 72, color: colors.blurple })
    .text({ value: "DRAEVEN", x: 20, y: 24, color: colors.blurple, size: 3 });

  return ctx.reply(picture);
});
\`\`\`

Elke zijde is een geheel getal van **1 tot 1024**. De bitmap begint volledig doorzichtig. Verf buiten de rand wordt genegeerd. \`pixel(x, y)\` leest \`{ r, g, b, a }\` en geeft nullen terug buiten de afbeelding.

## Tekst

Tekst gebruikt een ingebouwd **5×7**-lettertype voor ASCII, van spatie tot en met tilde. Tekens daarbuiten laten een gat en tekenen niets. \`size\` is een geheel getal van **1 tot 8** en staat standaard op **2**. Een string is hoogstens **200** tekens. Elk teken schuift \`6 * size\` pixels op, dus grootte 3 is 18 pixels per teken.

## Versturen

| Aanroep | Resultaat |
|---------|-----------|
| \`ctx.reply(picture)\` | Alleen de PNG, als bijlage \`picture.png\`. |
| \`ctx.reply({ text: "Bordje", picture })\` | Een bijschrift plus de PNG. |
| \`ctx.reply(embed({ header: { title: "Bordje" }, picture }))\` | De PNG op die embed, via \`picture\`. |
| \`ctx.send(channelId, picture)\` of \`bot.send(channelId, picture)\` | Een gewoon kanaalbericht. |

\`followup\` neemt dezelfde vormen. \`ctx.reply("Bordje", picture)\` is geen overload. Die gooit. Zet het bijschrift in \`{ text, picture }\`.

<Note>
Een canvas-afbeelding deelt een antwoord niet met \`layout()\`. \`layout()\` is Components V2. De afbeelding is een bestand op een klassiek bericht. Verstuur één van de twee.
</Note>

## Methoden

| Methode | Argumenten |
|---------|------------|
| \`fill(color)\` | Verf elk pixel. |
| \`box({ x, y, width, height, color })\` | Een rechthoek. Breedte en hoogte minstens 1. |
| \`dot({ x, y, radius, color })\` | Een gevulde cirkel. Straal is 1–512. |
| \`text({ value, x, y, color, size? })\` | ASCII, grootte 1–8. |
| \`pixel(x, y)\` | Lees één pixel. |
| \`png()\` | PNG-bytes. |

Coördinaten en maten zijn gehele getallen. Een gebroken breedte gooit voordat er iets getekend is.

## Valkuilen

- Eén antwoord draagt één afbeelding. Een embed-\`picture\` plus een bericht-\`picture\` gooit.
- Het lettertype heeft geen emoji en geen letters voorbij \`~\`. Teken die als vormen, of zet ze in de embedtekst.
- Een canvas van 1024×1024 is een grote PNG. Gebruik de maat die het bordje echt nodig heeft.
- \`fill\` dekt eerdere verf. Teken eerst de achtergrond, dan de balk, dan de letters.

## Verder

- [Embeds en layout](/docs/embeds-layout) · [Antwoorden](/docs/replies)
`,
    },
  },
  {
    slug: "polls",
    order: 47,
    en: {
      title: "Polls",
      description: "Native Discord polls from poll().",
      body: `
A poll is a native Discord poll attached to a message. Build it with \`poll({ question, answers, hours?, multi? })\` and pass it to \`ctx.reply\`, \`followup\`, or \`bot.send\` the same way you pass an embed. Use a poll when you want Discord to count votes. Use buttons plus \`ctx.collect\` when the bot must react to a single click.

\`\`\`js
import { command, poll } from "@draeven/core";

export const ship = command("ship", "Ask the community", async (ctx) =>
  ctx.reply(
    poll({
      question: "Ship it?",
      answers: ["Yes", "Not yet"],
      hours: 24,
    })
  )
);
\`\`\`

## Answers

Each answer is a string or \`{ text, emoji? }\`. Text is 1–55 characters. You need **2–10** answers. The question is 1–300 characters.

\`\`\`js
poll({
  question: "Pick tools",
  answers: [
    { text: "ESLint", emoji: "✅" },
    { text: "Vitest", emoji: "🧪" },
  ],
  multi: true,
  hours: 48,
});
\`\`\`

\`multi: true\` allows more than one answer. It defaults to false. \`hours\` defaults to **24**, must be an integer, and must be **1–768** (32 days).

## Votes after the message exists

\`poll()\` does not return the tally. Listen on the gateway:

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("pollVoteAdd", "pollVoteRemove"),
  events: {
    pollVoteAdd: (vote) => console.log("add", vote),
    pollVoteRemove: (vote) => console.log("remove", vote),
  },
});
\`\`\`

\`intentsFor\` adds \`guildMessagePolls\` and \`directMessagePolls\`. Those are not privileged portal toggles.

<Tip>
Discord still requires the bot to be allowed to send polls in that channel. Gate the command with \`need: "SendPolls"\` when only some members should open one.
</Tip>

## Pitfalls

- A poll is the whole reply. Do not also pass text, an embed, rows, a picture, or a \`layout()\` on the same \`reply\`.
- \`{ private: true }\` on a poll throws \`A poll cannot be private.\`
- \`hours: 24.5\` throws. Pass an integer.
- One answer, or eleven, throws at \`poll()\` time — not later from Discord.

## Related

- [Replies](/docs/replies) · [Events & intents](/docs/events-intents) · [Embeds & layout](/docs/embeds-layout)
`,
    },
    nl: {
      title: "Peilingen",
      description: "Native Discord-peilingen via poll().",
      body: `
Een peiling is een native Discord-poll aan een bericht. Bouw hem met \`poll({ question, answers, hours?, multi? })\` en geef hem aan \`ctx.reply\`, \`followup\` of \`bot.send\`, net als een embed. Gebruik een peiling als Discord de stemmen moet tellen. Gebruik knoppen plus \`ctx.collect\` als de bot op één klik moet reageren.

\`\`\`js
import { command, poll } from "@draeven/core";

export const ship = command("ship", "Vraag de community", async (ctx) =>
  ctx.reply(
    poll({
      question: "Shippen?",
      answers: ["Ja", "Nog niet"],
      hours: 24,
    })
  )
);
\`\`\`

## Antwoorden

Elk antwoord is een string of \`{ text, emoji? }\`. Tekst is 1–55 tekens. Je hebt **2–10** antwoorden nodig. De vraag is 1–300 tekens.

\`\`\`js
poll({
  question: "Kies tools",
  answers: [
    { text: "ESLint", emoji: "✅" },
    { text: "Vitest", emoji: "🧪" },
  ],
  multi: true,
  hours: 48,
});
\`\`\`

\`multi: true\` staat meer dan één antwoord toe. Standaard is false. \`hours\` is standaard **24**, moet een geheel getal zijn, en moet **1–768** zijn (32 dagen).

## Stemmen nadat het bericht er is

\`poll()\` geeft de stand niet terug. Luister op de gateway:

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("pollVoteAdd", "pollVoteRemove"),
  events: {
    pollVoteAdd: (vote) => console.log("add", vote),
    pollVoteRemove: (vote) => console.log("remove", vote),
  },
});
\`\`\`

\`intentsFor\` zet \`guildMessagePolls\` en \`directMessagePolls\` aan. Dat zijn geen privileged portal-schakelaars.

<Tip>
Discord eist nog steeds dat de bot peilingen in dat kanaal mag sturen. Gate het commando met \`need: "SendPolls"\` als alleen sommige leden er een mogen openen.
</Tip>

## Valkuilen

- Een peiling is het hele antwoord. Geef niet ook tekst, een embed, rijen, een afbeelding of een \`layout()\` aan dezelfde \`reply\`.
- \`{ private: true }\` op een peiling gooit \`A poll cannot be private.\`
- \`hours: 24.5\` gooit. Geef een geheel getal.
- Eén antwoord, of elf, gooit al bij \`poll()\` — niet later vanuit Discord.

## Verder

- [Antwoorden](/docs/replies) · [Events en intents](/docs/events-intents) · [Embeds en layout](/docs/embeds-layout)
`,
    },
  },
  {
    slug: "mod-actions",
    order: 48,
    en: {
      title: "Moderation actions",
      description: "timeout, kick, ban, purge, and message helpers on ctx.",
      body: `
Moderation helpers live on the command \`ctx\`. They call Discord REST through the gateway connection \`Start()\` opened. Use them inside a guild command. They throw in a DM or when that connection cannot perform the action.

Always pair them with \`need\` so the caller is checked before the REST call ([Permissions](/docs/permissions)).

## Signatures

| Method | Call |
|--------|------|
| \`timeout\` | \`(user, seconds, reason?)\` — \`0\` seconds clears |
| \`kick\` | \`(user, reason?)\` |
| \`ban\` | \`(user, { seconds?, reason? }?)\` — \`seconds\` is how long to delete recent messages |
| \`moveVoice\` | \`(user, channel \\| null)\` — \`null\` disconnects |
| \`purge\` | \`(channel, count)\` — count **2–100**, returns how many ids were sent |
| \`pin\` / \`unpin\` | \`(channel, messageId)\` |
| \`react\` | \`(channel, messageId, emoji)\` |
| \`editMessage\` | \`(channel, messageId, text)\` — 1–2000 characters, bot-owned messages |
| \`deleteMessage\` | \`(channel, messageId, reason?)\` |

\`user\` and \`channel\` accept a real object (\`ctx.who\`, \`ctx.getChannel()\`) or an id string.

## Timeout

\`\`\`js
import { command, user, number } from "@draeven/core";

export const mute = command(
  "mute",
  "Timeout a member",
  {
    who: user("Who?").required(),
    mins: number("Minutes?", { min: 1, max: 40320 }),
  },
  async (ctx) => {
    const minutes = ctx.mins ?? 10;
    await ctx.timeout(ctx.who, minutes * 60, "Timed out via command");
    return ctx.reply(\`Timed out \${ctx.who.name} for \${minutes}m.\`);
  },
  { need: "ModerateMembers" }
);
\`\`\`

Discord's timeout length is in seconds. The maximum Discord accepts is 28 days (\`40320\` minutes). Clearing is \`ctx.timeout(ctx.who, 0)\`.

## Purge and a single delete

\`\`\`js
const channel = ctx.getChannel();
if (!channel) return ctx.reply("No channel here.", { private: true });
const removed = await ctx.purge(channel, 50);
await ctx.reply(\`Removed \${removed}.\`, { private: true });
\`\`\`

\`purge\` lists recent ids, then bulk-deletes. Fewer than two deletable messages returns \`0\` and does not call the bulk endpoint. One specific message is \`ctx.deleteMessage(channel, messageId, "reason")\`.

<Warn>
\`editMessage\` only replaces text on a message the bot created. It is not \`ctx.edit\`, which updates the interaction reply.
</Warn>

## Pitfalls

- Helpers are absent from the menu context. Right-click actions that ban should open a slash command, or call REST yourself outside this helper set.
- \`purge\` needs Manage Messages on the bot and on the caller if you gated with \`need: "ManageMessages"\`.
- \`ban\`'s \`seconds\` is a delete window, not a temp-ban. Draeven does not schedule an unban.

## Related

- [Subcommands](/docs/subcommands) · [Permissions](/docs/permissions) · [Sending messages](/docs/sending-messages)
`,
    },
    nl: {
      title: "Mod-acties",
      description: "timeout, kick, ban, purge en berichthulp op ctx.",
      body: `
Moderatiehelpers zitten op de commando-\`ctx\`. Ze roepen Discord-REST aan via de gatewayverbinding die \`Start()\` opende. Gebruik ze in een guild-commando. Ze gooien in een DM of als die verbinding de actie niet kan uitvoeren.

Koppel ze altijd aan \`need\`, zodat de aanroeper wordt gecontroleerd vóór de REST-aanroep ([Rechten](/docs/permissions)).

## Signaturen

| Methode | Aanroep |
|---------|---------|
| \`timeout\` | \`(user, seconden, reason?)\` — \`0\` seconden heft op |
| \`kick\` | \`(user, reason?)\` |
| \`ban\` | \`(user, { seconds?, reason? }?)\` — \`seconds\` is hoe lang recente berichten worden verwijderd |
| \`moveVoice\` | \`(user, channel \\| null)\` — \`null\` verbreekt |
| \`purge\` | \`(channel, aantal)\` — aantal **2–100**, geeft terug hoeveel ids zijn verstuurd |
| \`pin\` / \`unpin\` | \`(channel, messageId)\` |
| \`react\` | \`(channel, messageId, emoji)\` |
| \`editMessage\` | \`(channel, messageId, tekst)\` — 1–2000 tekens, berichten van de bot |
| \`deleteMessage\` | \`(channel, messageId, reason?)\` |

\`user\` en \`channel\` nemen een echt object (\`ctx.who\`, \`ctx.getChannel()\`) of een id-string.

## Timeout

\`\`\`js
import { command, user, number } from "@draeven/core";

export const mute = command(
  "mute",
  "Timeout een lid",
  {
    who: user("Wie?").required(),
    mins: number("Minuten?", { min: 1, max: 40320 }),
  },
  async (ctx) => {
    const minutes = ctx.mins ?? 10;
    await ctx.timeout(ctx.who, minutes * 60, "Timeout via commando");
    return ctx.reply(\`Timeout voor \${ctx.who.name}: \${minutes}m.\`);
  },
  { need: "ModerateMembers" }
);
\`\`\`

De timeoutlengte van Discord is in seconden. Het maximum dat Discord aanneemt is 28 dagen (\`40320\` minuten). Opheffen is \`ctx.timeout(ctx.who, 0)\`.

## Purge en één bericht wissen

\`\`\`js
const channel = ctx.getChannel();
if (!channel) return ctx.reply("Geen kanaal hier.", { private: true });
const removed = await ctx.purge(channel, 50);
await ctx.reply(\`Verwijderd: \${removed}.\`, { private: true });
\`\`\`

\`purge\` haalt recente ids op en verwijdert ze in bulk. Minder dan twee verwijderbare berichten geeft \`0\` terug en roept het bulk-eindpunt niet aan. Eén specifiek bericht is \`ctx.deleteMessage(channel, messageId, "reden")\`.

<Warn>
\`editMessage\` vervangt alleen tekst op een bericht dat de bot zelf maakte. Het is niet \`ctx.edit\`, dat het interactie-antwoord bijwerkt.
</Warn>

## Valkuilen

- Helpers zitten niet op de menucontext. Een rechtermuisklik die bant hoort een slash-commando te openen, of REST buiten deze helpers aan te roepen.
- \`purge\` vraagt Manage Messages van de bot en van de aanroeper als je gate met \`need: "ManageMessages"\`.
- \`seconds\` bij \`ban\` is een wisvenster, geen tijdelijke ban. Draeven plant geen unban.

## Verder

- [Subcommando's](/docs/subcommands) · [Rechten](/docs/permissions) · [Berichten sturen](/docs/sending-messages)
`,
    },
  },
  {
    slug: "transcript",
    order: 49,
    en: {
      title: "Transcripts",
      description: "Save channel history as an HTML file.",
      body: `
\`await ctx.transcript()\` reads the current channel and returns a \`TranscriptFile\`: HTML bytes, a filename, and a short note. \`reply\` or \`followup\` that file. Discord gets the note as the message text and the HTML as the attachment.

## Save the channel

\`\`\`js
import { command } from "@draeven/core";

export const save = command("save", "Save this channel", async (ctx) => {
  const file = await ctx.transcript({
    timeZone: "Europe/Amsterdam",
    link: "https://archive.example/{guild}/{channel}/{message}",
  });
  return ctx.reply(file);
});
\`\`\`

The call defers the interaction when you have not already, then fetches history. The note becomes the message, for example \`12 messages from #general.\` The file name follows the channel, such as \`general.html\`.

## Options

| Field | Meaning |
|-------|---------|
| \`timeZone\` | IANA zone for the clocks on the page. Overrides \`Start({ timeZone })\`. When both are omitted, the page uses \`UTC\`. |
| \`link\` | Template for each message address. \`{guild}\`, \`{channel}\`, and \`{message}\` are filled in. Must start with \`http://\` or \`https://\`, and stay within 500 characters. Omit it and each line links to the message on Discord. |

Discord returns messages newest first. The page lists them **oldest first**, with text, files, embeds, reactions, stickers, polls, buttons, and system lines. A page over 10 MB throws. Earlier transcript files from this bot are left out, so a new page does not include itself.

A channel is required. In a guild, the server name and role colors are added. Without a channel the call throws \`[Draeven] This command has no channel.\`

## Where the zone comes from

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  timeZone: "Europe/Amsterdam",
});
\`\`\`

\`ctx.transcript()\` with no options then uses \`Europe/Amsterdam\`. Pass \`timeZone\` on the call when this one page should differ. \`"Amsterdam"\` throws. The name has to be an IANA zone. That zone formats the HTML clocks. It does not change \`time()\` inside embeds ([Start options](/docs/start-options)).

<Note>
\`simulate()\` has no channel history, so \`ctx.transcript()\` throws. Run the command on a live gateway. In a unit test, call the exported \`renderTranscript(history, options)\` with a history object you built.
</Note>

## Pitfalls

- The command needs the channel Discord sent with the interaction. A context with no channel cannot build a page.
- \`link\` without a scheme throws. \`https://archive.example/{guild}/{channel}/{message}\` is the shape. \`{guild}\` becomes \`@me\` when the channel has no guild.
- Fetching history defers first. Do not open a \`form()\` later in the same command.
- The HTML is a file on the reply, not an embed. Follow up with an embed when you also want a summary.

## Related

- [Start options](/docs/start-options) · [Replies](/docs/replies) · [Simulate](/docs/simulate) · [Known limits](/docs/known-limits)
`,
    },
    nl: {
      title: "Transcripten",
      description: "Sla de kanaalgeschiedenis op als HTML.",
      body: `
\`await ctx.transcript()\` leest het huidige kanaal en geeft een \`TranscriptFile\` terug: HTML-bytes, een bestandsnaam en een korte notitie. Geef dat bestand aan \`reply\` of \`followup\`. Discord krijgt de notitie als berichttekst en de HTML als bijlage.

## Het kanaal opslaan

\`\`\`js
import { command } from "@draeven/core";

export const save = command("save", "Sla dit kanaal op", async (ctx) => {
  const file = await ctx.transcript({
    timeZone: "Europe/Amsterdam",
    link: "https://archive.example/{guild}/{channel}/{message}",
  });
  return ctx.reply(file);
});
\`\`\`

De aanroep defert de interactie als je dat nog niet deed, en haalt daarna de geschiedenis op. De notitie wordt het bericht, bijvoorbeeld \`12 messages from #general.\` De bestandsnaam volgt het kanaal, zoals \`general.html\`.

## Opties

| Veld | Betekenis |
|------|-----------|
| \`timeZone\` | IANA-zone voor de klokken op de pagina. Overschrijft \`Start({ timeZone })\`. Zijn beide weggelaten, dan gebruikt de pagina \`UTC\`. |
| \`link\` | Sjabloon voor het adres van elk bericht. \`{guild}\`, \`{channel}\` en \`{message}\` worden ingevuld. Moet beginnen met \`http://\` of \`https://\`, en binnen 500 tekens blijven. Weglaten linkt elke regel naar het bericht op Discord. |

Discord stuurt berichten nieuwste eerst. De pagina toont ze **oudste eerst**, met tekst, bestanden, embeds, reacties, stickers, peilingen, knoppen en systeemregels. Een pagina boven 10 MB gooit. Eerdere transcriptbestanden van deze bot blijven buiten de pagina, zodat een nieuwe pagina zichzelf niet meeneemt.

Een kanaal is verplicht. In een guild komen de servernaam en rolkleuren erbij. Zonder kanaal gooit de aanroep \`[Draeven] This command has no channel.\`

## Waar de zone vandaan komt

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  timeZone: "Europe/Amsterdam",
});
\`\`\`

\`ctx.transcript()\` zonder opties gebruikt dan \`Europe/Amsterdam\`. Geef \`timeZone\` mee op de aanroep als deze ene pagina moet afwijken. \`"Amsterdam"\` gooit. De naam moet een IANA-zone zijn. Die zone formatteert de HTML-klokken. Ze verandert \`time()\` in embeds niet ([Start-opties](/docs/start-options)).

<Note>
\`simulate()\` heeft geen kanaalgeschiedenis, dus \`ctx.transcript()\` gooit. Draai het commando op een live gateway. Roep in een unittest de geëxporteerde \`renderTranscript(history, options)\` aan met een geschiedenis die je zelf bouwde.
</Note>

## Valkuilen

- Het commando heeft het kanaal nodig dat Discord met de interactie meestuurde. Een context zonder kanaal kan geen pagina bouwen.
- \`link\` zonder schema gooit. \`https://archive.example/{guild}/{channel}/{message}\` is de vorm. \`{guild}\` wordt \`@me\` als het kanaal geen guild heeft.
- Geschiedenis ophalen defert eerst. Open later in hetzelfde commando geen \`form()\`.
- De HTML is een bestand op het antwoord, geen embed. Stuur een follow-up met een embed als je ook een samenvatting wilt.

## Verder

- [Start-opties](/docs/start-options) · [Antwoorden](/docs/replies) · [Simuleren](/docs/simulate) · [Bekende grenzen](/docs/known-limits)
`,
    },
  },
  {
    slug: "events-intents",
    order: 60,
    en: {
      title: "Events & intents",
      description: "CamelCase gateway events, intentsFor(), and use().",
      body: `
Joins, messages, reactions, and durable \`use()\` handlers live outside slash commands. Names are camelCase (\`memberJoin\`).

<WhenToUse topic="events" />

Each event needs the intents in \`eventIntents\`. \`intentsFor("memberJoin", "message")\` unions those bits. Prefer \`intentsFor\` over a hand-written mask.

<IntentCalc />

## Inline handlers

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("memberJoin", "message", "messageDelete"),
  events: {
    ready: () => console.log("online"),
    memberJoin: (member) => console.log("join", member.name),
    message: (msg) => console.log(msg.content),
    messageDelete: (gone) => console.log("deleted", gone.id),
  },
});
\`\`\`

\`memberJoin\` receives a flat member: \`id\`, \`name\`, \`bot\`, \`guildId\`, plus optional \`nick\`, \`joinedAt\`, \`icon\`, and \`roleIds\`. There is no nested \`user\` object. \`message.author\` is the same kind of profile (\`id\`, \`name\`, \`bot\`, optional \`icon\`), not \`username\`.

\`bot.onEvent(name, handler)\` subscribes later and returns an unsubscribe function. \`onMemberJoin\`, \`onMemberLeave\`, and \`onMessage\` are the same idea for those three names.

## intentsFor and intentBits

| You write | You get |
|-----------|---------|
| \`intentsFor("ready")\` | \`0\` — \`ready\` needs nothing |
| \`intentsFor("memberJoin")\` | \`guildMembers\` (privileged) |
| \`intentsFor("message")\` | \`guildMessages\`, \`directMessages\`, \`messageContent\` |
| \`intentsFor("reactionAdd")\` | \`guildMessageReactions\`, \`directMessageReactions\` |
| \`intentsFor("presenceUpdate")\` | \`guildPresences\` (privileged) |
| \`intentsFor("pollVoteAdd")\` | \`guildMessagePolls\`, \`directMessagePolls\` |
| \`intentBits("guilds", "guildMessages")\` | those bits only, by intent name |

Unknown event names throw. \`intentBits\` throws on an unknown intent name.

Privileged intents still need the portal toggle ([Creating an app](/docs/creating-app)): **Server Members**, **Message Content**, **Presence**.

## Folder of handlers

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  intents: intentsFor("memberJoin", "message"),
  events: "./dist/events",
});
\`\`\`

Or set \`events: "./dist/events"\` in \`draeven.config.js\` and omit \`events\` on \`Start\`. Draeven then loads that folder the same way it loads commands from config.

\`loadEvents\` reads \`.js\` files and keeps:

1. Exports whose **name is a gateway event** (\`memberJoin\`, \`message\`, …)
2. Values built with **\`use()\`** — durable button, menu, and form handlers. The export name can be anything.

\`\`\`js
export function memberJoin(member) {
  console.log(member.name);
}
\`\`\`

The command that posts \`hangman_A\` leaves \`press\` off. This handler owns the id:

\`\`\`js
import { button, row, use } from "@draeven/core";

export const letters = use({
  ids: "hangman_*",
  run(ctx) {
    const letter = ctx.id.slice("hangman_".length);
    return ctx.reply({
      text: \`You picked **\${letter}**\`,
      rows: [row(button({ id: "hangman_A", label: "A" }))],
    });
  },
});
\`\`\`

\`ids\` can be an exact string (\`"hangman_A"\`), a prefix with \`*\` only at the end (\`"hangman_*"\`), a list (\`["yes", "no"]\`), or \`(id) => boolean\`. \`kind\` defaults to \`"press"\`. Pass \`"submit"\` for a form. Who wins between \`collect\`, inline \`press\`, and \`use()\` is on [Press & submit](/docs/press-handlers).

A second \`memberJoin\` export in the folder throws. \`watch: true\` reloads this folder the same way it reloads commands (gateway handlers and \`use()\`). An inline \`events\` object is not a folder, so watch does not swap those functions, and it does not load \`use()\`.

## Names you can register

Guild structure: \`guildJoin\`, \`guildLeave\`, \`guildUpdate\`, \`channelCreate\`, \`channelUpdate\`, \`channelDelete\`, \`threadCreate\`, \`threadUpdate\`, \`threadDelete\`, \`roleCreate\`, \`roleUpdate\`, \`roleDelete\`.

People and chat: \`memberJoin\`, \`memberLeave\`, \`memberUpdate\`, \`memberBan\`, \`memberUnban\`, \`message\`, \`messageEdit\`, \`messageDelete\`, \`messageBulkDelete\`, \`reactionAdd\`, \`reactionRemove\`, \`reactionClear\`, \`reactionClearEmoji\`, \`typing\`.

Other: \`voiceUpdate\`, \`inviteCreate\`, \`inviteDelete\`, \`presenceUpdate\`, \`scheduleCreate\`, \`scheduleUpdate\`, \`scheduleDelete\`, \`pollVoteAdd\`, \`pollVoteRemove\`, \`ready\`, \`resumed\`.

<Note>
\`message\` without the Message Content intent arrives without \`content\`. The handler still runs.
</Note>

## Pitfalls

- \`intentsFor()\` with no names throws. A slash-only bot can pass \`intentsFor("ready")\` or omit intents.
- Folder handlers must be functions. A constant named \`message\` throws.
- Enabling the portal intent and forgetting \`intentsFor\` still yields no events.
- \`use()\` in the commands folder is ignored. Put it in the events folder, next to \`memberJoin\`.

## Related

- [Press & submit](/docs/press-handlers) · [Presence](/docs/presence) · [Sending messages](/docs/sending-messages) · [Hot-reload & guard](/docs/hot-reload-guard)
`,
    },
    nl: {
      title: "Events en intents",
      description: "CamelCase gateway-events, intentsFor() en use().",
      body: `
Joins, berichten, reacties en duurzame \`use()\`-handlers horen buiten slash-commando's. Namen zijn camelCase (\`memberJoin\`).

<WhenToUse topic="events" />

Elk event heeft de intents uit \`eventIntents\` nodig. \`intentsFor("memberJoin", "message")\` voegt die bits samen. Liever \`intentsFor\` dan een masker met de hand.

<IntentCalc />

## Handlers inline

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("memberJoin", "message", "messageDelete"),
  events: {
    ready: () => console.log("online"),
    memberJoin: (member) => console.log("join", member.name),
    message: (msg) => console.log(msg.content),
    messageDelete: (gone) => console.log("verwijderd", gone.id),
  },
});
\`\`\`

\`memberJoin\` krijgt een plat lid: \`id\`, \`name\`, \`bot\`, \`guildId\`, plus optioneel \`nick\`, \`joinedAt\`, \`icon\` en \`roleIds\`. Er is geen genest \`user\`-object. \`message.author\` is hetzelfde soort profiel (\`id\`, \`name\`, \`bot\`, optioneel \`icon\`), niet \`username\`.

\`bot.onEvent(name, handler)\` abonneert later en geeft een afmeldfunctie terug. \`onMemberJoin\`, \`onMemberLeave\` en \`onMessage\` doen hetzelfde voor die drie namen.

## intentsFor en intentBits

| Je schrijft | Je krijgt |
|-------------|-----------|
| \`intentsFor("ready")\` | \`0\` — \`ready\` heeft niets nodig |
| \`intentsFor("memberJoin")\` | \`guildMembers\` (privileged) |
| \`intentsFor("message")\` | \`guildMessages\`, \`directMessages\`, \`messageContent\` |
| \`intentsFor("reactionAdd")\` | \`guildMessageReactions\`, \`directMessageReactions\` |
| \`intentsFor("presenceUpdate")\` | \`guildPresences\` (privileged) |
| \`intentsFor("pollVoteAdd")\` | \`guildMessagePolls\`, \`directMessagePolls\` |
| \`intentBits("guilds", "guildMessages")\` | alleen die bits, op intentnaam |

Onbekende eventnamen gooien. \`intentBits\` gooit bij een onbekende intentnaam.

Privileged intents hebben nog steeds de portaalschakelaar nodig ([App aanmaken](/docs/creating-app)): **Server Members**, **Message Content**, **Presence**.

## Map met handlers

\`\`\`js
await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  intents: intentsFor("memberJoin", "message"),
  events: "./dist/events",
});
\`\`\`

Of zet \`events: "./dist/events"\` in \`draeven.config.js\` en laat \`events\` weg op \`Start\`. Draeven laadt die map dan zoals het commando's uit de config laadt.

\`loadEvents\` leest \`.js\`-bestanden en houdt:

1. Exports waarvan de **naam een gateway-event is** (\`memberJoin\`, \`message\`, …)
2. Waarden gebouwd met **\`use()\`** — duurzame knop-, menu- en formulierhandlers. De exportnaam mag van alles zijn.

\`\`\`js
export function memberJoin(member) {
  console.log(member.name);
}
\`\`\`

Het commando dat \`hangman_A\` plaatst laat \`press\` weg. Deze handler bezit de id:

\`\`\`js
import { button, row, use } from "@draeven/core";

export const letters = use({
  ids: "hangman_*",
  run(ctx) {
    const letter = ctx.id.slice("hangman_".length);
    return ctx.reply({
      text: \`You picked **\${letter}**\`,
      rows: [row(button({ id: "hangman_A", label: "A" }))],
    });
  },
});
\`\`\`

\`ids\` kan een exacte string zijn (\`"hangman_A"\`), een prefix met \`*\` alleen aan het eind (\`"hangman_*"\`), een lijst (\`["yes", "no"]\`), of \`(id) => boolean\`. \`kind\` is standaard \`"press"\`. Geef \`"submit"\` mee voor een formulier. Wie wint tussen \`collect\`, inline \`press\` en \`use()\` staat bij [Press & submit](/docs/press-handlers).

Een tweede \`memberJoin\`-export in de map gooit. \`watch: true\` herlaadt deze map zoals commando's (gateway-handlers en \`use()\`). Een inline \`events\`-object is geen map, dus watch wisselt die functies niet, en het laadt geen \`use()\`.

## Namen die je kunt registreren

Guildstructuur: \`guildJoin\`, \`guildLeave\`, \`guildUpdate\`, \`channelCreate\`, \`channelUpdate\`, \`channelDelete\`, \`threadCreate\`, \`threadUpdate\`, \`threadDelete\`, \`roleCreate\`, \`roleUpdate\`, \`roleDelete\`.

Mensen en chat: \`memberJoin\`, \`memberLeave\`, \`memberUpdate\`, \`memberBan\`, \`memberUnban\`, \`message\`, \`messageEdit\`, \`messageDelete\`, \`messageBulkDelete\`, \`reactionAdd\`, \`reactionRemove\`, \`reactionClear\`, \`reactionClearEmoji\`, \`typing\`.

Overig: \`voiceUpdate\`, \`inviteCreate\`, \`inviteDelete\`, \`presenceUpdate\`, \`scheduleCreate\`, \`scheduleUpdate\`, \`scheduleDelete\`, \`pollVoteAdd\`, \`pollVoteRemove\`, \`ready\`, \`resumed\`.

<Note>
\`message\` zonder de Message Content-intent komt binnen zonder \`content\`. De handler draait nog wel.
</Note>

## Valkuilen

- \`intentsFor()\` zonder namen gooit. Een bot met alleen slash-commando's kan \`intentsFor("ready")\` doorgeven of intents weglaten.
- Map-handlers moeten functies zijn. Een constante met de naam \`message\` gooit.
- De portal-intent aanzetten en \`intentsFor\` vergeten levert nog steeds geen events.
- \`use()\` in de commandomap wordt genegeerd. Zet het in de events-map, naast \`memberJoin\`.

## Verder

- [Press & submit](/docs/press-handlers) · [Aanwezigheid](/docs/presence) · [Berichten sturen](/docs/sending-messages) · [Hot-reload en guard](/docs/hot-reload-guard)
`,
    },
  },
  {
    slug: "presence",
    order: 62,
    en: {
      title: "Presence",
      description: "The bot status line at startup and later.",
      body: `
Presence is the status and activity under the bot's name in the member list. Set it on \`Start\`, and change it later with \`bot.setPresence\`. This only updates **the bot account**. It does not set a member's status.

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
});
\`\`\`

## Status and activity

| \`status\` | Meaning |
|------------|---------|
| \`online\` | Green |
| \`idle\` | Away |
| \`dnd\` | Do not disturb |
| \`invisible\` | Shown as offline |

| \`activity.kind\` | Needs |
|-------------------|--------|
| \`playing\` | \`text\` |
| \`streaming\` | \`text\` and \`url\` |
| \`listening\` | \`text\` |
| \`watching\` | \`text\` |
| \`competing\` | \`text\` |
| \`custom\` | \`text\` |

\`afk: true\` is optional on the same object.

## Change it while running

\`\`\`js
bot.setPresence({
  status: "dnd",
  activity: { kind: "playing", text: "with Draeven" },
});
\`\`\`

Omit \`activity\` to clear the activity. The gateway payload then sends an empty activity list.

\`\`\`js
bot.setPresence({ status: "online" });
\`\`\`

Activity text must be 1–128 characters. \`kind: "streaming"\` needs an \`https://\` URL on \`twitch.tv\` or \`youtube.com\`. Anything else throws \`Streaming activity needs a Twitch or YouTube url.\`

## Hearing other people's presence

\`presenceUpdate\` is a privileged event. Turn on Presence Intent in the portal and pass \`intentsFor("presenceUpdate")\`. That is separate from \`setPresence\`, which needs no extra intent.

<Note>
\`setPresence\` is a gateway update, not a REST call. Rapid loops waste the session. Change status when the mode actually changes.
</Note>

## Pitfalls

- \`presence\` on \`Start\` is the initial identify payload. Calling \`setPresence\` before \`Start\` resolves is unnecessary — you do not have the \`bot\` yet.
- Custom activities still go through Discord's rules for bots. A kind of \`"custom"\` is accepted by the type; Discord may ignore text it does not allow.
- Invisible is not the same as \`bot.stop()\`. The process keeps running.

## Related

- [Quickstart](/docs/quickstart) · [Events & intents](/docs/events-intents)
`,
    },
    nl: {
      title: "Aanwezigheid",
      description: "De statusregel van de bot bij start en daarna.",
      body: `
Aanwezigheid is de status en activiteit onder de naam van de bot in de ledenlijst. Zet hem op \`Start\`, en wijzig hem later met \`bot.setPresence\`. Dit werkt alleen voor **het botaccount**. Het zet niet de status van een lid.

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  presence: {
    status: "online",
    activity: { kind: "watching", text: "slash commands" },
  },
});
\`\`\`

## Status en activiteit

| \`status\` | Betekenis |
|------------|-----------|
| \`online\` | Groen |
| \`idle\` | Afwezig |
| \`dnd\` | Niet storen |
| \`invisible\` | Lijkt offline |

| \`activity.kind\` | Nodig |
|-------------------|-------|
| \`playing\` | \`text\` |
| \`streaming\` | \`text\` en \`url\` |
| \`listening\` | \`text\` |
| \`watching\` | \`text\` |
| \`competing\` | \`text\` |
| \`custom\` | \`text\` |

\`afk: true\` is optioneel op hetzelfde object.

## Wijzigen terwijl de bot draait

\`\`\`js
bot.setPresence({
  status: "dnd",
  activity: { kind: "playing", text: "met Draeven" },
});
\`\`\`

Laat \`activity\` weg om de activiteit te wissen. De gateway stuurt dan een lege activiteitenlijst.

\`\`\`js
bot.setPresence({ status: "online" });
\`\`\`

Activiteitstekst moet 1–128 tekens zijn. \`kind: "streaming"\` heeft een \`https://\`-URL op \`twitch.tv\` of \`youtube.com\` nodig. Alles anders gooit \`Streaming activity needs a Twitch or YouTube url.\`

## Andermans aanwezigheid horen

\`presenceUpdate\` is een privileged event. Zet Presence Intent aan in het portaal en geef \`intentsFor("presenceUpdate")\` mee. Dat staat los van \`setPresence\`, dat geen extra intent nodig heeft.

<Note>
\`setPresence\` is een gateway-update, geen REST-aanroep. Snelle lussen verspillen de sessie. Verander de status als de modus echt verandert.
</Note>

## Valkuilen

- \`presence\` op \`Start\` is de eerste identify-payload. \`setPresence\` aanroepen vóór \`Start\` klaar is heeft geen zin — je hebt \`bot\` nog niet.
- Custom activiteiten lopen nog steeds via de regels van Discord voor bots. Het type accepteert \`"custom"\`; Discord kan tekst negeren die het niet toestaat.
- Invisible is niet hetzelfde als \`bot.stop()\`. Het proces blijft draaien.

## Verder

- [Snelstart](/docs/quickstart) · [Events en intents](/docs/events-intents)
`,
    },
  },
  {
    slug: "sending-messages",
    order: 63,
    en: {
      title: "Sending messages",
      description: "Post in a channel with bot.send or ctx.send.",
      body: `
\`ctx.reply\` answers the slash interaction. It can be ephemeral, and it dies with the interaction token. To post in a channel from a timer, a join event, or a command that should also speak in a log channel, use \`bot.send\` or \`ctx.send\`.

Both accept a channel id (or \`{ id }\`) and the same bodies as a reply: a string, \`embed()\`, \`poll()\`, \`layout()\`, a row, or a canvas. Neither can post a \`form()\`, and neither can be private. A \`layout()\` still cannot be combined with text, an embed, or a poll on that call. \`memberJoin\` gives you \`member.id\` and \`member.name\`, not \`member.user\`.

## From Start

\`\`\`js
import { Start, embed, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("memberJoin"),
  events: {
    memberJoin: async (member) => {
      const channelId = process.env.WELCOME_CHANNEL_ID;
      if (!channelId || !member.id) return;
      await bot.send(channelId, \`Welcome <@\${member.id}>.\`);
    },
  },
});

await bot.send(
  process.env.LOG_CHANNEL_ID,
  embed({ header: { title: "Alert" }, description: "Check #ops" })
);
\`\`\`

Hold the \`bot\` returned by \`Start\`. If the handler is created in the same object that is still awaiting assignment, declare \`let bot\` first so the closure sees it.

## From a command

\`\`\`js
import { command, text } from "@draeven/core";

export const say = command(
  "say",
  "Post in this channel",
  { line: text("Text?").required() },
  async (ctx) => {
    const channel = ctx.getChannel();
    if (!channel) return ctx.reply("No channel here.", { private: true });
    await ctx.send(channel, ctx.line);
    return ctx.reply("Posted.", { private: true });
  }
);
\`\`\`

\`getChannel()\` with no argument is \`undefined\` only when the interaction has no \`channelId\`. A DM still has a channel. \`getGuild()\` and \`getMember()\` are missing in a DM. Guard \`getChannel()\` before \`send\` when it can be missing. \`ctx.send\` throws under \`simulate()\`, because there is no REST connection.

<Warn fix="Grant View Channel + Send Messages; never pass private on send()." href="/docs/why-failing">
Channel messages need View Channel and Send Messages on the bot. \`send\` does not accept \`{ private: true }\` — that throws.
</Warn>

## Pitfalls

- High-volume logs hit Discord's REST limits. \`guard({ via: "channel" })\` is the supported path for error lines ([Hot-reload & guard](/docs/hot-reload-guard)).
- \`editMessage\` changes an existing bot message. \`send\` always creates a new one.
- Passing \`undefined\` as the channel throws. Skip the call when \`LOG_CHANNEL_ID\` is missing.

## Related

- [Replies](/docs/replies) · [Embeds & layout](/docs/embeds-layout) · [Events & intents](/docs/events-intents)
`,
    },
    nl: {
      title: "Berichten sturen",
      description: "Plaats in een kanaal met bot.send of ctx.send.",
      body: `
\`ctx.reply\` beantwoordt de slash-interactie. Het kan efemeer zijn, en het sterft met het interactietoken. Om in een kanaal te plaatsen vanuit een timer, een join-event, of een commando dat ook in een logkanaal moet praten, gebruik je \`bot.send\` of \`ctx.send\`.

Beide nemen een kanaal-id (of \`{ id }\`) en dezelfde lichamen als een antwoord: een string, \`embed()\`, \`poll()\`, \`layout()\`, een rij of een canvas. Geen van beide kan een \`form()\` plaatsen, en geen van beide kan privé zijn. Een \`layout()\` mag ook hier niet samen met tekst, een embed of een peiling. \`memberJoin\` geeft \`member.id\` en \`member.name\`, niet \`member.user\`.

## Vanuit Start

\`\`\`js
import { Start, embed, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("memberJoin"),
  events: {
    memberJoin: async (member) => {
      const channelId = process.env.WELCOME_CHANNEL_ID;
      if (!channelId || !member.id) return;
      await bot.send(channelId, \`Welkom <@\${member.id}>.\`);
    },
  },
});

await bot.send(
  process.env.LOG_CHANNEL_ID,
  embed({ header: { title: "Melding" }, description: "Kijk in #ops" })
);
\`\`\`

Bewaar de \`bot\` die \`Start\` teruggeeft. Als de handler in hetzelfde object ontstaat dat nog op toewijzing wacht, declareer dan eerst \`let bot\` zodat de closure hem ziet.

## Vanuit een commando

\`\`\`js
import { command, text } from "@draeven/core";

export const say = command(
  "say",
  "Plaats in dit kanaal",
  { line: text("Tekst?").required() },
  async (ctx) => {
    const channel = ctx.getChannel();
    if (!channel) return ctx.reply("Geen kanaal hier.", { private: true });
    await ctx.send(channel, ctx.line);
    return ctx.reply("Geplaatst.", { private: true });
  }
);
\`\`\`

\`getChannel()\` zonder argument is \`undefined\` alleen als de interactie geen \`channelId\` heeft. Een DM heeft nog steeds een kanaal. \`getGuild()\` en \`getMember()\` ontbreken in een DM. Controleer \`getChannel()\` vóór \`send\` als het kan ontbreken. \`ctx.send\` gooit onder \`simulate()\`, omdat er geen REST-verbinding is.

<Warn fix="Geef View Channel + Send Messages; private hoort niet op send()." href="/docs/why-failing">
Kanaalberichten vragen View Channel en Send Messages van de bot. \`send\` accepteert \`{ private: true }\` niet — dat gooit.
</Warn>

## Valkuilen

- Drukke logs raken de REST-limieten van Discord. \`guard({ via: "channel" })\` is het ondersteunde pad voor foutregels ([Hot-reload en guard](/docs/hot-reload-guard)).
- \`editMessage\` wijzigt een bestaand botbericht. \`send\` maakt altijd een nieuw bericht.
- \`undefined\` als kanaal doorgeven gooit. Sla de aanroep over als \`LOG_CHANNEL_ID\` ontbreekt.

## Verder

- [Antwoorden](/docs/replies) · [Embeds en layout](/docs/embeds-layout) · [Events en intents](/docs/events-intents)
`,
    },
  },
  {
    slug: "bot-handle",
    order: 64,
    en: {
      title: "Bot handle",
      description: "What Start() returns.",
      body: `
\`Start()\` returns the running bot. Keep that value when the entry file sends messages, changes presence, or stops the process. A command file does not receive it unless you close over it yourself.

## Surface

| Member | What it does |
|--------|----------------|
| \`commands\` | Commands and menus loaded right now. |
| \`stop()\` | Close the gateway and release the alone lock. |
| \`setPresence(presence)\` | Change status while the process is up. See [Presence](/docs/presence). |
| \`syncState()\` | Snapshot: \`watch\`, \`commandCount\`, last reload times, last reload errors. |
| \`onSync(handler)\` | Runs after a commands or events reload. Returns a function that unsubscribes. |
| \`send(channel, message)\` | Post outside a slash reply. See [Sending messages](/docs/sending-messages). |
| \`onMemberJoin\` / \`onMemberLeave\` | Gateway member events. Each call returns an unsubscribe function. |
| \`onMessage\` | Gateway messages. The message intent still has to be on. |
| \`onEvent(name, handler)\` | Any gateway event this connection exposes. Returns unsubscribe. |

A folder of event modules is the usual path ([Events & intents](/docs/events-intents)). \`onMemberJoin\` and \`onEvent\` are for the entry file, after \`Start\` has returned. \`onMemberJoin(handler)\` is sugar for \`onEvent("memberJoin", handler)\` — use whichever reads clearer.

## Example

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  alone: true,
});

const stopWatching = bot.onSync((state) => {
  console.log(state.commandCount, state.lastCommandsError ?? "ok");
});

bot.onMemberJoin(async (member) => {
  const channelId = process.env.WELCOME_CHANNEL_ID;
  if (!channelId || !member.id) return;
  await bot.send(channelId, \`Welcome <@\${member.id}>.\`);
});

process.on("SIGINT", async () => {
  stopWatching();
  await bot.stop();
});
\`\`\`

## Pitfalls

- \`send\` cannot be private and cannot carry a \`form()\`.
- \`setPresence\` throws when this connection cannot update presence.
- \`onEvent\`, \`onMemberJoin\`, \`onMemberLeave\`, and \`onMessage\` throw when the connection has no events of that kind.
- You can ignore the return value if the process simply runs until it exits. You need it to \`send\` from a handler in this file, or to call \`stop()\`.

## Related

- [Start options](/docs/start-options) · [Presence](/docs/presence) · [Sending messages](/docs/sending-messages) · [Events & intents](/docs/events-intents) · [One process](/docs/alone)
`,
    },
    nl: {
      title: "Bot-handle",
      description: "Wat Start() teruggeeft.",
      body: `
\`Start()\` geeft de lopende bot terug. Bewaar die waarde als het startbestand berichten stuurt, de presence wijzigt of het proces stopt. Een commandobestand krijgt hem niet, tenzij je er zelf over sluit.

## Oppervlak

| Lid | Wat het doet |
|-----|----------------|
| \`commands\` | Commando's en menu's die nu geladen zijn. |
| \`stop()\` | Sluit de gateway en laat het alone-slot los. |
| \`setPresence(presence)\` | Wijzigt de status terwijl het proces draait. Zie [Presence](/docs/presence). |
| \`syncState()\` | Momentopname: \`watch\`, \`commandCount\`, laatste herlaadtijden, laatste herlaadfouten. |
| \`onSync(handler)\` | Draait na een herlaad van commando's of events. Geeft een functie terug die afmeldt. |
| \`send(channel, message)\` | Plaatst buiten een slash-antwoord. Zie [Berichten sturen](/docs/sending-messages). |
| \`onMemberJoin\` / \`onMemberLeave\` | Gateway-events voor leden. Elke aanroep geeft een afmeldfunctie terug. |
| \`onMessage\` | Gateway-berichten. De message-intent moet aan staan. |
| \`onEvent(name, handler)\` | Elk gateway-event dat deze verbinding blootgeeft. Geeft een afmeldfunctie terug. |

Een map met eventmodules is het gewone pad ([Events en intents](/docs/events-intents)). \`onMemberJoin\` en \`onEvent\` zijn voor het startbestand, nadat \`Start\` is teruggekomen. \`onMemberJoin(handler)\` is suiker voor \`onEvent("memberJoin", handler)\` — kies wat het duidelijkst leest.

## Voorbeeld

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  alone: true,
});

const stopWatching = bot.onSync((state) => {
  console.log(state.commandCount, state.lastCommandsError ?? "ok");
});

bot.onMemberJoin(async (member) => {
  const channelId = process.env.WELCOME_CHANNEL_ID;
  if (!channelId || !member.id) return;
  await bot.send(channelId, \`Welkom <@\${member.id}>.\`);
});

process.on("SIGINT", async () => {
  stopWatching();
  await bot.stop();
});
\`\`\`

## Valkuilen

- \`send\` kan niet privé zijn en geen \`form()\` dragen.
- \`setPresence\` gooit als deze verbinding de presence niet kan bijwerken.
- \`onEvent\`, \`onMemberJoin\`, \`onMemberLeave\` en \`onMessage\` gooien als de verbinding geen events van dat soort heeft.
- Je kunt de terugkeerwaarde negeren als het proces gewoon doorloopt tot het stopt. Je hebt hem nodig om vanuit een handler in dit bestand te \`send\`-en, of om \`stop()\` aan te roepen.

## Verder

- [Start-opties](/docs/start-options) · [Presence](/docs/presence) · [Berichten sturen](/docs/sending-messages) · [Events en intents](/docs/events-intents) · [Eén proces](/docs/alone)
`,
    },
  },
  {
    slug: "debugging",
    order: 70,
    en: {
      title: "Errors & debugging",
      description: "Common [Draeven] failures and what they mean.",
      body: `
For a symptom, cause, and fix in one table, open [Troubleshooting](/docs/troubleshooting). When a call throws, the message starts with \`[Draeven]\` and names the rule. Read that sentence before wrapping it. This page maps the failures that show up first to the guide section that fixes them. The constraints themselves are written out on [Rules of thumb](/docs/rules).

## Worked example

A slow \`await\` before \`reply()\` misses Discord's window of about 3 seconds. Acknowledge first, then fill the deferred message. Auto-defer would have acknowledged at 2 seconds if you left it on. With auto-defer off, call \`wait()\` yourself:

\`\`\`js
import { command } from "@draeven/core";

export const profile = command("profile", "Loads a profile", async (ctx) => {
  await ctx.wait();
  const name = await loadName(ctx.author.id); // your slow call
  return ctx.edit(name);
});
\`\`\`

\`wait()\` takes the token before the slow call. \`edit()\` fills the deferred reply. The same pattern is [Replies](/docs/replies): leave <Explain topic="auto-defer">auto-defer</Explain> on, or call \`wait()\` / set \`defer\` before slow work.

## Checklist

| You see | What it means | Fix |
|---------|----------------|-----|
| Discord shows the interaction failed after about 3 seconds | The handler did not acknowledge in time. | Leave auto-defer on, or call \`wait()\` / set \`defer\` before slow work. [Replies](/docs/replies). |
| \`A form cannot follow wait()\` | The modal has to be the first acknowledgement. | No \`wait\`, metadata \`defer\`, or \`transcript\` before \`form()\` (<Explain topic="form-first">form first</Explain>). [Buttons, menus & forms](/docs/pieces). |
| \`A layout cannot mix with text, embeds, or polls.\` | \`layout()\` is the whole reply. | Do not pass text, an embed, a poll, or a canvas picture beside it (<Explain topic="layout-mix">no mix</Explain>). [Embeds & layout](/docs/embeds-layout). |
| \`A command can only reply once.\` | A reply was already stored, and you have neither \`wait()\`ed nor flushed a collect. | After \`wait()\`, use \`edit()\` or another \`reply()\`. After a collect flush, another \`reply()\` replaces the stored reply. \`followup()\` adds a message. [Replies](/docs/replies). |
| \`Unknown user …\` | \`getUser\` only knows users Discord sent on this interaction. | Pass the option object or \`author\`, not an id you invented. [Lookups](/docs/lookups). |
| \`watch: true needs commands from a folder path or draeven.config.\` | An in-memory array cannot be watched. | Pass a folder path or \`draeven.config.js\`. [Config file](/docs/config). |
| \`Another bot is already running\`, and nothing asked you | \`alone: "ask"\` prompts only on a TTY. | Under PM2 or systemd pass \`alone: true\`. [One process](/docs/alone). |
| \`Missing Discord token\` | \`token\` was empty. \`Start\` throws before the gateway opens. | Set the token in the environment the process manager actually loads. [Deploy](/docs/deploy). |
| Commands disappear, or the folder loads nothing | \`loadCommands\` reads \`.js\` only. | Compile to \`dist\` and point the config at that folder before the production start. [Deploy](/docs/deploy). |

## When the handler throws

On the live slash path, an uncaught error becomes a user-visible line: a short \`[Draeven]\` message (prefix stripped) if it fits, otherwise \`frame("failed", locale)\` (“The command failed.” / “Het command is mislukt.”). Press handlers that are not behind \`collect\` answer with the English string \`The command failed.\` — they do not call \`frame("failed")\`.

## Pitfalls

- \`simulate()\` runs the handler without an interaction token, so \`wait\`, \`edit\`, \`collect\`, and \`send\` throw there. Use it for the return value. Reproduce gates on a live guild ([Simulate](/docs/simulate)).
- Wrapping the error and logging only \`error.message\` after a custom prefix hides the \`[Draeven]\` sentence. Keep that sentence in the log.
- \`guard({ via: "console", of: "all" })\` keeps the process up and prints the \`[Draeven]\` line ([Hot-reload & guard](/docs/hot-reload-guard)). It does not fix the rule the line names.
`,
    },
    nl: {
      title: "Fouten & debuggen",
      description: "Veelvoorkomende [Draeven]-fouten en wat ze betekenen.",
      body: `
Voor symptoom, oorzaak en oplossing in één tabel, open [Problemen oplossen](/docs/troubleshooting). Als een aanroep gooit, begint het bericht met \`[Draeven]\` en noemt het de regel. Lees die zin vóór je hem inpakt. Deze pagina koppelt de fouten die het eerst opduiken aan de gidsectie die ze oplost. De regels zelf staan uitgeschreven bij [Vuistregels](/docs/rules).

## Uitgewerkt voorbeeld

Een trage \`await\` vóór \`reply()\` mist het venster van ongeveer 3 seconden van Discord. Bevestig eerst, en vul daarna het uitgestelde bericht. Auto-defer zou na 2 seconden hebben bevestigd als je het aan liet. Met auto-defer uit roep je zelf \`wait()\` aan:

\`\`\`js
import { command } from "@draeven/core";

export const profile = command("profile", "Laadt een profiel", async (ctx) => {
  await ctx.wait();
  const name = await loadName(ctx.author.id); // jouw trage aanroep
  return ctx.edit(name);
});
\`\`\`

\`wait()\` pakt het token vóór de trage aanroep. \`edit()\` vult het uitgestelde antwoord. Hetzelfde patroon staat bij [Antwoorden](/docs/replies): laat <Explain topic="auto-defer">auto-defer</Explain> aan, of roep \`wait()\` aan / zet \`defer\` vóór traag werk.

## Checklist

| Je ziet | Wat het betekent | Oplossing |
|---------|----------------|-----------|
| Discord toont dat de interactie faalde na ongeveer 3 seconden | De handler bevestigde niet op tijd. | Laat auto-defer aan, of roep \`wait()\` aan / zet \`defer\` vóór traag werk. [Antwoorden](/docs/replies). |
| \`A form cannot follow wait()\` | De modal moet de eerste bevestiging zijn. | Geen \`wait\`, \`defer\` in metadata, of \`transcript\` vóór \`form()\` (<Explain topic="form-first">formulier eerst</Explain>). [Knoppen, menu's & formulieren](/docs/pieces). |
| \`A layout cannot mix with text, embeds, or polls.\` | \`layout()\` is het hele antwoord. | Geef er geen tekst, embed, peiling of canvas-afbeelding naast mee (<Explain topic="layout-mix">niet mengen</Explain>). [Embeds en layout](/docs/embeds-layout). |
| \`A command can only reply once.\` | Er was al een antwoord opgeslagen, en je hebt noch \`wait()\` gedaan, noch een collect geflusht. | Na \`wait()\` gebruik je \`edit()\` of een nieuwe \`reply()\`. Na een collect-flush vervangt een nieuwe \`reply()\` het opgeslagen antwoord. \`followup()\` voegt een bericht toe. [Antwoorden](/docs/replies). |
| \`Unknown user …\` | \`getUser\` kent alleen gebruikers die Discord op deze interactie meestuurde. | Geef het optie-object of \`author\` mee, niet een id die je zelf verzon. [Lookups](/docs/lookups). |
| \`watch: true needs commands from a folder path or draeven.config.\` | Een array in het geheugen kan niet worden bekeken. | Geef een mappad of \`draeven.config.js\`. [Configbestand](/docs/config). |
| \`Another bot is already running\`, en er werd niets gevraagd | \`alone: "ask"\` vraagt alleen op een TTY. | Onder PM2 of systemd geef je \`alone: true\`. [Eén proces](/docs/alone). |
| \`Missing Discord token\` | \`token\` was leeg. \`Start\` gooit al vóór de gateway opent. | Zet het token in de omgeving die de process manager echt laadt. [Deployen](/docs/deploy). |
| Commando's verdwijnen, of de map laadt niets | \`loadCommands\` leest alleen \`.js\`. | Compileer naar \`dist\` en wijs de config naar die map vóór de productiestart. [Deployen](/docs/deploy). |

## Als de handler gooit

Op het live slash-pad wordt een ongecatchte fout een zichtbare regel: een korte \`[Draeven]\`-message (prefix eraf) als die past, anders \`frame("failed", locale)\` (“The command failed.” / “Het command is mislukt.”). Press-handlers buiten \`collect\` antwoorden met de Engelse string \`The command failed.\` — zij roepen \`frame("failed")\` niet aan.

## Valkuilen

- \`simulate()\` draait de handler zonder interactietoken, dus \`wait\`, \`edit\`, \`collect\` en \`send\` gooien daar. Gebruik het voor de terugkeerwaarde. Bouw gates na op een live guild ([Simuleren](/docs/simulate)).
- De fout inpakken en alleen \`error.message\` loggen ná een eigen voorvoegsel verbergt de \`[Draeven]\`-zin. Houd die zin in het log.
- \`guard({ via: "console", of: "all" })\` houdt het proces overeind en print de \`[Draeven]\`-regel ([Hot-reload en guard](/docs/hot-reload-guard)). Het herstelt de regel die de zin noemt niet.
`,
    },
  },
  {
    slug: "hot-reload-guard",
    order: 72,
    en: {
      title: "Hot-reload & guard",
      description: "Reload compiled files, and keep the process alive.",
      body: `
Hot reload and the guard solve two different problems. \`watch: true\` replaces command and event modules when \`dist/\` changes, without closing Discord. \`guard()\` catches handler and process errors so one throw does not kill the bot, and writes them where you ask.

## Watch

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
});
\`\`\`

Requirements:

- Commands come from a **folder** (\`draeven.config.js\`, or \`commands: "./dist/commands"\`). An in-memory array is not watched.
- Something rewrites that folder. \`pnpm dev\` runs \`tsc -w\` after the first build.
- Event folders are watched only when \`events\` is a path, not an object.

\`bot.syncState()\` is a snapshot. \`bot.onSync(handler)\` subscribes and returns an unsubscribe function.

| Field | Meaning |
|-------|---------|
| \`watch\` | Whether folder watching is on |
| \`commandCount\` | Loaded slash commands and menus |
| \`lastCommandsReloadAt\` | ISO time of the last good command reload |
| \`lastEventsReloadAt\` | ISO time of the last good event reload |
| \`lastCommandsError\` | Last reload failure, if any |
| \`lastEventsError\` | Last event-folder failure, if any |

A syntax error in \`dist\` sets \`lastCommandsError\` and keeps the previous command set. The gateway stays up.

## Guard

Field-by-field behavior, \`formatUptime\`, and a file log are on [Error guard](/docs/guard). This section is the short form next to hot reload.

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  guard: guard({
    via: ["console", "channel"],
    of: "all",
    channel: process.env.LOG_CHANNEL_ID,
    uptime: true,
  }),
});
\`\`\`

| Option | Values |
|--------|--------|
| \`via\` | \`"console"\`, \`"channel"\`, \`"file"\`, an array, or \`"all"\` |
| \`of\` | \`"commands"\`, \`"events"\`, \`"process"\`, an array, or \`"all"\` |
| \`channel\` | Required when \`via\` includes \`"channel"\` |
| \`file\` | Required when \`via\` includes \`"file"\` |
| \`uptime\` | Adds uptime on the ready line, and as a trailing line on a report. It does not prefix every line. |

\`of: "process"\` listens for \`uncaughtException\` and \`unhandledRejection\`. \`of: "commands"\` reports throws from slash handlers. \`of: "events"\` reports throws from gateway handlers.

<Warn fix="Pass channel as a snowflake string when via is channel." href="/docs/why-failing">
\`via: "channel"\` without \`channel\` throws at \`guard()\` time. The channel id is a snowflake string the bot can post in.
</Warn>

## Pitfalls

- Watching \`src/\` does nothing. Draeven imports the compiled \`.js\`.
- Guard logs are lines of text, not a metrics system.
- \`uptime: true\` uses the guard's start time, not Discord's session time.

## Related

- [Project layout](/docs/project-layout) · [One process](/docs/alone) · [Simulate & tests](/docs/simulate)
`,
    },
    nl: {
      title: "Hot-reload en guard",
      description: "Gecompileerde bestanden herladen, en het proces laten leven.",
      body: `
Hot reload en de guard lossen twee verschillende problemen op. \`watch: true\` vervangt commando- en eventmodules als \`dist/\` verandert, zonder Discord te sluiten. \`guard()\` vangt handler- en procesfouten zodat één throw de bot niet doodt, en schrijft ze waar je vraagt.

## Watch

\`\`\`js
import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
});
\`\`\`

Voorwaarden:

- Commando's komen uit een **map** (\`draeven.config.js\`, of \`commands: "./dist/commands"\`). Een array in het geheugen wordt niet bekeken.
- Iets moet die map herschrijven. \`pnpm dev\` draait \`tsc -w\` na de eerste build.
- Eventmappen worden alleen bekeken als \`events\` een pad is, geen object.

\`bot.syncState()\` is een momentopname. \`bot.onSync(handler)\` abonneert en geeft een afmeldfunctie terug.

| Veld | Betekenis |
|------|-----------|
| \`watch\` | Of map-watching aan staat |
| \`commandCount\` | Geladen slash-commando's en menu's |
| \`lastCommandsReloadAt\` | ISO-tijd van de laatste geslaagde commandoreload |
| \`lastEventsReloadAt\` | ISO-tijd van de laatste geslaagde eventreload |
| \`lastCommandsError\` | Laatste reload-fout, indien aanwezig |
| \`lastEventsError\` | Laatste fout in de eventmap, indien aanwezig |

Een syntaxfout in \`dist\` zet \`lastCommandsError\` en houdt de vorige commandoset. De gateway blijft open.

## Guard

Veld voor veld, \`formatUptime\` en een bestandslog staan op [Error-guard](/docs/guard). Dit stuk is de korte vorm naast hot reload.

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  watch: true,
  guard: guard({
    via: ["console", "channel"],
    of: "all",
    channel: process.env.LOG_CHANNEL_ID,
    uptime: true,
  }),
});
\`\`\`

| Optie | Waarden |
|-------|---------|
| \`via\` | \`"console"\`, \`"channel"\`, \`"file"\`, een array, of \`"all"\` |
| \`of\` | \`"commands"\`, \`"events"\`, \`"process"\`, een array, of \`"all"\` |
| \`channel\` | Verplicht als \`via\` \`"channel"\` bevat |
| \`file\` | Verplicht als \`via\` \`"file"\` bevat |
| \`uptime\` | Zet uptime op de ready-regel, en als laatste regel van een rapport. Het zet geen prefix op elke regel. |

\`of: "process"\` luistert naar \`uncaughtException\` en \`unhandledRejection\`. \`of: "commands"\` meldt throws uit slash-handlers. \`of: "events"\` meldt throws uit gateway-handlers.

<Warn fix="Geef channel als snowflake-string als via channel is." href="/docs/why-failing">
\`via: "channel"\` zonder \`channel\` gooit al bij \`guard()\`. De kanaal-id is een snowflake-string waarin de bot mag plaatsen.
</Warn>

## Valkuilen

- \`src/\` bekijken doet niets. Draeven importeert de gecompileerde \`.js\`.
- Guard-logs zijn tekstregels, geen meetsysteem.
- \`uptime: true\` gebruikt de starttijd van de guard, niet de sessietijd van Discord.

## Verder

- [Projectstructuur](/docs/project-layout) · [Één proces](/docs/alone) · [Simuleren en tests](/docs/simulate)
`,
    },
  },
  {
    slug: "simulate",
    order: 73,
    en: {
      title: "Simulate & tests",
      description: "Run a command handler without Discord.",
      body: `
\`simulate(command, input)\` calls the handler through \`runCommand\` with the options and lookups you pass. There is no token, no REST, and no gateway. Use it for unit tests of reply text, embeds, and \`say()\`.

It does **not** apply \`need\`, \`ownerOnly\`, \`when\`, or \`cooldown\`. Those run in the live dispatcher before \`run\`.

<TrySimulate />

## Smallest test

\`\`\`js
import assert from "node:assert/strict";
import { command, simulate } from "@draeven/core";

const ping = command("ping", "Checks the bot", async (ctx) => ctx.reply("pong"));

const reply = await simulate(ping, { author: { id: "1", name: "Tester" } });
assert.equal(reply.text, "pong");
\`\`\`

\`author\` is required. If \`author\` has a \`name\` and you omit \`users\`, that author is the user list. \`users\` replaces that list. It does not add the author on top.

## Input

| Field | Role |
|-------|------|
| \`author\` | \`{ id }\` or a full \`User\` |
| \`opt\` | Option values keyed like the command (\`who\`, \`line\`, …) |
| \`locale\` | Becomes \`ctx.locale\` for \`say()\` |
| \`users\` | Replaces the author list. The named author is used only when \`users\` is omitted. |
| \`guild\` | Makes \`getGuild()\` return it |
| \`channel\` | Makes \`getChannel()\` return it |
| \`members\` | Map of user id to \`Member\`. \`getMember\` still calls \`getUser\`, so that id must be in \`users\` or be the named author. |

That is the full \`SimulateInput\`. There is no \`roles\`, \`files\`, or \`bot\` bag — \`getRole\` / \`getFile\` / \`getBot\` are not for unit tests unless you avoid those lookups.

\`\`\`js
import { command, user, simulate } from "@draeven/core";

const greet = command(
  "greet",
  "Hi",
  { who: user("Who?") },
  async (ctx) => ctx.reply(\`Hi \${(ctx.who ?? ctx.getUser(ctx.author)).name}\`)
);

const reply = await simulate(greet, {
  author: { id: "1", name: "A" },
  opt: { who: { id: "2", name: "B", bot: false, createdAt: new Date() } },
  locale: "nl",
  guild: { id: "g1", name: "Test" },
});

assert.equal(reply.text, "Hi B");
\`\`\`

The returned \`Reply\` may also carry \`embed\`, \`poll\`, \`rows\`, \`layout\`, or \`private\`.

## What throws

| Call inside the handler | Result under simulate |
|-------------------------|------------------------|
| \`reply()\` | Returns the \`Reply\` |
| \`followup()\` | Queues on the reply |
| \`wait\`, \`edit\`, \`remove\`, \`collect\` | Throws — no interaction token |
| \`send\`, \`timeout\`, \`kick\`, \`ban\` | Throws — no REST connection |
| \`transcript()\` | Throws — no channel transcript |

<Tip>
Test the decision in the handler (which string, which embed). \`simulate\` will not print the server-owner gate string. That text comes from \`frame("owner", locale)\` on the live path.
</Tip>

## Pitfalls

- \`simulate\` calls \`entry.run\`. A menu with \`run\` is a target too. The context is still a command \`ctx\`. Discord does not fill \`ctx.target\`.
- A command built with only subs has no top-level \`run\`, so \`simulate\` throws. Share the leaf body with a function the test can call.
- \`opt\` is not checked at runtime. A missing \`who\` is \`undefined\`, same as an optional option the user skipped.

## Related

- [Commands](/docs/commands) · [Locales](/docs/locales) · [Cooldowns](/docs/cooldowns)
`,
    },
    nl: {
      title: "Simuleren en tests",
      description: "Draai een commandohandler zonder Discord.",
      body: `
\`simulate(command, input)\` roept de handler aan via \`runCommand\` met de opties en lookups die je meegeeft. Er is geen token, geen REST en geen gateway. Gebruik het voor unittests van antwoordtekst, embeds en \`say()\`.

<TrySimulate />

Het past **geen** \`need\`, \`ownerOnly\`, \`when\` of \`cooldown\` toe. Die draaien in de live dispatcher vóór \`run\`.

## Kleinste test

\`\`\`js
import assert from "node:assert/strict";
import { command, simulate } from "@draeven/core";

const ping = command("ping", "Checkt de bot", async (ctx) => ctx.reply("pong"));

const reply = await simulate(ping, { author: { id: "1", name: "Tester" } });
assert.equal(reply.text, "pong");
\`\`\`

\`author\` is verplicht. Heeft \`author\` een \`name\` en laat je \`users\` weg, dan is die auteur de gebruikerslijst. \`users\` vervangt die lijst. De auteur komt er niet automatisch bij.

## Invoer

| Veld | Rol |
|------|-----|
| \`author\` | \`{ id }\` of een volledige \`User\` |
| \`opt\` | Optiewaarden met dezelfde sleutels als het commando |
| \`locale\` | Wordt \`ctx.locale\` voor \`say()\` |
| \`users\` | Vervangt de auteurslijst. De genoemde auteur telt alleen als \`users\` is weggelaten. |
| \`guild\` | Zorgt dat \`getGuild()\` die teruggeeft |
| \`channel\` | Zorgt dat \`getChannel()\` die teruggeeft |
| \`members\` | Map van user-id naar \`Member\`. \`getMember\` roept nog steeds \`getUser\` aan, dus die id moet in \`users\` staan of de genoemde auteur zijn. |

Dat is de volledige \`SimulateInput\`. Er is geen \`roles\`-, \`files\`- of \`bot\`-zak — \`getRole\` / \`getFile\` / \`getBot\` horen niet in unittests tenzij je die lookups vermijdt.

\`\`\`js
import { command, user, simulate } from "@draeven/core";

const greet = command(
  "greet",
  "Hoi",
  { who: user("Wie?") },
  async (ctx) => ctx.reply(\`Hoi \${(ctx.who ?? ctx.getUser(ctx.author)).name}\`)
);

const reply = await simulate(greet, {
  author: { id: "1", name: "A" },
  opt: { who: { id: "2", name: "B", bot: false, createdAt: new Date() } },
  locale: "nl",
  guild: { id: "g1", name: "Test" },
});

assert.equal(reply.text, "Hoi B");
\`\`\`

De teruggegeven \`Reply\` kan ook \`embed\`, \`poll\`, \`rows\`, \`layout\` of \`private\` dragen.

## Wat gooit

| Aanroep in de handler | Resultaat onder simulate |
|-----------------------|--------------------------|
| \`reply()\` | Geeft de \`Reply\` terug |
| \`followup()\` | Zet hem in de wachtrij op het antwoord |
| \`wait\`, \`edit\`, \`remove\`, \`collect\` | Gooit — geen interactietoken |
| \`send\`, \`timeout\`, \`kick\`, \`ban\` | Gooit — geen REST-verbinding |
| \`transcript()\` | Gooit — geen kanaaltranscript |

<Tip>
Test de keuze in de handler (welke string, welke embed). \`simulate\` drukt de gate-tekst voor de servereigenaar niet af. Die tekst komt van \`frame("owner", locale)\` op het live pad.
</Tip>

## Valkuilen

- \`simulate\` roept \`entry.run\` aan. Een menu met \`run\` is ook een doel. De context blijft een commando-\`ctx\`. Discord vult \`ctx.target\` niet.
- Een commando met alleen subs heeft geen top-level \`run\`, dus \`simulate\` gooit. Deel de bladlogica via een functie die de test kan aanroepen.
- \`opt\` wordt runtime niet gecontroleerd. Een ontbrekende \`who\` is \`undefined\`, net als een optionele optie die de gebruiker oversloeg.

## Verder

- [Commando's](/docs/commands) · [Taalvarianten](/docs/locales) · [Wachttijden](/docs/cooldowns)
`,
    },
  },
  {
    slug: "alone",
    order: 74,
    en: {
      title: "One process",
      description: "Stop a second Start() from sharing the token.",
      body: `
Two Node processes with the same bot token fight over the gateway session and overwrite each other's commands. \`Start\` calls \`claimAlone\` first. The default mode is \`"ask"\`.

The lock file is \`.draeven.pid\` in the project root (\`process.cwd()\`). It stores the pid and the script path. Draeven also scans for other \`node\` processes running the same script.

\`\`\`js
import { Start } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  alone: "ask",
});
\`\`\`

## Modes

| \`alone\` | Behavior |
|-----------|----------|
| \`"ask"\` (default) | If another live pid exists and stdin is a TTY, ask whether to stop it. Yes kills it and continues. No throws. |
| \`true\` | Kill the other pid and continue. No prompt. |
| \`false\` | Do not look. Two processes are allowed, and they will conflict. |

On a non-TTY (CI, a service manager, many Windows task runners) \`"ask"\` does **not** prompt. A live sibling throws and tells you to stop it or pass \`alone: true\`.

<Warn fix="alone: false only with a process supervisor; alone: true to replace the old process." href="/docs/why-failing">
Set \`alone: false\` only when a supervisor already guarantees one process. Set \`alone: true\` when a new deploy should replace the old one.
</Warn>

## The helpers

| Export | Role |
|--------|------|
| \`claimAlone({ mode, root, script })\` | Same check \`Start\` uses. Returns \`{ release() }\`. |
| \`listSiblingPids(script)\` | Pids whose command line contains that script. |
| \`isAlive(pid)\` | Whether the pid still exists. |
| \`killPid(pid)\` | Stop that pid. |

\`release()\` deletes \`.draeven.pid\` only if it still names this process. \`Start\` releases it on \`bot.stop()\`.

## Pitfalls

- A crashed process can leave a stale file. Draeven ignores a pid that is not alive, then writes its own.
- \`root\` defaults to the working directory. Two checkouts started from different directories do not share a lock, and can still share a token.
- Killing a sibling waits up to 3 seconds for it to exit.

## Related

- [Install](/docs/install) · [Hot-reload & guard](/docs/hot-reload-guard)
`,
    },
    nl: {
      title: "Één proces",
      description: "Voorkom dat een tweede Start() het token deelt.",
      body: `
Twee Node-processen met hetzelfde bot-token vechten om de gateway-sessie en overschrijven elkaars commando's. \`Start\` roept eerst \`claimAlone\` aan. De standaardmodus is \`"ask"\`.

Het lockbestand is \`.draeven.pid\` in de projectroot (\`process.cwd()\`). Het bevat de pid en het scriptpad. Draeven zoekt ook naar andere \`node\`-processen die hetzelfde script draaien.

\`\`\`js
import { Start } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  alone: "ask",
});
\`\`\`

## Modi

| \`alone\` | Gedrag |
|-----------|--------|
| \`"ask"\` (standaard) | Als er een levende pid is en stdin een TTY is, vraagt Draeven of die gestopt moet worden. Ja stopt hem en gaat door. Nee gooit. |
| \`true\` | Stop de andere pid en ga door. Geen vraag. |
| \`false\` | Niet kijken. Twee processen mogen, en ze zullen botsen. |

Op een non-TTY (CI, een servicebeheerder, veel Windows-taakrunners) vraagt \`"ask"\` **niet**. Een levende sibling gooit en zegt dat je hem moet stoppen of \`alone: true\` moet meegeven.

<Warn fix="alone: false alleen met process-supervisor; alone: true om het oude proces te vervangen." href="/docs/why-failing">
Zet \`alone: false\` alleen als een supervisor al garandeert dat er één proces is. Zet \`alone: true\` als een nieuwe deploy de oude moet vervangen.
</Warn>

## De helpers

| Export | Rol |
|--------|-----|
| \`claimAlone({ mode, root, script })\` | Dezelfde check als \`Start\`. Geeft \`{ release() }\` terug. |
| \`listSiblingPids(script)\` | Pids waarvan de commandoregel dat script bevat. |
| \`isAlive(pid)\` | Of de pid nog bestaat. |
| \`killPid(pid)\` | Stop die pid. |

\`release()\` verwijdert \`.draeven.pid\` alleen als het nog dit proces noemt. \`Start\` geeft het vrij bij \`bot.stop()\`.

## Valkuilen

- Een gecrasht proces kan een oud bestand achterlaten. Draeven negeert een pid die niet leeft, en schrijft daarna zijn eigen bestand.
- \`root\` is standaard de werkmap. Twee checkouts die uit verschillende mappen starten delen geen lock, en kunnen nog steeds een token delen.
- Het stoppen van een sibling wacht maximaal 3 seconden tot hij afsluit.

## Verder

- [Installatie](/docs/install) · [Hot-reload en guard](/docs/hot-reload-guard)
`,
    },
  },
  {
    slug: "bridge-desk",
    order: 75,
    en: {
      title: "Bridge & desk",
      description: "Owner ops UI — embedded (bot+UI), bridge (API only), or desk (UI → BRIDGE_URL).",
      body: `
\`@draeven/bridge\` is an optional HTTP UI for the person who runs **this** bot. It shows status and owner actions against your process. It is not a hosted moderation panel for every guild that invites the bot. Guild mods keep using slash commands such as \`/ban\`.

Install it with the scaffold flag \`--with-dashboard\`, or \`pnpm add @draeven/bridge\`. Node 20+ is required. \`root\` in the calls below is your project directory. Audit lines and desk settings are written under that directory.

## Modes

\`readDashboardMode()\` reads \`DASHBOARD\`. If the variable is **unset**, the mode is \`embedded\`.

| Value | Process | Role |
|-------|---------|------|
| \`embedded\` (default) | Bot process | Bot and OAuth desk UI together. The scaffold writes this. |
| \`off\`, \`0\`, \`false\`, \`no\` | Bot process | Bot only. |
| \`bridge\` or \`api\` | Bot process | Hardened API only. No UI. |
| \`desk\`, \`ui\`, or \`remote\` | Separate process | UI only. It proxies to \`BRIDGE_URL\`. Run \`pnpm desk\`, not the bot entry. |

## Mode map

\`\`\`text
 embedded                        bridge                         desk
+-------------------------+   +-------------------------+   +-------------------------+
| one process             |   | bot process             |   | UI process              |
| Start() + desk UI       |   | Start() + API, no UI    |   | listens on :3847        |
| DASHBOARD=embedded      |   | DASHBOARD=bridge        |   | DASHBOARD=desk          |
| open the printed url    |   | BRIDGE_SECRET           |   | BRIDGE_URL + secret     |
+-------------------------+   +-------------------------+   +------------+------------+
                                                                  |
                                                                  | HTTP
                                                                  v
                                                       +-------------------------+
                                                       | bridge API on the bot  |
                                                       +-------------------------+
\`\`\`

![Desk login — Discord OAuth gate for owners listed in DASHBOARD_OWNER_IDS](/docs/desk-login.png)

The embedded and desk UIs share this login gate. Bridge mode has no page; it only checks \`BRIDGE_SECRET\`.

## Walkthrough

1. Scaffold with \`--with-dashboard\` (the command below).
2. Set the env that mode needs: the bot token, and for the UI \`DISCORD_CLIENT_ID\`, \`DISCORD_CLIENT_SECRET\`, \`DASHBOARD_OWNER_IDS\`, and \`DASHBOARD_SESSION_SECRET\`.
3. Leave \`DASHBOARD=embedded\`. Unset means embedded.
4. Start the bot and open the URL \`startDashboard\` prints. The desk UI listens on **3847** by default (\`DASHBOARD_PORT\` replaces it).
5. To split them, set the bot to \`DASHBOARD=bridge\` and run \`pnpm desk\` in a second process with \`BRIDGE_URL\` and \`BRIDGE_SECRET\`. Starting the bot entry with \`DASHBOARD=desk\` throws. That value belongs on the desk process.

\`\`\`bash
npm create draeven@latest -- init my-bot --with-dashboard
\`\`\`

The scaffold adds \`pnpm desk\` (\`node dist/desk-main.js\`). Starting the bot entry with \`DASHBOARD=desk\` throws and tells you to run \`pnpm desk\`.

Embedded and bridge run beside \`Start()\` in the bot process:

\`\`\`ts
import { Start } from "@draeven/core";
import { readDashboardMode, readBridgeSecret, startDashboard } from "@draeven/bridge";

const bot = await Start({ token });
const mode = readDashboardMode();

if (mode === "embedded") {
  const desk = await startDashboard({ bot, root, botToken: token, kind: "embedded" });
  console.log(desk.url);
} else if (mode === "bridge") {
  const api = await startDashboard({
    bot,
    root,
    botToken: token,
    kind: "bridge",
    bridgeSecret: readBridgeSecret(),
  });
  console.log(api.url);
}
\`\`\`

Desk-only process:

\`\`\`ts
import { readBridgeSecret, readBridgeUrl, startDesk } from "@draeven/bridge";

const desk = await startDesk({
  root,
  bridgeUrl: readBridgeUrl(),
  bridgeSecret: readBridgeSecret(),
});
\`\`\`

\`\`\`text
Desk UI  -- HTTP + BRIDGE_SECRET -->  Bridge API  -->  your Start() process
\`\`\`

## OAuth

The embedded UI and the desk process sign owners in with Discord OAuth. Bridge mode itself does not show that login page. It checks the bearer secret.

| Variable | Role |
|----------|------|
| \`DISCORD_CLIENT_ID\` | Application id. Required for embedded and desk. |
| \`DISCORD_CLIENT_SECRET\` | OAuth client secret. Same processes. |
| \`DISCORD_REDIRECT_URI\` | Callback. When unset, the default is \`http://127.0.0.1:3847/auth/callback\`, using \`DASHBOARD_PORT\` when that is set. |
| \`DASHBOARD_OWNER_IDS\` | Comma-separated Discord **user** ids. After OAuth, only these ids may use the desk. |
| \`DASHBOARD_SESSION_SECRET\` | Signs the session cookie. |
| \`DASHBOARD_HOST\`, \`DASHBOARD_PORT\` | Where the UI listens. Port default \`3847\`. Host default \`127.0.0.1\`. |

The redirect URI in the Developer Portal must be the URL you actually listen on, including the port.

## Bridge environment

| Variable | When |
|----------|------|
| \`BRIDGE_SECRET\` or \`DASHBOARD_TOKEN\` | Bridge mode, and the desk that calls it. At least **12** characters. |
| \`BRIDGE_URL\` | Desk mode. Example \`http://127.0.0.1:3848\`. A trailing slash is stripped. |
| \`BRIDGE_HOST\`, \`BRIDGE_PORT\` | Where the API listens. Host default \`0.0.0.0\`. Port example \`3848\`. |
| \`BRIDGE_ALLOW_IPS\` | Optional allow list, for example \`127.0.0.1,::1\`. |
| \`BRIDGE_TLS_CERT\`, \`BRIDGE_TLS_KEY\` | Optional PEM paths. Set both for HTTPS on bridge or desk. |

<Warn fix="Use a long BRIDGE_SECRET; keep the desk on localhost without TLS." href="/docs/why-failing">
A short \`BRIDGE_SECRET\` throws at startup in bridge mode. Do not commit the secret. Leave the desk on localhost unless you have TLS and an IP allow list.
</Warn>

## API surface

On the **bridge** process, \`GET /api/health\` needs no secret. It reports that the process is up and how many commands are loaded. Every other \`/api\` route requires the bearer secret or an OAuth session.

| Route | Method | What it does |
|-------|--------|----------------|
| \`/api/health\` | \`GET\` | Unauthenticated liveness on the bridge process. |
| \`/api/status\` | \`GET\` | Bot user, uptime, selected guild, settings, sync snapshot. |
| \`/api/sync\` | \`GET\` | \`bot.syncState()\`. |
| \`/api/commands\` | \`GET\` | Commands loaded in this process. |
| \`/api/guilds\` | \`GET\` | Guilds the bot is in. |
| \`/api/members\` | \`GET\` | Members of the selected guild. |
| \`/api/channels\` | \`GET\` | Channels of the selected guild. |
| \`/api/roles\` | \`GET\` | Roles of the selected guild. |
| \`/api/logs\` | \`GET\` | Recent desk log lines. |
| \`/api/audit\` | \`GET\` | Recent audit lines. |
| \`/api/settings\` | \`GET\`, \`PUT\` | Language, prefix, presence, feed. \`PUT\` also calls \`setPresence\`. |
| \`/api/events\` | \`GET\` | Server-sent events for the live feed. |
| \`/api/actions/send\` | \`POST\` | \`bot.send\` — \`channelId\` and text, 1–2000 characters. |
| \`/api/actions/kick\` | \`POST\` | Kick \`userId\` in the selected guild. |
| \`/api/actions/ban\` | \`POST\` | Ban \`userId\` in the selected guild. |
| \`/api/actions/timeout\` | \`POST\` | Timeout \`userId\` for \`seconds\`. |
| \`/api/actions/pin\` | \`POST\` | Pin \`messageId\` in \`channelId\`. |
| \`/api/actions/react\` | \`POST\` | React with \`emoji\` on that message. |
| \`/api/actions/purge\` | \`POST\` | Delete \`count\` recent messages, from 2 to 100. |

Members, channels, roles, kick, ban, and timeout need a selected guild. The desk is calling **your** bot. It does not open a session as a guild moderator in someone else's community.

## Security

- **Owners.** Only ids in \`DASHBOARD_OWNER_IDS\` can use the desk after Discord OAuth. A role id in that list does nothing.
- **Secret.** \`BRIDGE_SECRET\` is the bearer token between desk and bridge. Shorter than 12 characters throws.
- **IP allow list.** \`BRIDGE_ALLOW_IPS\` drops other clients. When \`X-Forwarded-For\` is present, that header is what gets checked, so put the desk behind a proxy you trust.
- **TLS.** Set \`BRIDGE_TLS_CERT\` and \`BRIDGE_TLS_KEY\` together before the port is reachable off the machine.
- **Audit.** Actions append one JSON line each to \`.draeven/audit.jsonl\` under \`root\`.

## Pitfalls

- \`DASHBOARD\` is not a \`Start()\` option. The scaffold's bot entry reads it and calls the bridge helpers.
- \`embedded\` is one process. Do not also run \`pnpm desk\` against it.
- A redirect URI that names the wrong port fails the OAuth callback even when the secret is long enough.
- \`BRIDGE_HOST=0.0.0.0\` without an allow list and TLS exposes the moderation actions. Prefer \`DASHBOARD=off\` on a host that should only run the bot ([Deploy](/docs/deploy)).

## Related

- [Install](/docs/install) · [Project layout](/docs/project-layout) · [Deploy](/docs/deploy) · [Known limits](/docs/known-limits)
`,
    },
    nl: {
      title: "Bridge en desk",
      description: "Owner-ops-UI — embedded (bot+UI), bridge (alleen API), of desk (UI → BRIDGE_URL).",
      body: `
\`@draeven/bridge\` is een optionele HTTP-UI voor degene die **deze** bot draait. Hij toont status en owner-acties tegen jouw proces. Het is geen gehost moderatiepaneel voor elke guild die de bot uitnodigt. Guild-mods blijven slash-commando's gebruiken, zoals \`/ban\`.

Installeer hem met de scaffold-vlag \`--with-dashboard\`, of met \`pnpm add @draeven/bridge\`. Node 20+ is verplicht. \`root\` in de aanroepen hieronder is je projectmap. Auditregels en desk-instellingen komen onder die map te staan.

## Modi

\`readDashboardMode()\` leest \`DASHBOARD\`. Als de variabele **niet gezet** is, is de modus \`embedded\`.

| Waarde | Proces | Rol |
|--------|--------|-----|
| \`embedded\` (standaard) | Botproces | Bot en OAuth-desk samen. De scaffold schrijft dit. |
| \`off\`, \`0\`, \`false\`, \`no\` | Botproces | Alleen de bot. |
| \`bridge\` of \`api\` | Botproces | Alleen de geharde API. Geen UI. |
| \`desk\`, \`ui\` of \`remote\` | Apart proces | Alleen de UI. Die praat met \`BRIDGE_URL\`. Draai \`pnpm desk\`, niet de bot-ingang. |

## Moduskaart

\`\`\`text
 embedded                        bridge                         desk
+-------------------------+   +-------------------------+   +-------------------------+
| één proces              |   | botproces               |   | UI-proces               |
| Start() + desk-UI       |   | Start() + API, geen UI  |   | luistert op :3847       |
| DASHBOARD=embedded      |   | DASHBOARD=bridge        |   | DASHBOARD=desk          |
| open de geprinte url    |   | BRIDGE_SECRET           |   | BRIDGE_URL + geheim     |
+-------------------------+   +-------------------------+   +------------+------------+
                                                                  |
                                                                  | HTTP
                                                                  v
                                                       +-------------------------+
                                                       | bridge-API op de bot   |
                                                       +-------------------------+
\`\`\`

![Desk-login — Discord OAuth-poort voor owners in DASHBOARD_OWNER_IDS](/docs/desk-login.png)

De embedded- en desk-UI delen deze loginpoort. Bridge-modus heeft geen pagina; die checkt alleen \`BRIDGE_SECRET\`.

## Wandeling

1. Zet de scaffold neer met \`--with-dashboard\` (het commando hieronder).
2. Zet de env die de modus nodig heeft: het bot-token, en voor de UI \`DISCORD_CLIENT_ID\`, \`DISCORD_CLIENT_SECRET\`, \`DASHBOARD_OWNER_IDS\` en \`DASHBOARD_SESSION_SECRET\`.
3. Laat \`DASHBOARD=embedded\`. Niet gezet betekent embedded.
4. Start de bot en open de URL die \`startDashboard\` print. De desk-UI luistert standaard op **3847** (\`DASHBOARD_PORT\` vervangt dat).
5. Om ze te splitsen zet je de bot op \`DASHBOARD=bridge\` en draai je \`pnpm desk\` in een tweede proces met \`BRIDGE_URL\` en \`BRIDGE_SECRET\`. De bot-ingang starten met \`DASHBOARD=desk\` gooit. Die waarde hoort op het desk-proces.

\`\`\`bash
npm create draeven@latest -- init my-bot --with-dashboard
\`\`\`

De scaffold voegt \`pnpm desk\` toe (\`node dist/desk-main.js\`). De bot-ingang starten met \`DASHBOARD=desk\` gooit en zegt dat je \`pnpm desk\` moet draaien.

Embedded en bridge draaien naast \`Start()\` in het botproces:

\`\`\`ts
import { Start } from "@draeven/core";
import { readDashboardMode, readBridgeSecret, startDashboard } from "@draeven/bridge";

const bot = await Start({ token });
const mode = readDashboardMode();

if (mode === "embedded") {
  const desk = await startDashboard({ bot, root, botToken: token, kind: "embedded" });
  console.log(desk.url);
} else if (mode === "bridge") {
  const api = await startDashboard({
    bot,
    root,
    botToken: token,
    kind: "bridge",
    bridgeSecret: readBridgeSecret(),
  });
  console.log(api.url);
}
\`\`\`

Alleen de desk:

\`\`\`ts
import { readBridgeSecret, readBridgeUrl, startDesk } from "@draeven/bridge";

const desk = await startDesk({
  root,
  bridgeUrl: readBridgeUrl(),
  bridgeSecret: readBridgeSecret(),
});
\`\`\`

\`\`\`text
Desk-UI  -- HTTP + BRIDGE_SECRET -->  Bridge-API  -->  jouw Start()-proces
\`\`\`

## OAuth

De embedded UI en het desk-proces loggen owners in met Discord OAuth. Bridge-modus zelf toont die loginpagina niet. Die controleert het bearer-geheim.

| Variabele | Rol |
|-----------|-----|
| \`DISCORD_CLIENT_ID\` | Applicatie-id. Verplicht voor embedded en desk. |
| \`DISCORD_CLIENT_SECRET\` | OAuth-clientgeheim. Dezelfde processen. |
| \`DISCORD_REDIRECT_URI\` | Callback. Zonder waarde is de standaard \`http://127.0.0.1:3847/auth/callback\`, met \`DASHBOARD_PORT\` als die gezet is. |
| \`DASHBOARD_OWNER_IDS\` | Kommagescheiden Discord-**user**-ids. Na OAuth mogen alleen deze ids de desk gebruiken. |
| \`DASHBOARD_SESSION_SECRET\` | Ondertekent de sessiecookie. |
| \`DASHBOARD_HOST\`, \`DASHBOARD_PORT\` | Waar de UI luistert. Poort standaard \`3847\`. Host standaard \`127.0.0.1\`. |

De redirect-URI in het Developer Portal moet de URL zijn waarop je echt luistert, inclusief de poort.

## Bridge-omgeving

| Variabele | Wanneer |
|-----------|---------|
| \`BRIDGE_SECRET\` of \`DASHBOARD_TOKEN\` | Bridge-modus, en de desk die hem aanroept. Minstens **12** tekens. |
| \`BRIDGE_URL\` | Desk-modus. Voorbeeld \`http://127.0.0.1:3848\`. Een slash aan het eind wordt weggehaald. |
| \`BRIDGE_HOST\`, \`BRIDGE_PORT\` | Waar de API luistert. Host standaard \`0.0.0.0\`. Poortvoorbeeld \`3848\`. |
| \`BRIDGE_ALLOW_IPS\` | Optionele allowlist, bijvoorbeeld \`127.0.0.1,::1\`. |
| \`BRIDGE_TLS_CERT\`, \`BRIDGE_TLS_KEY\` | Optionele PEM-paden. Zet beide voor HTTPS op bridge of desk. |

<Warn fix="Gebruik een lange BRIDGE_SECRET; houd de desk op localhost zonder TLS." href="/docs/why-failing">
Een korte \`BRIDGE_SECRET\` gooit bij het opstarten in bridge-modus. Commit het geheim niet. Laat de desk op localhost tenzij je TLS en een IP-allowlist hebt.
</Warn>

## API-oppervlak

Op het **bridge**-proces heeft \`GET /api/health\` geen geheim nodig. Het meldt dat het proces draait en hoeveel commando's geladen zijn. Elke andere \`/api\`-route vraagt het bearer-geheim of een OAuth-sessie.

| Route | Methode | Wat het doet |
|-------|---------|----------------|
| \`/api/health\` | \`GET\` | Bereikbaarheid zonder login, alleen op het bridge-proces. |
| \`/api/status\` | \`GET\` | Botgebruiker, uptime, gekozen guild, instellingen, sync-momentopname. |
| \`/api/sync\` | \`GET\` | \`bot.syncState()\`. |
| \`/api/commands\` | \`GET\` | Commando's die in dit proces geladen zijn. |
| \`/api/guilds\` | \`GET\` | Guilds waar de bot in zit. |
| \`/api/members\` | \`GET\` | Leden van de gekozen guild. |
| \`/api/channels\` | \`GET\` | Kanalen van de gekozen guild. |
| \`/api/roles\` | \`GET\` | Rollen van de gekozen guild. |
| \`/api/logs\` | \`GET\` | Recente desk-logregels. |
| \`/api/audit\` | \`GET\` | Recente auditregels. |
| \`/api/settings\` | \`GET\`, \`PUT\` | Taal, prefix, presence, feed. \`PUT\` roept ook \`setPresence\` aan. |
| \`/api/events\` | \`GET\` | Server-sent events voor de live feed. |
| \`/api/actions/send\` | \`POST\` | \`bot.send\` — \`channelId\` en tekst, 1–2000 tekens. |
| \`/api/actions/kick\` | \`POST\` | Kick \`userId\` in de gekozen guild. |
| \`/api/actions/ban\` | \`POST\` | Ban \`userId\` in de gekozen guild. |
| \`/api/actions/timeout\` | \`POST\` | Timeout \`userId\` voor \`seconds\`. |
| \`/api/actions/pin\` | \`POST\` | Zet \`messageId\` vast in \`channelId\`. |
| \`/api/actions/react\` | \`POST\` | Reageer met \`emoji\` op dat bericht. |
| \`/api/actions/purge\` | \`POST\` | Wis \`count\` recente berichten, van 2 tot 100. |

Leden, kanalen, rollen, kick, ban en timeout hebben een gekozen guild nodig. De desk roept **jouw** bot aan. Hij opent geen sessie als guild-moderator in andermans community.

## Beveiliging

- **Owners.** Alleen ids in \`DASHBOARD_OWNER_IDS\` kunnen de desk gebruiken na Discord OAuth. Een rol-id in die lijst doet niets.
- **Geheim.** \`BRIDGE_SECRET\` is het bearer-token tussen desk en bridge. Korter dan 12 tekens gooit.
- **IP-allowlist.** \`BRIDGE_ALLOW_IPS\` laat andere clients vallen. Staat \`X-Forwarded-For\` erbij, dan wordt die header gecontroleerd. Zet de desk dus achter een proxy die je vertrouwt.
- **TLS.** Zet \`BRIDGE_TLS_CERT\` en \`BRIDGE_TLS_KEY\` samen vóór de poort buiten de machine bereikbaar is.
- **Audit.** Acties voegen elk één JSON-regel toe aan \`.draeven/audit.jsonl\` onder \`root\`.

## Valkuilen

- \`DASHBOARD\` is geen optie van \`Start()\`. De bot-ingang van de scaffold leest hem en roept de bridge-helpers aan.
- \`embedded\` is één proces. Draai daar niet ook \`pnpm desk\` tegenaan.
- Een redirect-URI met de verkeerde poort laat de OAuth-callback falen, ook als het geheim lang genoeg is.
- \`BRIDGE_HOST=0.0.0.0\` zonder allowlist en TLS legt de moderatie-acties bloot. Gebruik \`DASHBOARD=off\` op een host die alleen de bot moet draaien ([Deployen](/docs/deploy)).

## Verder

- [Installatie](/docs/install) · [Projectstructuur](/docs/project-layout) · [Deployen](/docs/deploy) · [Bekende limieten](/docs/known-limits)
`,
    },
  },
  {
    slug: "deploy",
    order: 76,
    en: {
      title: "Deploy",
      description: "Run a built bot under Node in production.",
      body: `
Ship the compiled bot. Use Node **20 or newer**, output from \`tsc\` in \`dist\`, \`watch: false\`, and \`alone: true\`. A service manager has no TTY, so the default \`alone: "ask"\` cannot prompt.

## The process

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  watch: false,
  alone: true,
  guard: guard({ via: "console", of: "all" }),
});
\`\`\`

Keep \`guildId\` while one server should see command edits within seconds. Omit it for a **global** registration. That sync can take up to an hour ([Creating an app](/docs/creating-app)). Put the token and the guild id in the environment, not in the repo.

\`draeven.config.js\` should point \`commands\` at \`./dist/commands\` ([Config](/docs/config)).

## PM2

\`\`\`js
module.exports = {
  apps: [
    {
      name: "draeven",
      script: "dist/main.js",
      cwd: "/opt/draeven",
      env: { NODE_ENV: "production" },
    },
  ],
};
\`\`\`

\`\`\`bash
pm2 start ecosystem.config.cjs
pm2 save
\`\`\`

Load secrets from the host environment, or from an env file the process manager is allowed to read. Do not commit \`.env\`.

## systemd

\`\`\`ini
[Service]
WorkingDirectory=/opt/draeven
EnvironmentFile=/opt/draeven/.env
ExecStart=/usr/bin/node dist/main.js
Restart=on-failure
User=draeven
\`\`\`

Keep \`EnvironmentFile\` readable only by that service user.

## Network

The gateway connection is outbound. With the desk off you do not open an inbound port. Set \`DASHBOARD=off\` when this host should only run the bot ([Bridge & desk](/docs/bridge-desk)). If you do run bridge or desk, bind the port on purpose, put TLS in front of anything that is not localhost, and allow only the addresses that should call it.

## Pitfalls

- \`watch: true\` in production reloads files under the live process. Leave it off and restart when you deploy.
- \`alone: "ask"\` under PM2 or systemd throws when another pid is already live, because stdin is not a TTY.
- Starting \`src/main.ts\` without a build never sees the compiled commands folder.

## Related

- [Config](/docs/config) · [One process](/docs/alone) · [Start options](/docs/start-options) · [Bridge & desk](/docs/bridge-desk)
`,
    },
    nl: {
      title: "Deployen",
      description: "Draai een gebouwde bot onder Node in productie.",
      body: `
Lever de gecompileerde bot. Gebruik Node **20 of nieuwer**, de output van \`tsc\` in \`dist\`, \`watch: false\` en \`alone: true\`. PM2 en systemd hebben geen TTY, dus de standaard \`alone: "ask"\` kan niets vragen.

## Het proces

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  watch: false,
  alone: true,
  guard: guard({ via: "console", of: "all" }),
});
\`\`\`

Laat \`guildId\` staan zolang één server commandowijzigingen binnen seconden moet zien. Laat hem weg voor een **globale** registratie. Die sync kan een uur duren ([App aanmaken](/docs/creating-app)). Zet de token en de guild-id in de omgeving, niet in de repo.

\`draeven.config.js\` moet \`commands\` naar \`./dist/commands\` wijzen ([Config](/docs/config)).

## PM2

\`\`\`js
module.exports = {
  apps: [
    {
      name: "draeven",
      script: "dist/main.js",
      cwd: "/opt/draeven",
      env: { NODE_ENV: "production" },
    },
  ],
};
\`\`\`

\`\`\`bash
pm2 start ecosystem.config.cjs
pm2 save
\`\`\`

Laad geheimen uit de omgeving van de host, of uit een env-bestand dat de procesbeheerder mag lezen. Commit \`.env\` niet.

## systemd

\`\`\`ini
[Service]
WorkingDirectory=/opt/draeven
EnvironmentFile=/opt/draeven/.env
ExecStart=/usr/bin/node dist/main.js
Restart=on-failure
User=draeven
\`\`\`

Houd \`EnvironmentFile\` leesbaar voor alleen die servicegebruiker.

## Netwerk

De gateway-verbinding is uitgaand. Met de desk uit open je geen inkomende poort. Zet \`DASHBOARD=off\` als deze host alleen de bot moet draaien ([Bridge en desk](/docs/bridge-desk)). Draai je wel bridge of desk, bind de poort dan bewust, zet TLS voor alles wat niet localhost is, en sta alleen de adressen toe die mogen aanroepen.

## Valkuilen

- \`watch: true\` in productie herlaadt bestanden onder het live proces. Laat het uit en herstart bij een deploy.
- \`alone: "ask"\` onder PM2 of systemd gooit als er al een pid leeft, omdat stdin geen TTY is.
- \`src/main.ts\` starten zonder build ziet de gecompileerde commandomap nooit.

## Verder

- [Config](/docs/config) · [Eén proces](/docs/alone) · [Start-opties](/docs/start-options) · [Bridge en desk](/docs/bridge-desk)
`,
    },
  },
  {
    slug: "known-limits",
    order: 90,
    en: {
      title: "Known limits",
      description: "What this beta will not do for you.",
      body: `
Draeven 0.1.9 is a beta. These bounds are deliberate. Hitting one of them is not a missing import. The runtime path is [How it fits](/docs/architecture). The discord.js name map is [From discord.js](/docs/from-discordjs). Symptom lookup is [Troubleshooting](/docs/troubleshooting).

## Framework

| Limit | What to do |
|-------|------------|
| Not discord.js | Do not import \`EmbedBuilder\`, \`SlashCommandBuilder\`, or a discord.js \`Client\`. |
| Node 20+, ESM | CommonJS output is not a supported target. |
| Beta names | Pin \`@draeven/core\`. A minor bump may rename a metadata field. |
| Memory cooldowns | \`CooldownBook\` clears on restart. Persist yourself if you need durability. |
| One token, one process | Use \`alone\` ([One process](/docs/alone)). There is no built-in shard manager. |
| \`simulate\` is the handler only | Gates, cooldowns, \`wait\`, and \`collect\` need the live path. |
| Subcommand gates | \`need\` and \`cooldown\` sit on the parent command, not on \`sub()\`. |
| \`embed()\`, not \`card()\` | The public API is \`embed()\` and \`reply(embed)\`. The internal \`Message\` bag still stores the embed on \`card\`. Prefer \`reply(embed(...))\` or \`reply({ text, rows })\`. Do not invent \`card()\`. |

<Note>
\`Message.card\` is the historic field name inside the reply bag. Guides teach \`embed()\` and \`reply({ text, rows })\`. There is no \`card()\` helper.
</Note>

## Discord

| Limit | Detail |
|-------|--------|
| Global command sync | Often up to an hour. Use \`guildId\` while editing ([Creating an app](/docs/creating-app)). |
| Interaction ack | About 3 seconds. Auto-defer runs at 2 seconds unless \`autoDefer: false\`. |
| Autocomplete | 25 choices, values at most 100 characters, and the handler must stay fast. |
| Polls | Question at most 300, each answer at most 55, 2–10 answers, \`hours\` 1–768. |
| \`purge\` | Integer count from 2 to 100. |
| \`editMessage\` | 1–2000 characters, messages the bot created. |
| Option budget | 25 options on a command, including the subcommand tree. |
| Embed text | Header at most 256, description at most 4096, field name at most 256, field value at most 1024, 25 fields, 6000 characters across the embed. |
| \`layout()\` | 1–40 parts. Cannot share a reply with text, an embed, a picture, or a poll. |

## Product

The owner desk controls the deployment you run. It does not host a multi-tenant dashboard for other communities ([Bridge & desk](/docs/bridge-desk)).

<Note>
When a call throws, the message starts with \`[Draeven]\` and names the rule (poll hours, option name, missing token). Read that sentence before adding a wrapper.
</Note>

## If it still fails

Note the command name, the \`[Draeven]\` text, Node's version, and \`version\` from \`@draeven/core\`. Then open [Feedback](/docs/feedback).

## Related

- [Welcome](/docs/welcome) · [Replies](/docs/replies) · [Feedback](/docs/feedback)
`,
    },
    nl: {
      title: "Bekende limieten",
      description: "Wat deze beta niet voor je oplost.",
      body: `
Draeven 0.1.9 is een beta. Deze grenzen zijn bewust. Eraan stoten is geen ontbrekende import. Het runtime-pad is [Hoe het in elkaar zit](/docs/architecture). De namenkaart vanuit discord.js is [Vanuit discord.js](/docs/from-discordjs). Symptomen opzoeken doe je bij [Problemen oplossen](/docs/troubleshooting).

## Framework

| Limiet | Wat je doet |
|--------|-------------|
| Geen discord.js | Importeer geen \`EmbedBuilder\`, \`SlashCommandBuilder\` of een discord.js-\`Client\`. |
| Node 20+, ESM | CommonJS-output is geen ondersteund doel. |
| Beta-namen | Pin \`@draeven/core\`. Een minor kan een metadataveld hernoemen. |
| Wachttijden in het geheugen | \`CooldownBook\` wist bij een herstart. Bewaar zelf als je duurzaamheid nodig hebt. |
| Eén token, één proces | Gebruik \`alone\` ([Één proces](/docs/alone)). Er is geen ingebouwde shard-manager. |
| \`simulate\` is alleen de handler | Gates, wachttijden, \`wait\` en \`collect\` hebben het live pad nodig. |
| Gates op subcommando's | \`need\` en \`cooldown\` staan op het parent-commando, niet op \`sub()\`. |
| \`embed()\`, geen \`card()\` | De publieke API is \`embed()\` en \`reply(embed)\`. De interne \`Message\`-zak bewaart de embed nog op \`card\`. Gebruik \`reply(embed(...))\` of \`reply({ text, rows })\`. Verzin geen \`card()\`. |

<Note>
\`Message.card\` is de oude veldnaam in de antwoordzak. De gidsen leren \`embed()\` en \`reply({ text, rows })\`. Er is geen \`card()\`-helper.
</Note>

## Discord

| Limiet | Detail |
|--------|--------|
| Globale commandosync | Vaak tot een uur. Gebruik \`guildId\` tijdens het bewerken ([App aanmaken](/docs/creating-app)). |
| Interactie bevestigen | Ongeveer 3 seconden. Auto-defer draait na 2 seconden, tenzij \`autoDefer: false\`. |
| Automatisch aanvullen | 25 keuzes, waarden hoogstens 100 tekens, en de handler moet snel blijven. |
| Peilingen | Vraag hoogstens 300, elk antwoord hoogstens 55, 2–10 antwoorden, \`hours\` 1–768. |
| \`purge\` | Geheel aantal van 2 tot 100. |
| \`editMessage\` | 1–2000 tekens, berichten die de bot maakte. |
| Optiebudget | 25 opties op een commando, inclusief de subcommando-boom. |
| Embedtekst | Header hoogstens 256, description hoogstens 4096, field-naam hoogstens 256, field-waarde hoogstens 1024, 25 fields, 6000 tekens over de embed. |
| \`layout()\` | 1–40 onderdelen. Deelt geen antwoord met tekst, een embed, een afbeelding of een peiling. |

## Product

De owner-desk bestuurt de deployment die jij draait. Hij host geen multi-tenant dashboard voor andere communities ([Bridge en desk](/docs/bridge-desk)).

<Note>
Als een aanroep gooit, begint het bericht met \`[Draeven]\` en noemt het de regel (poll-uren, optienaam, ontbrekend token). Lees die zin vóór je een wrapper toevoegt.
</Note>

## Als het nog faalt

Noteer de commandonaam, de \`[Draeven]\`-tekst, de Node-versie, en \`version\` uit \`@draeven/core\`. Open daarna [Terugkoppeling](/docs/feedback).

## Verder

- [Welkom](/docs/welcome) · [Antwoorden](/docs/replies) · [Terugkoppeling](/docs/feedback)
`,
    },
  },
  {
    slug: "changelog",
    order: 91,
    en: {
      title: "Changelog",
      description: "Changelog for docs targeting @draeven/core 0.1.9.",
      body: `
Docs revision for core 0.1.9. See also [How it fits](/docs/architecture), [From discord.js](/docs/from-discordjs), and [Troubleshooting](/docs/troubleshooting).

These pages describe \`@draeven/core\` **0.1.9**. The package is still beta. This note is about the docs, not a new core build, and it has no separate release date.

## What this revision covers

| Area | Where it lives |
|------|----------------|
| Start | [Start options](/docs/start-options), [Config file](/docs/config), [Rules of thumb](/docs/rules) |
| Commands | [Commands](/docs/commands) through options, gates, lookups, and \`formatDate\` |
| Pieces | [Buttons, menus & forms](/docs/pieces), [SKU buttons](/docs/sku), [Collectors](/docs/collectors) |
| Layout | [Embeds & layout](/docs/embeds-layout), plus canvas and polls |
| Bridge desk | [Bridge & desk](/docs/bridge-desk) |
| Simulate | [Simulate & tests](/docs/simulate) |
| Alone | [One process](/docs/alone) |
| Deploy | [Deploy](/docs/deploy) |

## Limits in this beta

Pin \`0.1.9\` if you follow these pages line for line. A later beta can rename a metadata field. What the framework does not cover — discord.js builders, durable cooldowns, a shard manager, a hosted multi-tenant dashboard — is on [Known limits](/docs/known-limits).

When a call throws, the message starts with \`[Draeven]\`. [Errors & debugging](/docs/debugging) lists the common lines. Use [Feedback](/docs/feedback) if a page does not match 0.1.9.
`,
    },
    nl: {
      title: "Changelog",
      description: "Changelog voor de docs bij @draeven/core 0.1.9.",
      body: `
Docs-revisie voor core 0.1.9. Zie ook [Hoe het in elkaar zit](/docs/architecture), [Vanuit discord.js](/docs/from-discordjs) en [Problemen oplossen](/docs/troubleshooting).

Deze pagina's beschrijven \`@draeven/core\` **0.1.9**. Het pakket is nog beta. Deze notitie gaat over de docs, niet over een nieuwe core-build, en hij heeft geen eigen releasedatum.

## Wat deze revisie dekt

| Onderdeel | Waar het staat |
|-----------|----------------|
| Start | [Start-opties](/docs/start-options), [Configbestand](/docs/config), [Vuistregels](/docs/rules) |
| Commando's | [Commando's](/docs/commands) tot en met opties, gates, lookups en \`formatDate\` |
| Stukken | [Knoppen, menu's & formulieren](/docs/pieces), [SKU-knoppen](/docs/sku), [Verzamelaars](/docs/collectors) |
| Layout | [Embeds en layout](/docs/embeds-layout), plus canvas en peilingen |
| Bridge-desk | [Bridge en desk](/docs/bridge-desk) |
| Simuleren | [Simuleren en tests](/docs/simulate) |
| Alone | [Eén proces](/docs/alone) |
| Deploy | [Deployen](/docs/deploy) |

## Grenzen in deze beta

Pin \`0.1.9\` als je deze pagina's regel voor regel volgt. Een latere beta kan een metadataveld hernoemen. Wat het framework niet dekt — discord.js-builders, duurzame wachttijden, een shard-manager, een gehost multi-tenant dashboard — staat op [Bekende limieten](/docs/known-limits).

Als een aanroep gooit, begint het bericht met \`[Draeven]\`. [Fouten & debuggen](/docs/debugging) zet de veelvoorkomende regels op een rij. Gebruik [Terugkoppeling](/docs/feedback) als een pagina niet klopt met 0.1.9.
`,
    },
  },
  {
    slug: "feedback",
    order: 92,
    en: {
      title: "Feedback",
      description: "How to report a confusing guide or a real bug.",
      body: `
The guides and the core API are still moving. A short report is more useful than a long one if it includes the command you ran and the exact error text.

## On this site

1. Open **[Feedback](/feedback)**.
2. Leave a star rating and a note.
3. Sign in with Discord, or stay anonymous.

Use that form when a page is wrong, an example failed, or you cannot tell which helper to call.

## A bug that should be reproduced

Include the command, what you expected, the \`[Draeven]\` line you got, core \`0.1.9\` (or whatever \`version\` prints), your Node version, and whether it was a guild or a DM.

\`\`\`bash
node -e "import('@draeven/core').then(m => console.log(m.version))"
\`\`\`

Paste the smallest \`command()\` that fails. Strip tokens. If the failure is a portal setting (privileged intent off, missing \`applications.commands\`), say which toggle you checked.

<Tip>
Read [Known limits](/docs/known-limits) first. Global command delay, the 3-second ack, and in-memory cooldowns are already documented there.
</Tip>

## Docs edits

Guide source is \`scripts/docs-catalog.mjs\` (English and Dutch \`body\` strings). Regenerate the site files with:

\`\`\`bash
node scripts/write-docs.mjs
\`\`\`

The embeds page also carries \`<Explain>\` markers. After you edit \`content/docs/*/embeds-layout.mdx\` by hand, run \`node scripts/sync-embeds-to-catalog.mjs\` so the next \`write-docs\` keeps those markers.

## Related

- [Welcome](/docs/welcome) · [Known limits](/docs/known-limits)
`,
    },
    nl: {
      title: "Terugkoppeling",
      description: "Hoe je een onduidelijke gids of een echte bug meldt.",
      body: `
De gidsen en de core-API bewegen nog. Een korte melding is nuttiger dan een lange als hij het commando en de exacte fouttekst bevat.

## Op deze site

1. Open **[Terugkoppeling](/feedback)**.
2. Laat een sterrenbeoordeling en een notitie achter.
3. Log in met Discord, of blijf anoniem.

Gebruik dat formulier als een pagina niet klopt, een voorbeeld faalde, of je niet ziet welke helper je moet aanroepen.

## Een bug die nagebouwd moet worden

Zet er het commando bij, wat je verwachtte, de \`[Draeven]\`-regel die je kreeg, core \`0.1.9\` (of wat \`version\` afdrukt), je Node-versie, en of het een guild of een DM was.

\`\`\`bash
node -e "import('@draeven/core').then(m => console.log(m.version))"
\`\`\`

Plak het kleinste \`command()\` dat faalt. Haal tokens weg. Als de fout een portalinstelling is (privileged intent uit, \`applications.commands\` ontbreekt), zeg welke schakelaar je controleerde.

<Tip>
Lees eerst [Bekende limieten](/docs/known-limits). Vertraging van globale commando's, de bevestiging van 3 seconden, en wachttijden in het geheugen staan daar al.
</Tip>

## Docs wijzigen

De bron van de gidsen is \`scripts/docs-catalog.mjs\` (Engelse en Nederlandse \`body\`-strings). Genereer de sitebestanden opnieuw met:

\`\`\`bash
node scripts/write-docs.mjs
\`\`\`

De embedpagina draagt ook \`<Explain>\`-markeringen. Nadat je \`content/docs/*/embeds-layout.mdx\` met de hand bewerkt, draai je \`node scripts/sync-embeds-to-catalog.mjs\` zodat de volgende \`write-docs\` die markeringen houdt.

## Verder

- [Welkom](/docs/welcome) · [Bekende limieten](/docs/known-limits)
`,
    },
  },
  ...gaps,
  ...more,
  ...extras,
];
