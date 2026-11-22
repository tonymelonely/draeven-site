import { getTranslations, setRequestLocale } from "next-intl/server";
import { FeedbackForm } from "@/components/FeedbackForm";
import { averageStars, listFeedback } from "@/lib/feedback-store";
import { readSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("feedback");
  const [user, entries] = await Promise.all([readSession(), listFeedback(30)]);
  const avg = averageStars(entries);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl space-y-3">
        <p className="text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">Feedback</p>
        <h1 className="font-display text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-[var(--color-ink-soft)]">
          {t("lead")}
          {avg != null ? ` ${t("average", { avg })}` : ""}
        </p>
      </header>

      <FeedbackForm user={user} />

      {entries.length > 0 ? (
        <ul className="mt-10 max-w-xl space-y-4">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b border-[var(--color-line)] pb-4">
              <p className="mb-1 text-xs tracking-wide text-[var(--color-ink-soft)] uppercase">
                {entry.stars}/5 · {entry.anonymous ? "Anonymous" : entry.userName || "User"} ·{" "}
                {new Date(entry.at).toLocaleDateString(locale)}
              </p>
              <p>{entry.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-[var(--color-ink-soft)]">{t("none")}</p>
      )}
    </main>
  );
}
