import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { AppLocale } from "@/i18n/routing";
import { stripTrailingNavSections } from "@/lib/docs-meta";

export type DocBadge = "new" | "miss";

export type DocMeta = {
  slug: string[];
  title: string;
  description?: string;
  order: number;
  section?: string;
  /** Sidebar chip: new feature or often missed. */
  badge?: DocBadge;
  /** First H2 titles — used for docs-index hover previews. */
  preview?: string[];
};

const root = join(process.cwd(), "content", "docs");

const SIDEBAR: Record<
  AppLocale,
  Array<Omit<DocMeta, "slug"> & { slug: string }>
> = {
  en: [
    { slug: "welcome", title: "Welcome", section: "Start", order: 1 },
    { slug: "install", title: "Install", section: "Start", order: 2 },
    { slug: "create-cli", title: "create-draeven CLI", section: "Start", order: 3 },
    { slug: "creating-app", title: "Creating an app", section: "Start", order: 4 },
    { slug: "quickstart", title: "Quickstart", section: "Start", order: 5 },
    { slug: "project-layout", title: "Project layout", section: "Start", order: 6 },
    { slug: "start-options", title: "Start options", section: "Start", order: 7 },
    { slug: "recipes", title: "Recipes", section: "Start", order: 8 },
    { slug: "config", title: "Config file", section: "Start", order: 9 },
    { slug: "rules", title: "Rules of thumb", section: "Start", order: 10 },
    { slug: "architecture", title: "How it fits", section: "Start", order: 11 },
    { slug: "from-discordjs", title: "From discord.js", section: "Start", order: 12 },
    { slug: "starters", title: "Starter bots", section: "Start", order: 13 },
    { slug: "migration-checklist", title: "Migration checklist", section: "Start", order: 14 },
    { slug: "commands", title: "Commands", section: "Commands", order: 20 },
    { slug: "options", title: "Options", section: "Commands", order: 21 },
    { slug: "subcommands", title: "Subcommands", section: "Commands", order: 22 },
    { slug: "context-menus", title: "Context menus", section: "Commands", order: 23 },
    { slug: "autocomplete", title: "Autocomplete", section: "Commands", order: 24 },
    { slug: "permissions", title: "Permissions & gates", section: "Commands", order: 25 },
    { slug: "command-meta", title: "Command metadata", section: "Commands", order: 26 },
    { slug: "cooldowns", title: "Cooldowns", section: "Commands", order: 27 },
    { slug: "locales", title: "Locales", section: "Commands", order: 28 },
    { slug: "lookups", title: "Lookups", section: "Commands", order: 29 },
    { slug: "format-date", title: "formatDate utility", section: "Commands", order: 30 },
    { slug: "replies", title: "Replies & followups", section: "Interactions", order: 40 },
    { slug: "pieces", title: "Buttons, menus & forms", section: "Interactions", order: 41 },
    { slug: "sku", title: "SKU buttons", section: "Interactions", order: 42 },
    { slug: "collectors", title: "Collectors", section: "Interactions", order: 43 },
    { slug: "press-handlers", title: "Press & submit", section: "Interactions", order: 44, badge: "new" },
    { slug: "embeds-layout", title: "Embeds & layout", section: "Interactions", order: 45 },
    { slug: "canvas", title: "Canvas", section: "Interactions", order: 46 },
    { slug: "polls", title: "Polls", section: "Interactions", order: 47 },
    { slug: "mod-actions", title: "Moderation actions", section: "Interactions", order: 48 },
    { slug: "transcript", title: "Transcripts", section: "Interactions", order: 49 },
    { slug: "events-intents", title: "Events & intents", section: "Gateway", order: 60, badge: "miss" },
    { slug: "gateway-events", title: "Gateway event payloads", section: "Gateway", order: 61 },
    { slug: "presence", title: "Presence", section: "Gateway", order: 62 },
    { slug: "sending-messages", title: "Sending messages", section: "Gateway", order: 63 },
    { slug: "bot-handle", title: "Bot handle", section: "Gateway", order: 64 },
    { slug: "discord-client", title: "@draeven/discord", section: "Gateway", order: 65 },
    { slug: "debugging", title: "Errors & debugging", section: "Ops", order: 70 },
    { slug: "guard", title: "Error guard", section: "Ops", order: 71 },
    { slug: "hot-reload-guard", title: "Hot-reload & guard", section: "Ops", order: 72 },
    { slug: "simulate", title: "Simulate & tests", section: "Ops", order: 73 },
    { slug: "alone", title: "One process", section: "Ops", order: 74 },
    { slug: "bridge-desk", title: "Bridge & desk", section: "Ops", order: 75 },
    { slug: "deploy", title: "Deploy", section: "Ops", order: 76 },
    { slug: "advanced-api", title: "Advanced API", section: "Ops", order: 77 },
    { slug: "troubleshooting", title: "Troubleshooting", section: "Ops", order: 78 },
    { slug: "why-failing", title: "Why is this failing?", section: "Ops", order: 79 },
    { slug: "known-limits", title: "Known limits", section: "Meta", order: 90 },
    { slug: "changelog", title: "Changelog", section: "Meta", order: 91 },
    { slug: "feedback", title: "Feedback", section: "Meta", order: 92 },
    { slug: "glossary", title: "Glossary", section: "Meta", order: 93 },
  ],
  nl: [
    { slug: "welcome", title: "Welkom", section: "Beginnen", order: 1 },
    { slug: "install", title: "Installatie", section: "Beginnen", order: 2 },
    { slug: "create-cli", title: "create-draeven CLI", section: "Beginnen", order: 3 },
    { slug: "creating-app", title: "App aanmaken", section: "Beginnen", order: 4 },
    { slug: "quickstart", title: "Snelstart", section: "Beginnen", order: 5 },
    { slug: "project-layout", title: "Projectstructuur", section: "Beginnen", order: 6 },
    { slug: "start-options", title: "Start-opties", section: "Beginnen", order: 7 },
    { slug: "recipes", title: "Recepten", section: "Beginnen", order: 8 },
    { slug: "config", title: "Configbestand", section: "Beginnen", order: 9 },
    { slug: "rules", title: "Vuistregels", section: "Beginnen", order: 10 },
    { slug: "architecture", title: "Hoe het in elkaar zit", section: "Beginnen", order: 11 },
    { slug: "from-discordjs", title: "Vanuit discord.js", section: "Beginnen", order: 12 },
    { slug: "starters", title: "Starter-bots", section: "Beginnen", order: 13 },
    { slug: "migration-checklist", title: "Migratie-checklist", section: "Beginnen", order: 14 },
    { slug: "commands", title: "Commando's", section: "Commando's", order: 20 },
    { slug: "options", title: "Opties", section: "Commando's", order: 21 },
    { slug: "subcommands", title: "Subcommando's", section: "Commando's", order: 22 },
    { slug: "context-menus", title: "Contextmenu's", section: "Commando's", order: 23 },
    { slug: "autocomplete", title: "Automatisch aanvullen", section: "Commando's", order: 24 },
    { slug: "permissions", title: "Rechten & gates", section: "Commando's", order: 25 },
    { slug: "command-meta", title: "Commando-metadata", section: "Commando's", order: 26 },
    { slug: "cooldowns", title: "Wachttijden", section: "Commando's", order: 27 },
    { slug: "locales", title: "Taalvarianten", section: "Commando's", order: 28 },
    { slug: "lookups", title: "Opzoeken (lookups)", section: "Commando's", order: 29 },
    { slug: "format-date", title: "formatDate-hulp", section: "Commando's", order: 30 },
    { slug: "replies", title: "Antwoorden & follow-ups", section: "Interacties", order: 40 },
    { slug: "pieces", title: "Knoppen, menu's & formulieren", section: "Interacties", order: 41 },
    { slug: "sku", title: "SKU-knoppen", section: "Interacties", order: 42 },
    { slug: "collectors", title: "Verzamelaars", section: "Interacties", order: 43 },
    { slug: "press-handlers", title: "Press & submit", section: "Interacties", order: 44, badge: "new" },
    { slug: "embeds-layout", title: "Embeds en layout", section: "Interacties", order: 45 },
    { slug: "canvas", title: "Canvas", section: "Interacties", order: 46 },
    { slug: "polls", title: "Peilingen", section: "Interacties", order: 47 },
    { slug: "mod-actions", title: "Mod-acties", section: "Interacties", order: 48 },
    { slug: "transcript", title: "Transcripten", section: "Interacties", order: 49 },
    { slug: "events-intents", title: "Events en intents", section: "Gateway", order: 60, badge: "miss" },
    { slug: "gateway-events", title: "Gateway-events: payloads", section: "Gateway", order: 61 },
    { slug: "presence", title: "Aanwezigheid", section: "Gateway", order: 62 },
    { slug: "sending-messages", title: "Berichten sturen", section: "Gateway", order: 63 },
    { slug: "bot-handle", title: "Bot-handle", section: "Gateway", order: 64 },
    { slug: "discord-client", title: "@draeven/discord", section: "Gateway", order: 65 },
    { slug: "debugging", title: "Fouten & debuggen", section: "Beheer", order: 70 },
    { slug: "guard", title: "Foutafhandeling (guard)", section: "Beheer", order: 71 },
    { slug: "hot-reload-guard", title: "Hot-reload en guard", section: "Beheer", order: 72 },
    { slug: "simulate", title: "Simuleren en tests", section: "Beheer", order: 73 },
    { slug: "alone", title: "Één proces", section: "Beheer", order: 74 },
    { slug: "bridge-desk", title: "Bridge en desk", section: "Beheer", order: 75 },
    { slug: "deploy", title: "Deployen", section: "Beheer", order: 76 },
    { slug: "advanced-api", title: "Geavanceerde API", section: "Beheer", order: 77 },
    { slug: "troubleshooting", title: "Problemen oplossen", section: "Beheer", order: 78 },
    { slug: "why-failing", title: "Waarom faalt dit?", section: "Beheer", order: 79 },
    { slug: "known-limits", title: "Bekende limieten", section: "Overig", order: 90 },
    { slug: "changelog", title: "Wijzigingenlog", section: "Overig", order: 91 },
    { slug: "feedback", title: "Terugkoppeling", section: "Overig", order: 92 },
    { slug: "glossary", title: "Glossarium", section: "Overig", order: 93 },
  ],
};

