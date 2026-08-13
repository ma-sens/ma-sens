import { Inter } from "next/font/google";
import "./globals.css";
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from "../_components/analytics/GoogleTagManager";

// next/font/google self-hosts Inter at build time — eliminates the
// render-blocking external Google Fonts request that was hurting FCP/LCP.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter", // exposes the font as a CSS variable
});

// Root layout must own <html> and <body>.
// suppressHydrationWarning lets [locale]/layout.tsx set the lang attribute
// on the client without a hydration mismatch.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // biome-ignore lint/a11y/useHtmlLang: lang is set dynamically by LangSetter component in [locale]/layout.tsx
    <html suppressHydrationWarning className={inter.variable}>
      <head>
        <GoogleTagManagerHead />
      </head>
      <body suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}


