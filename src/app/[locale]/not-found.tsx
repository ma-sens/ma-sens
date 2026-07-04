import Link from "next/link";
import { headers } from "next/headers";
import type { Locale } from "../../_lib/i18n/config";
import {
  isValidLocale,
  defaultLocale,
  getLocalizedPath,
} from "../../_lib/i18n/config";
import { getTranslations } from "../../_lib/i18n";
import { HideLangSwitcher } from "../../_components/layout/HideLangSwitcher";
import styles from "./not-found.module.css";

// Derive locale from the incoming request pathname (e.g. /en/... → "en")
async function getLocaleFromHeaders(): Promise<Locale> {
  const headersList = await headers();
  const pathname =
    headersList.get("x-pathname") ?? headersList.get("x-forwarded-uri") ?? "";
  const segment = pathname.split("/")[1] ?? "";
  return isValidLocale(segment) ? segment : defaultLocale;
}

export default async function NotFound() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const messages = {
    pl: {
      title: "Strona nie istnieje",
      subtitle:
        "Nie możemy znaleźć strony, której szukasz. Może wróćmy na stronę główną?",
      home: "Strona główna",
      contact: "Kontakt",
    },
    en: {
      title: "Page not found",
      subtitle:
        "We couldn't find the page you're looking for. Let's head back home.",
      home: "Home",
      contact: "Contact",
    },
    uk: {
      title: "Сторінку не знайдено",
      subtitle:
        "Ми не можемо знайти сторінку, яку ви шукаєте. Повернімося на головну?",
      home: "Головна",
      contact: "Контакт",
    },
  } as const;

  const m = messages[locale] ?? messages.pl;

  return (
    <>
      <HideLangSwitcher />
      <section className={styles.page} aria-labelledby="not-found-title">
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>

          <h1 className={styles.title} id="not-found-title">
            {m.title}
          </h1>
          <p className={styles.subtitle}>{m.subtitle}</p>

          <nav className={styles.actions} aria-label="Recovery navigation">
            <Link
              href={getLocalizedPath("/", locale)}
              className={styles.btnPrimary}
              id="not-found-home"
            >
              ← {m.home}
            </Link>
            <Link
              href={getLocalizedPath("/kontakt", locale)}
              className={styles.btnSecondary}
              id="not-found-contact"
            >
              {t.nav.contact}
            </Link>
          </nav>
        </div>
      </div>
      </section>
    </>
  );
}
