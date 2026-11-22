export const SITE_THEMES = [
  "green",
  "blue",
  "red",
  "orange",
  "gray",
  "white",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

export function isSiteTheme(value: string | null | undefined): value is SiteTheme {
  return !!value && (SITE_THEMES as readonly string[]).includes(value);
}
