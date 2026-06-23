import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /pl/... → /... (видаляємо /pl префікс — Polish = no prefix)
      {
        source: "/pl/:path*",
        destination: "/:path*",
        permanent: true,
      },
      // Cookie-based redirect з root на non-default локаль
      {
        source: "/",
        has: [{ type: "cookie", key: "NEXT_LOCALE", value: "en" }],
        destination: "/en",
        permanent: false,
      },
      {
        source: "/",
        has: [{ type: "cookie", key: "NEXT_LOCALE", value: "uk" }],
        destination: "/uk",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return {
      // beforeFiles: rewrite ДО того як Next.js шукає сторінки у filesystem
      beforeFiles: [
        // /kontakt, /kuchnie тощо → /pl/:path (URL не змінюється)
        // Виключаємо: pl, en, uk (локалі), _next, favicon.ico, файли з крапкою
        {
          source:
            "/:path((?!pl(?:/|$)|en(?:/|$)|uk(?:/|$)|_next|favicon\\.ico)(?:[^./]+))",
          destination: "/pl/:path",
        },
        // / (root, без cookie) → /pl (Polish home, URL лишається /)
        {
          source: "/",
          destination: "/pl",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
