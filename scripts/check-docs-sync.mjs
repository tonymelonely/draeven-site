#!/usr/bin/env node
/**
 * Sanity-check that catalog, write-docs SLUGS, and SIDEBAR stay aligned.
 * Run: node scripts/check-docs-sync.mjs
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { catalog } from "./docs-catalog.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const writeDocs = await readFile(join(root, "scripts", "write-docs.mjs"), "utf8");
const docsTs = await readFile(join(root, "src", "lib", "docs.ts"), "utf8");
const metaTs = await readFile(join(root, "src", "lib", "docs-meta.ts"), "utf8");

const catalogSlugs = new Set(catalog.map((entry) => entry.slug));
const slugMatches = [...writeDocs.matchAll(/"([a-z0-9-]+)",/g)]
  .map((m) => m[1])
  .filter((slug, index, all) => {
    // Only the SLUGS array region — stop after feedback/glossary block heuristics
    return catalogSlugs.has(slug) || all.indexOf(slug) === index;
  });

const writeSlugs = [];
const slugBlock = /const SLUGS = \[([\s\S]*?)\];/.exec(writeDocs)?.[1] ?? "";
for (const match of slugBlock.matchAll(/"([a-z0-9-]+)"/g)) {
  writeSlugs.push(match[1]);
}

const sidebarSlugs = new Set();
for (const match of docsTs.matchAll(/slug: "([a-z0-9-]+)"/g)) {
  sidebarSlugs.add(match[1]);
}

const extrasKeys = new Set();
const extrasBlock = /export const DOC_EXTRAS[^=]*= \{([\s\S]*?)\n\};/.exec(metaTs)?.[1] ?? "";
for (const match of extrasBlock.matchAll(/^\s*"?([a-z0-9-]+)"?\s*:/gm)) {
  extrasKeys.add(match[1]);
}

const problems = [];

for (const slug of writeSlugs) {
  if (!catalogSlugs.has(slug)) problems.push(`write-docs SLUGS missing catalog entry: ${slug}`);
  if (!sidebarSlugs.has(slug)) problems.push(`SIDEBAR missing slug: ${slug}`);
}

for (const slug of catalogSlugs) {
  if (!writeSlugs.includes(slug)) problems.push(`catalog slug not in write-docs SLUGS: ${slug}`);
}

const warnings = [];
for (const slug of writeSlugs) {
  if (!extrasKeys.has(slug)) {
    warnings.push(`DOC_EXTRAS missing key (recommended): ${slug}`);
  }
}

if (warnings.length) {
  console.warn("[docs-sync] warnings:\n" + warnings.map((p) => ` - ${p}`).join("\n"));
}

if (problems.length) {
  console.error("[docs-sync] issues:\n" + problems.map((p) => ` - ${p}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`[docs-sync] ok — ${writeSlugs.length} slugs aligned`);
}
