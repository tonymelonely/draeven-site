/**
 * Syncs content/docs/{en,nl}/embeds-layout.mdx bodies back into docs-catalog.mjs
 * so the next write-docs run does not wipe Explain markup.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = join(root, "scripts", "docs-catalog.mjs");

function loadBody(locale) {
  const raw = readFileSync(join(root, "content", "docs", locale, "embeds-layout.mdx"), "utf8");
  const { content, data } = matter(raw);
  return {
    title: data.title,
    description: data.description,
    body: content.replace(/\r\n/g, "\n").trim(),
  };
}

const en = loadBody("en");
const nl = loadBody("nl");

let catalog = readFileSync(catalogPath, "utf8");
const start = catalog.search(/\r?\n  \{\r?\n    slug: "embeds-layout"/);
// Stop at the entry that immediately follows embeds-layout.
// canvas (and any later page such as sku) must stay outside this slice;
// searching for "polls" would delete whatever sits between the two.
const end = catalog.search(/\r?\n  \{\r?\n    slug: "canvas"/);
if (start < 0 || end < 0) throw new Error(`embeds-layout markers missing ${start} ${end}`);

// Include the leading newline in the slice start so we keep prior comma/newline intact.
const cutStart = start + (catalog[start] === "\r" ? 2 : 1);

function asTemplate(body) {
  return (
    "`\n" +
    body
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${") +
    "\n`"
  );
}

const block = `  {
    slug: "embeds-layout",
    order: 24,
    en: {
      title: ${JSON.stringify(en.title)},
      description: ${JSON.stringify(en.description)},
      body: ${asTemplate(en.body)},
    },
    nl: {
      title: ${JSON.stringify(nl.title)},
      description: ${JSON.stringify(nl.description)},
      body: ${asTemplate(nl.body)},
    },
  },
`;

writeFileSync(catalogPath, catalog.slice(0, cutStart) + block + catalog.slice(end + (catalog[end] === "\r" ? 2 : 1)));
console.log("synced embeds-layout into docs-catalog.mjs");
