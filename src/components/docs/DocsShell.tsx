"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { usePathname } from "@/i18n/navigation";
import { DocsScrollProvider, useDocsScroll } from "@/components/docs/DocsScrollContext";
import { DocsSiteFooter } from "@/components/docs/DocsSiteFooter";
import { HeroCanvas } from "@/components/HeroCanvas";

type Panel = "menu" | "toc" | null;

const OPEN_DX = 72;
const CLOSE_DX = 64;
const GUIDES_KEY = "draeven-docs-guides";
const TOC_KEY = "draeven-docs-toc";

/** Code / wide overflow regions — drawer only ignored for horizontal pans. */
function findSwipeGuard(node: Element | null): HTMLElement | null {
  let current: Element | null = node;
  while (current && current !== document.body) {
    if (current instanceof HTMLElement) {
      if (current.dataset.noSwipe != null) return current;
      if (
        current.classList.contains("code-block") ||
        current.classList.contains("code-block__body") ||
        current.classList.contains("table-scroll")
      ) {
        return current;
      }
      const { overflowX } = window.getComputedStyle(current);
      if (
        (overflowX === "auto" || overflowX === "scroll") &&
        current.scrollWidth > current.clientWidth + 2
      ) {
        return current;
      }
    }
    current = current.parentElement;
  }
  return null;
}

