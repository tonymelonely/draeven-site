/** Extra guides: starters, migration checklist, why-failing, glossary. */

/** @type {ReadonlyArray<{ slug: string; order: number; en: { title: string; description: string; body: string }; nl: { title: string; description: string; body: string } }>} */
export const extras = [
  {
    slug: "starters",
    order: 13,
    en: {
      title: "Starter bots",
      description: "Copy-paste starters for mod, tickets, and welcome flows.",
      body: `
Three small bots that share the same conventions: \`ping\` for health, \`greet\` when you need an option, and \`Start({ guildId })\` while you iterate.

<TrySimulate />

## Conventions

- Command files export \`command(...)\` with positional args (name, description, …).
- Health check is always \`/ping\` → \`pong\`.
- Point \`draeven.config.js\` at \`./dist/commands\`.

## Mod bot

Timeout + clear under one slash parent. Full tree: [Subcommands](/docs/subcommands).

\`\`\`js
import { Start, command, sub, user } from "@draeven/core";

export const mod = command(
  "mod",
  "Moderation tools",
  {
    timeout: sub(
      "Timeout a member",
      { who: user("Who?").required() },
      async (ctx) => {
        await ctx.timeout(ctx.who, 600, "Via /mod timeout");
        return ctx.reply(\`Timed out \${ctx.who.name}.\`);
      }
    ),
  },
  { need: "ModerateMembers" }
);

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  commands: [mod],
});
\`\`\`

Prefer the \`number()\` option from [Options](/docs/options) for \`minutes\`. Ready-made mute recipe: [Recipes](/docs/recipes).

## Ticket bot

Confirm with a button. A text-only \`edit\` keeps the button row. \`remove()\` deletes the reply. [Collectors](/docs/collectors).

\`\`\`js
import { command, button, row } from "@draeven/core";

export const ticket = command("ticket", "Open a support ticket", async (ctx) => {
  ctx.reply({
    text: "Open a ticket?",
    rows: [row(button({ id: "open", label: "Open" }))],
  });
  const click = await ctx.collect({ ids: "open", seconds: 30 });
  if (!click) return ctx.edit("Timed out.");
  return ctx.edit("Ticket noted — a moderator will follow up.");
});
\`\`\`

## Welcome bot

Greet on \`memberJoin\`. Needs the right intents: [Events & intents](/docs/events-intents).

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("memberJoin"),
  events: {
    memberJoin: async (member) => {
      const channelId = process.env.WELCOME_CHANNEL_ID;
      if (!channelId || !member.id) return;
      await bot.send(channelId, \`Welcome <@\${member.id}>.\`);
    },
  },
});
\`\`\`

<Tip>
Stuck? Ask in Discord **#help** once the invite is live, or open [Why is this failing?](/docs/why-failing).
</Tip>
`,
    },
    nl: {
      title: "Starter-bots",
      description: "Kant-en-klare starters voor mod, tickets en welkom.",
      body: `
Drie kleine bots met dezelfde conventies: \`ping\` voor health, \`greet\` als je een optie nodig hebt, en \`Start({ guildId })\` terwijl je itereert.

<TrySimulate />

## Conventies

- Commandobestanden exporteren \`command(...)\` met positionele args (naam, beschrijving, …).
- Health check is altijd \`/ping\` → \`pong\`.
- Wijs \`draeven.config.js\` naar \`./dist/commands\`.

## Mod-bot

Timeout + clear onder één slash-parent. Volledige boom: [Subcommando's](/docs/subcommands).

\`\`\`js
import { Start, command, sub, user } from "@draeven/core";

export const mod = command(
  "mod",
  "Moderatietools",
  {
    timeout: sub(
      "Timeout voor een lid",
      { who: user("Wie?").required() },
      async (ctx) => {
        await ctx.timeout(ctx.who, 600, "Via /mod timeout");
        return ctx.reply(\`Timeout voor \${ctx.who.name}.\`);
      }
    ),
  },
  { need: "ModerateMembers" }
);

await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  commands: [mod],
});
\`\`\`

Gebruik \`number()\` uit [Opties](/docs/options) voor minuten. Kant-en-klaar mute-recept: [Recepten](/docs/recipes).

## Ticket-bot

Bevestig met een knop. Een \`edit\` die alleen tekst is, houdt de knoppenrij. \`remove()\` verwijdert het antwoord. [Verzamelaars](/docs/collectors).

\`\`\`js
import { command, button, row } from "@draeven/core";

export const ticket = command("ticket", "Open een supportticket", async (ctx) => {
  ctx.reply({
    text: "Open een ticket?",
    rows: [row(button({ id: "open", label: "Openen" }))],
  });
  const click = await ctx.collect({ ids: "open", seconds: 30 });
  if (!click) return ctx.edit("Tijd verstreken.");
  return ctx.edit("Ticket genoteerd — een moderator volgt op.");
});
\`\`\`

## Welcome-bot

Begroet op \`memberJoin\`. Juiste intents: [Events en intents](/docs/events-intents).

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
  intents: intentsFor("memberJoin"),
  events: {
    memberJoin: async (member) => {
      const channelId = process.env.WELCOME_CHANNEL_ID;
      if (!channelId || !member.id) return;
      await bot.send(channelId, \`Welkom <@\${member.id}>.\`);
    },
  },
});
\`\`\`

<Tip>
Vast? Vraag in Discord **#help** zodra de invite live is, of open [Waarom faalt dit?](/docs/why-failing).
</Tip>
`,
    },
  },
  {
    slug: "migration-checklist",
    order: 14,
    en: {
      title: "Migration checklist",
      description: "Checkable path from discord.js to Draeven.",
      body: `
Use this after the [From discord.js](/docs/from-discordjs) cheat sheet. Tick items in this browser as you finish them.

Suggested order while you migrate:

1. Portal token, guild id, intents — [Creating an app](/docs/creating-app)
2. Slash commands and options — [Commands](/docs/commands), [Options](/docs/options)
3. Replies, buttons, forms — [Replies](/docs/replies), [Buttons, menus & forms](/docs/pieces)
4. Collect vs press vs \`use()\` — [Collectors](/docs/collectors), [Press & submit](/docs/press-handlers#use)
5. Gateway events — [Events & intents](/docs/events-intents)
6. Production — [Deploy](/docs/deploy), [Known limits](/docs/known-limits)

<Checklist id="migration" />

Side-by-side shapes stay on the cheat sheet. When something breaks mid-migrate, open [Why is this failing?](/docs/why-failing).
`,
    },
    nl: {
      title: "Migratie-checklist",
      description: "Afvinkbaar pad van discord.js naar Draeven.",
      body: `
Gebruik dit na de [Vanuit discord.js](/docs/from-discordjs)-spiekbrief. Vink items af in deze browser naarmate je klaar bent.

Voorgestelde volgorde tijdens de migratie:

1. Portaal-token, guild-id, intents — [App aanmaken](/docs/creating-app)
2. Slash-commando's en opties — [Commando's](/docs/commands), [Opties](/docs/options)
3. Antwoorden, knoppen, formulieren — [Antwoorden](/docs/replies), [Knoppen, menu's & formulieren](/docs/pieces)
4. Collect vs press vs \`use()\` — [Verzamelaars](/docs/collectors), [Press & submit](/docs/press-handlers#use)
5. Gateway-events — [Events en intents](/docs/events-intents)
6. Productie — [Deploy](/docs/deploy), [Bekende limieten](/docs/known-limits)

<Checklist id="migration" />

Vormen naast elkaar blijven op de spiekbrief. Als iets breekt tijdens de migratie: [Waarom faalt dit?](/docs/why-failing).
`,
    },
  },
  {
    slug: "why-failing",
    order: 79,
    en: {
      title: "Why is this failing?",
      description: "Symptom → cause → the guide that fixes it.",
      body: `
**Start here** when you have a concrete failure and want the shortest path to a fix. Paste a \`[Draeven]\` line into the box, or skim the symptom map. [Troubleshooting](/docs/troubleshooting) is the same matrix with a short how-to. Throw-text detail (exact messages, what they mean) is [Errors & debugging](/docs/debugging).

<ErrorPaste />

<h2 id="symptom-map">Symptom map</h2>

<ErrorMapTable />

## If it still fails

1. Reproduce with \`simulate()\` when the failure is in a command handler — [Simulate](/docs/simulate).
2. Check [Known limits](/docs/known-limits) before filing a bug.
3. Ask in Discord **#help**, or send [Feedback](/docs/feedback) with the log line and a minimal snippet.
`,
    },
    nl: {
      title: "Waarom faalt dit?",
      description: "Symptoom → oorzaak → de gids die het oplost.",
      body: `
**Begin hier** als je een concrete fout hebt en het kortste pad naar een fix wilt. Plak een \`[Draeven]\`-regel in het vak, of scan de symptoomkaart. [Problemen oplossen](/docs/troubleshooting) is dezelfde matrix met een korte handleiding. Detail over foutteksten (exacte berichten, wat ze betekenen) staat bij [Fouten & debuggen](/docs/debugging).

<ErrorPaste />

<h2 id="symptom-map">Symptoomkaart</h2>

<ErrorMapTable />

## Als het nog faalt

1. Reproduceer met \`simulate()\` als de fout in een command-handler zit — [Simuleren](/docs/simulate).
2. Check [Bekende limieten](/docs/known-limits) vóór je een bug indient.
3. Vraag in Discord **#help**, of stuur [Terugkoppeling](/docs/feedback) met de logregel en een minimale snippet.
`,
    },
  },
  {
    slug: "glossary",
    order: 93,
    en: {
      title: "Glossary",
      description: "ctx, wait, leaf, use(), and other Draeven words.",
      body: `
Short definitions with a deep-link into the guide that owns the concept.

Group the terms by path while you browse:

- **Command path** — \`ctx\`, leaf, gates, cooldown, \`reply\` / \`wait\` / \`edit\`
- **Interaction path** — collect, press, submit, \`use()\`, \`PressContext\`
- **Gateway path** — intents, \`intentsFor\`, events folder, bot handle

<GlossaryList />
`,
    },
    nl: {
      title: "Glossarium",
      description: "ctx, wait, leaf, use() en andere Draeven-woorden.",
      body: `
Korte definities met een directe link naar de gids die het onderwerp behandelt.

Groepeer de termen per pad terwijl je bladert:

- **Commandopad** — \`ctx\`, leaf, gates, wachttijd, \`reply\` / \`wait\` / \`edit\`
- **Interactiepad** — collect, press, submit, \`use()\`, \`PressContext\`
- **Gateway-pad** — intents, \`intentsFor\`, events-map, bot-handle

<GlossaryList />
`,
    },
  },
];
