"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { getExplainTopic, type ExplainBlock } from "@/lib/explain-topics";
import type { AppLocale } from "@/i18n/routing";

function BlockView({ block }: { block: ExplainBlock }) {
  if (block.type === "p") {
    return <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-sm text-[var(--color-ink-soft)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "code") {
    return (
      <pre
        data-no-swipe=""
        className="themed-scroll overflow-x-auto overscroll-x-contain rounded-xl border border-[var(--color-line-strong)] bg-[color-mix(in_srgb,var(--color-panel-bottom)_88%,var(--color-mist))] p-3 font-mono text-[0.8rem] leading-relaxed whitespace-pre text-[var(--color-ink)] touch-pan-x"
      >
        {block.code}
      </pre>
    );
  }
  return (
    <div
      data-no-swipe=""
      className="table-scroll themed-scroll overflow-x-auto overscroll-x-contain rounded-xl border border-[var(--color-line)] touch-pan-x"
    >
      <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
        <thead>
          <tr>
            {block.headers.map((header) => (
              <th
                key={header}
                className="bg-[color-mix(in_srgb,var(--color-mist)_45%,transparent)] px-3 py-2 text-[0.68rem] tracking-[0.08em] text-[var(--color-ink)] uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-[var(--color-line)]">
              {row.map((cell) => (
                <td key={cell} className="px-3 py-2 align-top text-[var(--color-ink-soft)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Inline term that opens a themed deep-dive popup (portaled to body — safe inside MDX <p>). */
export function Explain({
  topic,
  children,
}: {
  topic: string;
  children: ReactNode;
}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("explain");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const data = getExplainTopic(locale, topic);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!data) {
    return <span className="font-mono text-[var(--color-accent-bright)]">{children}</span>;
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="panel explain-dialog flex max-h-[min(86dvh,40rem)] w-full max-w-xl flex-col overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] px-5 py-4">
                <div className="min-w-0 space-y-1">
                  <div className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
                    {t("eyebrow")}
                  </div>
                  <h2 id={titleId} className="font-display text-2xl tracking-tight text-[var(--color-accent-bright)]">
                    {data.title}
                  </h2>
                  <div className="text-sm text-[var(--color-ink-soft)]">{data.lead}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-[var(--color-line)] px-2.5 py-1 text-xs text-[var(--color-ink-soft)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
                >
                  {t("close")}
                </button>
              </header>
              <div className="themed-scroll space-y-4 overflow-y-auto px-5 py-4">
                {data.blocks.map((block, index) => (
                  <BlockView key={`${block.type}-${index}`} block={block} />
                ))}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="explain-term inline cursor-pointer border-0 bg-transparent p-0 font-mono text-[var(--color-accent-bright)] underline decoration-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] decoration-dotted underline-offset-[0.22em] transition hover:text-[var(--color-ink)] hover:decoration-[var(--color-accent)]"
        aria-haspopup="dialog"
      >
        {children}
      </button>
      {dialog}
    </>
  );
}
