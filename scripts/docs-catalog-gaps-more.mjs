/** Architecture, discord.js cheat sheet, and troubleshooting. */
export const more = [
  {
    slug: "architecture",
    order: 11,
    en: {
      title: "How it fits",
      description: "The path from Start() to a reply, a press, or a gateway event.",
      body: `
One \`Start()\` owns the process. Slash commands take the left branch. Gateway events take the right branch. A command handler sees \`ctx\`. An event handler sees the payload for that event.

<FlowDiagram id="architecture" />

| Stage | What it hands off |
|-------|-------------------|
| \`Start()\` | Loaded commands, the gateway, and the running handle |
| \`loadCommands\` / \`loadEvents\` | Compiled \`.js\` turned into commands and event handlers |
| Discord registers slash | The application command list for that guild, or global |
| Interaction arrives | One \`ctx\` for this slash command or menu |
| Gates / cooldown | A pass into the handler, or a framework reply that stops there |
| Handler | Your \`run\` function |
| \`reply\` / \`edit\` / \`wait\` / \`collect\` | The acknowledgement, and a waiter on this same command |
| \`press\` / \`submit\` | A later click or modal, when nothing is collecting that id |
| Gateway events | \`intentsFor\` bits, then \`onEvent\` or the events folder |

## Start()

\`Start()\` opens the gateway, reads commands, and starts answering interactions. \`token\` is required. \`guildId\`, \`watch\`, \`autoDefer\`, \`alone\`, and \`intents\` are the options that change this path ([Start options](/docs/start-options)).

## loadCommands / loadEvents

\`loadCommands()\` imports compiled \`.js\` from the commands folder (or uses the array you passed). \`loadEvents()\` imports a folder whose export names are event names, and every \`use()\` in those files. \`watch: true\` with an in-memory array throws. There is no folder ([Commands](/docs/commands), [Events & intents](/docs/events-intents)).

## Discord registers slash

Draeven sends that command list to Discord. With a \`guildId\`, the guild shows new commands within seconds. With no guild id, Discord registers them globally, and that sync can take up to an hour ([Start options](/docs/start-options)).

## Interaction arrives

A person runs the slash command or a context menu. Discord delivers one interaction, and the handler receives one \`ctx\` with options, lookups, and reply methods ([Commands](/docs/commands)).

## Cooldown and gates

The cooldown book runs first. \`take()\` stores the window before the gates, so a failed gate still consumed the cooldown. If the key is still cooling, the user gets \`frame("cooldown", …)\` and \`run\` is skipped. Otherwise the gates run in order: \`ownerOnly\`, then \`need\`, then \`when\`. A failed gate answers with \`frame("need" | "owner" | "when", …)\` and skips \`run\` ([Permissions & gates](/docs/permissions), [Cooldowns](/docs/cooldowns)).

## Handler

The function on \`command()\`, \`userMenu()\`, or \`messageMenu()\` runs here. It reads \`ctx\` and answers on that same interaction ([Commands](/docs/commands)).

## reply, edit, wait, collect

A second \`reply()\` throws only when a reply is already stored and you have neither waited nor flushed a collect. \`wait\` defers. After that, \`edit()\` or another \`reply()\` fills the message. \`collect\` stays inside this command until a button, menu, or form arrives, or the wait times out ([Replies](/docs/replies), [Collectors](/docs/collectors)).

## press / submit

A matching \`collect\` runs first. Otherwise Draeven uses the inline \`press\` or \`submit\` remembered on that id, then a \`use()\` from the events folder, then the text \`Received.\`. The handler replies on its own context ([Press & submit](/docs/press-handlers)).

## Gateway events

Joins, messages, and reactions are gateway dispatches, separate from the slash path. \`intentsFor\` turns the event names into the bitmask Discord requires. \`bot.onEvent\`, or a function exported from the events folder, receives the payload ([Events & intents](/docs/events-intents), [Bot handle](/docs/bot-handle)).

<Tip>
When a stage fails, start at [Troubleshooting](/docs/troubleshooting). Working shapes for the handler branch are on [Recipes](/docs/recipes).
</Tip>
`,
    },
    nl: {
      title: "Hoe het in elkaar zit",
      description: "Het pad van Start() naar een antwoord, een press of een gateway-event.",
      body: `
Eén \`Start()\` bezit het proces. Slash-commando's nemen de linker tak. Gateway-events nemen de rechter tak. Een commandohandler ziet \`ctx\`. Een eventhandler ziet de payload van dat event.

<FlowDiagram id="architecture" />

| Stap | Wat het doorgeeft |
|------|-------------------|
| \`Start()\` | Geladen commando's, de gateway en het lopende handvat |
| \`loadCommands\` / \`loadEvents\` | Gecompileerde \`.js\` als commando's en eventhandlers |
| Discord registreert slash | De applicatiecommando's voor die guild, of globaal |
| Interactie komt binnen | Eén \`ctx\` voor dit slash-commando of menu |
| Gates / cooldown | Een doorgang naar de handler, of een framework-antwoord dat daar stopt |
| Handler | Jouw \`run\`-functie |
| \`reply\` / \`edit\` / \`wait\` / \`collect\` | De bevestiging, en een wachter in hetzelfde commando |
| \`press\` / \`submit\` | Een latere klik of modal, als niets die id verzamelt |
| Gateway-events | Bits van \`intentsFor\`, daarna \`onEvent\` of de events-map |

## Start()

\`Start()\` opent de gateway, leest commando's en begint interacties te beantwoorden. \`token\` is verplicht. \`guildId\`, \`watch\`, \`autoDefer\`, \`alone\` en \`intents\` zijn de opties die dit pad veranderen ([Start-opties](/docs/start-options)).

## loadCommands / loadEvents

\`loadCommands()\` importeert gecompileerde \`.js\` uit de commandomap (of gebruikt de array die je meegaf). \`loadEvents()\` importeert een map waarvan de exportnamen eventnamen zijn, en elke \`use()\` in die bestanden. \`watch: true\` met een array in het geheugen gooit. Er is geen map ([Commando's](/docs/commands), [Events en intents](/docs/events-intents)).

## Discord registreert slash

Draeven stuurt die commandolijst naar Discord. Met een \`guildId\` toont de guild nieuwe commando's binnen seconden. Zonder guild-id registreert Discord ze globaal, en die sync kan een uur duren ([Start-opties](/docs/start-options)).

## Interactie komt binnen

Iemand voert het slash-commando of een contextmenu uit. Discord levert één interactie, en de handler krijgt één \`ctx\` met opties, lookups en antwoordmethoden ([Commando's](/docs/commands)).

## Wachttijd en gates

Het wachttijdboek draait eerst. \`take()\` bewaart het venster vóór de gates, dus een mislukte gate heeft de wachttijd al verbruikt. Koelt de sleutel nog, dan krijgt de gebruiker \`frame("cooldown", …)\` en wordt \`run\` overgeslagen. Anders lopen de gates in volgorde: \`ownerOnly\`, dan \`need\`, dan \`when\`. Een gate die faalt antwoordt met \`frame("need" | "owner" | "when", …)\` en slaat \`run\` over ([Rechten & gates](/docs/permissions), [Wachttijden](/docs/cooldowns)).

## Handler

De functie op \`command()\`, \`userMenu()\` of \`messageMenu()\` draait hier. Hij leest \`ctx\` en antwoordt op diezelfde interactie ([Commando's](/docs/commands)).

## reply, edit, wait, collect

Een tweede \`reply()\` gooit alleen als er al een antwoord is opgeslagen en je noch hebt gewacht, noch een collect hebt geflusht. \`wait\` defert. Daarna vult \`edit()\` of een nieuwe \`reply()\` het bericht. \`collect\` blijft in dit commando tot een knop, menu of formulier binnenkomt, of tot de wachttijd afloopt ([Antwoorden](/docs/replies), [Verzamelaars](/docs/collectors)).

## press / submit

Een passende \`collect\` draait eerst. Anders gebruikt Draeven de inline \`press\` of \`submit\` die op die id is onthouden, dan een \`use()\` uit de events-map, dan de tekst \`Received.\`. De handler antwoordt op een eigen context ([Press & submit](/docs/press-handlers)).

## Gateway-events

Joins, berichten en reacties zijn gateway-dispatches, los van het slash-pad. \`intentsFor\` maakt van de eventnamen het bitmasker dat Discord eist. \`bot.onEvent\`, of een functie uit de events-map, ontvangt de payload ([Events en intents](/docs/events-intents), [Bot-handle](/docs/bot-handle)).

<Tip>
Als een stap faalt, begin bij [Problemen oplossen](/docs/troubleshooting). Werkende vormen voor de handlertak staan bij [Recepten](/docs/recipes).
</Tip>
`,
    },
  },
  {
    slug: "from-discordjs",
    order: 12,
    en: {
      title: "From discord.js (cheat sheet)",
      description: "discord.js names beside the Draeven call that replaces them.",
      body: `
A name map only. Draeven is its own framework. There is no \`Client\`, and a discord.js \`Client\` does not mix into this process.

<MigrationMap />

| You know (discord.js) | In Draeven |
|-----------------------|------------|
| \`Client\` / Events | \`Start\` + \`events\` / \`intentsFor\` |
| \`SlashCommandBuilder\` | \`command()\` |
| \`EmbedBuilder\` | \`embed({ header, description, color, fields, timestamp })\`. \`breakline\` and \`wide\` are field helpers, not embed keys. \`time()\` fills a field value. |
| \`ActionRowBuilder\` / \`ButtonBuilder\` | \`row()\` + \`button()\` |
| Modal | \`form()\` |
| Collectors | \`ctx.collect\` |
| \`interaction.reply\` / \`deferReply\` / \`editReply\` | \`reply\` / \`wait\` / \`edit\` |
| \`GuildMemberManager\` kicks | \`ctx.timeout\` / \`kick\` / \`ban\` |

## Side by side

Real shapes. Left is typical discord.js. Right is Draeven.

### Start the bot

<Compare id="djs-start" />

### Slash command + reply

<Compare id="djs-command" />

### Embed

<Compare id="djs-embed" />

\`color: "green"\` is \`#008000\`. The discord.js sample uses \`0x57f287\`. Pass a number when you want that exact color.

### Button row + collect

<Compare id="djs-button" />

discord.js clears the row with \`components: []\`. A Draeven text-only \`edit\` keeps the buttons. \`rows: []\` is dropped, so nothing sends \`components: []\`. \`remove()\` deletes the reply.

<Warn fix="One library per token — drop discord.js from this process." href="/docs/why-failing">
Do not install discord.js beside Draeven for the same bot. Two clients on one token fight over the gateway.
</Warn>

When you are ready to migrate for real, use the [Migration checklist](/docs/migration-checklist).

Shapes for the right-hand column: [Embeds & layout](/docs/embeds-layout) · [Buttons, menus & forms](/docs/pieces) · [Collectors](/docs/collectors) · [Welcome](/docs/welcome) · [Known limits](/docs/known-limits).
`,
    },
    nl: {
      title: "Vanuit discord.js (spiekbrief)",
      description: "discord.js-namen naast de Draeven-aanroep die ze vervangt.",
      body: `
Alleen een namenkaart. Draeven is een eigen framework. Er is geen \`Client\`, en een discord.js-\`Client\` mengt niet in dit proces.

<MigrationMap />

| Je kent (discord.js) | In Draeven |
|----------------------|------------|
| \`Client\` / Events | \`Start\` + \`events\` / \`intentsFor\` |
| \`SlashCommandBuilder\` | \`command()\` |
| \`EmbedBuilder\` | \`embed({ header, description, color, fields, timestamp })\`. \`breakline\` en \`wide\` zijn veldhelpers, geen embed-sleutels. \`time()\` vult een veldwaarde. |
| \`ActionRowBuilder\` / \`ButtonBuilder\` | \`row()\` + \`button()\` |
| Modal | \`form()\` |
| Collectors | \`ctx.collect\` |
| \`interaction.reply\` / \`deferReply\` / \`editReply\` | \`reply\` / \`wait\` / \`edit\` |
| Kicks via \`GuildMemberManager\` | \`ctx.timeout\` / \`kick\` / \`ban\` |

## Naast elkaar

Echte vormen. Links typisch discord.js. Rechts Draeven.

### De bot starten

<Compare id="djs-start" />

### Slash-commando + reply

<Compare id="djs-command" />

### Embed

<Compare id="djs-embed" />

\`color: "green"\` is \`#008000\`. Het discord.js-voorbeeld gebruikt \`0x57f287\`. Geef een getal mee als je die exacte kleur wilt.

### Knoppenrij + collect

<Compare id="djs-button" />

discord.js haalt de rij weg met \`components: []\`. Een Draeven-\`edit\` die alleen tekst is, houdt de knoppen. \`rows: []\` valt weg, dus er gaat geen \`components: []\` mee. \`remove()\` verwijdert het antwoord.

<Warn fix="Eén library per token — haal discord.js uit dit proces." href="/docs/why-failing">
Installeer discord.js niet naast Draeven voor dezelfde bot. Twee clients op één token vechten om de gateway.
</Warn>

Klaar om echt te migreren? Gebruik de [Migratie-checklist](/docs/migration-checklist).

Vormen voor de rechterkolom: [Embeds en layout](/docs/embeds-layout) · [Knoppen, menu's & formulieren](/docs/pieces) · [Verzamelaars](/docs/collectors) · [Welkom](/docs/welcome) · [Bekende limieten](/docs/known-limits).
`,
    },
  },
  {
    slug: "troubleshooting",
    order: 78,
    en: {
      title: "Troubleshooting",
      description: "Symptom, likely cause, and the guide that fixes it.",
      body: `
Read the \`[Draeven]\` message first. It names the rule. The living symptom map is [Why is this failing?](/docs/why-failing). Throw-text detail is [Errors & debugging](/docs/debugging). Bounds that are deliberate are [Known limits](/docs/known-limits).

<ErrorMapTable />

Ask in Discord **#help** when the invite is live, or send [Feedback](/docs/feedback) with the log line.
`,
    },
    nl: {
      title: "Problemen oplossen",
      description: "Symptoom, waarschijnlijke oorzaak, en de gids die het oplost.",
      body: `
Lees eerst het \`[Draeven]\`-bericht. Het noemt de regel. De levende symptoomkaart is [Waarom faalt dit?](/docs/why-failing). Detail over throw-tekst staat bij [Fouten & debuggen](/docs/debugging). Grenzen die bewust zijn staan bij [Bekende limieten](/docs/known-limits).

<ErrorMapTable />

Vraag in Discord **#help** zodra de invite live is, of stuur [Terugkoppeling](/docs/feedback) met de logregel.
`,
    },
  },
];
