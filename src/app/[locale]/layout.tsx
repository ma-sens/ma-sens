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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getTranslations(locale);
  return {
    title: { default: t.siteTitle, template: `%s | MA SENS Studio` },
    description: t.siteDescription,
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
