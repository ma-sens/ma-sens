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
    path: "/szafy",
    locale,
    title: t.wardrobes.h1,
    description: t.wardrobes.meta,
    image: {
      url: "/photos/szafkaRTV4,1.webp",
      alt: "Szafy na wymiar Gdańsk – MA SENS Studio",
    },
  });
}


export default async function SzafyPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const projects = getProjectsByCategory("szafkaRTV");

  return (
    <ServicePage
      locale={locale}
      t={t}
      service={t.wardrobes}
      heroImg="/photos/szafkaRTV4,1.webp"
      projects={projects}
    />
  );
}
