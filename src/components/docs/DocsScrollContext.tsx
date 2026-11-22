"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type DocsScrollApi = {
  scrollerRef: RefObject<HTMLElement | null>;
  scrollToId: (id: string, behavior?: ScrollBehavior) => void;
};

const DocsScrollContext = createContext<DocsScrollApi | null>(null);

export function DocsScrollProvider({ children }: { children: ReactNode }) {
  const scrollerRef = useRef<HTMLElement | null>(null);

  const scrollToId = useCallback((id: string, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    if (!scroller || !id) return;
    const target = scroller.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!target) return;
    const desired =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      20;
    const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    scroller.scrollTo({ top: Math.min(Math.max(0, desired), maxScroll), behavior });
  }, []);

  const value = useMemo(() => ({ scrollerRef, scrollToId }), [scrollToId]);

  return <DocsScrollContext.Provider value={value}>{children}</DocsScrollContext.Provider>;
}

export function useDocsScroll() {
  const ctx = useContext(DocsScrollContext);
  if (!ctx) {
    throw new Error("useDocsScroll must be used inside DocsScrollProvider");
  }
  return ctx;
}
