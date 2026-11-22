"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { DocMeta } from "@/lib/docs";
import { LEARNING_PATHS, PATH_NEXT_SLUGS } from "@/lib/docs-meta";

const BADGE_COPY = {
  new: { en: "new", nl: "nieuw" },
  miss: { en: "often miss", nl: "vaak mis" },
} as const;

const VISITED_KEY = "draeven-docs-visited";

const PATH_SLUGS = new Set<string>([
  ...PATH_NEXT_SLUGS,
  ...LEARNING_PATHS.flatMap((path) => path.steps.map((step) => step.slug)),
]);

export function DocsSidebar({
  items,
  activeSlug,
  label,
}: {
  items: DocMeta[];
  activeSlug?: string;
  label: string;
}) {
  const locale = useLocale();
  const isNl = locale === "nl";

  const sections = useMemo(() => {
    const next: Array<{ name: string; items: DocMeta[] }> = [];
    for (const item of items) {
      const name = item.section || "Docs";
      const last = next[next.length - 1];
      if (!last || last.name !== name) next.push({ name, items: [item] });
      else last.items.push(item);
    }
    return next;
  }, [items]);

  const activeSection = sections.find((section) =>
    section.items.some((item) => item.slug.join("/") === activeSlug)
  )?.name;

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.name, section.name === activeSection]))
  );
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activeSection) return;
    setOpen((current) => {
      if (current[activeSection]) return current;
      return { ...current, [activeSection]: true };
    });
  }, [activeSection]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITED_KEY);
      const current = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
      if (activeSlug && PATH_SLUGS.has(activeSlug)) {
        current[activeSlug] = true;
        localStorage.setItem(VISITED_KEY, JSON.stringify(current));
      }
      setVisited(current);
    } catch {
      /* ignore */
    }
  }, [activeSlug]);

  const pathDone = [...PATH_SLUGS].filter((slug) => visited[slug]).length;
  const pathTotal = PATH_SLUGS.size;

  return (
    <aside className="docs-sidebar docs-rail flex h-full min-h-0 flex-col overflow-hidden p-3.5">
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2 px-1">
        <p className="text-[0.68rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {label}
        </p>
        <span className="rounded-md border border-[var(--color-line)] px-1.5 py-0.5 text-[0.58rem] tracking-[0.1em] text-[var(--color-ink-soft)] uppercase">
          {items.length}
        </span>
      </div>
      <p className="mb-2 px-1 text-[0.65rem] text-[var(--color-ink-soft)]">
        {isNl ? `Pad ${pathDone}/${pathTotal}` : `Path ${pathDone}/${pathTotal}`}
      </p>
      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        {sections.map((section) => {
          const isOpen = Boolean(open[section.name]);
          const sectionActive = section.name === activeSection;
          return (
            <div
              key={section.name}
              className={`shrink-0 rounded-2xl border transition ${
                sectionActive || isOpen
                  ? "border-[color-mix(in_srgb,var(--color-accent)_28%,var(--color-line))] bg-[color-mix(in_srgb,var(--color-accent-soft)_55%,transparent)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setOpen((current) => ({
                    ...current,
                    [section.name]: !current[section.name],
                  }))
                }
                className={`flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-[0.7rem] tracking-[0.14em] uppercase transition ${
                  sectionActive
                    ? "text-[var(--color-accent-bright)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                }`}
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{section.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className="rounded-md bg-[color-mix(in_srgb,var(--color-mist)_45%,transparent)] px-1.5 py-0.5 text-[0.58rem] tracking-normal text-[var(--color-ink-soft)] normal-case">
                    {section.items.length}
                  </span>
                  <span
                    className={`text-[0.65rem] text-[var(--color-accent)] transition duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    aria-hidden
                  >
                    ▸
                  </span>
                </span>
              </button>
              {isOpen ? (
                <div className="docs-sidebar__section themed-scroll max-h-[min(32vh,16rem)] space-y-0 overflow-y-auto overscroll-contain px-1.5 pb-1">
                  {section.items.map((item) => {
                    const href = `/docs/${item.slug.join("/")}`;
                    const active = item.slug.join("/") === activeSlug;
                    const chip = item.badge ? BADGE_COPY[item.badge] : null;
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-[0.88rem] leading-snug no-underline transition ${
                          active
                            ? "docs-nav-active font-semibold text-[var(--color-accent-bright)]"
                            : "text-[var(--color-ink-soft)] hover:bg-[color-mix(in_srgb,var(--color-paper-deep)_70%,transparent)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-1.5 truncate">
                          {PATH_SLUGS.has(item.slug.join("/")) ? (
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                visited[item.slug.join("/")]
                                  ? "bg-[var(--color-accent)]"
                                  : "bg-[var(--color-line-strong)]"
                              }`}
                              aria-hidden
                            />
                          ) : null}
                          <span className="truncate">{item.title}</span>
                        </span>
                        {chip ? (
                          <span
                            className={`shrink-0 rounded-md px-1.5 py-0.5 text-[0.58rem] tracking-[0.06em] uppercase ${
                              item.badge === "new"
                                ? "bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[var(--color-accent-bright)]"
                                : "bg-[color-mix(in_srgb,var(--color-warn)_14%,transparent)] text-[var(--color-warn)]"
                            }`}
                          >
                            {isNl ? chip.nl : chip.en}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
