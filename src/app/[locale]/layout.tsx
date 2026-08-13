import type { Metadata } from "next";
import type { Locale } from "../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../_lib/i18n/config";
import { getTranslations } from "../../_lib/i18n";
import { Header } from "../../_components/layout/Header";
import { Footer } from "../../_components/layout/Footer";
import { LangSetter } from "../../_components/layout/LangSetter";
import { CookieConsentBanner } from "../../_components/consent/CookieConsentBanner";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}


import { createSeoMetadata } from "../../_lib/seo/metadata";

// LocalBusiness structured data — boosts local SEO signals.
// Schema is locale-independent (Polish business in Gdańsk).
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://masensstudio.pl/#localbusiness",
  name: "MA SENS Studio – Meble na wymiar Gdańsk",
  alternateName: "MA SENS Studio",
  url: "https://masensstudio.pl",
  image: "https://masensstudio.pl/og-image.jpg",
  description:
    "Meble na wymiar w Gdańsku i Trójmieście. Kuchnie, szafy, garderoby, meble łazienkowe na indywidualne zamówienie.",
  telephone: "+48 510 593 773",
  email: "masensstudio.gdansk@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "PLN",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gdańsk",
    addressRegion: "Pomorskie",
    addressCountry: "PL",
    postalCode: "80-001",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 54.352,
    longitude: 18.6466,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Gdańsk",
    },
    {
      "@type": "City",
      name: "Sopot",
    },
    {
      "@type": "City",
      name: "Gdynia",
    },
    {
      "@type": "AdministrativeArea",
      name: "Trójmiasto",
    },
    {
      "@type": "AdministrativeArea",
      name: "Województwo pomorskie",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usługi stolarskie i meble na wymiar",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kuchnie na wymiar Gdańsk",
          description: "Projektowanie i produkcja nowoczesnych mebli kuchennych na wymiar.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Szafy i zabudowy wnęk",
          description: "Szafy przesuwne, szafy otwierane i zabudowy wnęk na wymiar.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Garderoby na wymiar",
          description: "Pojemne i ergonomiczne garderoby na zamówienie.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Meble łazienkowe i do salonu",
          description: "Zabudowy łazienkowe, szafki RTV i meble salonowe.",
        },
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);

  const baseMeta = createSeoMetadata({
    path: "/",
    locale,
    title: t.siteTitle,
    description: t.siteDescription,
  });

  return {
    ...baseMeta,
    title: { default: t.siteTitle, template: `%s | MA SENS Studio` },
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
      <CookieConsentBanner locale={locale} t={t.cookieConsent} />
    </>
  );
}


