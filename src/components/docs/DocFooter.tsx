import { Link } from "@/i18n/navigation";
import { docsSidebar } from "@/lib/docs";
import { getDocExtras } from "@/lib/docs-meta";
import type { AppLocale } from "@/i18n/routing";

export function DocFooter({
  locale,
  slug,
  labels,
}: {
  locale: AppLocale;
  slug: string;
  labels: {
    related: string;
    api: string;
    version: string;
  };
}) {
  const extras = getDocExtras(slug);
  const sidebar = docsSidebar(locale);
  const bySlug = new Map(sidebar.map((item) => [item.slug.join("/"), item]));

  const related = extras.related
    .map((id) => bySlug.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const api = extras.api ?? [];

  if (!related.length && !api.length) {
    return (
      <div className="mt-10 border-t border-[var(--color-line)] pt-6">
        <p className="text-[0.7rem] text-[var(--color-ink-soft)]">{labels.version}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6 border-t border-[var(--color-line)] pt-8">
      {related.length ? (
        <div>
          <p className="mb-2 text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-soft)] uppercase">
            {labels.related}
          </p>
          <ul className="flex flex-wrap gap-2">
            {related.map((item) => (
              <li key={item.slug.join("/")}>
                <Link
                  href={`/docs/${item.slug.join("/")}`}
                  className="docs-path-step inline-flex px-3 py-1.5 text-sm no-underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {api.length ? (
        <div>
          <p className="mb-2 text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-soft)] uppercase">
            {labels.api}
          </p>
          <ul className="flex flex-wrap gap-2">
            {api.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-mist)_20%,transparent)] px-3 py-1.5 font-mono text-sm shadow-[inset_0_1px_0_color-mix(in_srgb,white_5%,transparent)] no-underline transition hover:border-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-[0.7rem] text-[var(--color-ink-soft)]">{labels.version}</p>
    </div>
  );
}
