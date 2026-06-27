"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./Header.module.css";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface HeaderProps {
  locale: Locale;
  t: Translations;
}

export function Header({ locale, t }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: getLocalizedPath("/kuchnie", locale), label: t.nav.kitchens },
    { href: getLocalizedPath("/szafy", locale), label: t.nav.wardrobes },
    { href: getLocalizedPath("/garderoby", locale), label: t.nav.dressing },
    { href: getLocalizedPath("/cennik", locale), label: t.nav.pricing },
    { href: getLocalizedPath("/o-nas", locale), label: t.nav.about },
  ];

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    // Always restore on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${menuOpen ? styles.headerMenuOpen : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={getLocalizedPath("/", locale)}
          className={styles.logo}
          aria-label="MA SENS Studio – strona główna"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="MA SENS Studio"
            className={styles.logoImg}
          />
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={getLocalizedPath("/kontakt", locale)}
            className={styles.navCta}
            onClick={() => setMenuOpen(false)}
            id="header-cta"
          >
            {t.cta.freeQuote}
          </Link>
        </nav>

        <div className={styles.actions}>
          <LocaleSwitcher currentLocale={locale} />
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Otwórz menu"
          >
            <span
              className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen1 : ""}`}
            />
            <span
              className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen2 : ""}`}
            />
            <span
              className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineOpen3 : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
