import { updateSession } from "@/lib/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { defaultScript } from "./lib/variables";

const locales = ["sr-cyrl", "sr-latn", "en"]; // add more as needed

/*function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return "sr-latn";

  const preferred = acceptLang
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase());

  const matched = preferred.find((lang) => locales.includes(lang));
  return matched || "sr-latn";
}*/

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const startsWithSupportedLang = locales.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  if (
    !pathname.startsWith("/protected") &&
    !pathname.startsWith("/auth") &&
    !startsWithSupportedLang
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultScript}`;
    return NextResponse.redirect(url);
  }

  if (
    request.nextUrl.pathname.startsWith("/protected") &&
    !request.nextUrl.pathname.includes("/protected/api/")
  )
    return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
