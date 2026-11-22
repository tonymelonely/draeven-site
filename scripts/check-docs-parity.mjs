#!/usr/bin/env node
/**
 * EN/NL structural parity for catalog bodies.
 * Run: node scripts/check-docs-parity.mjs
 */
import { catalog } from "./docs-catalog.mjs";

const problems = [];
const warnings = [];

function count(tag, body) {
  const open = body.match(new RegExp(`<${tag}(\\s|>)`, "g"))?.length ?? 0;
  return open;
}

function headings(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
}

for (const entry of catalog) {
  const { slug, en, nl } = entry;
  const enWarn = count("Warn", en.body);
  const nlWarn = count("Warn", nl.body);
  if (enWarn !== nlWarn) {
    problems.push(`${slug}: Warn count EN=${enWarn} NL=${nlWarn}`);
  }

  const enExplain = count("Explain", en.body);
  const nlExplain = count("Explain", nl.body);
  if (Math.abs(enExplain - nlExplain) > 1) {
    warnings.push(`${slug}: Explain count EN=${enExplain} NL=${nlExplain}`);
  }

  const enFix = (en.body.match(/\bfix="/g) ?? []).length;
  const nlFix = (nl.body.match(/\bfix="/g) ?? []).length;
  if (enFix !== nlFix) {
    problems.push(`${slug}: Warn fix= props EN=${enFix} NL=${nlFix}`);
  }

  const enH = headings(en.body);
  const nlH = headings(nl.body);
  if (enH.length !== nlH.length) {
    warnings.push(`${slug}: ## heading count EN=${enH.length} NL=${nlH.length}`);
  }

  for (const component of [
    "CodeResult",
    "InteractChoice",
    "WhenToUse",
    "DocTour",
    "IntentCalc",
    "RecipeFiles",
    "MigrationMap",
    "ErrorPaste",
    "CollapsibleCheatsheet",
  ]) {
    const a = count(component, en.body);
    const b = count(component, nl.body);
    if (a !== b) {
      problems.push(`${slug}: <${component}> EN=${a} NL=${b}`);
    }
  }
}

if (warnings.length) {
  console.warn("[docs-parity] warnings:\n" + warnings.map((line) => ` - ${line}`).join("\n"));
}

if (problems.length) {
  console.error("[docs-parity] issues:\n" + problems.map((line) => ` - ${line}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`[docs-parity] ok — ${catalog.length} guides EN/NL aligned`);
}
