"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { withInlineCode } from "@/components/docs/inlineCode";
import type { ChecklistItem } from "@/lib/migration-checklist";

const STORAGE_KEY = "draeven-guide-check";

export function GuideChecklist({
  slug,
  items,
}: {
  slug: string;
  items: ChecklistItem[];
}) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:${slug}`);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, [slug]);

  function toggle(id: string) {
    setDone((current) => {
      const next = { ...current, [id]: !current[id] };
      try {
        localStorage.setItem(`${STORAGE_KEY}:${slug}`, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const completed = items.filter((item) => done[item.id]).length;

  return (
    <aside className="guide-checklist my-8 rounded-2xl border border-[var(--color-line)] p-4">
      <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
        {isNl ? "Check vóór je door" : "Check before you move on"}
      </p>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        {isNl
          ? `${completed} van ${items.length} (blijft in deze browser).`
          : `${completed} of ${items.length} (stays in this browser).`}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={Boolean(done[item.id])}
              onChange={() => toggle(item.id)}
              className="mt-1"
              aria-label={isNl ? item.nl : item.en}
            />
            <span
              className={
                done[item.id]
                  ? "text-[var(--color-ink-soft)] line-through"
                  : "text-[var(--color-ink)]"
              }
            >
              {withInlineCode(isNl ? item.nl : item.en)}
              {item.href ? (
                <>
                  {" "}
                  <Link
                    href={item.href}
                    className="text-[var(--color-accent-bright)] no-underline hover:underline"
                  >
                    →
                  </Link>
                </>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
