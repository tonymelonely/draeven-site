"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { withInlineCode } from "@/components/docs/inlineCode";

export function TrySimulate() {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div className="my-6 rounded-2xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-4 sm:p-5">
      <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
        {isNl ? "Playground" : "Playground"}
      </p>
      <h3 className="mt-1 font-display text-lg text-[var(--color-ink)]">
        {isNl ? "Test zonder token" : "Test without a token"}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        {withInlineCode(
          isNl
            ? "`simulate()` draait je handler offline. Gebruik het in tests of een snelle REPL — geen Discord-login nodig."
            : "`simulate()` runs your handler offline. Use it in tests or a quick REPL — no Discord login required."
        )}
      </p>
      <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] p-3 text-[0.8rem] leading-relaxed">
        <code>{`import { command, simulate } from "@draeven/core";

const ping = command("ping", "Alive?", async (ctx) => ctx.reply("pong"));
const out = await simulate(ping, {});
console.log(out);`}</code>
      </pre>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link href="/docs/simulate" className="text-[var(--color-accent-bright)] no-underline hover:underline">
          {isNl ? "Simulate-gids →" : "Simulate guide →"}
        </Link>
        <Link href="/docs/starters" className="text-[var(--color-ink-soft)] no-underline hover:underline">
          {isNl ? "Starters" : "Starters"}
        </Link>
      </div>
    </div>
  );
}
