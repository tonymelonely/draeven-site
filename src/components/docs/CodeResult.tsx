"use client";

import { useLocale } from "next-intl";

type Scene = {
  en: {
    title: string;
    codeLabel: string;
    resultLabel: string;
    code: string;
    result: { kind: "message"; text: string; buttons?: string[] };
  };
  nl: {
    title: string;
    codeLabel: string;
    resultLabel: string;
    code: string;
    result: { kind: "message"; text: string; buttons?: string[] };
  };
};

const SCENES: Record<string, Scene> = {
  ping: {
    en: {
      title: "Ping",
      codeLabel: "Command",
      resultLabel: "In Discord",
      code: `export const ping = command(
  "ping",
  "Checks whether the bot is alive",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);`,
      result: { kind: "message", text: "pong" },
    },
    nl: {
      title: "Ping",
      codeLabel: "Commando",
      resultLabel: "In Discord",
      code: `export const ping = command(
  "ping",
  "Checkt of de bot leeft",
  async (ctx) => ctx.reply("pong"),
  { cooldown: 5 }
);`,
      result: { kind: "message", text: "pong" },
    },
  },
  confirm: {
    en: {
      title: "Confirm",
      codeLabel: "Command",
      resultLabel: "In Discord",
      code: `ctx.reply({
  text: "Remove the pinned notice?",
  rows: [row(
    button({ id: "yes", label: "Remove", color: "red" }),
    button({ id: "no", label: "Keep", color: "grey" })
  )],
});`,
      result: {
        kind: "message",
        text: "Remove the pinned notice?",
        buttons: ["Remove", "Keep"],
      },
    },
    nl: {
      title: "Bevestigen",
      codeLabel: "Commando",
      resultLabel: "In Discord",
      code: `ctx.reply({
  text: "Pinned notice weghalen?",
  rows: [row(
    button({ id: "yes", label: "Weg", color: "red" }),
    button({ id: "no", label: "Houden", color: "grey" })
  )],
});`,
      result: {
        kind: "message",
        text: "Pinned notice weghalen?",
        buttons: ["Weg", "Houden"],
      },
    },
  },
  letters: {
    en: {
      title: "Letters + use()",
      codeLabel: "Command posts buttons",
      resultLabel: "After a click (use())",
      code: `// commands/letters.ts — no press
ctx.reply({
  text: "Pick a letter.",
  rows: [row(
    button({ id: "hangman_A", label: "A" }),
    button({ id: "hangman_B", label: "B" }),
    button({ id: "hangman_C", label: "C" })
  )],
});`,
      result: {
        kind: "message",
        text: "You picked **A**.",
        buttons: ["A ✓", "B", "C"],
      },
    },
    nl: {
      title: "Letters + use()",
      codeLabel: "Commando plaatst knoppen",
      resultLabel: "Na een klik (use())",
      code: `// commands/letters.ts — geen press
ctx.reply({
  text: "Kies een letter.",
  rows: [row(
    button({ id: "hangman_A", label: "A" }),
    button({ id: "hangman_B", label: "B" }),
    button({ id: "hangman_C", label: "C" })
  )],
});`,
      result: {
        kind: "message",
        text: "Je koos **A**.",
        buttons: ["A ✓", "B", "C"],
      },
    },
  },
};

function DiscordPreview({
  text,
  buttons,
}: {
  text: string;
  buttons?: string[];
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,#1e1f22)] p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)] text-[0.65rem] font-bold text-[var(--color-paper)]"
          aria-hidden
        >
          D
        </span>
        <span className="text-[0.8rem] font-medium text-[var(--color-ink)]">Bot</span>
        <span className="text-[0.65rem] text-[var(--color-ink-soft)]">APP</span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-ink)]">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
      {buttons && buttons.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {buttons.map((label, i) => {
            const disabled = label.includes("✓");
            const clean = label.replace(" ✓", "").replace("✓", "").trim();
            return (
              <span
                key={`${clean}-${i}`}
                className={`rounded-md px-3 py-1.5 text-[0.78rem] font-medium ${
                  disabled
                    ? "border border-[var(--color-line)] text-[var(--color-ink-soft)] opacity-55"
                    : i === 0 && buttons.some((b) => b.includes("✓"))
                      ? "border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-mist)_35%,transparent)] text-[var(--color-ink-soft)]"
                      : "bg-[#5865F2] text-white"
                }`}
              >
                {clean}
                {disabled ? " ·" : ""}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function CodeResult({ id }: { id: string }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const scene = SCENES[id];
  if (!scene) return null;
  const copy = isNl ? scene.nl : scene.en;

  return (
    <div className="code-result my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-2">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {copy.title}
        </p>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-[var(--color-line)] p-3 lg:border-r">
          <p className="mb-2 px-1 text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
            {copy.codeLabel}
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] p-3 text-[0.82rem] leading-relaxed text-[var(--color-ink)]">
            <code>{copy.code}</code>
          </pre>
        </div>
        <div className="p-3">
          <p className="mb-2 px-1 text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
            {copy.resultLabel}
          </p>
          <DiscordPreview text={copy.result.text} buttons={copy.result.buttons} />
        </div>
      </div>
    </div>
  );
}
