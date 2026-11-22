import { codeToHtml } from "shiki";
import { CodeBlockChrome } from "@/components/docs/CodeBlockChrome";

type Props = {
  code: string;
  language?: string;
  filename?: string;
};

function normalizeLanguage(language?: string) {
  const raw = (language || "javascript").trim().toLowerCase();
  if (raw === "ts" || raw === "typescript") return "typescript";
  if (raw === "js" || raw === "javascript" || raw === "jsx") return "javascript";
  if (raw === "tsx") return "tsx";
  if (raw === "sh" || raw === "shell" || raw === "zsh") return "bash";
  if (raw === "plain" || raw === "txt" || raw === "text") return "text";
  return raw || "javascript";
}

function labelFor(language: string) {
  if (language === "typescript" || language === "tsx") return "ts";
  if (language === "javascript" || language === "jsx") return "js";
  if (language === "bash") return "bash";
  if (language === "text") return "text";
  return language;
}

function filenameFor(language: string, filename?: string) {
  if (filename) return filename;
  if (language === "typescript" || language === "tsx") return "example.ts";
  if (language === "bash") return "terminal";
  if (language === "text") return "tree";
  if (language === "json") return "example.json";
  return "example.js";
}

function shouldCopy(language: string, filename: string) {
  if (language === "text") return false;
  if (filename === "tree" || filename.endsWith(".tree")) return false;
  return true;
}

/** Invisible wrap opportunities after braces / commas so lines break cleanly. */
function addSoftBreakHints(code: string): string {
  return code
    .replace(/([{\[(,;])(?=\S)/g, "$1\u200B")
    .replace(/(\S)([}\])])/g, "$1\u200B$2");
}

export async function CodeBlock({ code, language = "javascript", filename }: Props) {
  const lang = normalizeLanguage(language);
  const name = filenameFor(lang, filename);
  const trimmed = code.replace(/\n$/, "");
  const forHighlight = addSoftBreakHints(trimmed);
  const shikiLang = lang === "text" ? "plaintext" : lang;
  const [darkHtml, lightHtml] = await Promise.all([
    codeToHtml(forHighlight, { lang: shikiLang, theme: "github-dark-default" }),
    codeToHtml(forHighlight, { lang: shikiLang, theme: "github-light-default" }),
  ]);

  return (
    <CodeBlockChrome
      name={name}
      label={labelFor(lang)}
      code={trimmed}
      copyable={shouldCopy(lang, name)}
      darkHtml={darkHtml}
      lightHtml={lightHtml}
    />
  );
}
