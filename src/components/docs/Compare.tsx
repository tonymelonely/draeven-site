import { CodeBlock } from "@/components/docs/CodeBlock";

type Pair = {
  leftTitle: string;
  rightTitle: string;
  left: string;
  right: string;
  language?: string;
  leftFile?: string;
  rightFile?: string;
  /** Stronger labels when the pair replaces stacked ## sections. */
  asSections?: boolean;
};

const PAIRS: Record<string, Pair> = {
  "djs-start": {
    leftTitle: "discord.js",
    rightTitle: "Draeven",
    left: `import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => console.log("online"));
client.login(process.env.DISCORD_TOKEN);`,
    right: `import { Start } from "@draeven/core";

const bot = await Start({
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID,
});`,
  },
  "djs-command": {
    leftTitle: "discord.js",
    rightTitle: "Draeven",
    left: `import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Latency check");

export async function execute(interaction) {
  await interaction.reply("pong");
}`,
    right: `import { command } from "@draeven/core";

export const ping = command("ping", "Latency check", async (ctx) =>
  ctx.reply("pong")
);`,
  },
  "defer-privacy": {
    leftTitle: "Public wait",
    rightTitle: "Private wait",
    language: "javascript",
    leftFile: "public.js",
    rightFile: "private.js",
    asSections: true,
    left: `export const slow = command("slow", "Works a while", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Working…");
  await ctx.edit("Done.");
});`,
    right: `export const secret = command("secret", "Only you see the wait", async (ctx) => {
  await ctx.wait({ private: true });
  await ctx.edit("Working…");
  await ctx.edit("Done.");
});`,
  },
  "defer-privacy-nl": {
    leftTitle: "Publiek wachten",
    rightTitle: "Privé wachten",
    language: "javascript",
    leftFile: "public.js",
    rightFile: "private.js",
    asSections: true,
    left: `export const slow = command("slow", "Duurt even", async (ctx) => {
  await ctx.wait();
  await ctx.edit("Bezig…");
  await ctx.edit("Klaar.");
});`,
    right: `export const secret = command("secret", "Alleen jij ziet het wachten", async (ctx) => {
  await ctx.wait({ private: true });
  await ctx.edit("Bezig…");
  await ctx.edit("Klaar.");
});`,
  },
  "reply-vs-send": {
    leftTitle: "Interaction reply",
    rightTitle: "Channel send",
    language: "javascript",
    leftFile: "reply.js",
    rightFile: "send.js",
    asSections: true,
    left: `export const ping = command("ping", "Alive?", async (ctx) =>
  ctx.reply("pong")
);`,
    right: `export const shout = command("shout", "Post in channel", async (ctx) => {
  const here = ctx.getChannel();
  if (here) await ctx.send(here, "Logged.");
  return ctx.reply("Posted.", { private: true });
});`,
  },
  "reply-vs-send-nl": {
    leftTitle: "Interactie-reply",
    rightTitle: "Kanaal-send",
    language: "javascript",
    leftFile: "reply.js",
    rightFile: "send.js",
    asSections: true,
    left: `export const ping = command("ping", "Leeft?", async (ctx) =>
  ctx.reply("pong")
);`,
    right: `export const shout = command("shout", "Plaats in kanaal", async (ctx) => {
  const here = ctx.getChannel();
  if (here) await ctx.send(here, "Gelogd.");
  return ctx.reply("Geplaatst.", { private: true });
});`,
  },
  "djs-embed": {
    leftTitle: "discord.js",
    rightTitle: "Draeven",
    left: `import { EmbedBuilder } from "discord.js";

const embed = new EmbedBuilder()
  .setTitle("Status")
  .setDescription("All green")
  .setColor(0x57f287)
  .addFields({ name: "Ping", value: "42ms" });

await interaction.reply({ embeds: [embed] });`,
    right: `import { embed } from "@draeven/core";

await ctx.reply(
  embed({
    header: { title: "Status" },
    description: "All green",
    color: "green",
    fields: [{ name: "Ping", value: "42ms" }],
  })
);`,
  },
  "djs-button": {
    leftTitle: "discord.js",
    rightTitle: "Draeven",
    left: `import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("ok")
    .setLabel("OK")
    .setStyle(ButtonStyle.Primary)
);

await interaction.reply({ content: "Confirm?", components: [row] });
const click = await interaction.channel.awaitMessageComponent({
  filter: (i) => i.customId === "ok",
  time: 15_000,
});
await click.update({ content: "Done", components: [] });`,
    right: `import { button, row } from "@draeven/core";

ctx.reply({
  text: "Confirm?",
  rows: [row(button({ id: "ok", label: "OK", color: "blurple" }))],
});
const click = await ctx.collect({ ids: "ok", seconds: 15 });
if (!click) return ctx.edit("Timed out.");
// A text-only edit keeps the row. remove() deletes the reply.
await ctx.remove();`,
  },
  "cmd-options": {
    leftTitle: "Without options",
    rightTitle: "With options",
    language: "javascript",
    leftFile: "ping.js",
    rightFile: "greet.js",
    asSections: true,
    left: `import { command } from "@draeven/core";

export const ping = command("ping", "Checks whether the bot is alive", async (ctx) =>
  ctx.reply("pong")
);`,
    right: `import { command, text, user } from "@draeven/core";

export const greet = command(
  "greet",
  "Greets someone",
  {
    who: user("Who?"),
    note: text("Extra note?"),
  },
  async (ctx) => {
    const person = ctx.who ?? ctx.getUser(ctx.author);
    const extra = ctx.note ? \` — \${ctx.note}\` : "";
    return ctx.reply(\`Hello \${person.name}\${extra}\`);
  }
);`,
  },
  "cmd-options-nl": {
    leftTitle: "Zonder opties",
    rightTitle: "Met opties",
    language: "javascript",
    leftFile: "ping.js",
    rightFile: "greet.js",
    asSections: true,
    left: `import { command } from "@draeven/core";

export const ping = command("ping", "Checkt of de bot leeft", async (ctx) =>
  ctx.reply("pong")
);`,
    right: `import { command, text, user } from "@draeven/core";

export const greet = command(
  "greet",
  "Begroet iemand",
  {
    who: user("Wie?"),
    note: text("Extra notitie?"),
  },
  async (ctx) => {
    const person = ctx.who ?? ctx.getUser(ctx.author);
    const extra = ctx.note ? \` — \${ctx.note}\` : "";
    return ctx.reply(\`Hallo \${person.name}\${extra}\`);
  }
);`,
  },
  "sub-shapes": {
    leftTitle: "Flat leaves",
    rightTitle: "One group",
    language: "javascript",
    left: `import { command, sub, user } from "@draeven/core";

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
    clear: sub(
      "Clear a timeout",
      { who: user("Who?").required() },
      async (ctx) => {
        await ctx.timeout(ctx.who, 0, "Cleared");
        return ctx.reply(\`Cleared \${ctx.who.name}.\`);
      }
    ),
  },
  { need: "ModerateMembers" }
);`,
    right: `import { command, group, sub, user } from "@draeven/core";

export const mod = command("mod", "Moderation tools", {
  user: group("Member actions", {
    kick: sub(
      "Kick a member",
      { who: user("Who?").required() },
      async (ctx) => {
        await ctx.kick(ctx.who, "Via /mod user kick");
        return ctx.reply("Kicked.");
      },
      { locales: { nl: "Kick een lid" } }
    ),
  }),
});`,
  },
  "sub-shapes-nl": {
    leftTitle: "Platte bladeren",
    rightTitle: "Eén groep",
    language: "javascript",
    left: `import { command, sub, user } from "@draeven/core";

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
    clear: sub(
      "Clear a timeout",
      { who: user("Who?").required() },
      async (ctx) => {
        await ctx.timeout(ctx.who, 0, "Cleared");
        return ctx.reply(\`Cleared \${ctx.who.name}.\`);
      }
    ),
  },
  { need: "ModerateMembers" }
);`,
    right: `import { command, group, sub, user } from "@draeven/core";

export const mod = command("mod", "Moderation tools", {
  user: group("Member actions", {
    kick: sub(
      "Kick a member",
      { who: user("Who?").required() },
      async (ctx) => {
        await ctx.kick(ctx.who, "Via /mod user kick");
        return ctx.reply("Kicked.");
      },
      { locales: { nl: "Kick een lid" } }
    ),
  }),
});`,
  },
};

