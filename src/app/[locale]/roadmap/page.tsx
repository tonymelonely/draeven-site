import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("roadmap");
  const nl = locale === "nl";

  const items = nl
    ? [
        {
          when: "Nu · beta",
          title: "Framework + owner-desk",
          body: "Packages, docs, CI, create-draeven, optionele bridge voor operators.",
        },
        {
          when: "Dichtbij",
          title: "DX uit feedback",
          body: "Scherpere errors, intents-hulp, scaffold — gestuurd door sterren en notities.",
        },
        {
          when: "Later",
          title: "Draeven SaaS-dashboard",
          body: "Optioneel betaald guild-admin dashboard. Framework blijft open; product is apart.",
        },
      ]
    : [
        {
          when: "Now · beta",
          title: "Framework + owner desk",
          body: "Packages, docs, CI, create-draeven, optional bridge for operators.",
        },
        {
          when: "Near",
          title: "DX from feedback",
          body: "Sharper errors, intents guidance, scaffold polish — driven by stars and notes.",
        },
        {
          when: "Later",
          title: "Draeven SaaS dashboard",
          body: "Optional paid guild-admin dashboard. Framework stays open; product is separate.",
        },
      ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl space-y-3">
        <p className="text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">Roadmap</p>
        <h1 className="font-display text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-[var(--color-ink-soft)]">{t("lead")}</p>
      </header>
      <ol className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {items.map((item) => (
          <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <span className="text-xs tracking-[0.1em] text-[var(--color-accent)] uppercase">
              {item.when}
            </span>
            <div>
              <h2 className="font-display text-xl">{item.title}</h2>
              <p className="text-[var(--color-ink-soft)]">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
