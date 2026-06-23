export const locales = ["pl", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return cleanPath;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
