"use client";

import { openCookieSettings } from "../../_lib/consent/consent";

interface CookieSettingsButtonProps {
  label: string;
  className?: string;
}

export function CookieSettingsButton({
  label,
  className,
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => openCookieSettings()}
      id="footer-cookie-settings"
    >
      {label}
    </button>
  );
}
