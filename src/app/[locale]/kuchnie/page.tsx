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
    title: t.kitchens.h1,
    description: t.kitchens.meta,
    openGraph: { title: t.kitchens.h1, description: t.kitchens.meta, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MA SENS Studio" }] },
    twitter: { card: "summary_large_image", title: t.kitchens.h1, description: t.kitchens.meta, images: ["/og-image.jpg"] },
  };
}

export default async function KuchniePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const projects = getProjectsByCategory("kuchnia");

  return (
    <ServicePage
      locale={locale}
      t={t}
      service={t.kitchens}
      heroImg="/photos/kuchnia1,1.webp"
      projects={projects}
    />
  );
}
