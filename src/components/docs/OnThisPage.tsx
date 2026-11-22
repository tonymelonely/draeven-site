"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDocsScroll } from "@/components/docs/DocsScrollContext";
import { DocsTipCard } from "@/components/docs/DocsTipCard";

export function OnThisPage({
  title,
  headings,
  progressLabel,
  tipTitle,
  tipDismiss,
}: {
  title: string;
  headings: Array<{ id: string; text: string; level: number }>;
  progressLabel?: string;
  tipTitle?: string;
  tipDismiss?: string;
}) {
  const { scrollerRef, scrollToId } = useDocsScroll();
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const lockUntil = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [bar, setBar] = useState({ top: 0, height: 0, ready: false });

  useEffect(() => {
    setActive(headings[0]?.id ?? "");
    setProgress(0);
  }, [headings]);

  useLayoutEffect(() => {
    const link = linkRefs.current[active];
    const list = listRef.current;
    if (!link || !list) {
      setBar((prev) => ({ ...prev, ready: false }));
      return;
    }
    setBar({
      top: link.offsetTop,
      height: link.offsetHeight,
      ready: true,
    });
  }, [active, headings]);

  useEffect(() => {
    if (!headings.length) return;

    let frame = 0;

    function syncFromScroll() {
      if (Date.now() < lockUntil.current) return;
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll > 0) {
        setProgress(Math.min(1, Math.max(0, scroller.scrollTop / maxScroll)));
      } else {
        setProgress(0);
      }

      const nodes = headings
        .map((heading) =>
          scroller.querySelector<HTMLElement>(`#${CSS.escape(heading.id)}`)
        )
        .filter((node): node is HTMLElement => Boolean(node));
      if (!nodes.length) return;

      const nearBottom = maxScroll > 0 && scroller.scrollTop >= maxScroll - 12;

      if (nearBottom) {
        const last = nodes[nodes.length - 1]!.id;
        setActive((prev) => (prev === last ? prev : last));
        return;
      }

      const marker = scroller.getBoundingClientRect().top + 96;
      let current = nodes[0]!.id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= marker) current = node.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    }

    const scroller = scrollerRef.current;
    const boot = window.setTimeout(syncFromScroll, 50);
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(boot);
      cancelAnimationFrame(frame);
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings, scrollerRef]);

  const pct = Math.round(progress * 100);
  const tip = tipTitle ? (
    <DocsTipCard title={tipTitle} dismissLabel={tipDismiss || "Dismiss"} />
  ) : null;

  if (!headings.length) {
    return tip ? (
      <aside className="docs-toc docs-rail sticky top-0 p-3">{tip}</aside>
    ) : null;
  }

  return (
    <aside className="docs-toc docs-rail sticky top-0 flex max-h-full flex-col p-3">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2 px-1">
        <p className="text-[0.65rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {title}
        </p>
        {progressLabel ? (
          <span className="text-[0.62rem] tabular-nums text-[var(--color-ink-soft)]">
            {pct}%
          </span>
        ) : null}
      </div>
      {progressLabel ? (
        <div
          className="mb-3 h-1 shrink-0 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-mist)_55%,transparent)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={progressLabel}
        >
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}
      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-[color-mix(in_srgb,var(--color-line)_80%,var(--color-accent))]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 w-0.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent)_55%,transparent)] transition-[top,height,opacity] duration-200 ease-out"
          style={{
            top: bar.top,
            height: bar.height,
            opacity: bar.ready ? 1 : 0,
          }}
        />
        <ul ref={listRef} className="space-y-0.5 text-[0.9rem]">
          {headings.map((heading) => {
            const isActive = active === heading.id;
            return (
              <li key={heading.id}>
                <a
                  ref={(node) => {
                    linkRefs.current[heading.id] = node;
                  }}
                  href={`#${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    lockUntil.current = Date.now() + 900;
                    setActive(heading.id);
                    scrollToId(heading.id, "smooth");
                    history.replaceState(null, "", `#${heading.id}`);
                  }}
                  className={`block rounded-r-md py-1.5 no-underline transition ${
                    heading.level === 3 ? "pl-5" : "pl-3"
                  } ${
                    isActive
                      ? "font-medium text-[var(--color-accent-bright)]"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="shrink-0">{tip}</div>
    </aside>
  );
}
