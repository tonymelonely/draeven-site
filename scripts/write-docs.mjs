#!/usr/bin/env node
/**
 * Generates content/docs/{en,nl}/*.mdx from the catalog in docs-catalog.mjs.
 * Run: node scripts/write-docs.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { catalog } from "./docs-catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "docs");

const SLUGS = [
  "welcome",
  "install",
  "create-cli",
  "creating-app",
  "quickstart",
  "project-layout",
  "start-options",
  "recipes",
  "config",
  "rules",
  "architecture",
  "from-discordjs",
  "starters",
  "migration-checklist",
  "commands",
  "options",
  "subcommands",
  "context-menus",
  "autocomplete",
  "permissions",
  "command-meta",
  "cooldowns",
  "locales",
  "lookups",
  "format-date",
  "replies",
  "pieces",
  "sku",
  "collectors",
  "press-handlers",
  "embeds-layout",
  "canvas",
  "polls",
  "mod-actions",
  "transcript",
  "events-intents",
  "gateway-events",
  "presence",
  "sending-messages",
  "bot-handle",
  "discord-client",
  "debugging",
  "guard",
  "hot-reload-guard",
  "simulate",
  "alone",
  "bridge-desk",
  "deploy",
  "advanced-api",
  "troubleshooting",
  "why-failing",
  "known-limits",
  "changelog",
  "feedback",
  "glossary",
];

function mdx(locale, entry) {
  const meta = entry[locale];
  const body = meta.body.trim();
  return `---
title: ${meta.title}
description: ${meta.description}
order: ${entry.order}
---

${body}
`;
}

const bySlug = new Map(catalog.map((entry) => [entry.slug, entry]));

for (const slug of SLUGS) {
  if (!bySlug.has(slug)) {
    throw new Error(`[docs] Missing catalog entry for slug: ${slug}`);
  }
}

const en = Object.fromEntries(SLUGS.map((slug) => [slug, mdx("en", bySlug.get(slug))]));
const nl = Object.fromEntries(SLUGS.map((slug) => [slug, mdx("nl", bySlug.get(slug))]));

async function writeLocale(locale, docs) {
  const dir = join(root, locale);
  await mkdir(dir, { recursive: true });
  for (const slug of SLUGS) {
    const body = docs[slug];
    await writeFile(join(dir, `${slug}.mdx`), body, "utf8");
    console.log(`[docs] ${locale}/${slug}.mdx`);
  }
}

await writeLocale("en", en);
await writeLocale("nl", nl);
console.log(`[docs] wrote ${SLUGS.length} EN + ${SLUGS.length} NL guides`);
