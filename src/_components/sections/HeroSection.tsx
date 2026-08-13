import Image from "next/image";
import Link from "next/link";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./HeroSection.module.css";

const HERO_IMAGES = [
  {
    src: "/photos/kuchnia1,1.webp",
    alt: "Nowoczesna kuchnia na wymiar w Gdańsku – zabudowa mebli kuchennych MA SENS Studio",
  },
  {
    src: "/photos/garderoba1,1.webp",
    alt: "Garderoba i szafa wnękowa na wymiar – Gdańsk i Trójmiasto",
  },
  {
    src: "/photos/szafkaRTV1,2.webp",
    alt: "Meble do salonu i szafka RTV na indywidualne zamówienie – MA SENS",
  },
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
          <div className={styles.topMeta}>
            <span className={styles.badge}>{t.hero.badge}</span>
            <p className={styles.tagline}>{t.hero.tagline}</p>
          </div>
          <h1 className={styles.h1}>{t.hero.subtitle}</h1>
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
          {HERO_IMAGES.map((item, i) => (
            <div
              key={item.src}
              className={`${styles.galleryItem} ${styles[`galleryItem${i + 1}`]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
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

