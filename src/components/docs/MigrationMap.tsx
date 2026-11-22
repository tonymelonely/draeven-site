"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MIGRATION_MAP } from "@/lib/migration-map";

export function MigrationMap() {
  const locale = useLocale();
  const isNl = locale === "nl";

  return (
    <div className="migration-map my-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3">
        <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {isNl ? "Diff op één rij" : "Diff in one row"}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {isNl
            ? "discord.js links · Draeven rechts. Codevoorbeelden staan in de Compare-blokken eronder."
            : "discord.js on the left · Draeven on the right. Code samples sit in the Compare blocks below."}
        </p>
      </div>
      <div className="themed-scroll overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-mist)_28%,transparent)]">
              <th className="px-4 py-2 font-medium text-[var(--color-ink)]">discord.js</th>
              <th className="px-4 py-2 font-medium text-[var(--color-ink)]">Draeven</th>
              <th className="px-4 py-2 font-medium text-[var(--color-ink)]">
                {isNl ? "Gids" : "Guide"}
              </th>
            </tr>
          </thead>
          <tbody>
            {MIGRATION_MAP.map((row) => (
              <tr key={row.djs} className="border-b border-[var(--color-line)] last:border-0">
                <td className="px-4 py-2.5 font-mono text-[0.82rem] text-[var(--color-ink-soft)]">
                  {row.djs}
                </td>
                <td className="px-4 py-2.5 font-mono text-[0.82rem] text-[var(--color-accent-bright)]">
                  {row.draeven}
                </td>
                <td className="px-4 py-2.5">
                  <Link
                    href={row.href}
                    className="text-[var(--color-accent-bright)] no-underline hover:underline"
                  >
                    →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
