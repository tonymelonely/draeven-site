#!/usr/bin/env node
/**
 * Rewrite Dutch docs only: anglicisms + user-facing strings in NL samples.
 * Catalog: transforms each entry's `nl.body` / `nl.description` / `nl.title` only.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function rewriteProse(text) {
  let out = text;

  out = out.replace(/## Wat gooit/g, "## Wat faalt");
  out = out.replace(/Als de handler gooit/g, "Als de handler faalt");
  out = out.replace(/Als een aanroep gooit/g, "Als een aanroep faalt");
  out = out.replace(/Een handler die gooit/g, "Een handler die faalt");
  out = out.replace(/Onbekende eventnamen gooien\./g, "Onbekende eventnamen geven een foutmelding.");
  out = out.replace(/gooien bij het laden/g, "geven een foutmelding bij het laden");
  out = out.replace(/gooien als/g, "geven een foutmelding als");
  out = out.replace(/gooien\./g, "geven een foutmelding.");
  out = out.replace(/Ze gooien /g, "Ze geven een foutmelding ");
  out = out.replace(/ gooien /g, " geven een foutmelding ");

  out = out.replace(/gooit `([^`]+)`/g, "geeft de fout `$1`");
  out = out.replace(/gooit \\`([^`]+)\\`/g, "geeft de fout \\`$1\\`");
  out = out.replace(/gooit "([^"]+)"/g, 'geeft de fout "$1"');

  out = out.replace(/gooit als/g, "faalt als");
  out = out.replace(/gooit wanneer/g, "faalt wanneer");
  out = out.replace(/gooit bij/g, "faalt bij");
  out = out.replace(/gooit al /g, "faalt al ");
  out = out.replace(/gooit onder/g, "faalt onder");
  out = out.replace(/gooit en /g, "faalt en ");
  out = out.replace(/gooit vóór/g, "faalt vóór");
  out = out.replace(/gooit voordat/g, "faalt voordat");
  out = out.replace(/gooit terwijl/g, "faalt terwijl");
  out = out.replace(/gooit voor /g, "faalt voor ");
  out = out.replace(/gooit tot /g, "faalt tot ");
  out = out.replace(/gooit\./g, "geeft een foutmelding.");
  out = out.replace(/gooit,/g, "faalt,");
  out = out.replace(/gooit —/g, "faalt —");
  out = out.replace(/gooit -/g, "faalt -");
  out = out.replace(/ gooit$/gm, " geeft een foutmelding");
  out = out.replace(/ gooit /g, " faalt ");

  out = out.replace(/\bgooit\b/g, "faalt");
  out = out.replace(/\bgooien\b/g, "geven een foutmelding");

  out = out.replace(/\| Stuk \|/g, "| Element |");
  out = out.replace(/\bstukken\b/g, "componenten");
  out = out.replace(/\bStukken\b/g, "Componenten");
  out = out.replace(/weergavestukken/g, "weergave-elementen");
  out = out.replace(/wel een stuk genaamd/g, "wel een element genaamd");

  out = out.replace(/\bOverlappende wachters\b/g, "Overlappende collectors");
  out = out.replace(/\bwachters van het eerste boek\b/g, "collectors van het eerste boek");
  out = out.replace(/\been wachter klopt\b/g, "een collector matcht");
  out = out.replace(/\bwachter\b/g, "collector");
  out = out.replace(/\bWachters\b/g, "Collectors");
  out = out.replace(/\| Treffer \|/g, "| Match |");
  out = out.replace(/de volgende treffer/g, "de volgende match");
  out = out.replace(/Geen treffer/g, "Geen match");
  out = out.replace(/\btreffer\b/g, "match");
  out = out.replace(/\bTreffer\b/g, "Match");

  out = out.replace(/Timeout resolvet undefined/g, "Timeout wordt `undefined`");
  out = out.replace(/Timeout resolvet \\`undefined\\`/g, "Timeout wordt \\`undefined\\`");

  // Mild punctuation around identifiers (space before/after stray dots)
  out = out.replace(/commando-\s+`/g, "commando-`");
  out = out.replace(/`\s+\.\s+/g, "`. ");

  return out;
}

/** User-facing strings inside NL code samples (MDX + catalog escaped templates). */
function rewriteNlCodeStrings(text) {
  let out = text;

  // Escaped template literals inside catalog .mjs bodies (\`...\${...}\`)
  out = out.replace(
    /You picked \*\*\\\$\{letter\}\*\*/g,
    "Je koos **\\${letter}**"
  );
  out = out.replace(
    /Timed out \\\$\{ctx\.who\.name\} for \\\$\{ctx\.minutes\} minutes\./g,
    "Timeout voor \\${ctx.who.name}: \\${ctx.minutes} minuten."
  );
  out = out.replace(
    /Timed out \\\$\{ctx\.who\.name\} for \\\$\{minutes\}m\./g,
    "Timeout voor \\${ctx.who.name}: \\${minutes}m."
  );
  out = out.replace(
    /Timed out \\\$\{ctx\.who\.name\}\./g,
    "Timeout voor \\${ctx.who.name}."
  );
  out = out.replace(
    /Welcome <@\\\$\{member\.id\}>\./g,
    "Welkom <@\\${member.id}>."
  );

  // Live template literals in MDX / TSX
  out = out.replace(/You picked \*\*\$\{letter\}\*\*/g, "Je koos **${letter}**");
  out = out.replace(
    /Timed out \$\{ctx\.who\.name\} for \$\{ctx\.minutes\} minutes\./g,
    "Timeout voor ${ctx.who.name}: ${ctx.minutes} minuten."
  );
  out = out.replace(
    /Timed out \$\{ctx\.who\.name\} for \$\{minutes\}m\./g,
    "Timeout voor ${ctx.who.name}: ${minutes}m."
  );
  out = out.replace(/Timed out \$\{ctx\.who\.name\}\./g, "Timeout voor ${ctx.who.name}.");
  out = out.replace(/Welcome <@\$\{member\.id\}>\./g, "Welkom <@${member.id}>.");

  const pairs = [
    ['"Posts letter buttons"', '"Plaatst letterknoppen"'],
    ["Posts letter buttons.", "Plaatst letterknoppen."],
    ['"Pick a letter."', '"Kies een letter."'],
    ['"You picked **A**."', '"Je koos **A**."'],
    ['"Timed out."', '"Timeout."'],
    ['"Timed out"', '"Timeout"'],
    ['"Yes or no"', '"Ja of nee"'],
    ['"Pick a channel"', '"Kies een kanaal"'],
    ['"Delete the last report?"', '"Het laatste rapport wissen?"'],
    ['"Deleted."', '"Gewist."'],
    ['"Kept."', '"Gehouden."'],
    ['label: "Delete"', 'label: "Wissen"'],
    ['label: "Keep"', 'label: "Houden"'],
    ['label: "Yes"', 'label: "Ja"'],
    ['label: "No"', 'label: "Nee"'],
    ['"Checks whether the bot is alive"', '"Checkt of de bot leeft"'],
    ['"Alive?"', '"Leeft?"'],
    ['"Timed out via /mute"', '"Timeout via /mute"'],
    ['"Timed out via command"', '"Timeout via commando"'],
    ['"Timeout a member"', '"Timeout voor een lid"'],
    ['"Moderation tools"', '"Moderatietools"'],
    ['"Pick a size"', '"Kies een maat"'],
    [
      '"Nothing is collecting. The button answers later."',
      '"Er wordt niet verzameld. De knop antwoordt later."',
    ],
    ['"Ping again"', '"Nog eens ping"'],
    ['" pressed again."', '" drukte opnieuw."'],
    ['"A button that answers itself"', '"Een knop die zichzelf beantwoordt"'],
    ['"Support the bot."', '"Steun de bot."'],
    ['"What you get"', '"Wat je krijgt"'],
    ['"Supporter button"', '"Supporter-knop"'],
    ['"Write a note"', '"Schrijf een notitie"'],
    ['title: "Note"', 'title: "Notitie"'],
    ['label: "Note"', 'label: "Notitie"'],
    ['"Where should the log go?"', '"Waar moet het log heen?"'],
    ['placeholder: "Text channel"', 'placeholder: "Tekstkanaal"'],
    ['ctx.reply("Yes.")', 'ctx.reply("Ja.")'],
    ['"Open a ticket?"', '"Ticket openen?"'],
    ['label: "Open"', 'label: "Openen"'],
    ['"Open a support ticket"', '"Open een supportticket"'],
    [
      '"Ticket noted — a moderator will follow up."',
      '"Ticket genoteerd — een moderator volgt op."',
    ],
    ['"Who?"', '"Wie?"'],
    ['"Minutes"', '"Minuten"'],
    ['"Minutes?"', '"Minuten?"'],
    ['"Member"', '"Lid"'],
    ['"Via /mod timeout"', '"Via /mod timeout"'],
  ];

  for (const [from, to] of pairs) {
    if (from !== to) out = out.split(from).join(to);
  }
  return out;
}

