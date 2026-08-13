"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Translations } from "../../_lib/i18n";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import styles from "./Header.module.css";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface HeaderProps {
  locale: Locale;
  t: Translations;
  hideLangSwitcher?: boolean;
}

export function Header({ locale, t, hideLangSwitcher = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(true);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const offerItems = [
    {
      href: getLocalizedPath("/kuchnie", locale),
      label: t.nav.kitchens,
      desc: t.kitchens.h1,
    },
    {
      href: getLocalizedPath("/szafy", locale),
      label: t.nav.wardrobes,
      desc: t.wardrobes.h1,
    },
    {
      href: getLocalizedPath("/garderoby", locale),
      label: t.nav.dressing,
      desc: t.dressing.h1,
    },
    {
      href: getLocalizedPath("/salon-lazienka", locale),
      label: t.nav.living,
      desc: t.living.h1,
    },
  ];


  const directLinks = [
    { href: getLocalizedPath("/cennik", locale), label: t.nav.pricing },
    { href: getLocalizedPath("/o-nas", locale), label: t.nav.about },
    { href: getLocalizedPath("/faq", locale), label: t.nav.faq },
    { href: getLocalizedPath("/kontakt", locale), label: t.nav.contact },
  ];

  const isOfferActive = offerItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Ref stores scroll position so cleanup race-condition can't clear it before restore
  const savedScrollY = useRef(0);

  // Lock body scroll when mobile menu is open (iOS-safe: position:fixed technique)
  useEffect(() => {
    if (menuOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [menuOpen]);

  // Close menu & dropdown on navigation
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`${styles.header} ${menuOpen ? styles.headerMenuOpen : ""}`}
    >
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

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {/* Dropdown for Offer */}
          <div
            ref={dropdownRef}
            className={styles.dropdownWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${
                isOfferActive ? styles.navLinkActive : ""
              }`}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-controls="desktop-services-menu"
            >
              <span>{t.nav.offer}</span>
              <svg
                className={`${styles.chevron} ${
                  dropdownOpen ? styles.chevronRotated : ""
                }`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                id="desktop-services-menu"
                className={styles.dropdownMenu}
                role="menu"
              >
                {offerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={`${styles.dropdownItem} ${
                      isActive(item.href) ? styles.dropdownItemActive : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className={styles.dropdownItemTitle}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className={styles.dropdownItemDesc}>
                        {item.desc}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct Nav Links */}
          {directLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.navLinkActive : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Header CTA Button */}
          <Link
            href={getLocalizedPath("/kontakt", locale)}
            className={styles.navCta}
            id="header-cta"
          >
            {t.cta.freeQuote}
          </Link>
        </nav>

        {/* Mobile Navigation Drawer */}
        <nav
          className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileContent}>
            {/* Mobile Offer Accordion */}
            <div className={styles.mobileAccordion}>
              <button
                type="button"
                className={styles.mobileAccordionBtn}
                onClick={() => setMobileOfferOpen((prev) => !prev)}
                aria-expanded={mobileOfferOpen}
              >
                <span
                  className={
                    isOfferActive
                      ? styles.mobileLinkActiveText
                      : styles.mobileLinkText
                  }
                >
                  {t.nav.offer}
                </span>
                <svg
                  className={`${styles.mobileChevron} ${
                    mobileOfferOpen ? styles.mobileChevronRotated : ""
                  }`}
                  width="12"
                  height="8"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {mobileOfferOpen && (
                <div className={styles.mobileSubList}>
                  {offerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.mobileSubLink} ${
                        isActive(item.href) ? styles.mobileSubLinkActive : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span className={styles.mobileSubArrow}>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Mobile Links */}
            {directLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  isActive(link.href) ? styles.mobileNavLinkActive : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className={styles.mobileCtaWrapper}>
              <Link
                href={getLocalizedPath("/kontakt", locale)}
                className={styles.mobileNavCta}
                onClick={() => setMenuOpen(false)}
                id="header-cta-mobile"
              >
                {t.cta.freeQuote}
              </Link>
            </div>
          </div>
        </nav>

        {/* Right Actions: Lang Switcher & Burger Button */}
        <div className={styles.actions}>
          {!hideLangSwitcher && <LocaleSwitcher currentLocale={locale} />}
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <span
              className={`${styles.burgerLine} ${
                menuOpen ? styles.burgerLineOpen1 : ""
              }`}
            />
            <span
              className={`${styles.burgerLine} ${
                menuOpen ? styles.burgerLineOpen2 : ""
              }`}
            />
            <span
              className={`${styles.burgerLine} ${
                menuOpen ? styles.burgerLineOpen3 : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
