import type { Metadata } from "next";
import { CtaSection } from "../../_components/sections/CtaSection";
import { HeroSection } from "../../_components/sections/HeroSection";
import { PartnersSection } from "../../_components/sections/PartnersSection";
import { PortfolioSection } from "../../_components/sections/PortfolioSection";
import { ProcessSection } from "../../_components/sections/ProcessSection";
import { ServicesSection } from "../../_components/sections/ServicesSection";
import { WhyCustomSection } from "../../_components/sections/WhyCustomSection";
import { getTranslations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { defaultLocale, isValidLocale } from "../../_lib/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);
  return {
    title: t.siteTitle,
    description: t.siteDescription,
    openGraph: {
      title: t.siteTitle,
      description: t.siteDescription,
    },
    twitter: {
      title: t.siteTitle,
      description: t.siteDescription,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);

  return (
    <>
      <HeroSection locale={locale} t={t} />
      <WhyCustomSection t={t} />
      <ProcessSection t={t} />
      <PortfolioSection t={t} />
      <ServicesSection locale={locale} t={t} />
      <PartnersSection t={t} />
      <CtaSection locale={locale} t={t} variant="dark" />
    </>
  );
}
