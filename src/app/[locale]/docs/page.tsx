import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { docsIndex } from "@/lib/docs";
import { DOCS_CORE_VERSION, LEARNING_PATHS } from "@/lib/docs-meta";
import type { AppLocale } from "@/i18n/routing";
import { HeroCanvas } from "@/components/HeroCanvas";

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations("docs");
  const items = await docsIndex(appLocale);
  const sections: Array<{ name: string; items: typeof items }> = [];
  for (const item of items) {
    const name = item.section || "Docs";
    const last = sections[sections.length - 1];
    if (!last || last.name !== name) sections.push({ name, items: [item] });
    else last.items.push(item);
  }

  return (
    <main className="docs-index relative mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <HeroCanvas subtle viewport />
      <div className="docs-veil" aria-hidden />

      <header className="relative mb-8 max-w-3xl space-y-3">
        <p className="text-[0.68rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {t("guides")} · {t("coreVersion", { version: DOCS_CORE_VERSION })}
        </p>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">{t("lead")}</p>
      </header>

      <section className="panel relative mb-9 max-w-4xl overflow-hidden p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg tracking-tight">{t("pathTitle")}</h2>
          <span className="text-[0.68rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
            {t("pathEyebrow")}
          </span>
        </div>

        <div className="mt-5 space-y-5">
          {LEARNING_PATHS.map((path, pathIndex) => (
            <div key={path.id} className="space-y-2.5">
              <p className="text-[0.68rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
                {t("pathLabel", { n: pathIndex + 1 })} · {appLocale === "nl" ? path.nl : path.en}
              </p>
              <ol className="flex flex-wrap items-stretch gap-2 text-sm sm:gap-2.5">
                {path.steps.map((step, index) => (
                  <li key={step.slug} className="flex max-w-full items-center gap-2 sm:gap-2.5">
                    {index > 0 ? (
                      <span className="hidden shrink-0 text-[var(--color-accent)] sm:inline" aria-hidden>
                        →
                      </span>
                    ) : null}
                    <Link
                      href={`/docs/${step.slug}`}
                      className="docs-path-step inline-flex max-w-full items-center gap-2 px-3 py-2 font-medium no-underline sm:px-3.5 sm:py-2.5"
                    >
                      <span className="shrink-0 font-display text-[0.7rem] tracking-[0.08em] text-[var(--color-accent-bright)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 whitespace-normal">
                        {appLocale === "nl" ? step.nl : step.en}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
          {t("pathAlso")}{" "}
          <Link href="/docs/architecture" className="text-[var(--color-accent-bright)]">
            {t("architectureLink")}
          </Link>
          {" · "}
          <Link href="/docs/troubleshooting" className="text-[var(--color-accent-bright)]">
            {t("troubleshootingLink")}
          </Link>
          {" · "}
          <Link href="/docs/from-discordjs" className="text-[var(--color-accent-bright)]">
            {t("fromDiscordLink")}
          </Link>
          {" · "}
          <Link href="/docs/rules" className="text-[var(--color-accent-bright)]">
            {t("rulesLink")}
          </Link>
        </p>
      </section>

      <div className="relative space-y-8">
        {sections.map((section, sectionIndex) => (
          <section key={section.name} className="space-y-3.5">
            <div className="flex items-center gap-3">
              <h2 className="shrink-0 font-display text-sm tracking-[0.14em] text-[var(--color-accent)] uppercase">
                {section.name}
              </h2>
              <div className="docs-section-rule" aria-hidden />
              <span className="shrink-0 text-[0.68rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
                {String(sectionIndex + 1).padStart(2, "0")} · {section.items.length}
              </span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={item.slug.join("/")}
                  href={`/docs/${item.slug.join("/")}`}
                  className="group panel panel-lift flex min-h-[9.5rem] flex-col gap-3 overflow-hidden p-5 no-underline"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-xl leading-tight text-[var(--color-ink)] transition group-hover:text-[var(--color-accent-bright)]">
                      {item.title}
                    </span>
                    <span className="shrink-0 rounded-md border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-mist)_25%,transparent)] px-1.5 py-0.5 text-[0.65rem] tracking-[0.1em] text-[var(--color-ink-soft)]">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative min-h-[3.6rem] flex-1">
                    {item.description ? (
                      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-ink-soft)] transition duration-200 group-hover:pointer-events-none group-hover:opacity-0">
                        {item.description}
                      </p>
                    ) : null}
                    {item.preview?.length ? (
                      <div className="absolute inset-0 flex flex-col justify-start opacity-0 transition duration-200 group-hover:opacity-100">
                        <p className="mb-1.5 text-[0.62rem] tracking-[0.12em] text-[var(--color-accent)] uppercase">
                          {t("previewLabel")}
                        </p>
                        <ul className="space-y-1 text-sm leading-snug text-[var(--color-ink-soft)]">
                          {item.preview.map((heading) => (
                            <li key={heading} className="truncate pl-0">
                              <span className="text-[var(--color-accent)]">·</span> {heading}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <span
                    className="mt-auto pt-1 text-[0.72rem] tracking-[0.08em] text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
