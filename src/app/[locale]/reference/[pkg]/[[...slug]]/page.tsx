import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ApiSymbolView } from "@/components/docs/ApiSymbolView";
import { getPackage, getSymbol, kindLabel, symbolPath } from "@/lib/api-docs";

export default async function ReferenceSymbolPage({
  params,
}: {
  params: Promise<{ locale: string; pkg: string; slug?: string[] }>;
}) {
  const { locale, pkg: pkgId, slug = [] } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("api");
  const pkg = getPackage(pkgId);
  if (!pkg) notFound();

  const symbol = slug.length > 0 ? getSymbol(pkg, slug) : null;
  if (slug.length > 0 && !symbol) notFound();

  const sidebar = pkg.children
    .filter((child) => Boolean(child?.name))
    .slice()
    .sort((a, b) => {
      const ka = kindLabel(a);
      const kb = kindLabel(b);
      if (ka !== kb) return ka.localeCompare(kb);
      return a.name.localeCompare(b.name);
    });

  const grouped = new Map<string, typeof sidebar>();
  for (const child of sidebar) {
    const key = kindLabel(child);
    const list = grouped.get(key) || [];
    list.push(child);
    grouped.set(key, list);
  }

  return (
    <div className="mx-auto grid w-full gap-8 px-4 py-10 lg:grid-cols-[18rem_minmax(0,1fr)] sm:px-6 lg:px-8">
      <aside>
        <Link href="/reference" className="mb-4 inline-block text-sm text-[var(--color-accent-bright)]">
          ← {t("back")}
        </Link>
        <h2 className="font-display mb-1 text-lg">{pkg.name}</h2>
        {pkg.version ? (
          <p className="mb-3 text-xs text-[var(--color-ink-soft)]">v{pkg.version}</p>
        ) : null}
        <nav className="max-h-[75vh] space-y-4 overflow-auto pr-2">
          {[...grouped.entries()].map(([kind, items]) => (
            <div key={kind}>
              <p className="mb-1 px-2 text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
                {kind}
              </p>
              <div className="space-y-0.5">
                {items.map((child) => {
                  const href = symbolPath(pkg.id, [child.name]);
                  const active = slug[0] === child.name;
                  return (
                    <Link
                      key={child.id}
                      href={href}
                      className={`block rounded-xl px-3 py-1.5 text-sm no-underline ${
                        active
                          ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
                          : "text-[var(--color-ink-soft)] hover:bg-[var(--color-accent-soft)]"
                      }`}
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <ApiSymbolView pkg={pkg} symbol={symbol} slug={slug} />
    </div>
  );
}
