import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "../../../_lib/i18n/config";
import { isValidLocale, defaultLocale, getLocalizedPath } from "../../../_lib/i18n/config";
import { getTranslations } from "../../../_lib/i18n";
import styles from "./page.module.css";

import { createSeoMetadata } from "../../../_lib/seo/metadata";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  return createSeoMetadata({
    path: "/polityka-prywatnosci",
    locale,
    title: t.privacyPage.h1,
    description: t.privacyPage.meta,
  });
}


export default async function PolitykaPrywatnosciPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const t = getTranslations(locale);
  const p = t.privacyPage;

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <Link href={getLocalizedPath("/", locale)} className={styles.backLink} id="privacy-back-home">
              <span className={styles.backArrow}>←</span>
              {t.legalPages.backHome}
            </Link>
            <h1 className={styles.h1}>{p.h1}</h1>
            <div className={styles.meta}>
              <span>{t.legalPages.lastUpdated}:</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{p.updatedAt}</span>
            </div>
          </div>

          <p className={styles.intro}>{p.intro}</p>

          <div className={styles.sections}>
            {p.sections.map((section) => (
              <div key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <ul className={styles.bodyList}>
                  {section.body.map((item) => (
                    <li key={item} className={styles.bodyItem}>
                      <span className={styles.bullet} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
