"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "@/i18n/navigation";
import { SITE_THEMES, isSiteTheme, type SiteTheme } from "@/lib/themes";

export { SITE_THEMES, type SiteTheme };

type ThemeContextValue = {
  theme: SiteTheme;
  ready: boolean;
  setTheme: (theme: SiteTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "draeven-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readCookieTheme(): SiteTheme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)draeven-theme=([^;]+)/);
  const value = match?.[1] ? decodeURIComponent(match[1]) : null;
  return isSiteTheme(value) ? value : null;
}

function persistTheme(theme: SiteTheme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  document.cookie = `draeven-theme=${encodeURIComponent(theme)};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export function applyTheme(theme: SiteTheme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme === "white" ? "light" : "dark";
}

function readInitialTheme(): SiteTheme {
  if (typeof document === "undefined") return "green";
  const fromDom = document.documentElement.dataset.theme;
  if (isSiteTheme(fromDom)) return fromDom;
  const fromCookie = readCookieTheme();
  if (fromCookie) return fromCookie;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isSiteTheme(stored)) return stored;
  return "green";
}

export function ThemeProvider({
  children,
  initialTheme = "green",
}: {
  children: ReactNode;
  initialTheme?: SiteTheme;
}) {
  const pathname = usePathname();
  // Match SSR cookie value to avoid theme-button hydration mismatches.
  const [theme, setThemeState] = useState<SiteTheme>(initialTheme);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const next = readInitialTheme();
    setThemeState(next);
    applyTheme(next);
    persistTheme(next);
    setReady(true);
  }, []);

  // Next soft-nav can re-apply SSR html attrs (often green) — reclaim stored theme.
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [pathname, theme]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !isSiteTheme(event.newValue)) return;
      setThemeState(event.newValue);
      applyTheme(event.newValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((value: SiteTheme) => {
    setThemeState(value);
    applyTheme(value);
    persistTheme(value);
  }, []);

  const value = useMemo(
    () => ({ theme, ready, setTheme }),
    [theme, ready, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useSiteTheme needs ThemeProvider");
  return ctx;
}
