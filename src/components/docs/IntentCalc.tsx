"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { INTENT_EVENTS } from "@/lib/intent-events";
import { CopyButton } from "@/components/docs/CopyButton";

export function IntentCalc() {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [picked, setPicked] = useState<Record<string, boolean>>({
    ready: true,
    message: true,
  });

  const selected = useMemo(
    () => INTENT_EVENTS.filter((event) => picked[event.name]).map((event) => event.name),
    [picked]
  );

  const intentNames = useMemo(() => {
    const names = new Set<string>();
    for (const event of INTENT_EVENTS) {
      if (!picked[event.name]) continue;
      for (const intent of event.intents) names.add(intent);
    }
    return [...names].sort();
  }, [picked]);

  const snippet =
    selected.length === 0
      ? `// pick at least one event\nintents: intentsFor("ready")`
      : `intents: intentsFor(${selected.map((name) => `"${name}"`).join(", ")})`;

  const privileged = INTENT_EVENTS.filter(
    (event) => picked[event.name] && event.privileged
  ).map((event) => event.name);

  return (
    <div className="intent-calc my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {isNl ? "Intent-calculator" : "Intent calculator"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {isNl
            ? "Vink events aan. Kopieer de snippet naar Start({ … })."
            : "Check the events you handle. Copy the snippet into Start({ … })."}
        </p>
      </div>
      <div className="grid gap-0 lg:grid-cols-2">
        <ul className="max-h-72 space-y-1 overflow-y-auto border-[var(--color-line)] p-3 lg:border-r">
          {INTENT_EVENTS.map((event) => (
            <li key={event.name}>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-[color-mix(in_srgb,var(--color-mist)_22%,transparent)]">
                <input
                  type="checkbox"
                  checked={Boolean(picked[event.name])}
                  onChange={() =>
                    setPicked((current) => ({
                      ...current,
                      [event.name]: !current[event.name],
                    }))
                  }
                />
                <span className="font-mono text-[var(--color-ink)]">{event.name}</span>
                {event.privileged ? (
                  <span className="text-[0.65rem] tracking-[0.08em] text-[var(--color-warn)] uppercase">
                    {isNl ? "portal" : "portal"}
                  </span>
                ) : null}
              </label>
            </li>
          ))}
        </ul>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
              Start
            </p>
            <CopyButton code={snippet} />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] p-3 text-[0.82rem] leading-relaxed text-[var(--color-ink)]">
            <code>{snippet}</code>
          </pre>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {isNl ? "Intent-bits:" : "Intent bits:"}{" "}
            {intentNames.length ? (
              <span className="font-mono text-[var(--color-ink)]">{intentNames.join(", ")}</span>
            ) : (
              <span className="font-mono">0</span>
            )}
          </p>
          {privileged.length > 0 ? (
            <p className="text-sm text-[var(--color-warn)]">
              {isNl
                ? `Portal aan voor: ${privileged.join(", ")}`
                : `Turn on in the portal: ${privileged.join(", ")}`}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
