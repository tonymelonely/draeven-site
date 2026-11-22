import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter({ className = "" }: { className?: string }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      className={`site-footer border-t border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_55%,transparent)] ${className}`}
    >
      <div className="mx-auto grid w-full gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <p className="font-display text-lg tracking-tight text-[var(--color-ink)]">
            Draeven<span className="text-[var(--color-accent)]">.</span>
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {t("blurb")}
          </p>
          <p className="text-xs text-[var(--color-ink-soft)]">{t("poweredBy")}</p>
        </div>

        <div className="space-y-2">
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("product")}
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--color-ink-soft)]">
            <li>
              <Link href="/docs" className="no-underline hover:text-[var(--color-ink)]">
                {t("docs")}
              </Link>
            </li>
            <li>
              <Link href="/reference" className="no-underline hover:text-[var(--color-ink)]">
                {t("api")}
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="no-underline hover:text-[var(--color-ink)]">
                {t("roadmap")}
              </Link>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@draeven/core"
                className="no-underline hover:text-[var(--color-ink)]"
              >
                npm
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("community")}
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--color-ink-soft)]">
            <li>
              <a
                href="https://discord.gg/draeven"
                className="no-underline hover:text-[var(--color-ink)]"
              >
                {t("discord")}
              </a>
              <p className="mt-1 text-xs opacity-80">{t("discordHelp")}</p>
            </li>
            <li>
              <a
                href="https://github.com/tonymelonely/Draeven-framework"
                className="no-underline hover:text-[var(--color-ink)]"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link href="/feedback" className="no-underline hover:text-[var(--color-ink)]">
                {t("feedback")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-[0.65rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
            {t("legal")}
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {t("copyright", { year })}
          </p>
          <p className="text-xs text-[var(--color-ink-soft)]">{t("license")}</p>
        </div>
      </div>
    </footer>
  );
}
