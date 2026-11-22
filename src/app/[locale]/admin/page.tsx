import { getTranslations, setRequestLocale } from "next-intl/server";
import { listFeedback } from "@/lib/feedback-store";
import { getMetricsSummary } from "@/lib/metrics";
import { readSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const session = await readSession();

  if (!session?.isAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl">{t("title")}</h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">{t("forbidden")}</p>
        <a
          href="/api/auth/discord"
          className="mt-6 inline-flex rounded-2xl bg-[var(--color-accent)] px-4 py-2.5 text-white no-underline"
        >
          Discord
        </a>
      </main>
    );
  }

  const metrics = getMetricsSummary();
  const feedback = await listFeedback(12);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <p className="text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">Admin</p>
        <h1 className="font-display text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-[var(--color-ink-soft)]">{t("lead")}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={t("pageViews")} value={String(metrics.pageViews)} />
        <Stat label={t("downloads")} value={String(metrics.downloads)} />
        <Stat label={t("feedback")} value={String(feedback.length)} />
        <Stat
          label={t("saas")}
          value={metrics.saasCents > 0 ? `€${(metrics.saasCents / 100).toFixed(2)}` : "—"}
          hint={t("saasSoon")}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-5">
          <h2 className="font-display mb-4 text-xl">{t("topPaths")}</h2>
          <ul className="space-y-2 text-sm">
            {metrics.topPaths.map((row) => (
              <li key={row.path} className="flex justify-between gap-4 border-b border-[var(--color-line)] py-2">
                <code>{row.path}</code>
                <span>{row.views}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel p-5">
          <h2 className="font-display mb-4 text-xl">{t("recentFeedback")}</h2>
          <ul className="space-y-3 text-sm">
            {feedback.map((entry) => (
              <li key={entry.id} className="border-b border-[var(--color-line)] pb-3">
                <div className="text-xs text-[var(--color-ink-soft)] uppercase">
                  {entry.stars}/5 · {entry.anonymous ? "Anonymous" : entry.userName}
                </div>
                <p className="mt-1">{entry.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <form action="/api/metrics/download" method="post" className="panel flex flex-wrap items-end gap-3 p-5">
        <label className="grid gap-1 text-sm">
          Package download ping
          <select
            name="package"
            className="rounded-xl border border-[var(--color-line-strong)] bg-white/70 px-3 py-2"
            defaultValue="@draeven/core"
          >
            <option value="@draeven/core">@draeven/core</option>
            <option value="@draeven/discord">@draeven/discord</option>
            <option value="@draeven/bridge">@draeven/bridge</option>
            <option value="create-draeven">create-draeven</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-2xl bg-[var(--color-ink)] px-4 py-2.5 text-sm text-[var(--color-paper)]"
        >
          Record ping
        </button>
      </form>
    </main>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="panel p-5">
      <p className="text-xs tracking-[0.1em] text-[var(--color-ink-soft)] uppercase">{label}</p>
      <p className="font-display mt-2 text-3xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{hint}</p> : null}
    </div>
  );
}
