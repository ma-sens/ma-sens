import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import { getProjectsByCategory } from "../../../_lib/photos";
import { ServicePage } from "../../../_components/portfolio/ServicePage";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return { title: t.wardrobes.h1, description: t.wardrobes.meta };
}

export default async function SzafyPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const projects = getProjectsByCategory("szafka");

  return (
    <ServicePage
      locale={locale}
      t={t}
      service={t.wardrobes}
      heroImg="/photos/szafka4,1.jpg"
      projects={projects}
    />
  );
}
