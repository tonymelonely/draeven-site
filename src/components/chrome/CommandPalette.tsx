"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export type SearchItem = {
  href: string;
  title: string;
  group: string;
  keywords?: string[];
  /** Short preview under the title in the palette. */
  snippet?: string;
};

export function CommandPalette({ items }: { items: SearchItem[] }) {
  const t = useTranslations("command");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter((item) => {
        const hay = [item.title, item.group, item.href, ...(item.keywords ?? [])]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 20);
  }, [items, query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-[color-mix(in_srgb,var(--color-ink)_45%,transparent)] p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="panel w-full max-w-xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("placeholder")}
          className="w-full border-b border-[var(--color-line-strong)] bg-transparent px-4 py-3 outline-none"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((value) => Math.min(value + 1, filtered.length - 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((value) => Math.max(value - 1, 0));
            }
            if (event.key === "Enter" && filtered[active]) {
              router.push(filtered[active]!.href);
              setOpen(false);
            }
          }}
        />
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.length < 1 ? (
            <li className="px-3 py-2 text-sm text-[var(--color-ink-soft)]">{t("empty")}</li>
          ) : (
            filtered.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm no-underline transition ${
                    index === active
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-ink)]"
                      : "hover:bg-[color-mix(in_srgb,white_50%,transparent)]"
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">
                    {item.group}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-[var(--color-line)] px-4 py-2 text-xs text-[var(--color-ink-soft)]">
          {t("hint")}
        </p>
      </div>
    </div>
  );
}

export function openCommandPaletteEvent() {
  window.dispatchEvent(new CustomEvent("draeven:open-command"));
}
