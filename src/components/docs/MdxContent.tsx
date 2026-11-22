import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { getLocale } from "next-intl/server";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Explain } from "@/components/docs/Explain";
import { TableScroll } from "@/components/docs/TableScroll";
import { FlowDiagram } from "@/components/docs/FlowDiagram";
import { Compare } from "@/components/docs/Compare";
import { FiveMinPath } from "@/components/docs/FiveMinPath";
import { ErrorMapTable } from "@/components/docs/ErrorMapTable";
import { Checklist } from "@/components/docs/Checklist";
import { GlossaryList } from "@/components/docs/GlossaryList";
import { TrySimulate } from "@/components/docs/TrySimulate";
import { DocMedia } from "@/components/docs/DocMedia";
import { PieceTour } from "@/components/docs/PieceTour";
import { InteractChoice } from "@/components/docs/InteractChoice";
import { WhenToUse } from "@/components/docs/WhenToUse";
import { DocTour } from "@/components/docs/DocTour";
import { CodeResult } from "@/components/docs/CodeResult";
import { CollapsibleCheatsheet } from "@/components/docs/CollapsibleCheatsheet";
import { DocsMdxLink } from "@/components/docs/DocsMdxLink";
import { RecipeFiles } from "@/components/docs/RecipeFiles";
import { IntentCalc } from "@/components/docs/IntentCalc";
import { MigrationMap } from "@/components/docs/MigrationMap";
import { ErrorPaste } from "@/components/docs/ErrorPaste";

const CALLOUT_LABELS = {
  en: { tip: "Tip", note: "Note", warn: "Watch out" },
  nl: { tip: "Tip", note: "Let op", warn: "Pas op" },
} as const;

function Pre(props: { children?: ReactNode }) {
  const child = props.children as {
    props?: { className?: string; children?: string };
  };
  const className = child?.props?.className || "";
  const code = String(child?.props?.children ?? "");
  const language = className.replace("language-", "").trim() || "javascript";
  return <CodeBlock code={code} language={language} />;
}

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return flattenText(props.children);
  }
  return "";
}

function Heading(
  tag: "h2" | "h3",
  slugger: GithubSlugger
) {
  return function DocHeading({
    children,
    id,
    ...props
  }: ComponentPropsWithoutRef<"h2">) {
    const Tag = tag;
    const text = flattenText(children).replace(/[`*_]/g, "").trim();
    const resolved = id || slugger.slug(text);
    return (
      <Tag
        {...props}
        id={resolved}
        data-docs-heading=""
        className="scroll-mt-8"
      >
        {children}
      </Tag>
    );
  };
}

export async function MdxContent({ source }: { source: string }) {
  const slugger = new GithubSlugger();
  const locale = (await getLocale()) as keyof typeof CALLOUT_LABELS;
  const labels = CALLOUT_LABELS[locale] ?? CALLOUT_LABELS.en;

  return (
    <div className="prose-docs">
      <MDXRemote
        source={source}
        components={{
          a: DocsMdxLink,
          pre: Pre,
          h2: Heading("h2", slugger),
          h3: Heading("h3", slugger),
          table: TableScroll,
          FlowDiagram: (props: { id?: string; title?: string }) => (
            <FlowDiagram
              id={props.id || "architecture"}
              locale={locale === "nl" ? "nl" : "en"}
              title={props.title}
            />
          ),
          Compare,
          FiveMinPath,
          ErrorMapTable,
          Checklist,
          GlossaryList,
          TrySimulate,
          DocMedia,
          PieceTour,
          InteractChoice,
          WhenToUse,
          DocTour,
          CodeResult,
          CollapsibleCheatsheet,
          RecipeFiles,
          IntentCalc,
          MigrationMap,
          ErrorPaste,
          Explain,
          Callout,
          Tip: (props: { title?: string; children?: ReactNode }) => (
            <Callout type="tip" title={props.title || labels.tip}>
              {props.children}
            </Callout>
          ),
          Note: (props: { title?: string; children?: ReactNode }) => (
            <Callout type="note" title={props.title || labels.note}>
              {props.children}
            </Callout>
          ),
          Warn: (props: {
            title?: string;
            children?: ReactNode;
            fix?: string;
            href?: string;
          }) => (
            <Callout
              type="warn"
              title={props.title || labels.warn}
              fix={props.fix}
              href={props.href}
            >
              {props.children}
            </Callout>
          ),
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}
