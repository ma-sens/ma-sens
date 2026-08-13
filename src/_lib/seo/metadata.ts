import type { Metadata } from "next";
import type { Locale } from "../i18n/config";
import { defaultLocale, getLocalizedPath, locales } from "../i18n/config";

export const BASE_URL = "https://masensstudio.pl";

const OG_LOCALE: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_GB",
  uk: "uk_UA",
};

interface CreateMetadataOptions {
  path: string;
  locale: Locale;
  title: string;
  description: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  noIndex?: boolean;
}

export function createSeoMetadata({
  path,
  locale,
  title,
  description,
  image = {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "MA SENS Studio – meble na wymiar Gdańsk",
  },
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const canonicalPath = getLocalizedPath(path, locale);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}${getLocalizedPath(path, loc)}`;
  }
  languages["x-default"] = `${BASE_URL}${getLocalizedPath(path, defaultLocale)}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "MA SENS Studio",
      title,
      description,
      url: canonicalUrl,
      locale: OG_LOCALE[locale] ?? "pl_PL",
      alternateLocale: Object.entries(OG_LOCALE)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
      images: [
        {
          url: image.url,
          width: image.width ?? 1200,
          height: image.height ?? 630,
          alt: image.alt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
