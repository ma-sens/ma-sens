import Image from "next/image";
import Link from "next/link";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import { SectionTitle } from "../ui/SectionTitle";
import styles from "./ServicesSection.module.css";

const SERVICE_IMAGES: Record<string, string> = {
  kuchnie: "/photos/kuchnia2,1.jpg",
  szafy: "/photos/szafka4,1.jpg",
  garderoby: "/photos/garderoba7,1.jpg",
  "salon-lazienka": "/photos/łazienka1,1.jpg",
};

interface Props {
  locale: Locale;
  t: Translations;
}

export function ServicesSection({ locale, t }: Props) {
  return (
    <section className={`section ${styles.wrapper}`}>
      <div className="container">
        <SectionTitle title={t.services.title} align="center" />
        <div className={styles.grid}>
          {t.services.list.map((service) => (
            <Link
              key={service.slug}
              href={getLocalizedPath(`/${service.slug}`, locale)}
              className={styles.card}
              id={`service-card-${service.slug}`}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={SERVICE_IMAGES[service.slug] ?? "/photos/kuchnia1,1.jpg"}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.name}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <span className={styles.cardArrow} aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
