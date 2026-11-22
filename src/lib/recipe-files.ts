/** Downloadable one-file starters shown on Recipes. */
export type RecipeFile = {
  id: string;
  filename: string;
  en: { title: string; blurb: string };
  nl: { title: string; blurb: string };
  code: string;
};

export const RECIPE_FILES: RecipeFile[] = [
  {
    id: "ping",
    filename: "ping.ts",
    en: { title: "Ping", blurb: "Minimal command + cooldown." },
    nl: { title: "Ping", blurb: "Minimaal commando + cooldown." },
    code: `import { command } from "@draeven/core";

export const ping = command(
  "ping",
  "Checks whether the bot is alive",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);
`,
  },
  {
    id: "confirm",
    filename: "confirm.ts",
    en: { title: "Confirm", blurb: "Buttons + collect in one handler." },
    nl: { title: "Bevestigen", blurb: "Knoppen + collect in één handler." },
    code: `import { button, command, row } from "@draeven/core";

export const confirm = command("confirm", "Yes or no", async (ctx) => {
  ctx.reply({
    text: "Delete the last report?",
    rows: [
      row(
        button({ id: "yes", label: "Delete", color: "red" }),
        button({ id: "no", label: "Keep", color: "grey" })
      ),
    ],
  });

  const pick = await ctx.collect({ ids: ["yes", "no"], seconds: 30 });
  if (!pick) return ctx.edit("Timed out.");
  return ctx.edit(pick.id === "yes" ? "Deleted." : "Kept.");
});
`,
  },
  {
    id: "letters",
    filename: "letters-use.ts",
    en: { title: "Letters + use()", blurb: "Command posts; events folder owns clicks." },
    nl: { title: "Letters + use()", blurb: "Commando plaatst; events-map bezit klikken." },
    code: `// commands/letters.ts — no press
import { button, command, row } from "@draeven/core";

export const letters = command("letters", "Letter board", async (ctx) =>
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

// events/letters.ts
import { button, row, use } from "@draeven/core";

export const letters = use({
  ids: "hangman_*",
  run(ctx) {
    const letter = ctx.id.slice("hangman_".length);
    return ctx.reply(\`You picked **\${letter}**.\`);
  },
});
`,
  },
];