function rewriteNl(text) {
  return rewriteNlCodeStrings(rewriteProse(text));
}

/**
 * Rewrite string contents of `nl: { title, description, body }` blocks in catalog modules.
 * Bodies are template literals; titles/descriptions are often quoted strings.
 */
function rewriteCatalogNlBodies(source) {
  let out = "";
  let i = 0;
  const marker = "nl: {";
  while (i < source.length) {
    const idx = source.indexOf(marker, i);
    if (idx === -1) {
      out += source.slice(i);
      break;
    }
    out += source.slice(i, idx);
    // Find matching closing brace for nl object (naive but works for our catalog shape)
    let depth = 0;
    let j = idx + marker.length - 1; // at '{'
    let inTick = false;
    let inStr = null;
    let escaped = false;
    for (; j < source.length; j++) {
      const ch = source[j];
      if (inTick) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === "`") {
          inTick = false;
          continue;
        }
        continue;
      }
      if (inStr) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === inStr) {
          inStr = null;
          continue;
        }
        continue;
      }
      if (ch === "`") {
        inTick = true;
        continue;
      }
      if (ch === '"' || ch === "'") {
        inStr = ch;
        continue;
      }
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          j++; // include closing }
          break;
        }
      }
    }
    const block = source.slice(idx, j);
    out += rewriteNl(block);
    i = j;
  }
  return out;
}

