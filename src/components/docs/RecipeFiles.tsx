"use client";

import { useLocale } from "next-intl";
import { RECIPE_FILES } from "@/lib/recipe-files";
import { CopyButton } from "@/components/docs/CopyButton";

function download(filename: string, code: string) {
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function RecipeFiles() {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div className="recipe-files my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {isNl ? "Kopieer starter" : "Copy a starter"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {isNl
            ? "Één bestand (of twee voor letters). Plak in je project en compileer."
            : "One file (or two for letters). Paste into your project and compile."}
        </p>
      </div>
      <ul className="divide-y divide-[var(--color-line)]">
        {RECIPE_FILES.map((file) => {
          const copy = isNl ? file.nl : file.en;
          return (
            <li
              key={file.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-[var(--color-ink)]">{copy.title}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{copy.blurb}</p>
                <p className="mt-0.5 font-mono text-[0.75rem] text-[var(--color-ink-soft)]">
                  {file.filename}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton code={file.code} />
                <button
                  type="button"
                  onClick={() => download(file.filename, file.code)}
                  className="rounded-lg border border-[var(--color-line)] px-2.5 py-1 text-[0.75rem] text-[var(--color-ink-soft)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
                >
                  {isNl ? "Download" : "Download"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
