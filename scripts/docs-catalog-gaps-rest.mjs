/** Remaining catalog entries: press, gateway, discord client, guard, advanced API. */
export const rest = [
  {
    slug: "press-handlers",
    order: 44,
    en: {
      title: "Press & submit",
      description: "press and submit on a control. use() for handlers that survive a restart.",
      body: `
Inline \`press\` for a one-off. \`use()\` in the events folder when it must survive a restart.

<InteractChoice />
<WhenToUse topic="use" />

Put \`press\` on buttons/menus/pickers, \`submit\` on forms. \`link()\` / \`sku()\` have neither. Collect wins only on id + kind + user ([Collectors](/docs/collectors)).

<Note>Aligned with @draeven/core **0.1.9**.</Note>

## PressContext

\`PressContext\` is what \`runPress\` builds. It is not the command \`ctx\`. <Explain topic="press-context">PressContext</Explain>

| Field | What you get |
|-------|----------------|
| \`author\` | \`{ id }\` of the person who pressed or submitted. |
| \`id\` | The custom id Discord sent. |
| \`messageId\` | The message that carried the control, when Discord included it. |
| \`values\` | Menu and picker selections. Empty for a button or a form. |
| \`fields\` | Form values by field id. Empty for a button or a menu. |
| lookups | \`getUser\`, \`getMember\`, \`getGuild\`, \`getChannel\`, and the rest from [Lookups](/docs/lookups). |
| \`reply\` | Once. A string, an \`embed()\`, both, a row, a form, a poll, a layout, a canvas, or \`{ text, rows }\`. |

\`id\` is that custom id. \`messageId\` is set when Discord sent the message. Call \`reply\` exactly once. A second reply throws \`[Draeven] A command can only reply once.\` Returning without \`reply\` throws \`[Draeven] The command did not reply.\`

## Press and collect

\`\`\`js
import { command, button, row, menu, form } from "@draeven/core";

const again = button({
  id: "ping-again",
  label: "Ping again",
  press: (ctx) => {
    const user = ctx.getUser(ctx.author);
    return ctx.reply(user.name + " pressed again.");
  },
});

export const later = command("later", "A button that answers itself", async (ctx) => {
  return ctx.reply({
    text: "Nothing is collecting. The button answers later.",
    rows: [row(again)],
  });
});

export const stay = command("stay", "The collector takes this press", async (ctx) => {
  await ctx.wait();
  await ctx.edit({
    text: "This press stays in the command.",
    rows: [
      row(
        button({
          id: "stay-yes",
          label: "Yes",
          color: "green",
          press: (pressCtx) => pressCtx.reply("not used while collect waits"),
        })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["stay-yes"], seconds: 20 });
  if (!pick) return ctx.reply("Timed out.");
  return ctx.reply("Collected " + pick.id);
});

export const choose = command("choose", "A menu with its own press", async (ctx) => {
  return ctx.reply({
    text: "Pick one. No collect.",
    rows: [
      row(
        menu({
          id: "color",
          placeholder: "Color",
          choices: [
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
          ],
          press: (ctx) => ctx.reply(ctx.values.join(", ")),
        })
      ),
    ],
  });
});
\`\`\`

A form uses \`submit\`, and \`ctx.fields\` is keyed by field id:

\`\`\`js
form({
  id: "note",
  title: "Note",
  fields: [{ id: "body", label: "Body" }],
  submit: (ctx) => ctx.reply(ctx.fields.body || "empty"),
})
\`\`\`

Pickers (\`people\`, \`roles\`, \`channels\`, \`mentions\`) use \`press\` the same way as \`menu\`: selected ids arrive on \`values\`.

<h2 id="use">use() in the events folder</h2>

\`use({ ids, kind?, run })\` is a durable component handler. It lives in the events folder, the same place as \`export function memberJoin\`. \`Start\` loads it with that folder. It survives a restart. It is separate from a discord.js \`InteractionCreate\` listener.

Keep \`press\` for a simple one-off button:

\`\`\`js
button({ id: "yes", label: "Yes", press: (ctx) => ctx.reply("Yes.") })
\`\`\`

A command can post buttons with no \`press\`. \`use()\` owns them:

\`\`\`js
import { button, command, row } from "@draeven/core";

export const letters = command("letters", "Posts letter buttons", async (ctx) =>
  ctx.reply({
    text: "Pick a letter.",
    rows: [row(button({ id: "hangman_A", label: "A" }))],
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

## ids

| \`ids\` | Match |
|---------|--------|
| \`"hangman_A"\` | That exact id |
| \`"hangman_*"\` | Prefix. \`*\` only at the end |
| \`["yes", "no"]\` | Any of those exact ids |
| \`(id) => boolean\` | Your own test. Return \`true\` to take the id |

\`kind\` defaults to \`"press"\`. Pass \`"submit"\` for a form. A \`"press"\` handler matches presses. A \`"submit"\` handler matches form submits.

## When collect wins

\`CollectorBook.take\` runs first. If a waiter matches the id, the kind, and the user, \`press\`, \`submit\`, and \`use()\` are skipped.

| Waiting on | What Draeven does |
|------------|-------------------|
| a button, menu, or picker | Acknowledges with a component update and lets the command continue. |
| a form submit | Leaves the modal unacked so the waiting command can answer it. |

If nothing is waiting, Draeven picks the next match in this order:

1. The inline \`press\` or \`submit\` remembered on that custom id.
2. A \`use()\` loaded from the events folder.
3. The text \`Received.\`

The remembered function wins over \`use()\` when both match. That memory lasts until the process stops. \`use()\` is loaded again on the next start.

<Warn fix="Use distinct ids for an open collect() and any press handler." href="/docs/why-failing">
Do not share one id between a live \`collect()\` and a \`press\` you expect to run. The collector keeps the interaction for as long as it is waiting.
</Warn>

## Pitfalls

- \`press\` and \`use()\` cannot \`wait\`, \`collect\`, \`followup\`, or call mod actions. Those live on the command context ([Rules of thumb](/docs/rules)).
- A button's \`values\` array is empty. Read \`ctx.id\` for the custom id.
- \`*\` in \`ids\` is a prefix only when it is the last character. \`hang*man\` is an exact id.
- When two \`use()\` handlers match, the first one loaded runs. Files are read in name order.
- A form \`submit\` still has to \`reply\` once. The modal interaction is that reply.
- Pieces are built with \`button\`, \`menu\`, and \`form\` ([Buttons, menus & forms](/docs/pieces)). \`press\` does not replace \`row()\`.
`,
    },
    nl: {
      title: "Press & submit",
      description: "press en submit op een element. use() voor handlers die een herstart overleven.",
      body: `
Inline \`press\` voor een eenmalige knop. \`use()\` in de events-map als het een herstart moet overleven.

<InteractChoice />
<WhenToUse topic="use" />

Zet \`press\` op knoppen/menu’s/kiezers, \`submit\` op formulieren. \`link()\` / \`sku()\` hebben geen van beide. Collect wint alleen bij id + kind + user ([Verzamelaars](/docs/collectors)).

<Note>Afgestemd op @draeven/core **0.1.9**.</Note>

## PressContext

\`PressContext\` is wat \`runPress\` bouwt. Het is niet de commando-\`ctx\`. <Explain topic="press-context">PressContext</Explain>

| Veld | Wat je krijgt |
|------|----------------|
| \`author\` | \`{ id }\` van wie drukte of verstuurde. |
| \`id\` | De custom id die Discord stuurde. |
| \`messageId\` | Het bericht dat het element droeg, als Discord het meestuurde. |
| \`values\` | Keuzes van een menu of kiezer. Leeg bij een knop of een formulier. |
| \`fields\` | Formulierwaarden op veld-id. Leeg bij een knop of een menu. |
| lookups | \`getUser\`, \`getMember\`, \`getGuild\`, \`getChannel\` en de rest uit [Lookups](/docs/lookups). |
| \`reply\` | Eén keer. Een string, een \`embed()\`, beide, een rij, een formulier, een peiling, een layout, een canvas, of \`{ text, rows }\`. |

\`id\` is die custom id. \`messageId\` staat er als Discord het bericht meestuurde. Roep \`reply\` precies één keer aan. Een tweede reply geeft de fout \`[Draeven] A command can only reply once.\` (framework-Engels — letterlijke fouttekst). Terugkeren zonder \`reply\` geeft de fout \`[Draeven] The command did not reply.\` (zelfde: letterlijke frameworktekst).

## Press en collect

\`\`\`js
import { command, button, row, menu, form } from "@draeven/core";

const again = button({
  id: "ping-again",
  label: "Nog eens ping",
  press: (ctx) => {
    const user = ctx.getUser(ctx.author);
    return ctx.reply(user.name + " drukte opnieuw.");
  },
});

export const later = command("later", "Een knop die zelf antwoordt", async (ctx) => {
  return ctx.reply({
    text: "Er wacht geen verzamelaar. De knop antwoordt later.",
    rows: [row(again)],
  });
});

export const stay = command("stay", "De verzamelaar pakt deze press", async (ctx) => {
  await ctx.wait();
  await ctx.edit({
    text: "Deze press blijft in het commando.",
    rows: [
      row(
        button({
          id: "stay-yes",
          label: "Ja",
          color: "green",
          press: (pressCtx) => pressCtx.reply("niet gebruikt zolang collect wacht"),
        })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["stay-yes"], seconds: 20 });
  if (!pick) return ctx.reply("De tijd is om.");
  return ctx.reply("Verzameld " + pick.id);
});

export const choose = command("choose", "Een menu met een eigen press", async (ctx) => {
  return ctx.reply({
    text: "Kies er een. Geen collect.",
    rows: [
      row(
        menu({
          id: "color",
          placeholder: "Kleur",
          choices: [
            { label: "Rood", value: "red" },
            { label: "Blauw", value: "blue" },
          ],
          press: (ctx) => ctx.reply(ctx.values.join(", ")),
        })
      ),
    ],
  });
});
\`\`\`

Een formulier gebruikt \`submit\`, en \`ctx.fields\` gebruikt de veld-id als sleutel:

\`\`\`js
form({
  id: "note",
  title: "Notitie",
  fields: [{ id: "body", label: "Tekst" }],
  submit: (ctx) => ctx.reply(ctx.fields.body || "leeg"),
})
\`\`\`

Kiezers (\`people\`, \`roles\`, \`channels\`, \`mentions\`) gebruiken \`press\` net als \`menu\`: gekozen ids komen binnen op \`values\`.

<h2 id="use">use() in de events-map</h2>

\`use({ ids, kind?, run })\` is een duurzame component-handler. Hij staat in de events-map, dezelfde plek als \`export function memberJoin\`. \`Start\` laadt hem met die map. Hij overleeft een herstart. Het is geen discord.js \`InteractionCreate\`-listener.

Houd \`press\` voor een eenvoudige eenmalige knop:

\`\`\`js
button({ id: "yes", label: "Ja", press: (ctx) => ctx.reply("Ja.") })
\`\`\`

Een commando kan knoppen plaatsen zonder \`press\`. \`use()\` is dan de eigenaar:

\`\`\`js
import { button, command, row } from "@draeven/core";

export const letters = command("letters", "Plaatst letterknoppen", async (ctx) =>
  ctx.reply({
    text: "Kies een letter.",
    rows: [row(button({ id: "hangman_A", label: "A" }))],
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
      text: \`Je koos **\${letter}**\`,
      rows: [row(button({ id: "hangman_A", label: "A" }))],
    });
  },
});
\`\`\`

## ids

| \`ids\` | Match |
|---------|---------|
| \`"hangman_A"\` | Precies die id |
| \`"hangman_*"\` | Prefix. \`*\` alleen aan het eind |
| \`["yes", "no"]\` | Een van die exacte ids |
| \`(id) => boolean\` | Je eigen test. Geef \`true\` terug om de id te pakken |

\`kind\` is standaard \`"press"\`. Geef \`"submit"\` mee voor een formulier. Een \`"press"\`-handler pakt presses. Een \`"submit"\`-handler pakt formulier-submits.

## Als collect wint

\`CollectorBook.take\` draait eerst. Als een verzamelaar matcht op id, soort en gebruiker, worden \`press\`, \`submit\` en \`use()\` overgeslagen.

| Er wacht iets op | Wat Draeven doet |
|------------------|------------------|
| een knop, menu of kiezer | Bevestigt met een component-update en laat het commando doorgaan. |
| een formulier-submit | Laat de modal onbevestigd zodat het wachtende commando hem kan beantwoorden. |

Als er niets wacht, kiest Draeven de volgende match in deze volgorde:

1. De inline \`press\` of \`submit\` die op die custom id is onthouden.
2. Een \`use()\` uit de events-map.
3. De tekst \`Received.\` (framework-Engels — letterlijke fallback)

De onthouden functie wint van \`use()\` als beide kloppen. Dat geheugen duurt tot het proces stopt. \`use()\` wordt bij de volgende start opnieuw geladen.

<Warn fix="Gebruik aparte ids voor een open collect() en een press-handler." href="/docs/why-failing">
Deel één id niet tussen een lopende \`collect()\` en een \`press\` waarvan je verwacht dat hij draait. De verzamelaar houdt de interactie zolang hij wacht.
</Warn>

## Valkuilen

- \`press\` en \`use()\` kunnen niet \`wait\`, \`collect\`, \`followup\` of mod-acties aanroepen. Die zitten op de commandocontext ([Vuistregels](/docs/rules)).
- De \`values\` van een knop zijn leeg. Lees \`ctx.id\` voor de custom id.
- \`*\` in \`ids\` is alleen een prefix als het het laatste teken is. \`hang*man\` is een exacte id.
- Als twee \`use()\`-handlers kloppen, draait de eerste die geladen is. Bestanden worden op naam gelezen.
- Een formulier-\`submit\` moet nog steeds één keer \`reply\` aanroepen. De modal-interactie is dat antwoord.
- Componenten bouw je met \`button\`, \`menu\` en \`form\` ([Knoppen, menu's & formulieren](/docs/pieces)). \`press\` vervangt \`row()\` niet.
`,
    },
  },
  {
    slug: "gateway-events",
    order: 61,
    en: {
      title: "Gateway event payloads",
      description: "Every GatewayEventName and the object your handler receives.",
      body: `
Register events with camelCase names on \`Start\` or \`bot.onEvent\` — see [Events & intents](/docs/events-intents#inline). This page is the **shape** of each argument: a Draeven object, not Discord’s raw JSON and not a discord.js \`GuildMember\` / \`Message\`.

The Discord \`t\` column is the gateway opcode name (\`GUILD_MEMBER_ADD\`, …). Pass the **left** column to <Explain topic="intents-for">\`intentsFor\`</Explain>, not the \`t\` string. Types ship from \`@draeven/core\` and [\`@draeven/discord\`](/docs/discord-client).

If a handler throws, the [guard](/docs/guard) reports it when \`of\` includes \`"events"\`. A payload Draeven cannot read is dropped — the handler does not run.

<Note>Aligned with @draeven/core **0.1.9**. Field names on this page match that release.</Note>

<h2 id="from-djs">discord.js → Draeven names</h2>

| discord.js event | Draeven |
|------------------|---------|
| \`guildMemberAdd\` / \`guildMemberRemove\` | \`memberJoin\` / \`memberLeave\` |
| \`messageCreate\` / \`messageUpdate\` / \`messageDelete\` | \`message\` / \`messageEdit\` / \`messageDelete\` |
| \`messageReactionAdd\` | \`reactionAdd\` |
| \`voiceStateUpdate\` | \`voiceUpdate\` |
| \`presenceUpdate\` | \`presenceUpdate\` (same idea; flat payload) |

How to wire them and which intents you need: [Events & intents](/docs/events-intents#from-djs).

<h2 id="payloads">Payloads</h2>

| Event | Payload | Discord \`t\` |
|-------|---------|----------------|
| \`ready\` | \`GatewayReady\`: \`user\` (\`id\`, \`name\`, \`bot\`, optional \`icon\`), \`guildIds\` | \`READY\` |
| \`resumed\` | empty object | \`RESUMED\` |
| \`guildJoin\`, \`guildLeave\`, \`guildUpdate\` | \`GatewayGuild\`: \`id\`, optional \`name\`, optional \`unavailable\` | \`GUILD_CREATE\`, \`GUILD_DELETE\`, \`GUILD_UPDATE\` |
| \`channelCreate\`, \`channelUpdate\`, \`channelDelete\` | \`GatewayChannel\`: \`id\`, optional \`guildId\`, \`name\`, \`type\`, \`parentId\` | \`CHANNEL_CREATE\`, \`CHANNEL_UPDATE\`, \`CHANNEL_DELETE\` |
| \`threadCreate\`, \`threadUpdate\`, \`threadDelete\` | same \`GatewayChannel\` shape | \`THREAD_CREATE\`, \`THREAD_UPDATE\`, \`THREAD_DELETE\` |
| \`roleCreate\`, \`roleUpdate\` | \`GatewayRole\`: \`id\`, \`guildId\`, \`name\`, optional \`color\`, optional \`position\` | \`GUILD_ROLE_CREATE\`, \`GUILD_ROLE_UPDATE\` |
| \`roleDelete\` | \`GatewayRole\` with \`id\`, \`guildId\`, and \`name: ""\` | \`GUILD_ROLE_DELETE\` |
| \`memberJoin\`, \`memberUpdate\` | \`GatewayMember\`: \`id\`, \`name\`, \`bot\`, \`guildId\`, optional \`nick\`, \`joinedAt\`, \`icon\`, \`roleIds\` | \`GUILD_MEMBER_ADD\`, \`GUILD_MEMBER_UPDATE\` |
| \`memberLeave\` | \`GatewayMember\` with \`id\`, \`name\`, \`bot\`, \`guildId\`, optional \`icon\`. No nick, join time, or roles. | \`GUILD_MEMBER_REMOVE\` |
| \`memberBan\`, \`memberUnban\` | \`GatewayBan\`: \`guildId\`, \`user\` (\`id\`, \`name\`, \`bot\`, optional \`icon\`) | \`GUILD_BAN_ADD\`, \`GUILD_BAN_REMOVE\` |
| \`message\`, \`messageEdit\` | \`GatewayMessage\`: \`id\`, \`channelId\`, optional \`guildId\`, \`content\`, \`author\` (\`id\`, \`name\`, \`bot\`, optional \`icon\`) | \`MESSAGE_CREATE\`, \`MESSAGE_UPDATE\` |
| \`messageDelete\` | \`GatewayMessageDelete\`: \`id\`, \`channelId\`, optional \`guildId\` | \`MESSAGE_DELETE\` |
| \`messageBulkDelete\` | \`GatewayMessageBulkDelete\`: \`ids\`, \`channelId\`, optional \`guildId\` | \`MESSAGE_DELETE_BULK\` |
| \`reactionAdd\`, \`reactionRemove\` | \`GatewayReaction\`: \`messageId\`, \`channelId\`, optional \`guildId\`, \`userId\`, \`emoji\` (\`id?\`, \`name?\`) | \`MESSAGE_REACTION_ADD\`, \`MESSAGE_REACTION_REMOVE\` |
| \`reactionClear\` | \`GatewayReactionClear\`: \`messageId\`, \`channelId\`, optional \`guildId\` | \`MESSAGE_REACTION_REMOVE_ALL\` |
| \`reactionClearEmoji\` | that clear shape plus \`emoji\` | \`MESSAGE_REACTION_REMOVE_EMOJI\` |
| \`voiceUpdate\` | \`GatewayVoice\`: \`guildId\`, \`userId\`, optional \`channelId\`, \`sessionId\`, \`deaf\`, \`mute\`, \`selfDeaf\`, \`selfMute\` | \`VOICE_STATE_UPDATE\` |
| \`inviteCreate\`, \`inviteDelete\` | \`GatewayInvite\`: \`code\`, optional \`guildId\`, optional \`channelId\` | \`INVITE_CREATE\`, \`INVITE_DELETE\` |
| \`typing\` | \`GatewayTyping\`: \`channelId\`, \`userId\`, optional \`guildId\` | \`TYPING_START\` |
| \`presenceUpdate\` | \`GatewayPresence\`: \`userId\`, optional \`guildId\`, optional \`status\` | \`PRESENCE_UPDATE\` |
| \`scheduleCreate\`, \`scheduleUpdate\`, \`scheduleDelete\` | \`GatewaySchedule\`: \`id\`, \`guildId\`, optional \`name\`, optional \`status\` | \`GUILD_SCHEDULED_EVENT_CREATE\`, \`GUILD_SCHEDULED_EVENT_UPDATE\`, \`GUILD_SCHEDULED_EVENT_DELETE\` |
| \`pollVoteAdd\`, \`pollVoteRemove\` | \`GatewayPollVote\`: \`userId\`, \`channelId\`, \`messageId\`, optional \`guildId\`, \`answerId\` | \`MESSAGE_POLL_VOTE_ADD\`, \`MESSAGE_POLL_VOTE_REMOVE\` |

There is no nested \`user\` on a member. \`author.name\` is the profile name, not \`username\`. \`joinedAt\` is a \`Date\` when Discord sent \`joined_at\`.

<h2 id="example">Example</h2>

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("message", "reactionAdd", "voiceUpdate"),
  events: {
    message: (msg) => {
      console.log(msg.author.name, msg.channelId, msg.content);
    },
    reactionAdd: (reaction) => {
      console.log(reaction.emoji.name, reaction.userId);
    },
    voiceUpdate: (voice) => {
      console.log(voice.userId, voice.channelId ?? "left");
    },
  },
});
\`\`\`

\`gatewayEventNames\` is the full list, in the same order as the reader map. Registering and intents: [Events & intents](/docs/events-intents#names). \`intentsFor()\` with no names throws. An unknown name throws \`[Draeven Discord] Unknown event …\`.

<Note>
\`ready\` and \`resumed\` need no intent bits. \`memberJoin\`, \`message\` (content), and \`presenceUpdate\` need privileged intents toggled in the portal ([Creating an app](/docs/creating-app)). \`intentsFor\` includes those bits; the portal still has to allow them.
</Note>

<h2 id="pitfalls">Pitfalls</h2>

- \`roleDelete\` does not include the role name. Discord's delete payload only has the role id, so \`name\` is an empty string.
- \`memberLeave\` is thinner than \`memberJoin\`. Do not read \`nick\` or \`roleIds\` off a leave.
- \`message.content\` is empty when the Message Content intent is off. The handler still runs.
- \`voiceUpdate\` with no \`channelId\` is a user leaving voice. The other flags are only set when Discord sent them.

## Related

- [Events & intents](/docs/events-intents#from-djs) · [Bot handle](/docs/bot-handle) · [@draeven/discord](/docs/discord-client) · [Sending messages](/docs/sending-messages) · [Guard](/docs/guard)
`,
    },
    nl: {
      title: "Gateway event-payloads",
      description: "Elke GatewayEventName en het object dat je handler krijgt.",
      body: `
Registreer events met camelCase-namen op \`Start\` of \`bot.onEvent\` — zie [Events en intents](/docs/events-intents#inline). Deze pagina is de **vorm** van elk argument: een Draeven-object, niet de ruwe JSON van Discord en geen discord.js-\`GuildMember\` / \`Message\`.

De kolom Discord \`t\` is de gateway-naam (\`GUILD_MEMBER_ADD\`, …). Geef de **linker** kolom door aan <Explain topic="intents-for">\`intentsFor\`</Explain>, niet de \`t\`-string. Types komen uit \`@draeven/core\` en [\`@draeven/discord\`](/docs/discord-client).

Als een handler een fout geeft, meldt de [guard](/docs/guard) die als \`of\` \`"events"\` bevat. Een payload die Draeven niet kan lezen valt weg — de handler draait niet.

<Note>Afgestemd op @draeven/core **0.1.9**. Veldnamen op deze pagina horen bij die release.</Note>

<h2 id="from-djs">discord.js → Draeven-namen</h2>

| discord.js-event | Draeven |
|------------------|---------|
| \`guildMemberAdd\` / \`guildMemberRemove\` | \`memberJoin\` / \`memberLeave\` |
| \`messageCreate\` / \`messageUpdate\` / \`messageDelete\` | \`message\` / \`messageEdit\` / \`messageDelete\` |
| \`messageReactionAdd\` | \`reactionAdd\` |
| \`voiceStateUpdate\` | \`voiceUpdate\` |
| \`presenceUpdate\` | \`presenceUpdate\` (zelfde idee; vlakke payload) |

Hoe je ze aansluit en welke intents je nodig hebt: [Events en intents](/docs/events-intents#from-djs).

<h2 id="payloads">Payloads</h2>

| Event | Payload | Discord \`t\` |
|-------|---------|----------------|
| \`ready\` | \`GatewayReady\`: \`user\` (\`id\`, \`name\`, \`bot\`, optionele \`icon\`), \`guildIds\` | \`READY\` |
| \`resumed\` | leeg object | \`RESUMED\` |
| \`guildJoin\`, \`guildLeave\`, \`guildUpdate\` | \`GatewayGuild\`: \`id\`, optionele \`name\`, optionele \`unavailable\` | \`GUILD_CREATE\`, \`GUILD_DELETE\`, \`GUILD_UPDATE\` |
| \`channelCreate\`, \`channelUpdate\`, \`channelDelete\` | \`GatewayChannel\`: \`id\`, optionele \`guildId\`, \`name\`, \`type\`, \`parentId\` | \`CHANNEL_CREATE\`, \`CHANNEL_UPDATE\`, \`CHANNEL_DELETE\` |
| \`threadCreate\`, \`threadUpdate\`, \`threadDelete\` | dezelfde \`GatewayChannel\`-vorm | \`THREAD_CREATE\`, \`THREAD_UPDATE\`, \`THREAD_DELETE\` |
| \`roleCreate\`, \`roleUpdate\` | \`GatewayRole\`: \`id\`, \`guildId\`, \`name\`, optionele \`color\`, optionele \`position\` | \`GUILD_ROLE_CREATE\`, \`GUILD_ROLE_UPDATE\` |
| \`roleDelete\` | \`GatewayRole\` met \`id\`, \`guildId\` en \`name: ""\` | \`GUILD_ROLE_DELETE\` |
| \`memberJoin\`, \`memberUpdate\` | \`GatewayMember\`: \`id\`, \`name\`, \`bot\`, \`guildId\`, optionele \`nick\`, \`joinedAt\`, \`icon\`, \`roleIds\` | \`GUILD_MEMBER_ADD\`, \`GUILD_MEMBER_UPDATE\` |
| \`memberLeave\` | \`GatewayMember\` met \`id\`, \`name\`, \`bot\`, \`guildId\`, optionele \`icon\`. Geen nick, jointijd of rollen. | \`GUILD_MEMBER_REMOVE\` |
| \`memberBan\`, \`memberUnban\` | \`GatewayBan\`: \`guildId\`, \`user\` (\`id\`, \`name\`, \`bot\`, optionele \`icon\`) | \`GUILD_BAN_ADD\`, \`GUILD_BAN_REMOVE\` |
| \`message\`, \`messageEdit\` | \`GatewayMessage\`: \`id\`, \`channelId\`, optionele \`guildId\`, \`content\`, \`author\` (\`id\`, \`name\`, \`bot\`, optionele \`icon\`) | \`MESSAGE_CREATE\`, \`MESSAGE_UPDATE\` |
| \`messageDelete\` | \`GatewayMessageDelete\`: \`id\`, \`channelId\`, optionele \`guildId\` | \`MESSAGE_DELETE\` |
| \`messageBulkDelete\` | \`GatewayMessageBulkDelete\`: \`ids\`, \`channelId\`, optionele \`guildId\` | \`MESSAGE_DELETE_BULK\` |
| \`reactionAdd\`, \`reactionRemove\` | \`GatewayReaction\`: \`messageId\`, \`channelId\`, optionele \`guildId\`, \`userId\`, \`emoji\` (\`id?\`, \`name?\`) | \`MESSAGE_REACTION_ADD\`, \`MESSAGE_REACTION_REMOVE\` |
| \`reactionClear\` | \`GatewayReactionClear\`: \`messageId\`, \`channelId\`, optionele \`guildId\` | \`MESSAGE_REACTION_REMOVE_ALL\` |
| \`reactionClearEmoji\` | die clear-vorm plus \`emoji\` | \`MESSAGE_REACTION_REMOVE_EMOJI\` |
| \`voiceUpdate\` | \`GatewayVoice\`: \`guildId\`, \`userId\`, optionele \`channelId\`, \`sessionId\`, \`deaf\`, \`mute\`, \`selfDeaf\`, \`selfMute\` | \`VOICE_STATE_UPDATE\` |
| \`inviteCreate\`, \`inviteDelete\` | \`GatewayInvite\`: \`code\`, optionele \`guildId\`, optionele \`channelId\` | \`INVITE_CREATE\`, \`INVITE_DELETE\` |
| \`typing\` | \`GatewayTyping\`: \`channelId\`, \`userId\`, optionele \`guildId\` | \`TYPING_START\` |
| \`presenceUpdate\` | \`GatewayPresence\`: \`userId\`, optionele \`guildId\`, optionele \`status\` | \`PRESENCE_UPDATE\` |
| \`scheduleCreate\`, \`scheduleUpdate\`, \`scheduleDelete\` | \`GatewaySchedule\`: \`id\`, \`guildId\`, optionele \`name\`, optionele \`status\` | \`GUILD_SCHEDULED_EVENT_CREATE\`, \`GUILD_SCHEDULED_EVENT_UPDATE\`, \`GUILD_SCHEDULED_EVENT_DELETE\` |
| \`pollVoteAdd\`, \`pollVoteRemove\` | \`GatewayPollVote\`: \`userId\`, \`channelId\`, \`messageId\`, optionele \`guildId\`, \`answerId\` | \`MESSAGE_POLL_VOTE_ADD\`, \`MESSAGE_POLL_VOTE_REMOVE\` |

Er zit geen geneste \`user\` op een lid. \`author.name\` is de profielnaam, niet \`username\`. \`joinedAt\` is een \`Date\` als Discord \`joined_at\` stuurde.

<h2 id="example">Voorbeeld</h2>

\`\`\`js
import { Start, intentsFor } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  intents: intentsFor("message", "reactionAdd", "voiceUpdate"),
  events: {
    message: (msg) => {
      console.log(msg.author.name, msg.channelId, msg.content);
    },
    reactionAdd: (reaction) => {
      console.log(reaction.emoji.name, reaction.userId);
    },
    voiceUpdate: (voice) => {
      console.log(voice.userId, voice.channelId ?? "weg");
    },
  },
});
\`\`\`

\`gatewayEventNames\` is de volledige lijst, in dezelfde volgorde als de reader-map. Registreren en intents: [Events en intents](/docs/events-intents#names). \`intentsFor()\` zonder namen geeft een foutmelding. Een onbekende naam geeft de fout \`[Draeven Discord] Unknown event …\`.

<Note>
\`ready\` en \`resumed\` hebben geen intent-bits nodig. \`memberJoin\`, \`message\` (inhoud) en \`presenceUpdate\` vragen geprivilegieerde intents in het portal ([App aanmaken](/docs/creating-app)). \`intentsFor\` zet die bits; het portal moet ze nog toestaan.
</Note>

<h2 id="pitfalls">Valkuilen</h2>

- \`roleDelete\` bevat de rolnaam niet. De delete-payload van Discord heeft alleen de rol-id, dus \`name\` is een lege string.
- \`memberLeave\` is dunner dan \`memberJoin\`. Lees \`nick\` of \`roleIds\` niet van een leave.
- \`message.content\` is leeg als de Message Content-intent uit staat. De handler draait nog wel.
- \`voiceUpdate\` zonder \`channelId\` is een gebruiker die voice verlaat. De andere vlaggen staan er alleen als Discord ze stuurde.

## Verder

- [Events en intents](/docs/events-intents#from-djs) · [Bot-handle](/docs/bot-handle) · [@draeven/discord](/docs/discord-client) · [Berichten sturen](/docs/sending-messages) · [Guard](/docs/guard)
`,
    },
  },
  {
    slug: "discord-client",
    order: 65,
    en: {
      title: "@draeven/discord",
      description: "The low-level client under Start, and when you would import it.",
      body: `
\`@draeven/discord\` is the gateway and REST client that \`@draeven/core\` already depends on. An application bot installs \`@draeven/core\` and calls \`Start()\`. You open this package when you are reading payload types, checking \`version\`, or building a host that does not use \`Start\`. The bot handle you normally keep is the return value of \`Start\` ([Bot handle](/docs/bot-handle)). How that sits under \`Start\` is [How it fits](/docs/architecture).

Package versions are independent: this package publishes \`"0.1.5"\` while these guides pin core **0.1.9** ([Changelog](/docs/changelog)). Core re-exports \`intents\`, \`intentBits\`, \`intentsFor\`, \`eventIntents\`, and the \`Gateway*\` types. Prefer those imports in app code so a command file does not take a dependency on the client package.

## Exports

| Export | Role |
|--------|------|
| \`version\` | Package version string. This tree publishes \`"0.1.5"\`. Core's own \`version\` is separate (\`0.1.9\` in these guides). |
| \`intents\`, \`intentBits\`, \`intentsFor\`, \`eventIntents\` | Intent names and the bitmask for [gateway events](/docs/gateway-events#payloads). |
| \`gatewayEventNames\`, \`gatewayEventReaders\` | Every \`GatewayEventName\`, plus the Discord \`t\` string and reader for each. |
| \`GatewayReady\`, \`GatewayGuild\`, \`GatewayChannel\`, \`GatewayRole\`, \`GatewayMember\`, \`GatewayBan\`, \`GatewayMessage\`, \`GatewayMessageDelete\`, \`GatewayMessageBulkDelete\`, \`GatewayReaction\`, \`GatewayReactionClear\`, \`GatewayReactionClearEmoji\`, \`GatewayVoice\`, \`GatewayInvite\`, \`GatewayTyping\`, \`GatewayPresence\`, \`GatewaySchedule\`, \`GatewayPollVote\`, \`GatewayEvents\`, \`GatewayEventName\` | Payload types. |
| \`DiscordClient\` | The session: \`start\`, \`stop\`, \`setPresence\`, \`registerCommands\`, \`onCommand\`, \`onMenu\`, \`onSuggest\`, \`onUse\`, \`onEvent\`, \`onDispatch\`, replies, and the moderation helpers \`Start\` uses. |
| \`DiscordRestClient\` | Token REST helper. See below. |
| \`DiscordClientOptions\` | \`token\`, optional \`presence\`, \`intents\`, and test-only gateway overrides. |
| Interaction readers | \`IncomingCommand\`, \`IncomingMenu\`, \`IncomingSuggest\`, \`IncomingUse\`, and the option shapes. |
| \`EPHEMERAL\`, \`normalizeEmoji\`, \`createdAtFromId\` | Flag bit, emoji path encoding, snowflake time. |

The generated reference for this package is [/reference/discord](/reference/discord). Power-user entry points that sit on core, such as \`startBot\` and \`answerCommand\`, are on [Advanced API](/docs/advanced-api).

## DiscordRestClient

\`DiscordClient\` constructs one \`DiscordRestClient\` from the bot token and calls it for you. The surface, at a high level:

- Gateway discovery (\`getGatewayBot\`) and reads: guild, roles, user, channel, message pages.
- Interactions: defer, defer-update, reply, edit, follow-up, autocomplete choices, webhook message edit and delete.
- Application commands: replace the guild or global command set.
- Channel writes: create, edit, delete, purge, pin, unpin, react.
- Members: timeout, kick, ban, move voice.

App code should go through \`ctx\`, \`bot.send\`, and the mod helpers on the command context. Constructing a second REST client next to \`Start\` duplicates the token and skips Draeven's reply rules.

<Warn fix="One library per token — do not mix discord.js in this process." href="/docs/why-failing">
Do not mix this client with discord.js in the same process. There is no \`Client\`, no \`EmbedBuilder\`, and no shared gateway session. Two libraries on one token will fight over identify and heartbeats.
</Warn>

## Pitfalls

- Slash commands need no gateway intents. Importing \`DiscordClient\` does not change that. \`intentsFor("ready")\` is \`0\`.
- \`onDispatch\` receives the raw gateway payload. Typed handlers receive the objects on [Gateway event payloads](/docs/gateway-events#payloads). Prefer \`onEvent\` or \`Start({ events })\`.
- \`version\` here is the discord package. \`import { version } from "@draeven/core"\` is the version these guides pin.
`,
    },
    nl: {
      title: "@draeven/discord",
      description: "De low-level client onder Start, en wanneer je hem importeert.",
      body: `
\`@draeven/discord\` is de gateway- en REST-client waar \`@draeven/core\` al van afhangt. Een applicatiebot installeert \`@draeven/core\` en roept \`Start()\` aan. Je opent dit pakket als je payload-types leest, \`version\` controleert, of een host bouwt die geen \`Start\` gebruikt. De bot-handle die je normaal bewaart is de return van \`Start\` ([Bot-handle](/docs/bot-handle)). Hoe dat onder \`Start\` zit, staat bij [Hoe het in elkaar zit](/docs/architecture).

Pakketversies staan los van elkaar: dit pakket publiceert \`"0.1.5"\`, terwijl deze gidsen core **0.1.9** pinnen ([Changelog](/docs/changelog)). Core exporteert ook \`intents\`, \`intentBits\`, \`intentsFor\`, \`eventIntents\` en de \`Gateway*\`-types. Importeer die in app-code, zodat een commandobestand niet aan het clientpakket hangt.

## Exports

| Export | Rol |
|--------|-----|
| \`version\` | Versiestring van het pakket. Deze boom publiceert \`"0.1.5"\`. Core's eigen \`version\` staat los (\`0.1.9\` in deze gidsen). |
| \`intents\`, \`intentBits\`, \`intentsFor\`, \`eventIntents\` | Intent-namen en het bitmask voor [gateway-events](/docs/gateway-events#payloads). |
| \`gatewayEventNames\`, \`gatewayEventReaders\` | Elke \`GatewayEventName\`, plus de Discord-\`t\`-string en reader. |
| \`GatewayReady\`, \`GatewayGuild\`, \`GatewayChannel\`, \`GatewayRole\`, \`GatewayMember\`, \`GatewayBan\`, \`GatewayMessage\`, \`GatewayMessageDelete\`, \`GatewayMessageBulkDelete\`, \`GatewayReaction\`, \`GatewayReactionClear\`, \`GatewayReactionClearEmoji\`, \`GatewayVoice\`, \`GatewayInvite\`, \`GatewayTyping\`, \`GatewayPresence\`, \`GatewaySchedule\`, \`GatewayPollVote\`, \`GatewayEvents\`, \`GatewayEventName\` | Payload-types. |
| \`DiscordClient\` | De sessie: \`start\`, \`stop\`, \`setPresence\`, \`registerCommands\`, \`onCommand\`, \`onMenu\`, \`onSuggest\`, \`onUse\`, \`onEvent\`, \`onDispatch\`, replies, en de moderatiehelpers die \`Start\` gebruikt. |
| \`DiscordRestClient\` | REST-hulp met het token. Zie hieronder. |
| \`DiscordClientOptions\` | \`token\`, optionele \`presence\`, \`intents\`, en gateway-overrides die alleen voor tests zijn. |
| Interactie-readers | \`IncomingCommand\`, \`IncomingMenu\`, \`IncomingSuggest\`, \`IncomingUse\`, en de optievormen. |
| \`EPHEMERAL\`, \`normalizeEmoji\`, \`createdAtFromId\` | Vlagbit, emoji-pad, snowflake-tijd. |

De gegenereerde referentie van dit pakket is [/reference/discord](/reference/discord). Power-user-ingangen die op core zitten, zoals \`startBot\` en \`answerCommand\`, staan bij [Geavanceerde API](/docs/advanced-api).

## DiscordRestClient

\`DiscordClient\` maakt één \`DiscordRestClient\` van het bot-token en roept hem voor je aan. Het oppervlak, op hoofdlijnen:

- Gateway-ontdekking (\`getGatewayBot\`) en reads: guild, rollen, user, kanaal, berichtpagina's.
- Interacties: defer, defer-update, reply, edit, follow-up, autocomplete-keuzes, webhook-bericht bewerken en wissen.
- Applicatiecommando's: vervang de guild- of globale commandoset.
- Kanaalberichten: aanmaken, bewerken, wissen, purge, pin, unpin, reageren.
- Leden: timeout, kick, ban, voice verplaatsen.

App-code hoort via \`ctx\`, \`bot.send\` en de mod-helpers op de commandocontext te gaan. Een tweede REST-client naast \`Start\` verdubbelt het token en slaat Draeven's reply-regels over.

<Warn fix="Eén library per token — meng discord.js niet in dit proces." href="/docs/why-failing">
Meng deze client niet met discord.js in hetzelfde proces. Er is geen \`Client\`, geen \`EmbedBuilder\`, en geen gedeelde gateway-sessie. Twee libraries op één token vechten om identify en heartbeats.
</Warn>

## Valkuilen

- Slash-commando's hebben geen gateway-intents nodig. \`DiscordClient\` importeren verandert dat niet. \`intentsFor("ready")\` is \`0\`.
- \`onDispatch\` krijgt de ruwe gateway-payload. Getypeerde handlers krijgen de objecten op [Gateway event-payloads](/docs/gateway-events#payloads). Gebruik \`onEvent\` of \`Start({ events })\`.
- \`version\` hier is het discord-pakket. \`import { version } from "@draeven/core"\` is de versie die deze gidsen pinnen.
`,
    },
  },
  {
    slug: "guard",
    order: 71,
    en: {
      title: "Error guard",
      description: "guard({ via, of, channel, file, uptime }) and formatUptime.",
      body: `
\`guard()\` keeps one throw from killing the process and writes the error where you ask. Pass the result to \`Start({ guard })\`. Hot reload is a separate switch; the short form next to \`watch\` is on [Hot-reload & guard](/docs/hot-reload-guard). This page is the full option list.

\`Start\` calls \`attach\` once it can send. Command throws, event-handler throws, \`uncaughtException\`, and \`unhandledRejection\` then go through \`report\` when \`of\` includes that source. Without a guard, Draeven still prints \`[Draeven] commands error.\` or \`[Draeven] events error.\` to the console.

## Options

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guard: guard({
    via: "all",
    of: "all",
    channel: process.env.LOG_CHANNEL_ID,
    file: "logs/draeven.log",
    uptime: true,
  }),
});
\`\`\`

| Option | Values |
|--------|--------|
| \`via\` | \`"console"\`, \`"channel"\`, \`"file"\`, an array of those, or \`"all"\` (all three). |
| \`of\` | \`"commands"\`, \`"events"\`, \`"process"\`, an array of those, or \`"all"\` (all three). |
| \`channel\` | Snowflake the bot can post in. Required when \`via\` includes \`"channel"\`, including \`"all"\`. |
| \`file\` | Path appended as UTF-8. Required when \`via\` includes \`"file"\`, including \`"all"\`. Parent folders are created. |
| \`uptime\` | \`true\` adds time since \`Start\` on the ready line and on each report. |

\`of: "commands"\` is a throw from a slash or menu handler. \`of: "events"\` is a throw from a gateway handler. \`of: "process"\` subscribes to \`uncaughtException\` and \`unhandledRejection\`, and \`dispose\` (from \`bot.stop\`) removes those listeners.

An unknown \`via\` or \`of\` throws at \`guard()\` time. An empty list throws \`guard() needs at least one via\` or \`at least one of\`.

Console output uses \`console.error\`. A file line is the same text plus a blank line. A channel post is clipped at 1900 characters. If the connection cannot send yet, the channel path prints the text to the console and logs \`Guard channel log waiting for bot.send.\`

## formatUptime

\`formatUptime(ms)\` is the same clock the guard appends. Negative values become \`0s\`. Hours omit the seconds. Minutes include the seconds. Under a minute is seconds only.

\`\`\`js
import { formatUptime } from "@draeven/core";

formatUptime(5_000); // 5s
formatUptime(90_000); // 1m 30s
formatUptime(3_700_000); // 1h 1m
\`\`\`

The ready line looks like \`[Draeven] Guard ready. uptime 0s\` when \`uptime\` is on. An error report is \`[Draeven] commands error.\`, then the stack, then \`uptime 1m 30s\` on its own line.

<Warn fix="Provide both channel and file when via is all." href="/docs/why-failing">
\`via: "all"\` still needs both \`channel\` and \`file\`. \`"all"\` means every destination, not "whichever you filled in".
</Warn>

## Pitfalls

- The guard logs text. It does not retry the command or restart the process ([Errors & debugging](/docs/debugging)).
- Uptime is \`Date.now()\` minus the time \`Start\` attached the guard, not Discord's session age ([Start options](/docs/start-options)).
- A channel log is a normal message in that channel. Do not point it at a channel members can read if stacks mention ids you meant to keep private.
`,
    },
    nl: {
      title: "Error-guard",
      description: "guard({ via, of, channel, file, uptime }) en formatUptime.",
      body: `
\`guard()\` zorgt dat één throw het proces niet doodt, en schrijft de fout waar je vraagt. Geef het resultaat aan \`Start({ guard })\`. Hot reload is een aparte schakelaar; de korte vorm naast \`watch\` staat bij [Hot-reload en guard](/docs/hot-reload-guard). Deze pagina is de volledige optielijst.

\`Start\` roept \`attach\` aan zodra het kan sturen. Throws uit commando's, throws uit event-handlers, \`uncaughtException\` en \`unhandledRejection\` gaan dan door \`report\` als \`of\` die bron bevat. Zonder guard print Draeven nog steeds \`[Draeven] commands error.\` of \`[Draeven] events error.\` naar de console.

## Opties

\`\`\`js
import { Start, guard } from "@draeven/core";

await Start({
  token: process.env.DISCORD_TOKEN,
  guard: guard({
    via: "all",
    of: "all",
    channel: process.env.LOG_CHANNEL_ID,
    file: "logs/draeven.log",
    uptime: true,
  }),
});
\`\`\`

| Optie | Waarden |
|-------|---------|
| \`via\` | \`"console"\`, \`"channel"\`, \`"file"\`, een array daarvan, of \`"all"\` (alle drie). |
| \`of\` | \`"commands"\`, \`"events"\`, \`"process"\`, een array daarvan, of \`"all"\` (alle drie). |
| \`channel\` | Snowflake waarin de bot mag plaatsen. Verplicht als \`via\` \`"channel"\` bevat, ook bij \`"all"\`. |
| \`file\` | Pad dat als UTF-8 wordt aangevuld. Verplicht als \`via\` \`"file"\` bevat, ook bij \`"all"\`. Bovenliggende mappen worden gemaakt. |
| \`uptime\` | \`true\` zet de tijd sinds \`Start\` op de ready-regel en op elk rapport. |

\`of: "commands"\` is een fout uit een slash- of menu-handler. \`of: "events"\` is een fout uit een gateway-handler. \`of: "process"\` hangt listeners aan \`uncaughtException\` en \`unhandledRejection\`, en \`dispose\` (van \`bot.stop\`) haalt die weer weg.

Een onbekende \`via\` of \`of\` faalt al bij \`guard()\`. Een lege lijst geeft de fout \`guard() needs at least one via\` of \`at least one of\`.

Console-output gebruikt \`console.error\`. Een bestandsregel is dezelfde tekst plus een lege regel. Een kanaalbericht wordt afgekapt op 1900 tekens. Als de verbinding nog niet kan sturen, print het kanaalpad de tekst naar de console en logt het \`Guard channel log waiting for bot.send.\`

## formatUptime

\`formatUptime(ms)\` is dezelfde klok die de guard eraan hangt. Negatieve waarden worden \`0s\`. Uren laten de seconden weg. Minuten bevatten de seconden. Onder een minuut zijn het alleen seconden.

\`\`\`js
import { formatUptime } from "@draeven/core";

formatUptime(5_000); // 5s
formatUptime(90_000); // 1m 30s
formatUptime(3_700_000); // 1h 1m
\`\`\`

De ready-regel ziet eruit als \`[Draeven] Guard ready. uptime 0s\` als \`uptime\` aan staat. Een foutrapport is \`[Draeven] commands error.\`, dan de stack, dan \`uptime 1m 30s\` op een eigen regel.

<Warn fix="Geef zowel channel als file als via all is." href="/docs/why-failing">
\`via: "all"\` heeft nog steeds zowel \`channel\` als \`file\` nodig. \`"all"\` betekent elke bestemming, niet "wat je invulde".
</Warn>

## Valkuilen

- De guard logt tekst. Hij probeert het commando niet opnieuw en herstart het proces niet ([Fouten & debuggen](/docs/debugging)).
- Uptime is \`Date.now()\` min de tijd waarop \`Start\` de guard koppelde, niet de sessieleeftijd van Discord ([Start-opties](/docs/start-options)).
- Een kanaallog is een gewoon bericht in dat kanaal. Wijs het niet naar een kanaal dat leden kunnen lezen als stacks ids bevatten die privé hadden moeten blijven.
`,
    },
  },
  {
    slug: "advanced-api",
    order: 77,
    en: {
      title: "Advanced API",
      description: "CooldownBook, CollectorBook, startBot, and the other host-level exports.",
      body: `
These exports are for a custom host or a test that does not want \`Start\` to own the process. A normal bot should call \`Start\`, and a handler test should call \`simulate\` ([Simulate & tests](/docs/simulate)). \`@draeven/discord\` stays the low-level client underneath ([@draeven/discord](/docs/discord-client)).

<Note>Aligned with @draeven/core **0.1.9**. Field names on this page match that release.</Note>

## What you can call

| Export | When you would use it |
|--------|------------------------|
| \`readCooldown(value)\` | Turn a metadata \`cooldown\` into \`{ seconds, scope, private }\`. A number means scope \`user\` and \`private: true\`. \`undefined\` stays \`undefined\`. |
| \`cooldownKey(name, scope, ids)\` | Build \`name:user:id\`, \`name:guild:id\`, or \`name:channel:id\`. Returns \`undefined\` when the guild or channel id that scope needs is missing. |
| \`CooldownBook\` | \`take(key, seconds)\` returns remaining seconds (at least 1) or \`0\` after storing a new window. Memory only. |
| \`CollectorBook\` | \`wait\` is what \`ctx.collect\` uses. \`take\` wins over \`press\` only when id, kind, and who match. \`Start\` owns the book. |
| \`checkGates(meta, world)\` | Returns \`"owner"\`, \`"need"\`, \`"when"\`, or \`undefined\`. Order is owner, then need, then when. |
| \`hasPermissions(have, need)\` | True when every needed bit is set. The Administrator bit passes on its own. |
| \`permissionBitfield(value)\` | Names, a list, a digit string, or \`bigint\` become one \`bigint\`. Unknown names throw. |
| \`frame(key, locale, vars)\` | Framework strings \`cooldown\`, \`need\`, \`when\`, \`owner\`, \`failed\`. Only \`cooldown\` uses \`{name}\` / \`{seconds}\`. |
| \`loadCommands(folder, { bust? })\` | Import \`.js\` command and menu exports. Skips tests, names ending in \`old.js\` (so \`fold.js\` too), dotfiles, and reload copies. Duplicate message-menu names throw. |
| \`loadEvents(folder, { bust? })\` | Import \`.js\` whose export name is a gateway event. A second export of the same name throws. |
| \`answerCommand(commands, incoming, bot, ...)\` | Builds the command \`ctx\` and runs the handler. Cooldown and gates are not here. The \`Start\` dispatcher does those before it calls \`answerCommand\`. Returns the \`Reply\`, or \`undefined\` if the name is not loaded. |
| \`startBot(client, options)\` | Register commands on a \`BotConnection\` and answer them. \`Start\` builds the Discord client, then calls this. |
| \`isCommand\`, \`isMenu\` | Narrow a \`loadCommands\` value. |
| \`isLayout\`, \`isPoll\` | Narrow a reply part in a custom renderer. |

\`answerCommand\`'s later arguments are the hooks the live dispatcher fills in: guild, transcript, channel send, the interaction ack (\`wait\`, \`edit\`, \`remove\`, \`collect\`, \`flush\`), and mod actions. A test that only cares about reply text should use \`simulate\`. Building that bag yourself means you are the host.

\`startBot\` options are \`commands\`, and optionally \`commandsFolder\`, \`eventsFolder\`, \`guildId\`, \`timeZone\`, \`events\`, \`watch\`, \`guard\`, and \`autoDefer\`. \`watch\` only reloads when the folder options are set. The \`client\` must implement \`BotConnection\` (\`start\`, \`stop\`, \`readyUser\`, \`registerCommands\`, \`onCommand\`, \`onUse\`, reads, and replies).

## Cooldown book

\`\`\`js
import { CooldownBook, cooldownKey, readCooldown } from "@draeven/core";

const cooling = readCooldown({ seconds: 10, scope: "user", private: true });
const book = new CooldownBook();
const key = cooldownKey("ping", cooling.scope, { userId: "1" });
const left = book.take(key, cooling.seconds);
\`\`\`

\`left\` is \`0\` the first time and a positive number until the window ends. The live bot already does this before \`run\` ([Cooldowns](/docs/cooldowns)).

## Gates and strings

\`\`\`js
import { checkGates, frame, permissionBitfield } from "@draeven/core";

const blocked = await checkGates(
  { ownerOnly: true, need: "KickMembers" },
  { author: { id: "1" }, ownerId: "2", memberPermissions: "0" }
);

frame("cooldown", "nl", { name: "ping", seconds: 5 });
permissionBitfield(["KickMembers", "BanMembers"]);
\`\`\`

\`blocked\` is \`"owner"\` here, because owner is checked first. \`frame\` returns the Dutch cooldown sentence with the name and seconds filled in.

<Note>
\`loadCommands("./dist/commands")\` is what \`Start\` calls for a folder. Call it yourself when a test wants the compiled modules without a token, and pass \`{ bust: true }\` when the same path must be imported again after a write.
</Note>

## Pitfalls

- \`CooldownBook\` and \`CollectorBook\` are per process. A second \`startBot\` does not share the first book's windows or waiters.
- \`checkGates\` does not reply. The host has to send \`frame(blocked, locale)\` itself. \`Start\` already does that.
- \`isCommand\` is false for context menus. Filter with \`isMenu\` as well when you walk \`loadCommands\` output.
- Do not call \`answerCommand\` and \`Start\` for the same interaction. One path should own the token.
`,
    },
    nl: {
      title: "Geavanceerde API",
      description: "CooldownBook, CollectorBook, startBot en de andere host-exports.",
      body: `
Deze exports zijn voor een eigen host of een test die niet wil dat \`Start\` het proces bezit. Een normale bot roept \`Start\` aan, en een handler-test roept \`simulate\` aan ([Simuleren en tests](/docs/simulate)). \`@draeven/discord\` blijft de low-level client eronder ([@draeven/discord](/docs/discord-client)).

<Note>Afgestemd op @draeven/core **0.1.9**. Veldnamen op deze pagina horen bij die release.</Note>

## Wat je kunt aanroepen

| Export | Wanneer je hem gebruikt |
|--------|-------------------------|
| \`readCooldown(value)\` | Maakt van een metadata-\`cooldown\` \`{ seconds, scope, private }\`. Een getal betekent scope \`user\` en \`private: true\`. \`undefined\` blijft \`undefined\`. |
| \`cooldownKey(name, scope, ids)\` | Bouwt \`name:user:id\`, \`name:guild:id\` of \`name:channel:id\`. Geeft \`undefined\` terug als de guild- of kanaal-id die de scope nodig heeft ontbreekt. |
| \`CooldownBook\` | \`take(key, seconds)\` geeft resterende seconden (minstens 1) of \`0\` nadat een nieuw venster is opgeslagen. Alleen geheugen. |
| \`CollectorBook\` | \`wait\` is wat \`ctx.collect\` gebruikt. \`take\` wint van \`press\` alleen als id, soort en wie kloppen. \`Start\` bezit het boek. |
| \`checkGates(meta, world)\` | Geeft \`"owner"\`, \`"need"\`, \`"when"\` of \`undefined\` terug. Volgorde is owner, dan need, dan when. |
| \`hasPermissions(have, need)\` | Waar als elke gevraagde bit gezet is. De Administrator-bit slaagt op zichzelf. |
| \`permissionBitfield(value)\` | Namen, een lijst, een cijferstring of \`bigint\` worden één \`bigint\`. Onbekende namen geven een foutmelding. |
| \`frame(key, locale, vars)\` | Frameworkteksten \`cooldown\`, \`need\`, \`when\`, \`owner\`, \`failed\`. Alleen \`cooldown\` gebruikt \`{name}\` / \`{seconds}\`. |
| \`loadCommands(folder, { bust? })\` | Importeert \`.js\`-exports van commando's en menu's. Slaat tests, namen die eindigen op \`old.js\` (dus ook \`fold.js\`), dotfiles en reload-kopieën over. Dubbele berichtmenu-namen geven een foutmelding. |
| \`loadEvents(folder, { bust? })\` | Importeert \`.js\` waarvan de exportnaam een gateway-event is. Een tweede export met dezelfde naam geeft een foutmelding. |
| \`answerCommand(commands, incoming, bot, ...)\` | Bouwt de commando-\`ctx\` en draait de handler. Wachttijd en gates zitten hier niet. De \`Start\`-dispatcher doet die vóór hij \`answerCommand\` aanroept. Geeft de \`Reply\` terug, of \`undefined\` als de naam niet geladen is. |
| \`startBot(client, options)\` | Registreert commando's op een \`BotConnection\` en beantwoordt ze. \`Start\` bouwt de Discord-client en roept dit aan. |
| \`isCommand\`, \`isMenu\` | Herkent een commando of menu in de output van \`loadCommands\`. |
| \`isLayout\`, \`isPoll\` | Herkent een layout of peiling in een eigen renderer. |

De latere argumenten van \`answerCommand\` zijn de hooks die de live dispatcher invult: guild, transcript, kanaal-send, de interactie-ack (\`wait\`, \`edit\`, \`remove\`, \`collect\`, \`flush\`) en mod-acties. Een test die alleen om reply-tekst geeft, gebruikt \`simulate\`. Die zak zelf bouwen betekent dat jij de host bent.

Opties van \`startBot\` zijn \`commands\`, en optioneel \`commandsFolder\`, \`eventsFolder\`, \`guildId\`, \`timeZone\`, \`events\`, \`watch\`, \`guard\` en \`autoDefer\`. \`watch\` herlaadt alleen als de map-opties gezet zijn. De \`client\` moet \`BotConnection\` implementeren (\`start\`, \`stop\`, \`readyUser\`, \`registerCommands\`, \`onCommand\`, \`onUse\`, reads en replies).

## Cooldown-boek

\`\`\`js
import { CooldownBook, cooldownKey, readCooldown } from "@draeven/core";

const cooling = readCooldown({ seconds: 10, scope: "user", private: true });
const book = new CooldownBook();
const key = cooldownKey("ping", cooling.scope, { userId: "1" });
const left = book.take(key, cooling.seconds);
\`\`\`

\`left\` is \`0\` de eerste keer en een positief getal tot het venster afloopt. De live bot doet dit al vóór \`run\` ([Wachttijden](/docs/cooldowns)).

## Gates en teksten

\`\`\`js
import { checkGates, frame, permissionBitfield } from "@draeven/core";

const blocked = await checkGates(
  { ownerOnly: true, need: "KickMembers" },
  { author: { id: "1" }, ownerId: "2", memberPermissions: "0" }
);

frame("cooldown", "nl", { name: "ping", seconds: 5 });
permissionBitfield(["KickMembers", "BanMembers"]);
\`\`\`

\`blocked\` is hier \`"owner"\`, omdat owner eerst wordt gecontroleerd. \`frame\` geeft de Nederlandse cooldown-zin terug met naam en seconden ingevuld.

<Note>
\`loadCommands("./dist/commands")\` is wat \`Start\` aanroept voor een map. Roep het zelf aan als een test de gecompileerde modules wil zonder token, en geef \`{ bust: true }\` mee als hetzelfde pad na een schrijfactie opnieuw geïmporteerd moet worden.
</Note>

## Valkuilen

- \`CooldownBook\` en \`CollectorBook\` zijn per proces. Een tweede \`startBot\` deelt de vensters of verzamelaars van het eerste boek niet.
- \`checkGates\` antwoordt niet. De host moet zelf \`frame(blocked, locale)\` sturen. \`Start\` doet dat al.
- \`isCommand\` is onwaar voor contextmenu's. Filter ook met \`isMenu\` als je de output van \`loadCommands\` doorloopt.
- Roep \`answerCommand\` en \`Start\` niet aan voor dezelfde interactie. Eén pad hoort het token te bezitten.
`,
    },
  },
];
