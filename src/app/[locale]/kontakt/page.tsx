import type { Metadata } from "next";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import styles from "./page.module.css";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return {
    title: t.contact.h1,
    description: t.contact.meta,
    openGraph: { title: t.contact.h1, description: t.contact.meta, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MA SENS Studio" }] },
    twitter: { card: "summary_large_image", title: t.contact.h1, description: t.contact.meta, images: ["/og-image.jpg"] },
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const c = t.contact;

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <h1 className={styles.h1}>{c.h1}</h1>
            <p className={styles.intro}>{c.intro}</p>
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{c.phone}</span>
                <a href="tel:+48000000000" className={styles.detailValue} id="contact-phone">
                  +48 000 000 000
                </a>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{c.email}</span>
                <a href="mailto:kontakt@masens.pl" className={styles.detailValue} id="contact-email">
                  kontakt@masens.pl
                </a>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{c.area}</span>
                <span className={styles.detailValue}>{c.areaValue}</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{t.cta.freeQuote}</h2>
            <p className={styles.cardText}>{t.summary.ctaDesc}</p>
            <div className={styles.cardActions}>
              <a href="tel:+48000000000" className={styles.btnPrimary} id="contact-cta-call">
                {t.cta.bookMeasure}
              </a>
              <a href="mailto:kontakt@masens.pl" className={styles.btnSecondary} id="contact-cta-email">
                {t.cta.writeUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
