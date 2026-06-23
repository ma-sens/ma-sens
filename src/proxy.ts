import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isValidLocale, locales } from "./_lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. If pathname starts with defaultLocale (e.g. /pl), redirect to prefixless path
  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const cleanPath = pathname.slice(defaultLocale.length + 1);
    const response = NextResponse.redirect(
      new URL(cleanPath || "/", request.url),
    );
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }
  if (pathname === `/${defaultLocale}`) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }

  // 2. If pathname starts with another supported locale (e.g. /en, /uk), let it pass
  const hasLocale = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`),
  );
  if (hasLocale) {
    const locale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }

  // 3. Otherwise, the pathname is prefixless (e.g. / or /kontakt).

  // If it's a subpage (e.g. /kontakt), ALWAYS serve default locale (pl) without redirecting
  if (pathname !== "/") {
    const response = NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 31536000,
    });
    return response;
  }

  // 4. For root path (/):
  // Check the cookie first. Otherwise, default to defaultLocale (pl).
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  }

  // If preferred locale is default locale (pl), rewrite internally to /pl/
  if (locale === defaultLocale) {
    const response = NextResponse.rewrite(
      new URL(`/${defaultLocale}/`, request.url),
    );
    response.cookies.set("NEXT_LOCALE", defaultLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: 'lax',
    });
    return response;
  }

  // If preferred locale is a non-default locale (en or uk), redirect to /en/ or /uk/
  const response = NextResponse.redirect(new URL(`/${locale}/`, request.url));
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon\\.ico|photos|.*\\..*).*)"],
};