export async function Compare({ id }: { id: string }) {
  const pair = PAIRS[id];
  if (!pair) return null;
  const language = pair.language || "typescript";

  const ext = language === "javascript" ? "js" : "ts";
  const leftFile =
    pair.leftFile ||
    (id.startsWith("sub-")
      ? `flat.${ext}`
      : `${pair.leftTitle.replace(/[^a-zA-Z0-9_-]+/g, "")}.${ext}`);
  const rightFile =
    pair.rightFile ||
    (id.startsWith("sub-")
      ? `group.${ext}`
      : `${pair.rightTitle.replace(/[^a-zA-Z0-9_-]+/g, "")}.${ext}`);

  const labelClass = pair.asSections
    ? "mb-3 text-[1.15rem] font-semibold tracking-tight text-[var(--color-ink)]"
    : "mb-2 text-[0.68rem] tracking-[0.14em] uppercase";

  return (
    <div className="compare-grid duo-grid my-6">
      <div className="min-w-0">
        <p
          className={`${labelClass} ${
            pair.asSections ? "" : "text-[var(--color-ink-soft)]"
          }`}
        >
          {pair.leftTitle}
        </p>
        <CodeBlock code={pair.left} language={language} filename={leftFile} />
      </div>
      <div className="min-w-0">
        <p
          className={`${labelClass} ${
            pair.asSections ? "" : "text-[var(--color-accent)]"
          }`}
        >
          {pair.rightTitle}
        </p>
        <CodeBlock code={pair.right} language={language} filename={rightFile} />
      </div>
    </div>
  );
}
