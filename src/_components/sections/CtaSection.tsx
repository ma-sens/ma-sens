import Link from "next/link";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./CtaSection.module.css";

interface Props {
  locale: Locale;
  t: Translations;
  variant?: "light" | "dark";
}

export function CtaSection({ locale, t, variant = "dark" }: Props) {
  return (
    <section className={`section ${styles.wrapper} ${styles[variant]}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <h2 className={styles.title}>{t.summary.ctaTitle}</h2>
            <p className={styles.desc}>{t.summary.ctaDesc}</p>
          </div>
          <div className={styles.actions}>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.btnPrimary}
              id="cta-section-quote"
            >
              {t.cta.freeQuote}
            </Link>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.btnSecondary}
              id="cta-section-measure"
            >
              {t.cta.bookMeasure}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
