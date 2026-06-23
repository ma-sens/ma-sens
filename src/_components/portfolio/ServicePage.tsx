import Image from "next/image";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import type { PhotoProject } from "../../_lib/photos";
import { PhotoGrid } from "../portfolio/PhotoGrid";
import { CtaSection } from "../sections/CtaSection";
import styles from "./ServicePage.module.css";

interface ServiceData {
  h1: string;
  intro: string;
  why: readonly string[];
  gain: readonly string[];
  meta: string;
}

interface Props {
  locale: Locale;
  t: Translations;
  service: ServiceData;
  heroImg: string;
  projects: PhotoProject[];
}

export function ServicePage({ locale, t, service, heroImg, projects }: Props) {
  const { servicePageShared: shared } = t;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.h1}>{service.h1}</h1>
              <p className={styles.intro}>{service.intro}</p>
              <a
                href={getLocalizedPath("/kontakt", locale)}
                className={styles.heroCta}
                id="service-cta"
              >
                {t.cta.freeQuote}
              </a>
            </div>
            <div className={styles.heroImg}>
              <Image
                src={heroImg}
                alt={service.h1}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why & Gain */}
      <section className={`section ${styles.benefits}`}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h2 className={styles.cardTitle}>{shared.whyTitle}</h2>
              <ul className={styles.list}>
                {service.why.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.benefitCard}>
              <h2 className={styles.cardTitle}>{shared.gainTitle}</h2>
              <ul className={styles.list}>
                {service.gain.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.benefitCard} ${styles.priceCard}`}>
              <h2 className={styles.cardTitle}>{shared.priceTitle}</h2>
              <p className={styles.priceText}>{shared.priceSuffix}</p>
              <p className={styles.priceNote}>{shared.priceNote}</p>
              <a
                href={getLocalizedPath("/kontakt", locale)}
                className={styles.priceCta}
                id="service-price-cta"
              >
                {t.cta.checkCost}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {projects.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className={styles.galleryTitle}>{t.portfolio.title}</h2>
            <PhotoGrid projects={projects} t={t} showFilter={false} />
          </div>
        </section>
      )}

      <CtaSection locale={locale} t={t} variant="dark" />
    </>
  );
}
