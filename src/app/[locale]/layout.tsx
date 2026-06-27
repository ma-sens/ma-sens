import type { Metadata } from "next";
import type { Locale } from "../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../_lib/i18n/config";
import { getTranslations } from "../../_lib/i18n";
import { Header } from "../../_components/layout/Header";
import { Footer } from "../../_components/layout/Footer";
import { LangSetter } from "../../_components/layout/LangSetter";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://masens.pl";

// Maps locale → Open Graph locale string
const OG_LOCALE: Record<string, string> = {
  pl: "pl_PL",
  en: "en_GB",
  uk: "uk_UA",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: t.siteTitle, template: `%s | MA SENS Studio` },
    description: t.siteDescription,
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "MA SENS Studio",
      title: t.siteTitle,
      description: t.siteDescription,
      locale: OG_LOCALE[locale] ?? "pl_PL",
      alternateLocale: Object.entries(OG_LOCALE)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "MA SENS Studio – meble na wymiar Gdańsk",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.siteDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);

  return (
    <>
      <LangSetter lang={locale} />
      <Header locale={locale} t={t} />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
    </>
  );
}
