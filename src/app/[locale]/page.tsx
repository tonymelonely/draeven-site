import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroCanvas } from "@/components/HeroCanvas";
import { CodeBlock } from "@/components/docs/CodeBlock";

const HERO_CODE = `import { command, user } from "@draeven/core";

export const greet = command(
  "greet",
  "Greets someone",
  { who: user("Who?") },
  async (ctx) => {
    const person = ctx.who ?? ctx.getUser(ctx.author);
    return ctx.reply(\`Hello \${person.name}\`);
  }
);`;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const features = [
    { title: t("featureCommands"), body: t("featureCommandsBody") },
    { title: t("featureEvents"), body: t("featureEventsBody") },
    { title: t("featureBridge"), body: t("featureBridgeBody") },
    { title: t("featureDx"), body: t("featureDxBody") },
  ];

  return (
    <>
      <section className="relative min-h-[calc(100dvh-4.4rem)] overflow-hidden border-b border-[var(--color-line)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,color-mix(in_srgb,var(--color-accent)_22%,transparent),transparent_55%)]" />
        <HeroCanvas />
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4.4rem)] w-full max-w-6xl flex-col justify-end px-4 pb-[8vh] pt-16 sm:px-6">
          <div className="grid w-full items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)]">
            <div className="max-w-xl space-y-5">
              <p className="text-xs tracking-[0.16em] text-[var(--color-accent-bright)] uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="font-display text-[clamp(3.2rem,9vw,6.2rem)] leading-[0.9] font-extrabold tracking-[-0.055em]">
                Draeven
              </h1>
              <p className="font-display text-[clamp(1.2rem,2.2vw,1.7rem)] leading-snug font-semibold tracking-tight text-[var(--color-ink)]">
                {t("headline")}
              </p>
              <p className="max-w-md text-[1.05rem] leading-relaxed text-[var(--color-ink-soft)]">
                {t("lead")}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/docs/quickstart"
                  className="rounded-2xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[#04120f] no-underline transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-bright)]"
                >
                  {t("ctaQuick")}
                </Link>
                <Link
                  href="/docs"
                  className="rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-paper-deep)] px-4 py-2.5 text-sm no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                >
                  {t("ctaDocs")}
                </Link>
              </div>
            </div>

            <div className="min-w-0 lg:pb-1">
              <CodeBlock code={HERO_CODE} language="javascript" filename="greet.js" />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl space-y-14 px-4 py-14 sm:px-6">
        <section className="max-w-3xl space-y-3">
          <h2 className="font-display text-2xl tracking-tight">{t("stackTitle")}</h2>
          <p className="text-[var(--color-ink-soft)]">{t("stackBody")}</p>
        </section>

        <section>
          <h2 className="font-display mb-6 text-2xl tracking-tight">{t("featuresTitle")}</h2>
          <ol className="panel divide-y divide-[var(--color-line)] overflow-hidden">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className="grid gap-2 px-5 py-5 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:px-6"
              >
                <span className="font-display text-[var(--color-accent-bright)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg tracking-tight">{feature.title}</h3>
                  <p className="text-[var(--color-ink-soft)]">{feature.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
