import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Manrope, Syne } from "next/font/google";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ThreeProvider } from "@/components/chrome/ThreeProvider";
import { ThemeProvider } from "@/components/chrome/ThemeProvider";
import { PageviewBeacon } from "@/components/chrome/PageviewBeacon";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildSearchItems } from "@/lib/search-index";
import { readSession } from "@/lib/session";
import { isSiteTheme } from "@/lib/themes";
import "../globals.css";

const THEME_BOOT = `(function(){try{var ok=["green","blue","red","orange","gray","white"];var t=localStorage.getItem("draeven-theme");if(!t||ok.indexOf(t)===-1){var m=document.cookie.match(/(?:^|;\\s*)draeven-theme=([^;]+)/);t=m&&m[1]?decodeURIComponent(m[1]):null;}if(t&&ok.indexOf(t)!==-1){document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t==="white"?"light":"dark";document.cookie="draeven-theme="+encodeURIComponent(t)+";path=/;max-age=31536000;SameSite=Lax";localStorage.setItem("draeven-theme",t);}var d=localStorage.getItem("draeven-3d");if(d==="on")document.documentElement.dataset.depth="on";else if(d==="off")document.documentElement.dataset.depth="off";else document.documentElement.dataset.depth=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on";}catch(e){}})();`;

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const session = await readSession();
  const searchItems = await buildSearchItems(locale as AppLocale);
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("draeven-theme")?.value;
  const theme = isSiteTheme(themeCookie) ? themeCookie : "green";
  const depthCookie = cookieStore.get("draeven-3d")?.value;
  const depth = depthCookie === "off" ? "off" : "on";

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-theme={theme}
      data-depth={depth}
      suppressHydrationWarning
    >
      <body className={`${syne.variable} ${manrope.variable}`} suppressHydrationWarning>
        <Script id="draeven-theme-boot" strategy="beforeInteractive">
          {THEME_BOOT}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider initialTheme={theme}>
            <ThreeProvider>
              <div className="grain" aria-hidden />
              <div className="site-frame relative z-[2] flex min-h-dvh flex-col">
                <SiteChrome
                  searchItems={searchItems}
                  userName={session?.name}
                  isAdmin={session?.isAdmin}
                />
                <PageviewBeacon locale={locale} />
                <div className="site-main min-h-0 flex-1">{children}</div>
                <SiteFooter className="site-footer--global" />
              </div>
            </ThreeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
