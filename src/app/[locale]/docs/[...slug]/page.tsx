import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocFooter } from "@/components/docs/DocFooter";
import { DocFeedback } from "@/components/docs/DocFeedback";
import { DocsVersionSwitch } from "@/components/docs/DocsVersionSwitch";
import { MdxContent } from "@/components/docs/MdxContent";
import { OnThisPage } from "@/components/docs/OnThisPage";
import { SectionChips } from "@/components/docs/SectionChips";
import { PathNext } from "@/components/docs/PathNext";
import { GuideChecklist } from "@/components/docs/GuideChecklist";
import { CoreAlignBadge } from "@/components/docs/CoreAlignBadge";
import { docsSidebar, extractHeadings, getDoc } from "@/lib/docs";
import { DOCS_CORE_VERSION, getDocExtras, PATH_NEXT_SLUGS } from "@/lib/docs-meta";
import { getGuideChecks } from "@/lib/guide-checks";
import { getDocUpdated } from "@/lib/doc-updates";
import { estimateReadingMinutes } from "@/lib/reading-time";
import type { AppLocale } from "@/i18n/routing";

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const doc = await getDoc(appLocale, slug);
  if (!doc) notFound();

  const t = await getTranslations("docs");
  const pager = await getTranslations("pager");
  const sidebar = docsSidebar(appLocale);
  const headings = extractHeadings(doc.content);
  const index = sidebar.findIndex((item) => item.slug.join("/") === slug.join("/"));
  const prev = index > 0 ? sidebar[index - 1] : undefined;
  const next = index >= 0 && index < sidebar.length - 1 ? sidebar[index + 1] : undefined;
  const step = String(index + 1).padStart(2, "0");
  const slugKey = slug.join("/");
  const minutes = estimateReadingMinutes(doc.content);
  const updated = getDocUpdated(slugKey);
  const extras = getDocExtras(slugKey);
  const pathNext =
    PATH_NEXT_SLUGS.has(slugKey) && extras.nextStep
      ? sidebar.find((item) => item.slug.join("/") === extras.nextStep)
      : undefined;
  const guideChecks = getGuideChecks(slugKey);

  return (
    <DocsShell
      sidebar={<DocsSidebar items={sidebar} activeSlug={slugKey} label={t("guides")} />}
      toc={
        <OnThisPage
          title={t("onThisPage")}
          headings={headings}
          progressLabel={t("readingProgress")}
          tipTitle={t("tipTitle")}
          tipDismiss={t("tipDismiss")}
        />
      }
      menuLabel={t("menu")}
      tocLabel={t("onThisPage")}
      closeLabel={t("close")}
      swipeHint={t("swipeHint")}
      toggleGuidesHint={t("toggleGuidesHint")}
      toggleTocHint={t("toggleTocHint")}
    >
      <article className="panel min-w-0 w-full overflow-hidden">
        <header className="docs-article-header docs-article-header--sticky space-y-3 border-b border-[var(--color-line)] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.14em] uppercase">
            {doc.meta.section ? (
              <span className="rounded-md border border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] bg-[var(--color-accent-soft)] px-2 py-1 text-[var(--color-accent-bright)] shadow-[inset_0_1px_0_color-mix(in_srgb,white_8%,transparent)]">
                {doc.meta.section}
              </span>
            ) : null}
            <span className="text-[var(--color-ink-soft)]">
              {t("guideStep", { step, total: sidebar.length })}
            </span>
            <CoreAlignBadge />
            <DocsVersionSwitch />
            <span className="text-[var(--color-ink-soft)]">
              {t("readTime", { minutes })}
            </span>
            {updated ? (
              <span className="text-[var(--color-ink-soft)]">
                {t("updated", { date: updated })}
              </span>
            ) : null}
          </div>
          <h1 className="font-display text-3xl tracking-tight sm:text-[2.55rem]">
            {doc.meta.title}
          </h1>
          {doc.meta.description ? (
            <p className="text-[0.98rem] leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
              {doc.meta.description}
            </p>
          ) : null}
          {extras.api && extras.api.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {extras.api.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-md border border-[var(--color-line)] px-2 py-1 font-mono text-[0.72rem] text-[var(--color-accent-bright)] no-underline transition hover:border-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        <div className="px-5 py-6 sm:px-7 sm:py-7">
          <SectionChips title={t("jumpTo")} headings={headings} />
          <MdxContent source={doc.content} />
          {guideChecks ? <GuideChecklist slug={slugKey} items={guideChecks} /> : null}
          {pathNext ? (
            <PathNext
              href={`/docs/${pathNext.slug.join("/")}`}
              title={pathNext.title}
            />
          ) : null}
          <DocFeedback slug={slugKey} />
          <DocFooter
            locale={appLocale}
            slug={slugKey}
            labels={{
              related: t("related"),
              api: t("apiRefs"),
              version: t("writtenFor", { version: DOCS_CORE_VERSION }),
            }}
          />
        </div>

        <nav className="grid gap-3 border-t border-[var(--color-line-strong)] px-5 py-6 sm:grid-cols-2 sm:px-7">
          {prev ? (
            <Link
              href={`/docs/${prev.slug.join("/")}`}
              className="docs-pager-card group p-4 no-underline"
            >
              <span className="text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
                {pager("prev")}
              </span>
              <div className="font-display text-lg text-[var(--color-accent-bright)] group-hover:underline">
                {prev.title}
              </div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug.join("/")}`}
              className="docs-pager-card group p-4 text-right no-underline sm:justify-self-end sm:text-right"
            >
              <span className="text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
                {pager("next")}
              </span>
              <div className="font-display text-lg text-[var(--color-accent-bright)] group-hover:underline">
                {next.title}
              </div>
            </Link>
          ) : null}
        </nav>
      </article>
    </DocsShell>
  );
}