function rewriteFile(path, mode) {
  const before = readFileSync(path, "utf8");
  let after = before;
  if (mode === "catalog") after = rewriteCatalogNlBodies(before);
  else if (mode === "nl-full") after = rewriteNl(before);
  else if (mode === "prose-only") after = rewriteProse(before);
  if (after !== before) {
    writeFileSync(path, after);
    return true;
  }
  return false;
}

/**
 * For TS/TSX with `nl: { ... }` or `nl: "..."` locale maps — rewrite nl branches only.
 * Falls back to full-file prose when the file is NL-keyed maps with `nl:` markers.
 */
function rewriteLocaleMaps(source) {
  // Prefer structured nl: { } objects (DocTour, CodeResult scenes, explain topics)
  if (source.includes("nl: {") || source.includes("nl:{")) {
    return rewriteCatalogNlBodies(source);
  }
  // error-map style: nl: "..."
  return source.replace(/\bnl:\s*"((?:\\.|[^"\\])*)"/g, (full, inner) => {
    const decoded = inner.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const next = rewriteProse(decoded);
    if (next === decoded) return full;
    return `nl: ${JSON.stringify(next)}`;
  });
}

const changed = [];

for (const file of [
  "scripts/docs-catalog.mjs",
  "scripts/docs-catalog-extras.mjs",
  "scripts/docs-catalog-gaps.mjs",
  "scripts/docs-catalog-gaps-more.mjs",
  "scripts/docs-catalog-gaps-rest.mjs",
]) {
  if (rewriteFile(join(root, file), "catalog")) changed.push(file);
}

const nlDir = join(root, "content/docs/nl");
for (const name of readdirSync(nlDir)) {
  if (!name.endsWith(".mdx")) continue;
  const rel = `content/docs/nl/${name}`;
  if (rewriteFile(join(root, rel), "nl-full")) changed.push(rel);
}

for (const file of [
  "src/lib/explain-topics.ts",
  "src/lib/error-map.ts",
  "src/lib/guide-checks.ts",
  "src/lib/migration-checklist.ts",
  "src/components/docs/DocTour.tsx",
  "src/components/docs/ErrorPaste.tsx",
  "src/components/docs/CodeResult.tsx",
]) {
  const path = join(root, file);
  try {
    const before = readFileSync(path, "utf8");
    const after = rewriteLocaleMaps(before);
    if (after !== before) {
      writeFileSync(path, after);
      changed.push(file);
    }
  } catch {
    /* missing */
  }
}

console.log(`[rewrite-nl] updated ${changed.length} files`);
for (const file of changed) console.log(` - ${file}`);
