import { Inter } from "next/font/google";
import "./globals.css";

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
    <html suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
