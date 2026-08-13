import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import { getProjectsByCategory } from "../../../_lib/photos";
import { ServicePage } from "../../../_components/portfolio/ServicePage";

import { createSeoMetadata } from "../../../_lib/seo/metadata";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return createSeoMetadata({
    path: "/salon-lazienka",
    locale,
    title: t.living.h1,
    description: t.living.meta,
    image: {
      url: "/photos/łazienka1,1.webp",
      alt: "Meble łazienkowe i do salonu Gdańsk – MA SENS Studio",
    },
  });
}


export default async function SalonLazienkPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const projects = getProjectsByCategory("lazienka");

  return (
    <ServicePage
      locale={locale}
      t={t}
      service={t.living}
      heroImg="/photos/łazienka1,1.webp"
      projects={projects}
    />
  );
}
