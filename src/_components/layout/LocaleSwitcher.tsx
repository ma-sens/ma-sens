"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "../../_lib/i18n/config";
import { defaultLocale, locales } from "../../_lib/i18n/config";
import styles from "./LocaleSwitcher.module.css";

const labels: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
  uk: "UK",
};

interface Props {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function getLocalePath(locale: Locale): string {
    const segments = pathname.split("/");
    const firstSegment = segments[1];
    const isFirstSegmentLocale = locales.includes(firstSegment as Locale);
    const restOfPath = isFirstSegmentLocale
      ? segments.slice(2).join("/")
      : segments.slice(1).join("/");

    if (locale === defaultLocale) {
      return restOfPath ? `/${restOfPath}` : "/";
    }
    return restOfPath ? `/${locale}/${restOfPath}` : `/${locale}`;
  }

  function handleSwitch(locale: Locale) {
    // Set cookie BEFORE navigating so middleware reads the updated value
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
    router.push(getLocalePath(locale));
  }

  return (
    <nav className={styles.switcher} aria-label="Language switcher">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => handleSwitch(locale)}
          className={`${styles.item} ${locale === currentLocale ? styles.active : ""}`}
          aria-current={locale === currentLocale ? "true" : undefined}
          lang={locale}
        >
          {labels[locale]}
        </button>
      ))}
    </nav>
  );
}
