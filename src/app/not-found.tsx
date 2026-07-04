import Link from "next/link";
import { headers } from "next/headers";
import type { Locale } from "../_lib/i18n/config";
import {
  isValidLocale,
  defaultLocale,
  getLocalizedPath,
} from "../_lib/i18n/config";
import { getTranslations } from "../_lib/i18n";
import { Header } from "../_components/layout/Header";
import { Footer } from "../_components/layout/Footer";
import styles from "./[locale]/not-found.module.css";

async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  const pathname =
    headersList.get("x-pathname") ??
    headersList.get("x-forwarded-uri") ??
    headersList.get("x-next-url") ??
    "";
  const segment = pathname.replace(/^\//, "").split("/")[0] ?? "";
  return isValidLocale(segment) ? segment : defaultLocale;
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = getTranslations(locale);

  const messages: Record<Locale, { title: string; subtitle: string }> = {
    pl: {
      title: "Strona nie istnieje",
      subtitle:
        "Nie możemy znaleźć strony, której szukasz. Może wróćmy na stronę główną?",
    },
    en: {
      title: "Page not found",
      subtitle:
        "We couldn't find the page you're looking for. Let's head back home.",
    },
    uk: {
      title: "Сторінку не знайдено",
      subtitle:
        "Ми не можемо знайти сторінку, яку ви шукаєте. Повернімося на головну?",
    },
  };

  const m = messages[locale];

  return (
    <>
      <Header locale={locale} t={t} hideLangSwitcher />
      <main>
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
                  ← {t.nav.home}
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
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
