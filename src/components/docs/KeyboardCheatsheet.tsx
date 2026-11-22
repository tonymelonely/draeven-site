"use client";

import { useLocale } from "next-intl";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ROWS = [
  { keys: "⌘K / Ctrl+K", en: "Open search", nl: "Zoeken openen" },
  { keys: "?", en: "This cheatsheet", nl: "Dit overzicht" },
  { keys: "[ / ]", en: "Toggle Guides / On this page", nl: "Guides / Op deze pagina" },
  { keys: "G then D", en: "Go to Docs", nl: "Naar Docs" },
  { keys: "G then A", en: "Go to API", nl: "Naar API" },
  { keys: "Esc", en: "Close overlays", nl: "Overlays sluiten" },
] as const;

export function KeyboardCheatsheet({ open, onClose }: Props) {
  const locale = useLocale();
  const isNl = locale === "nl";
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-start justify-center bg-black/60 p-4 pt-[14vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isNl ? "Sneltoetsen" : "Keyboard shortcuts"}
    >
      <div
        className="panel w-full max-w-md overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-3">
          <p className="text-[0.7rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {isNl ? "Sneltoetsen" : "Keyboard"}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            Esc
          </button>
        </div>
        <ul className="divide-y divide-[var(--color-line)]">
          {ROWS.map((row) => (
            <li key={row.keys} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
              <span className="text-[var(--color-ink-soft)]">{isNl ? row.nl : row.en}</span>
              <kbd className="rounded-md border border-[var(--color-line)] bg-[var(--color-mist)]/30 px-2 py-0.5 font-mono text-[0.75rem] text-[var(--color-ink)]">
                {row.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
