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

// LocalBusiness structured data — boosts local SEO signals.
// Schema is locale-independent (Polish business in Gdańsk).
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MA SENS Studio",
  url: "https://masensstudio.pl",
  image: "https://masensstudio.pl/og-image.jpg",
  description:
    "Meble na wymiar w Gdańsku i Trójmieście. Kuchnie, szafy, garderoby, meble łazienkowe.",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gdańsk",
    addressRegion: "Pomorskie",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 54.352,
    longitude: 18.6466,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Trójmiasto",
  },
  priceRange: "$$",
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD schema, safe
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
        }}
      />
      <LangSetter lang={locale} />
      <Header locale={locale} t={t} />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
    </>
  );
}

