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
      description: "Copy-paste starters voor mod, tickets en welkom.",
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
  if (!click) return ctx.edit("Time-out.");
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

<Checklist id="migration" />

Side-by-side shapes stay on the cheat sheet. When something breaks mid-migrate, open [Why is this failing?](/docs/why-failing).
`,
    },
    nl: {
      title: "Migratie-checklist",
      description: "Afvinkbaar pad van discord.js naar Draeven.",
      body: `
Gebruik dit na de [Vanuit discord.js](/docs/from-discordjs)-spiekbrief. Vink items af in deze browser naarmate je klaar bent.

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
Start from the \`[Draeven]\` log line when you have one. Otherwise match the symptom below. Short matrix also lives on [Troubleshooting](/docs/troubleshooting); throw-text detail is [Errors & debugging](/docs/debugging).

<ErrorPaste />

## Symptom map

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
Begin bij de \`[Draeven]\`-logregel als je die hebt. Zo niet, match het symptoom hieronder. De korte matrix staat ook op [Problemen oplossen](/docs/troubleshooting); detail over throw-tekst bij [Fouten & debuggen](/docs/debugging).

<ErrorPaste />

## Symptoomkaart

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

<GlossaryList />
`,
    },
    nl: {
      title: "Glossarium",
      description: "ctx, wait, leaf, use() en andere Draeven-woorden.",
      body: `
Korte definities met een deep-link naar de gids die het concept bezit.

<GlossaryList />
`,
    },
  },
];
