import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import { CtaSection } from "../../../_components/sections/CtaSection";
import { FaqAccordion } from "./FaqAccordion";
import styles from "./page.module.css";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return {
    title: t.faq.h1,
    description: t.faq.meta,
    openGraph: { title: t.faq.h1, description: t.faq.meta },
    twitter: { title: t.faq.h1, description: t.faq.meta },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.h1}>{t.faq.h1}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FaqAccordion items={t.faq.items} />
        </div>
      </section>
      <CtaSection locale={locale} t={t} variant="light" />
    </>
  );
}
