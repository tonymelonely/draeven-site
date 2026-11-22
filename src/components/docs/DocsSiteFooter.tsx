"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Footer rendered inside the docs scroller so it appears at the bottom of a guide. */
export function DocsSiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="docs-inline-footer mt-10 border-t border-[var(--color-line)] pt-8 pb-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <p className="font-display text-base text-[var(--color-ink)]">
            Draeven<span className="text-[var(--color-accent)]">.</span>
          </p>
          <p className="text-sm text-[var(--color-ink-soft)]">{t("poweredBy")}</p>
        </div>
        <div className="space-y-1.5 text-sm text-[var(--color-ink-soft)]">
          <p className="text-[0.62rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("product")}
          </p>
          <Link href="/docs" className="block no-underline hover:text-[var(--color-ink)]">
            {t("docs")}
          </Link>
          <Link href="/reference" className="block no-underline hover:text-[var(--color-ink)]">
            {t("api")}
          </Link>
          <a
            href="https://www.npmjs.com/package/@draeven/core"
            className="block no-underline hover:text-[var(--color-ink)]"
          >
            npm
          </a>
        </div>
        <div className="space-y-1.5 text-sm text-[var(--color-ink-soft)]">
          <p className="text-[0.62rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("community")}
          </p>
          <a
            href="https://discord.gg/draeven"
            className="block no-underline hover:text-[var(--color-ink)]"
          >
            {t("discord")}
          </a>
          <p className="text-xs text-[var(--color-ink-soft)]">{t("discordHelp")}</p>
          <a
            href="https://github.com/tonymelonely/Draeven-framework"
            className="block no-underline hover:text-[var(--color-ink)]"
          >
            GitHub
          </a>
          <Link href="/feedback" className="block no-underline hover:text-[var(--color-ink)]">
            {t("feedback")}
          </Link>
          <Link href="/docs/glossary" className="block no-underline hover:text-[var(--color-ink)]">
            {t("glossary")}
          </Link>
        </div>
        <div className="space-y-1.5 text-sm text-[var(--color-ink-soft)]">
          <p className="text-[0.62rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("legal")}
          </p>
          <p>{t("copyright", { year })}</p>
          <p className="text-xs">{t("license")}</p>
        </div>
      </div>
    </footer>
  );
}
