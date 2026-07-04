"use client";

import { useEffect } from "react";

/**
 * Hides the LocaleSwitcher via CSS when mounted (e.g. on 404 page).
 * Uses a data-attribute on <html> so the CSS can target it globally.
 */
export function HideLangSwitcher() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hide-lang", "true");
    return () => {
      document.documentElement.removeAttribute("data-hide-lang");
    };
  }, []);
  return null;
}
