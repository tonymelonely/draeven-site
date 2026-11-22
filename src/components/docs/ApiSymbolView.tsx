import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { ApiMemberCard } from "@/components/docs/ApiMemberCard";
import {
  formatHeritage,
  formatSignature,
  formatType,
  kindLabel,
  memberSections,
  primarySource,
  summarizeComment,
  symbolPath,
  type ApiPackage,
  type ApiSymbol,
} from "@/lib/api-docs";
import { guidesForSymbol } from "@/lib/api-guide-links";

type Props = {
  pkg: ApiPackage;
  symbol: ApiSymbol | null;
  slug: string[];
};

export async function ApiSymbolView({ pkg, symbol, slug }: Props) {
  const t = await getTranslations("api");
  const locale = await getLocale();
  const sections = memberSections(symbol, pkg.children);
  const source = primarySource(symbol);
  const summary = summarizeComment(symbol);
  const guideLinks = guidesForSymbol(symbol?.name);
  const exportLine = symbol
    ? symbol.signatures?.length
      ? `export ${kindLabel(symbol).toLowerCase()} ${formatSignature(symbol)}`
      : symbol.typeParameters?.length
        ? `export ${kindLabel(symbol).toLowerCase()} ${symbol.name}<${symbol.typeParameters
            .map((param) => {
              const constraint = param.type ? ` extends ${formatType(param.type)}` : "";
              const def = param.default ? ` = ${formatType(param.default)}` : "";
              return `${param.name}${constraint}${def}`;
            })
            .join(", ")}>${
            symbol.extendedTypes?.length ? ` extends ${formatHeritage(symbol.extendedTypes)}` : ""
          }`
        : `export ${kindLabel(symbol).toLowerCase()} ${symbol.name}${
            symbol.extendedTypes?.length ? ` extends ${formatHeritage(symbol.extendedTypes)}` : ""
          }${symbol.type ? ` = ${formatType(symbol.type)}` : ""}`
    : null;

  return (
    <article className="panel space-y-8 p-6 sm:p-8">
      <header className="space-y-3 border-b border-[var(--color-line)] pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {kindLabel(symbol)}
          </p>
          {source?.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[var(--color-line)] px-2 py-1 font-mono text-[0.65rem] text-[var(--color-ink-soft)] no-underline hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
            >
              {t("source")}
            </a>
          ) : null}
        </div>

        <h1 className="font-display text-4xl tracking-tight text-[#7dd3c7] sm:text-5xl">
          {symbol ? `${kindLabel(symbol).toLowerCase()} ${symbol.name}` : pkg.name}
        </h1>

        {symbol?.extendedTypes?.length ? (
          <p className="font-mono text-sm text-[var(--color-ink-soft)]">
            {t("extends")}{" "}
            <span className="text-[var(--color-accent-bright)]">
              {formatHeritage(symbol.extendedTypes)}
            </span>
          </p>
        ) : null}

        {symbol?.implementedTypes?.length ? (
          <p className="font-mono text-sm text-[var(--color-ink-soft)]">
            {t("implements")}{" "}
            <span className="text-[var(--color-accent-bright)]">
              {formatHeritage(symbol.implementedTypes)}
            </span>
          </p>
        ) : null}

        {exportLine ? (
          <CodeBlock code={exportLine} language="typescript" filename="declaration.ts" />
        ) : null}

        {summary ? <p className="text-base text-[var(--color-ink-soft)]">{summary}</p> : null}

        {guideLinks.length ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-soft)] uppercase">
              {t("guides")}
            </span>
            {guideLinks.map((item) => (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className="docs-path-step inline-flex px-2.5 py-1 text-sm no-underline"
              >
                {locale === "nl" ? item.nl : item.en}
              </Link>
            ))}
          </div>
        ) : null}

        {slug.length > 0 ? (
          <p className="text-xs text-[var(--color-ink-soft)]">
            <Link href={symbolPath(pkg.id)} className="text-[var(--color-accent-bright)]">
              {pkg.name}
            </Link>
            {slug.map((part, index) => (
              <span key={`${part}-${index}`}>
                {" / "}
                <Link
                  href={symbolPath(pkg.id, slug.slice(0, index + 1))}
                  className="text-[var(--color-accent-bright)]"
                >
                  {decodeURIComponent(part)}
                </Link>
              </span>
            ))}
          </p>
        ) : (
          <p className="text-sm text-[var(--color-ink-soft)]">
            {t("symbolsCount", {
              count: pkg.children.length,
              version: pkg.version || "local",
            })}
          </p>
        )}
      </header>

      {sections.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl">{t("toc")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-[var(--color-line)] p-4">
                <h3 className="mb-2 text-xs tracking-[0.12em] text-[var(--color-accent)] uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.members.map((member) => (
                    <li key={member.id}>
                      <a
                        href={`#${member.name}`}
                        className="font-mono text-sm text-[var(--color-accent-bright)] no-underline hover:underline"
                      >
                        {member.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {symbol?.typeParameters?.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl">{t("typeParams")}</h2>
          <ul className="divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {symbol.typeParameters.map((param) => (
              <li key={param.name} className="px-4 py-3 font-mono text-sm">
                <span className="text-[#7dd3c7]">{param.name}</span>
                {param.type ? (
                  <span className="text-[var(--color-ink-soft)]">
                    {" "}
                    extends {formatType(param.type)}
                  </span>
                ) : null}
                {param.default ? (
                  <span className="text-[var(--color-ink-soft)]">
                    {" "}
                    = {formatType(param.default)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {symbol?.signatures?.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl">{t("signatures")}</h2>
          {symbol.signatures.map((sig, index) => (
            <div key={sig.id ?? index} className="space-y-3">
              <CodeBlock
                code={formatSignature(symbol, sig)}
                language="typescript"
                filename="signature.ts"
              />
              {summarizeComment({ comment: sig.comment } as ApiSymbol) ? (
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {summarizeComment({ comment: sig.comment } as ApiSymbol)}
                </p>
              ) : null}
              {sig.parameters?.length ? (
                <ul className="divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
                  {sig.parameters.map((param) => (
                    <li key={param.name} className="px-4 py-3">
                      <div className="font-mono text-sm">
                        <span className="text-[#7dd3c7]">{param.name}</span>
                        {param.flags?.isOptional ? "?" : ""}
                        <span className="text-[var(--color-ink-soft)]">
                          : {formatType(param.type)}
                        </span>
                      </div>
                      {summarizeComment({ comment: param.comment } as ApiSymbol) ? (
                        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                          {summarizeComment({ comment: param.comment } as ApiSymbol)}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {sections.length > 0 ? (
        sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-display text-xl">{section.title}</h2>
            <ul className="divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
              {section.members.map((member) => (
                <ApiMemberCard
                  key={member.id}
                  pkgId={pkg.id}
                  parentSlug={slug.map(decodeURIComponent)}
                  member={member}
                  nested={Boolean(symbol)}
                />
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="text-sm text-[var(--color-ink-soft)]">
          {symbol ? t("noMembers") : t("members")}
        </p>
      )}
    </article>
  );
}
