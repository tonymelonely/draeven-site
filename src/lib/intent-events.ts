/** Event → intent names for the docs calculator (mirrors @draeven/discord eventIntents). */
export const INTENT_EVENTS: ReadonlyArray<{
  name: string;
  intents: readonly string[];
  privileged?: boolean;
}> = [
  { name: "ready", intents: [] },
  { name: "resumed", intents: [] },
  { name: "memberJoin", intents: ["guildMembers"], privileged: true },
  { name: "memberLeave", intents: ["guildMembers"], privileged: true },
  { name: "memberUpdate", intents: ["guildMembers"], privileged: true },
  { name: "message", intents: ["guildMessages", "directMessages", "messageContent"], privileged: true },
  { name: "messageEdit", intents: ["guildMessages", "directMessages", "messageContent"], privileged: true },
  { name: "messageDelete", intents: ["guildMessages", "directMessages"] },
  { name: "reactionAdd", intents: ["guildMessageReactions", "directMessageReactions"] },
  { name: "reactionRemove", intents: ["guildMessageReactions", "directMessageReactions"] },
  { name: "voiceUpdate", intents: ["guildVoiceStates"] },
  { name: "presenceUpdate", intents: ["guildPresences"], privileged: true },
  { name: "pollVoteAdd", intents: ["guildMessagePolls", "directMessagePolls"] },
  { name: "pollVoteRemove", intents: ["guildMessagePolls", "directMessagePolls"] },
  { name: "guildJoin", intents: ["guilds"] },
  { name: "channelCreate", intents: ["guilds"] },
  { name: "typing", intents: ["guildMessageTyping", "directMessageTyping"] },
];
