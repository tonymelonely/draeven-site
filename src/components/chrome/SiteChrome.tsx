"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useThreePreference } from "./ThreeProvider";
import { SITE_THEMES, useSiteTheme, type SiteTheme } from "./ThemeProvider";
import type { SearchItem } from "./CommandPalette";
import { KeyboardCheatsheet } from "@/components/docs/KeyboardCheatsheet";
import { DOCS_TIPS_PREF_KEY } from "@/lib/docs-tips";

type Props = {
  searchItems: SearchItem[];
  userName?: string | null;
  isAdmin?: boolean;
};

export function SiteChrome({ searchItems, userName, isAdmin }: Props) {
  const t = useTranslations("nav");
  const mega = useTranslations("mega");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { enabled, toggle, ready } = useThreePreference();
  const { theme, setTheme, ready: themeReady } = useSiteTheme();
  const [openMenu, setOpenMenu] = useState<"docs" | "api" | null>(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chord, setChord] = useState<string | null>(null);
  const [docsTipsOn, setDocsTipsOn] = useState(true);
  const prefs = useTranslations("prefs");

  useEffect(() => {
    try {
      setDocsTipsOn(localStorage.getItem(DOCS_TIPS_PREF_KEY) !== "off");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCheatsheetOpen(false);
        setPaletteOpen((value) => !value);
        return;
      }

      if (event.key === "?" && !meta) {
        event.preventDefault();
        setPaletteOpen(false);
        setCheatsheetOpen((value) => !value);
        return;
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setCheatsheetOpen(false);
        setDrawerOpen(false);
      }

      if (chord === "g") {
        if (event.key.toLowerCase() === "d") {
          event.preventDefault();
          router.push("/docs");
        }
        if (event.key.toLowerCase() === "a") {
          event.preventDefault();
          router.push("/reference");
        }
        setChord(null);
        return;
      }

      if (event.key.toLowerCase() === "g" && !meta) {
        setChord("g");
        window.setTimeout(() => setChord(null), 800);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chord, router]);

  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const otherLocale = locale === "en" ? "nl" : "en";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_78%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-[4.4rem] w-full items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 font-display text-lg font-bold tracking-tight no-underline">
            Draeven<span className="text-[var(--color-accent)]">.</span>
          </Link>

          <nav className="site-chrome-nav ml-1 hidden items-center gap-1 lg:flex" aria-label="Primary">
            <NavLink href="/" active={pathname === "/"} label={t("home")} />

            <MegaItem
              isOpen={openMenu === "docs"}
              onOpen={() => setOpenMenu("docs")}
              onClose={() => setOpenMenu(null)}
              trigger={
                <Link
                  href="/docs"
                  className={`rounded-xl px-3 py-2 text-sm no-underline transition hover:bg-[var(--color-accent-soft)] ${
                    pathname.startsWith("/docs")
                      ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
                      : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {t("docs")}
                </Link>
              }
            >
              <MegaLink
                href="/docs"
                title={mega("docsTitle")}
                body={mega("docsBody")}
                hint={mega("shortcutDocs")}
              />
              <MegaLink href="/docs/quickstart" title={mega("quickTitle")} body={mega("quickBody")} />
              <MegaLink href="/docs/commands" title={mega("commandsTitle")} body={mega("commandsBody")} />
            </MegaItem>

            <MegaItem
              isOpen={openMenu === "api"}
              onOpen={() => setOpenMenu("api")}
              onClose={() => setOpenMenu(null)}
              trigger={
                <Link
                  href="/reference"
                  className={`rounded-xl px-3 py-2 text-sm no-underline transition hover:bg-[var(--color-accent-soft)] ${
                    pathname.startsWith("/reference")
                      ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
                      : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {t("api")}
                </Link>
              }
            >
              <MegaLink
                href="/reference"
                title={mega("apiTitle")}
                body={mega("apiBody")}
                hint={mega("shortcutApi")}
              />
              <MegaLink href="/reference/core" title="@draeven/core" body="Commands & Start" />
              <MegaLink href="/reference/bridge" title="@draeven/bridge" body="Owner desk" />
            </MegaItem>

            <NavLink
              href="/roadmap"
              active={pathname.startsWith("/roadmap")}
              label={t("roadmap")}
            />
            <NavLink
              href="/feedback"
              active={pathname.startsWith("/feedback")}
              label={t("feedback")}
            />
            {isAdmin ? (
              <NavLink href="/admin" active={pathname.startsWith("/admin")} label={t("admin")} />
            ) : null}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-paper-deep)] px-2.5 py-1.5 text-sm text-[var(--color-ink-soft)] transition hover:border-[var(--color-accent)] sm:px-3"
              aria-label={t("search")}
            >
              <span aria-hidden>⌕</span>
              <span className="hidden sm:inline">{t("search")}</span>
              <kbd className="hidden rounded-md border border-[var(--color-line)] px-1.5 text-[0.7rem] md:inline">
                {t("searchHint")}
              </kbd>
            </button>

            {userName ? (
              <a
                href="/api/auth/logout"
                className="hidden rounded-xl bg-[var(--color-ink)] px-3 py-1.5 text-sm text-[var(--color-paper)] no-underline sm:inline-flex"
              >
                {t("signOut")}
              </a>
            ) : (
              <a
                href="/api/auth/discord"
                className="group/login relative hidden min-w-[5.25rem] items-center justify-center overflow-hidden rounded-xl bg-[var(--color-accent)] px-3 py-1.5 text-sm whitespace-nowrap text-[var(--color-on-accent)] no-underline shadow-[0_8px_20px_color-mix(in_srgb,var(--color-accent)_28%,transparent)] transition-[min-width,filter] duration-200 hover:min-w-[11.5rem] hover:brightness-110 sm:inline-flex"
              >
                <span className="transition duration-200 group-hover/login:opacity-0">
                  {t("signIn")}
                </span>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-2.5 text-center opacity-0 transition duration-200 group-hover/login:opacity-100">
                  {t("signInDiscord")}
                </span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setDrawerOpen((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-paper-deep)] text-[var(--color-ink)] transition hover:border-[var(--color-accent)]"
              aria-expanded={drawerOpen}
              aria-controls="site-chrome-drawer"
              aria-label={drawerOpen ? t("menuClose") : t("menuOpen")}
            >
              <span className="font-display text-base leading-none" aria-hidden>
                {drawerOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={t("menuClose")}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-200 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        tabIndex={drawerOpen ? 0 : -1}
      />

      <aside
        id="site-chrome-drawer"
        className={`fixed top-0 right-0 z-[70] flex h-dvh w-[min(20rem,88vw)] flex-col border-l border-[color-mix(in_srgb,var(--color-line-strong)_75%,var(--color-accent))] bg-[color-mix(in_srgb,var(--color-paper-deep)_96%,var(--color-accent))] shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-4">
          <span className="text-[0.68rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("menuTitle")}
          </span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg px-2.5 py-1.5 text-sm text-[var(--color-ink-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-ink)]"
          >
            {t("menuClose")}
          </button>
        </div>

        <div className="themed-scroll min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-4">
          <nav className="space-y-1 lg:hidden" aria-label="Mobile primary">
            <DrawerLink href="/" active={pathname === "/"} label={t("home")} onNavigate={() => setDrawerOpen(false)} />
            <DrawerLink
              href="/docs"
              active={pathname.startsWith("/docs")}
              label={t("docs")}
              onNavigate={() => setDrawerOpen(false)}
            />
            <DrawerLink
              href="/reference"
              active={pathname.startsWith("/reference")}
              label={t("api")}
              onNavigate={() => setDrawerOpen(false)}
            />
            <DrawerLink
              href="/roadmap"
              active={pathname.startsWith("/roadmap")}
              label={t("roadmap")}
              onNavigate={() => setDrawerOpen(false)}
            />
            <DrawerLink
              href="/feedback"
              active={pathname.startsWith("/feedback")}
              label={t("feedback")}
              onNavigate={() => setDrawerOpen(false)}
            />
            {isAdmin ? (
              <DrawerLink
                href="/admin"
                active={pathname.startsWith("/admin")}
                label={t("admin")}
                onNavigate={() => setDrawerOpen(false)}
              />
            ) : null}
          </nav>

          <div className="space-y-2">
            <p className="px-1 text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-soft)] uppercase">
              {t("menuPrefs")}
            </p>
            <button
              type="button"
              onClick={toggle}
              className="flex w-full items-center justify-between rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_40%,transparent)] px-3 py-2.5 text-sm transition hover:border-[var(--color-accent)]"
              aria-pressed={enabled}
            >
              <span>{t("threeLabel")}</span>
              <span className="font-medium text-[var(--color-accent-bright)]">
                {ready ? (enabled ? t("threeOn") : t("threeOff")) : "…"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDocsTipsOn((current) => {
                  const next = !current;
                  try {
                    localStorage.setItem(DOCS_TIPS_PREF_KEY, next ? "on" : "off");
                  } catch {
                    /* ignore */
                  }
                  window.dispatchEvent(
                    new CustomEvent("draeven-docs-tips-pref", {
                      detail: { enabled: next },
                    })
                  );
                  return next;
                });
              }}
              className="flex w-full items-center justify-between rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_40%,transparent)] px-3 py-2.5 text-sm transition hover:border-[var(--color-accent)]"
              aria-pressed={docsTipsOn}
            >
              <span>{prefs("docsTips")}</span>
              <span className="font-medium text-[var(--color-accent-bright)]">
                {docsTipsOn ? prefs("docsTipsOn") : prefs("docsTipsOff")}
              </span>
            </button>

            <div className="rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_40%,transparent)] p-2">
              <p className="mb-2 px-1 text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
                {t("themeLabel")}
              </p>
              <div className="grid grid-cols-2 gap-1.5" suppressHydrationWarning>
                {SITE_THEMES.map((item) => {
                  const active = themeReady && theme === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTheme(item)}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition ${
                        active
                          ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
                          : "text-[var(--color-ink-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-ink)]"
                      }`}
                      suppressHydrationWarning
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: themeSwatch(item) }}
                        aria-hidden
                      />
                      {t(`theme_${item}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              href={pathname || "/"}
              locale={otherLocale}
              onClick={() => setDrawerOpen(false)}
              className="flex w-full items-center justify-between rounded-xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_40%,transparent)] px-3 py-2.5 text-sm no-underline transition hover:border-[var(--color-accent)]"
            >
              <span>{t("language")}</span>
              <span className="font-medium uppercase text-[var(--color-accent-bright)]">{otherLocale}</span>
            </Link>
          </div>

          <div className="space-y-2 sm:hidden">
            {userName ? (
              <a
                href="/api/auth/logout"
                className="flex w-full items-center justify-center rounded-xl bg-[var(--color-ink)] px-3 py-2.5 text-sm text-[var(--color-paper)] no-underline"
              >
                {t("signOut")}
              </a>
            ) : (
              <a
                href="/api/auth/discord"
                className="flex w-full items-center justify-center rounded-xl bg-[var(--color-accent)] px-3 py-2.5 text-sm text-[var(--color-on-accent)] no-underline"
              >
                {t("signInDiscord")}
              </a>
            )}
          </div>
        </div>
      </aside>

      {paletteOpen ? (
        <ControlledPalette items={searchItems} onClose={() => setPaletteOpen(false)} />
      ) : null}
      <KeyboardCheatsheet open={cheatsheetOpen} onClose={() => setCheatsheetOpen(false)} />
    </>
  );
}

function DrawerLink({
  href,
  active,
  label,
  onNavigate,
}: {
  href: string;
  active: boolean;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-xl px-3 py-2.5 text-sm no-underline transition ${
        active
          ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
          : "text-[var(--color-ink-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-ink)]"
      }`}
    >
      {label}
    </Link>
  );
}

function NavLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-2 text-sm no-underline transition hover:bg-[var(--color-accent-soft)] ${
        active
          ? "bg-[var(--color-accent-soft)] font-semibold text-[var(--color-accent-bright)]"
          : "text-[var(--color-ink-soft)]"
      }`}
    >
      {label}
    </Link>
  );
}

function themeSwatch(theme: SiteTheme): string {
  switch (theme) {
    case "green":
      return "#2ec4b6";
    case "blue":
      return "#4f8cff";
    case "red":
      return "#f07178";
    case "orange":
      return "#f0a070";
    case "gray":
      return "#9aa8b8";
    case "white":
      return "#e8eef4";
  }
}

function MegaItem({
  isOpen,
  onOpen,
  onClose,
  trigger,
  children,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      {trigger}
      {isOpen ? (
        <div className="mega-panel absolute left-0 top-full z-50 w-[min(22rem,calc(100vw-2rem))] space-y-1 p-2 pt-2 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MegaLink({
  href,
  title,
  body,
  hint,
}: {
  href: string;
  title: string;
  body: string;
  hint?: string;
}) {
  return (
    <Link
      href={href}
      className="group/mega block rounded-xl border border-transparent px-3.5 py-3 no-underline transition hover:border-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] hover:bg-[var(--color-accent-soft)]"
    >
      <div className="flex items-center justify-between gap-3">
        <strong className="font-display text-[0.98rem] text-[var(--color-ink)] group-hover/mega:text-[var(--color-accent-bright)]">
          {title}
        </strong>
        {hint ? (
          <span className="shrink-0 text-[0.62rem] tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
            {hint}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-snug text-[var(--color-ink-soft)]">{body}</p>
    </Link>
  );
}

function ControlledPalette({
  items,
  onClose,
}: {
  items: SearchItem[];
  onClose: () => void;
}) {
  const t = useTranslations("command");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const filtered = items
    .filter((item) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const hay = [
        item.title,
        item.group,
        item.href,
        item.snippet ?? "",
        ...(item.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 20);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="panel w-full max-w-xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          placeholder={t("placeholder")}
          className="w-full border-b border-[var(--color-line-strong)] bg-transparent px-4 py-3 outline-none"
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((value) => Math.max(value - 1, 0));
            }
            if (event.key === "Enter" && filtered[active]) {
              router.push(filtered[active]!.href);
              onClose();
            }
          }}
        />
        <ul className="max-h-80 overflow-auto p-2">
          {filtered.length < 1 ? (
            <li className="px-3 py-2 text-sm text-[var(--color-ink-soft)]">{t("empty")}</li>
          ) : (
            filtered.map((item, index) => (
              <li key={`${item.href}-${item.title}`}>
                <button
                  type="button"
                  className={`flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                    index === active ? "bg-[var(--color-accent-soft)]" : "hover:bg-[var(--color-mist)]/40"
                  }`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{item.title}</span>
                    {item.snippet ? (
                      <span className="mt-0.5 block truncate text-xs text-[var(--color-ink-soft)]">
                        {item.snippet}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-xs tracking-wide text-[var(--color-ink-soft)] uppercase">
                    {item.group}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-[var(--color-line)] px-4 py-2 text-xs text-[var(--color-ink-soft)]">
          {t("hint")}
        </p>
      </div>
    </div>
  );
}
