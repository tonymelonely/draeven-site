"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ERROR_MAP } from "@/lib/error-map";
import { withInlineCode } from "@/components/docs/inlineCode";

function scoreRow(query: string, row: (typeof ERROR_MAP)[number]): number {
  const hay = [
    row.symptom.en,
    row.symptom.nl,
    row.cause.en,
    row.cause.nl,
    row.fix.en,
    row.fix.nl,
    ...(row.aliases ?? []),
    row.id,
  ]
    .join("\n")
    .toLowerCase();
  const tokens = query
    .toLowerCase()
    .replace(/[\[\]]/g, " ")
    .split(/[^a-z0-9._-]+/i)
    .filter((token) => token.length > 2);
  if (!tokens.length) return 0;
  let score = 0;
  for (const token of tokens) {
    if (hay.includes(token)) score += token.length > 5 ? 3 : 1;
  }
  if (query.includes("[Draeven]") && hay.includes("draeven")) score += 2;
  return score;
}

export function ErrorPaste() {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [query, setQuery] = useState("");

  const hits = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) return [];
    return ERROR_MAP.map((row) => ({ row, score: scoreRow(trimmed, row) }))
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [query]);

  return (
    <div className="error-paste my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {isNl ? "Plak een logregel" : "Paste a log line"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {isNl
            ? "Plak een `[Draeven]`-fout of symptoom. We koppelen de dichtstbijzijnde gids."
            : "Paste a `[Draeven]` error or symptom. We match the closest guide."}
        </p>
      </div>
      <div className="space-y-3 p-4">
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows={3}
          placeholder={
            isNl
              ? "[Draeven] A command can only reply once."
              : "[Draeven] A command can only reply once."
          }
          className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] px-3 py-2 font-mono text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
        />
        {hits.length === 0 && query.trim().length >= 3 ? (
          <p className="text-sm text-[var(--color-ink-soft)]">
            {isNl
              ? "Geen treffer — scroll de symptoomkaart hieronder."
              : "No hit — scroll the symptom map below."}
          </p>
        ) : null}
        <ul className="space-y-2">
          {hits.map(({ row }) => (
            <li
              key={row.id}
              className="rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm"
            >
              <p className="font-medium text-[var(--color-ink)]">
                {withInlineCode(isNl ? row.symptom.nl : row.symptom.en)}
              </p>
              <p className="mt-1 text-[var(--color-ink-soft)]">
                {withInlineCode(isNl ? row.fix.nl : row.fix.en)}
              </p>
              <Link
                href={row.href}
                className="mt-2 inline-block text-[var(--color-accent-bright)] no-underline hover:underline"
              >
                {isNl ? "Open gids →" : "Open guide →"}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
