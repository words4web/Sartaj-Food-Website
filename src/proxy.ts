import { NextResponse, type NextRequest } from "next/server";
import legacyRedirectsData from "@/constants/legacy-redirects.json";

const legacyRedirects = legacyRedirectsData as Record<string, string>;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const destination = legacyRedirects[pathname];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
