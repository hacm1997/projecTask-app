import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define private routes
const protectedRoutes = ["/dashboard"];

export function AuthMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth.user"); // Verify token in cookies

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to login if not authenticated
    }
  }

  return NextResponse.next(); // Continue if token exists
}

export const config = {
  matcher: ["/dashboard/:path*"], // Routes that activate the middleware
};
