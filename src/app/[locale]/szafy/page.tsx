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
  return {
    title: t.wardrobes.h1,
    description: t.wardrobes.meta,
    openGraph: { title: t.wardrobes.h1, description: t.wardrobes.meta, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MA SENS Studio" }] },
    twitter: { card: "summary_large_image", title: t.wardrobes.h1, description: t.wardrobes.meta, images: ["/og-image.jpg"] },
  };
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
