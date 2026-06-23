import Link from "next/link";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./Footer.module.css";

interface FooterProps {
  locale: Locale;
  t: Translations;
}

export function Footer({ locale, t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.brandName}>MA SENS Studio</p>
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <p className={styles.area}>{t.footer.area}</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.group}>
            <p className={styles.groupTitle}>{t.services.title}</p>
            <Link
              href={getLocalizedPath("/kuchnie", locale)}
              className={styles.link}
            >
              {t.nav.kitchens}
            </Link>
            <Link
              href={getLocalizedPath("/szafy", locale)}
              className={styles.link}
            >
              {t.nav.wardrobes}
            </Link>
            <Link
              href={getLocalizedPath("/garderoby", locale)}
              className={styles.link}
            >
              {t.nav.dressing}
            </Link>
            <Link
              href={getLocalizedPath("/salon-lazienka", locale)}
              className={styles.link}
            >
              {t.nav.living}
            </Link>
          </div>
          <div className={styles.group}>
            <p className={styles.groupTitle}>Info</p>
            <Link
              href={getLocalizedPath("/cennik", locale)}
              className={styles.link}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href={getLocalizedPath("/o-nas", locale)}
              className={styles.link}
            >
              {t.nav.about}
            </Link>
            <Link
              href={getLocalizedPath("/faq", locale)}
              className={styles.link}
            >
              {t.nav.faq}
            </Link>
            <Link
              href={getLocalizedPath("/blog", locale)}
              className={styles.link}
            >
              {t.nav.blog}
            </Link>
          </div>
          <div className={styles.group}>
            <p className={styles.groupTitle}>{t.nav.contact}</p>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.link}
            >
              {t.cta.bookMeasure}
            </Link>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.link}
            >
              {t.cta.freeQuote}
            </Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            © {currentYear} MA SENS Studio. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
