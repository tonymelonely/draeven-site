"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { withInlineCode } from "@/components/docs/inlineCode";
import { MIGRATION_CHECKLIST } from "@/lib/migration-checklist";

const STORAGE_KEY = "draeven-migration-checklist";

export function Checklist({ id = "migration" }: { id?: string }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const items = id === "migration" ? MIGRATION_CHECKLIST : MIGRATION_CHECKLIST;
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:${id}`);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* ignore */
    }
  }, [id]);

  function toggle(itemId: string) {
    setDone((current) => {
      const next = { ...current, [itemId]: !current[itemId] };
      try {
        localStorage.setItem(`${STORAGE_KEY}:${id}`, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const completed = items.filter((item) => done[item.id]).length;

  return (
    <div className="my-6 space-y-3">
      <p className="text-sm text-[var(--color-ink-soft)]">
        {isNl
          ? `${completed} van ${items.length} afgevinkt (blijft in deze browser).`
          : `${completed} of ${items.length} checked (stays in this browser).`}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] px-3 py-2.5"
          >
            <input
              type="checkbox"
              checked={Boolean(done[item.id])}
              onChange={() => toggle(item.id)}
              className="mt-1"
              aria-label={isNl ? item.nl : item.en}
            />
            <div className="min-w-0 flex-1 text-sm leading-relaxed">
              <span
                className={
                  done[item.id] ? "text-[var(--color-ink-soft)] line-through" : "text-[var(--color-ink)]"
                }
              >
                {withInlineCode(isNl ? item.nl : item.en)}
              </span>
              {item.href ? (
                <>
                  {" "}
                  <Link href={item.href} className="text-[var(--color-accent-bright)] no-underline hover:underline">
                    {isNl ? "Open" : "Open"}
                  </Link>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
