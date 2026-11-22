"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
  DOCS_TIPS_DISMISS_KEY,
  DOCS_TIPS_PREF_KEY,
  pickRandomTip,
  type DocsTip,
} from "@/lib/docs-tips";

export function DocsTipCard({
  title,
  dismissLabel,
}: {
  title: string;
  dismissLabel: string;
}) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [tip, setTip] = useState<DocsTip | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DOCS_TIPS_PREF_KEY) === "off") return;
      if (sessionStorage.getItem(DOCS_TIPS_DISMISS_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setTip(pickRandomTip());
    setVisible(true);

    function onPref(event: Event) {
      const detail = (event as CustomEvent<{ enabled: boolean }>).detail;
      if (!detail?.enabled) {
        setVisible(false);
        return;
      }
      try {
        if (sessionStorage.getItem(DOCS_TIPS_DISMISS_KEY) === "1") return;
      } catch {
        /* ignore */
      }
      setTip(pickRandomTip());
      setVisible(true);
    }

    window.addEventListener("draeven-docs-tips-pref", onPref);
    return () => window.removeEventListener("draeven-docs-tips-pref", onPref);
  }, []);

  if (!visible || !tip) return null;

  return (
    <div className="docs-tip-card mt-4 rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-accent-soft)_35%,transparent)] px-3 py-2.5">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-[0.58rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {title}
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem(DOCS_TIPS_DISMISS_KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="rounded-md px-1 text-[0.75rem] leading-none text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          aria-label={dismissLabel}
          title={dismissLabel}
        >
          ✕
        </button>
      </div>
      <p className="text-[0.78rem] leading-snug text-[var(--color-ink-soft)]">
        {isNl ? tip.nl : tip.en}
      </p>
    </div>
  );
}
