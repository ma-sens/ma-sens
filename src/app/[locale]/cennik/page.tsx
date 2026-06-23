import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import { CtaSection } from "../../../_components/sections/CtaSection";
import styles from "./page.module.css";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return { title: t.pricingPage.h1, description: t.pricingPage.meta };
}

export default async function CennikPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const p = t.pricingPage;

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.h1}>{p.h1}</h1>
          <p className={styles.intro}>{p.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t.pricing.title}</h2>
              <p className={styles.cardText}>{t.pricing.intro}</p>
              <ul className={styles.list}>
                {p.factors.map((f) => (
                  <li key={f} className={styles.listItem}>
                    <span className={styles.dot} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.cardDark}`}>
              <h2 className={styles.cardTitle}>{p.whyTitle}</h2>
              <p className={styles.cardText}>{p.whyDesc}</p>
              <ul className={styles.summaryList}>
                {t.pricing.summary.map((s) => (
                  <li key={s} className={styles.summaryItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection locale={locale} t={t} variant="light" />
    </>
  );
}
