/** Compact discord.js → Draeven API map for the migration guide. */
export type MigrationRow = {
  djs: string;
  draeven: string;
  href: string;
};

export const MIGRATION_MAP: MigrationRow[] = [
  { djs: "Client + login", draeven: "Start({ token, … })", href: "/docs/quickstart" },
  { djs: "SlashCommandBuilder", draeven: "command() / sub() / group()", href: "/docs/commands" },
  { djs: "interaction.reply", draeven: "ctx.reply", href: "/docs/replies" },
  { djs: "deferReply + editReply", draeven: "wait() + edit()", href: "/docs/replies" },
  { djs: "EmbedBuilder", draeven: "embed({ … })", href: "/docs/embeds-layout" },
  { djs: "ActionRow + ButtonBuilder", draeven: "row() + button()", href: "/docs/pieces" },
  { djs: "createMessageComponentCollector", draeven: "ctx.collect / press / use()", href: "/docs/collectors" },
  { djs: "client.on(\"guildMemberAdd\")", draeven: "events.memberJoin + intentsFor", href: "/docs/events-intents#from-djs" },
  { djs: "client.on(\"messageCreate\")", draeven: "events.message + intentsFor", href: "/docs/events-intents#from-djs" },
  { djs: "GuildMember#ban", draeven: "ctx.ban / kick / timeout", href: "/docs/mod-actions" },
  { djs: "GatewayIntentBits.*", draeven: "intentsFor(\"…\") / intentBits", href: "/docs/events-intents#intents" },
];
