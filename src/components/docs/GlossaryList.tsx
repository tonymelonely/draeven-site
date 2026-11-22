import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GLOSSARY } from "@/lib/glossary";

export async function GlossaryList() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <dl className="my-6 space-y-4">
      {GLOSSARY.map((entry) => (
        <div
          key={entry.id}
          id={entry.id}
          className="scroll-mt-8 border-b border-[var(--color-line)] pb-4"
        >
          <dt className="font-mono text-sm text-[var(--color-accent-bright)]">{entry.term}</dt>
          <dd className="mt-1 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            {isNl ? entry.nl : entry.en}{" "}
            <Link href={entry.href} className="text-[var(--color-ink)] no-underline hover:underline">
              {isNl ? "Meer →" : "More →"}
            </Link>
          </dd>
        </div>
      ))}
    </dl>
  );
}
