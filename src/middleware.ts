import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "./i18n-config";

// We're removing locale detection logic and always using "ge"
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// Simplified function that always returns the default locale "ge"
function getLocale(): string {
  return i18n.defaultLocale; // Always returns "ge"
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    [
      "/manifest.json",
      "/favicon.ico",
      "/robots.txt",
      "/sitemap.xml",
      "/admin", // Add admin to the exempted paths
      // Add other files in `public` as needed
    ].includes(pathname) ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/admin/") || // Also exempt all paths under /admin/
    pathname.startsWith("/.netlify/") || // Exempt Netlify functionality paths
    pathname.startsWith("/dictionaries/") // Exempt dictionaries folder
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(); // Now always returns "ge"

    // e.g. incoming request is /products
    // The new URL is now /ge/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, `/admin`, `/.netlify/`, and `/dictionaries/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|admin|.netlify|dictionaries|assets).*)"],
};