function DocsShellFrame({
  sidebar,
  toc,
  children,
  menuLabel,
  tocLabel,
  closeLabel,
  swipeHint,
  toggleGuidesHint,
  toggleTocHint,
}: {
  sidebar: ReactNode;
  toc: ReactNode;
  children: ReactNode;
  menuLabel: string;
  tocLabel: string;
  closeLabel: string;
  swipeHint: string;
  toggleGuidesHint: string;
  toggleTocHint: string;
}) {
  const { scrollerRef, scrollToId } = useDocsScroll();
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(true);
  const [tocOpen, setTocOpen] = useState(true);
  const touchRef = useRef<{
    x: number;
    y: number;
    panel: Panel;
    guard: boolean;
  } | null>(null);

  const close = useCallback(() => setPanel(null), []);
  const openMenu = useCallback(() => setPanel("menu"), []);
  const openToc = useCallback(() => setPanel("toc"), []);

  const toggleGuides = useCallback(() => {
    setGuidesOpen((value) => {
      const next = !value;
      window.localStorage.setItem(GUIDES_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  const toggleTocRail = useCallback(() => {
    setTocOpen((value) => {
      const next = !value;
      window.localStorage.setItem(TOC_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setIsCompact(mq.matches);
      if (!mq.matches) setPanel(null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const guides = window.localStorage.getItem(GUIDES_KEY);
    const page = window.localStorage.getItem(TOC_KEY);
    if (guides === "off") setGuidesOpen(false);
    if (page === "off") setTocOpen(false);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    function onHash() {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      window.requestAnimationFrame(() => scrollToId(id, "smooth"));
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [scrollToId]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "Escape") {
        close();
        return;
      }

      // Desktop: [ guides, ] on this page
      if (event.key === "[" && !isCompact) {
        event.preventDefault();
        toggleGuides();
        return;
      }
      if (event.key === "]" && !isCompact) {
        event.preventDefault();
        toggleTocRail();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, isCompact, toggleGuides, toggleTocRail]);

  function onTouchStart(event: ReactTouchEvent) {
    if (!isCompact) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    if (event.touches.length > 1) {
      touchRef.current = null;
      return;
    }
    const target = event.target as Element | null;
    touchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      panel,
      guard: Boolean(findSwipeGuard(target)),
    };
  }

  function onTouchEnd(event: ReactTouchEvent) {
    if (!isCompact || !touchRef.current) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      touchRef.current = null;
      return;
    }

    const start = touchRef.current;
    touchRef.current = null;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < OPEN_DX) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.35) return;
    if (start.guard) return;

    if (start.panel === "menu") {
      if (dx < -CLOSE_DX) close();
      return;
    }
    if (start.panel === "toc") {
      if (dx > CLOSE_DX) close();
      return;
    }

    if (dx > OPEN_DX) setPanel("menu");
    else if (dx < -OPEN_DX) setPanel("toc");
  }

  function onDrawerActivate(event: React.MouseEvent | React.KeyboardEvent) {
    const target = event.target as HTMLElement | null;
    if (!target?.closest?.("a[href]")) return;
    window.setTimeout(close, 0);
  }

  const sidebarDesktop = isValidElement(sidebar)
    ? cloneElement(sidebar as ReactElement, { key: "sidebar-desktop" })
    : sidebar;
  const sidebarMobile = isValidElement(sidebar)
    ? cloneElement(sidebar as ReactElement, { key: "sidebar-mobile" })
    : sidebar;
  const tocDesktop = isValidElement(toc)
    ? cloneElement(toc as ReactElement, { key: "toc-desktop" })
    : toc;
  const tocMobile = isValidElement(toc)
    ? cloneElement(toc as ReactElement, { key: "toc-mobile" })
    : toc;

  const desktopCols =
    guidesOpen && tocOpen
      ? "lg:grid-cols-[16.5rem_minmax(0,1fr)_13rem] xl:grid-cols-[17rem_minmax(0,1fr)_13.5rem]"
      : guidesOpen
        ? "lg:grid-cols-[16.5rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]"
        : tocOpen
          ? "lg:grid-cols-[minmax(0,1fr)_13rem] xl:grid-cols-[minmax(0,1fr)_13.5rem]"
          : "lg:grid-cols-[minmax(0,1fr)]";

  return (
    <div
      className={`docs-shell relative grid h-[calc(100dvh-4.4rem)] w-full grid-cols-1 gap-0 px-2 sm:px-3 lg:gap-3 lg:px-4 ${desktopCols}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <HeroCanvas subtle viewport />
      <div className="docs-veil" aria-hidden />

      <div
        className={`docs-shell__rail docs-shell__rail--sidebar relative z-[1] min-h-0 overflow-hidden py-5 pr-2 transition-[width,opacity] duration-200 ${
          guidesOpen ? "hidden lg:block" : "hidden"
        }`}
      >
        {sidebarDesktop}
      </div>

      <main
        ref={scrollerRef}
        data-docs-scroller=""
        className="docs-shell__main relative z-[1] themed-scroll min-h-0 overflow-y-auto overscroll-y-auto scroll-smooth py-5 pb-24 lg:px-4 lg:pb-8"
      >
        <div className="mb-3 hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleGuides}
            className="rounded-lg border border-[var(--color-line)] px-2.5 py-1 text-[0.72rem] text-[var(--color-ink-soft)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            aria-pressed={guidesOpen}
            title={toggleGuidesHint}
          >
            {menuLabel}
            <kbd className="ml-1.5 rounded border border-[var(--color-line)] px-1 text-[0.62rem]">[</kbd>
          </button>
          <button
            type="button"
            onClick={toggleTocRail}
            className="rounded-lg border border-[var(--color-line)] px-2.5 py-1 text-[0.72rem] text-[var(--color-ink-soft)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            aria-pressed={tocOpen}
            title={toggleTocHint}
          >
            {tocLabel}
            <kbd className="ml-1.5 rounded border border-[var(--color-line)] px-1 text-[0.62rem]">]</kbd>
          </button>
        </div>
        <div className="docs-shell__article w-full min-w-0">
          {children}
          <DocsSiteFooter />
        </div>
      </main>

      <div
        className={`docs-shell__rail relative z-[1] themed-scroll min-h-0 overflow-y-auto py-5 pl-2 transition-[width,opacity] duration-200 ${
          tocOpen ? "hidden lg:block" : "hidden"
        }`}
      >
        {tocDesktop}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="docs-mobile-bar pointer-events-auto flex w-full max-w-md items-center gap-1.5 rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-line-strong)_80%,var(--color-accent))] bg-[color-mix(in_srgb,var(--color-paper-deep)_82%,transparent)] p-1.5 shadow-[0_14px_40px_color-mix(in_srgb,black_45%,transparent),inset_0_1px_0_color-mix(in_srgb,white_8%,transparent)] backdrop-blur-xl">
          <button
            type="button"
            onClick={openMenu}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
              panel === "menu"
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)] shadow-[inset_0_1px_0_color-mix(in_srgb,white_8%,transparent)]"
                : "text-[var(--color-ink)] hover:bg-[var(--color-accent-soft)]"
            }`}
            aria-expanded={panel === "menu"}
          >
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[0.75rem] text-[var(--color-accent-bright)]"
            >
              ☰
            </span>
            {menuLabel}
          </button>
          <div className="h-7 w-px bg-[var(--color-line)]" aria-hidden />
          <button
            type="button"
            onClick={openToc}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
              panel === "toc"
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)] shadow-[inset_0_1px_0_color-mix(in_srgb,white_8%,transparent)]"
                : "text-[var(--color-ink)] hover:bg-[var(--color-accent-soft)]"
            }`}
            aria-expanded={panel === "toc"}
          >
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[0.75rem] text-[var(--color-accent-bright)]"
            >
              ≡
            </span>
            {tocLabel}
          </button>
        </div>
      </div>

      <p className="sr-only">
        {swipeHint} {toggleGuidesHint} {toggleTocHint}
      </p>

      <button
        type="button"
        aria-label={closeLabel}
        className={`fixed inset-0 z-40 bg-black/55 transition-opacity duration-200 lg:hidden ${
          panel ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        tabIndex={panel ? 0 : -1}
      />

      <aside
        className={`docs-mobile-drawer themed-scroll fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-[color-mix(in_srgb,var(--color-line-strong)_75%,var(--color-accent))] bg-[color-mix(in_srgb,var(--color-paper-deep)_94%,var(--color-accent))] pt-[4.4rem] shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          panel === "menu" ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={panel !== "menu"}
        onClick={onDrawerActivate}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") onDrawerActivate(event);
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3">
          <span className="text-[0.68rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {menuLabel}
          </span>
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-2.5 py-1.5 text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-ink)]"
          >
            {closeLabel}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-3 py-4">{sidebarMobile}</div>
      </aside>

      <aside
        className={`docs-mobile-drawer themed-scroll fixed inset-y-0 right-0 z-50 flex w-[min(18rem,86vw)] flex-col border-l border-[color-mix(in_srgb,var(--color-line-strong)_75%,var(--color-accent))] bg-[color-mix(in_srgb,var(--color-paper-deep)_94%,var(--color-accent))] pt-[4.4rem] shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          panel === "toc" ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={panel !== "toc"}
        onClick={onDrawerActivate}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") onDrawerActivate(event);
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3">
          <span className="text-[0.68rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {tocLabel}
          </span>
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-2.5 py-1.5 text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-ink)]"
          >
            {closeLabel}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">{tocMobile}</div>
      </aside>
    </div>
  );
}

/** Full-height docs frame: side rails on desktop; swipe drawers on mobile/tablet. */
export function DocsShell(props: {
  sidebar: ReactNode;
  toc: ReactNode;
  children: ReactNode;
  menuLabel: string;
  tocLabel: string;
  closeLabel: string;
  swipeHint: string;
  toggleGuidesHint: string;
  toggleTocHint: string;
}) {
  return (
    <DocsScrollProvider>
      <DocsShellFrame {...props} />
    </DocsScrollProvider>
  );
}
