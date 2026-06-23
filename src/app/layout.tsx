import "./globals.css";

// Root layout must own <html> and <body>.
// suppressHydrationWarning lets [locale]/layout.tsx set the lang attribute
// on the client without a hydration mismatch.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
