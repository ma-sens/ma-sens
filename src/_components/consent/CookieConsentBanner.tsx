"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { Locale } from "../../_lib/i18n/config";
import { getLocalizedPath } from "../../_lib/i18n/config";
import type { Translations } from "../../_lib/i18n";
import {
  getStoredConsent,
  saveConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
} from "../../_lib/consent/consent";
import styles from "./CookieConsent.module.css";

interface CookieConsentBannerProps {
  locale: Locale;
  t: Translations["cookieConsent"];
}

export function CookieConsentBanner({ locale, t }: CookieConsentBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (!stored) {
      // First-time visitor: show bottom banner
      setIsBannerVisible(true);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
  }, []);

  // Listen for open settings event (e.g. from footer button)
  useEffect(() => {
    const handleOpenSettings = () => {
      const stored = getStoredConsent();
      if (stored) {
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
      }
      setIsModalOpen(true);
      setIsBannerVisible(false);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleAcceptAll = useCallback(() => {
    saveConsent({ analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    saveConsent({ analytics: false, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    saveConsent({ analytics, marketing });
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, [analytics, marketing]);

  const handleOpenCustomize = useCallback(() => {
    setIsBannerVisible(false);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // If user hasn't saved any consent yet, keep the banner visible
    if (!getStoredConsent()) {
      setIsBannerVisible(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ── 1. Floating Bottom Banner (Initial prompt) ── */}
      {isBannerVisible && !isModalOpen && (
        <aside
          className={styles.bannerWrapper}
          aria-label="Cookie consent banner"
          role="region"
        >
          <div className={styles.bannerCard}>
            <div className={styles.header}>
              <svg
                className={styles.cookieIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M7.5 15.5v.01" />
                <path d="M15.5 14.5v.01" />
                <path d="M11.5 12.5v.01" />
              </svg>
              <h2 className={styles.title}>{t.title}</h2>
            </div>

            <p className={styles.description}>
              {t.description} {t.learnMorePrefix}{" "}
              <Link
                href={getLocalizedPath("/polityka-prywatnosci", locale)}
                className={styles.policyLink}
              >
                {t.privacyPolicyLink}
              </Link>
              .
            </p>


            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleAcceptAll}
                id="cookie-accept-all"
              >
                {t.acceptAll}
              </button>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleRejectAll}
                id="cookie-reject-all"
              >
                {t.rejectAll}
              </button>
              <button
                type="button"
                className={styles.btnTertiary}
                onClick={handleOpenCustomize}
                id="cookie-customize"
              >
                {t.customize}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ── 2. Modal for Granular Preferences ── */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={handleCloseModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCloseModal();
          }}
          role="presentation"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
          >
            <div className={styles.modalHeader}>
              <h2 id="cookie-settings-title" className={styles.modalTitle}>
                {t.title}
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleCloseModal}
                aria-label={t.close}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.description}>
                {t.description} {t.learnMorePrefix}{" "}
                <Link
                  href={getLocalizedPath("/polityka-prywatnosci", locale)}
                  className={styles.policyLink}
                >
                  {t.privacyPolicyLink}
                </Link>
                .
              </p>


              {/* Necessary Cookies */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryTitleGroup}>
                    <span className={styles.categoryTitle}>
                      {t.categories.necessary.title}
                    </span>
                    <span className={styles.alwaysActiveBadge}>
                      {t.categories.necessary.alwaysActive}
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      aria-label={t.categories.necessary.title}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDesc}>
                  {t.categories.necessary.description}
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTitle}>
                    {t.categories.analytics.title}
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      id="cookie-toggle-analytics"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      aria-label={t.categories.analytics.title}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDesc}>
                  {t.categories.analytics.description}
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTitle}>
                    {t.categories.marketing.title}
                  </span>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      id="cookie-toggle-marketing"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      aria-label={t.categories.marketing.title}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
                <p className={styles.categoryDesc}>
                  {t.categories.marketing.description}
                </p>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={`${styles.btnPrimary} ${styles.saveBtn}`}
                onClick={handleSavePreferences}
                id="cookie-save-preferences"
              >
                {t.savePreferences}
              </button>
              <div className={styles.footerSecondaryGroup}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleAcceptAll}
                  id="cookie-modal-accept-all"
                >
                  {t.acceptAll}
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleRejectAll}
                  id="cookie-modal-reject-all"
                >
                  {t.rejectAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
