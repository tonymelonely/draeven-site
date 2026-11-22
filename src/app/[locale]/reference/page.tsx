import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { kindLabel, listGeneratedPackages } from "@/lib/api-docs";

export default async function ReferenceIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("api");
  const packages = listGeneratedPackages();

  return (
    <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl space-y-3">
        <p className="text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">
          {t("packages")}
        </p>
        <h1 className="font-display text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-[var(--color-ink-soft)]">{t("lead")}</p>
      </header>

      {packages.length < 1 ? (
        <p className="panel p-5 text-[var(--color-ink-soft)]">{t("empty")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/reference/${pkg.id}`}
              className="panel block p-5 no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
            >
              <h2 className="font-display text-xl">{pkg.name}</h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {pkg.children.length} symbols
                {pkg.version ? ` · v${pkg.version}` : ""}
              </p>
              <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
                e.g. {pkg.children.slice(0, 3).map((child) => child.name).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
