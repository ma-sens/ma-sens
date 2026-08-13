export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: number;
}

export const COOKIE_CONSENT_KEY = "masens_cookie_consent_v1";
export const OPEN_COOKIE_SETTINGS_EVENT = "masens:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "masens:cookie-consent-changed";
const CURRENT_VERSION = 1;

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (parsed && typeof parsed.necessary === "boolean" && parsed.version === CURRENT_VERSION) {
      return parsed;
    }
  } catch {
    // If malformed, ignore and return null
  }
  return null;
}

export function saveConsent(choices: {
  analytics: boolean;
  marketing: boolean;
}): CookieConsentState {
  const state: CookieConsentState = {
    necessary: true,
    analytics: Boolean(choices.analytics),
    marketing: Boolean(choices.marketing),
    updatedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors (e.g. private mode quota)
    }

    updateGtagConsent({
      analytics: state.analytics,
      marketing: state.marketing,
    });

    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state })
    );
  }

  return state;
}

export function updateGtagConsent(consent: {
  analytics: boolean;
  marketing: boolean;
}): void {
  if (typeof window === "undefined") return;

  // Ensure dataLayer exists
  const win = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  win.dataLayer = win.dataLayer || [];

  const gtag = (...args: unknown[]) => {
    win.dataLayer?.push(args);
  };

  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });

  win.dataLayer.push({
    event: "cookie_consent_update",
    consent_analytics: consent.analytics ? "granted" : "denied",
    consent_marketing: consent.marketing ? "granted" : "denied",
  });
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
