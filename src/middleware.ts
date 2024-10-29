import { NextResponse } from "next/server";
import { type JWT } from "next-auth/jwt";
import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const session: JWT | null = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/auth")) {
      if (session) {
        return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
      } else {
        return NextResponse.next();
      }
    }

    if (req.nextUrl.pathname.includes("dashboard")) {
      if (!session) {
        return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
      }

      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!req.nextUrl.pathname.startsWith("/dashboard")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
