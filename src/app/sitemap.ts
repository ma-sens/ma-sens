import type { MetadataRoute } from "next";
import { locales, getLocalizedPath } from "../_lib/i18n/config";

const BASE_URL = "https://masensstudio.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  // Define all static routes in the application
  const routes = [
    "/",
    "/kuchnie",
    "/szafy",
    "/garderoby",
    "/salon-lazienka",
    "/cennik",
    "/faq",
    "/o-nas",
    "/kontakt",
    "/regulamin",
    "/polityka-prywatnosci",
    "/blog",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Generate alternate language links for each route
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}${getLocalizedPath(route, locale)}`;
    }

    for (const locale of locales) {
      const path = getLocalizedPath(route, locale);
      
      sitemapEntries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemapEntries;
}
