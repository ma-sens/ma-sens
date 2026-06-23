import Image from "next/image";
import Link from "next/link";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./HeroSection.module.css";

const HERO_IMAGES = [
  "/photos/kuchnia1,1.jpg",
  "/photos/garderoba8.jpg",
  "/photos/szafka1,2.jpg",
];

interface Props {
  locale: Locale;
  t: Translations;
}

export function HeroSection({ locale, t }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>{t.hero.badge}</span>
          <h1 className={styles.tagline}>{t.hero.tagline}</h1>
          <p className={styles.subtitle}>{t.hero.subtitle}</p>
          <p className={styles.description}>{t.hero.description}</p>
          <div className={styles.actions}>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.ctaPrimary}
              id="hero-cta-quote"
            >
              {t.cta.freeQuote}
            </Link>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.ctaSecondary}
              id="hero-cta-measure"
            >
              {t.cta.bookMeasure}
            </Link>
          </div>
        </div>

        <div className={styles.gallery}>
          {HERO_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`${styles.galleryItem} ${styles[`galleryItem${i + 1}`]}`}
            >
              <Image
                src={src}
                alt={`MA SENS Studio – realizacja ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