export function docsSidebar(locale: AppLocale): DocMeta[] {
  return SIDEBAR[locale].map((item) => ({
    ...item,
    slug: [item.slug],
  }));
}

/** Sidebar entries enriched with MDX frontmatter + preview headings (docs index). */
export async function docsIndex(locale: AppLocale): Promise<DocMeta[]> {
  const items = docsSidebar(locale);
  return Promise.all(
    items.map(async (item) => {
      const path = join(root, locale, `${item.slug.join("/")}.mdx`);
      if (!existsSync(path)) return item;
      try {
        const raw = await readFile(path, "utf8");
        const { data, content } = matter(raw);
        const preview = extractHeadings(content)
          .filter((heading) => heading.level === 2)
          .slice(0, 3)
          .map((heading) => heading.text);
        return {
          ...item,
          description:
            typeof data.description === "string" ? data.description : item.description,
          preview,
        };
      } catch {
        return item;
      }
    })
  );
}

export async function listDocFiles(locale: AppLocale): Promise<string[]> {
  const dir = join(root, locale);
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir);
  return entries.filter((name) => name.endsWith(".mdx") || name.endsWith(".md"));
}

export async function getDoc(
  locale: AppLocale,
  slug: string[]
): Promise<{ content: string; meta: DocMeta } | null> {
  const base = slug.join("/") || "welcome";
  const path = join(root, locale, `${base}.mdx`);
  // Never fall back across locales — EN pages stay EN, NL pages stay NL.
  if (!existsSync(path)) return null;

  const raw = await readFile(path, "utf8");
  const { content, data } = matter(raw);
  const sidebar = docsSidebar(locale).find((item) => item.slug.join("/") === base);

  return {
    content: stripTrailingNavSections(content),
    meta: {
      slug: base.split("/"),
      title: typeof data.title === "string" ? data.title : sidebar?.title || base,
      description: typeof data.description === "string" ? data.description : undefined,
      order: typeof data.order === "number" ? data.order : sidebar?.order || 99,
      section: sidebar?.section,
      ...(sidebar?.badge ? { badge: sidebar.badge } : {}),
    },
  };
}

export function extractHeadings(markdown: string): Array<{ id: string; text: string; level: number }> {
  const slugger = new GithubSlugger();
  const headings: Array<{ id: string; text: string; level: number }> = [];
  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    const html = /^<h([23])(?:\s+[^>]*?\bid=["']([^"']+)["'][^>]*)?>(.+?)<\/h\1>$/i.exec(trimmed);
    if (html) {
      const text = html[3]!.replace(/<[^>]+>/g, "").replace(/[`*_]/g, "").trim();
      const id = html[2] || slugger.slug(text);
      if (html[2]) slugger.slug(text); // keep slugger in sync when id is explicit
      headings.push({ id, text, level: Number(html[1]) });
      continue;
    }
    const match = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!match) continue;
    const text = match[2]!.replace(/[`*_]/g, "").trim();
    headings.push({ id: slugger.slug(text), text, level: match[1]!.length });
  }
  return headings;
}
