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
  return {
    title: t.about.h1,
    description: t.about.meta,
    openGraph: { title: t.about.h1, description: t.about.meta, images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MA SENS Studio" }] },
    twitter: { card: "summary_large_image", title: t.about.h1, description: t.about.meta, images: ["/og-image.jpg"] },
  };
}

export default async function ONasPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.h1}>{a.h1}</h1>
          <p className={styles.intro}>{a.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{t.nav.about}</h2>
              <ul className={styles.list}>
                {a.distincts.map((d) => (
                  <li key={d} className={styles.listItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{a.forWhoTitle}</h2>
              <ul className={styles.list}>
                {a.forWho.map((fw) => (
                  <li key={fw} className={styles.listItem}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    {fw}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{a.localTitle}</h2>
              <p className={styles.cardText}>{a.localDesc}</p>
              <div className={styles.cities}>
                {a.cities.map((city) => (
                  <span key={city} className={styles.cityBadge}>{city}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection locale={locale} t={t} variant="dark" />
    </>
  );
}
