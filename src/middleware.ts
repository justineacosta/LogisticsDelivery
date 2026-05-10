import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lightweight auth gate — full session check happens server-side in /admin layout.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const sessionCookie =
      req.cookies.get("authjs.session-token")?.value ??
      req.cookies.get("__Secure-authjs.session-token")?.value;
    if (!sessionCookie) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
