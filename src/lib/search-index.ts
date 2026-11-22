import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { docsSidebar, extractHeadings } from "@/lib/docs";
import { getDocExtras } from "@/lib/docs-meta";
import { errorMapAliases } from "@/lib/error-map";
import { GLOSSARY } from "@/lib/glossary";
import { listPackageSummaries } from "@/lib/api-docs";
import type { AppLocale } from "@/i18n/routing";
import type { SearchItem } from "@/components/chrome/CommandPalette";

const LABELS: Record<
  AppLocale,
  {
    home: string;
    docs: string;
    api: string;
    roadmap: string;
    feedback: string;
    site: string;
    guides: string;
  }
> = {
  en: {
    home: "Home",
    docs: "Docs",
    api: "API",
    roadmap: "Roadmap",
    feedback: "Feedback",
    site: "Site",
    guides: "Docs",
  },
  nl: {
    home: "Start",
    docs: "Documentatie",
    api: "API",
    roadmap: "Routekaart",
    feedback: "Terugkoppeling",
    site: "Site",
    guides: "Documentatie",
  },
};

async function docSnippet(locale: AppLocale, slug: string, fallback: string): Promise<string> {
  try {
    const path = join(process.cwd(), "content", "docs", locale, `${slug}.mdx`);
    const raw = await readFile(path, "utf8");
    const body = raw.replace(/^---[\s\S]*?---\s*/, "");
    const desc = /^description:\s*(.+)$/m.exec(raw)?.[1]?.trim();
    if (desc) return desc.slice(0, 140);
    const first = extractHeadings(body).find((h) => h.level === 2);
    if (first) return first.text.slice(0, 140);
  } catch {
    /* missing during first boot */
  }
  return fallback.slice(0, 140);
}

/** Keep the layout payload small — never embed TypeDoc trees into RSC props. */
export async function buildSearchItems(locale: AppLocale): Promise<SearchItem[]> {
  const label = LABELS[locale];
  const items: SearchItem[] = [
    { href: "/", title: label.home, group: label.site },
    { href: "/docs", title: label.docs, group: label.site },
    { href: "/reference", title: label.api, group: label.site },
    { href: "/roadmap", title: label.roadmap, group: label.site },
    { href: "/feedback", title: label.feedback, group: label.site },
  ];

  for (const doc of docsSidebar(locale)) {
    const slug = doc.slug.join("/");
    const extras = getDocExtras(slug);
    const snippet = await docSnippet(locale, slug, doc.title);
    items.push({
      href: `/docs/${slug}`,
      title: doc.title,
      group: label.guides,
      keywords: extras.aliases,
      snippet,
    });
  }

  for (const entry of GLOSSARY) {
    items.push({
      href: `/docs/glossary#${entry.id}`,
      title: entry.term,
      group: locale === "nl" ? "Glossarium" : "Glossary",
      keywords: [entry.term, entry.id],
      snippet: locale === "nl" ? entry.nl : entry.en,
    });
  }

  items.push({
    href: "/docs/why-failing",
    title: locale === "nl" ? "Foutkaart" : "Error map",
    group: label.guides,
    keywords: errorMapAliases(),
    snippet:
      locale === "nl"
        ? "Symptoom → oorzaak → gids"
        : "Symptom → cause → guide",
  });

  try {
    for (const pkg of listPackageSummaries()) {
      items.push({
        href: `/reference/${pkg.id}`,
        title: pkg.name,
        group: "API",
        keywords: [pkg.id, pkg.name.replace("@", "")],
      });
    }
  } catch {
    /* API JSON missing during first boot */
  }

  return items;
}
