// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/", "/admin", "/admin/login", "/register"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow all public paths
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  if (isPublic) {
    return NextResponse.next();
  }

  // If no token, redirect to /admin
  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  try {
    // Verify token
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "!@@#$%~!@"));
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/admin", req.url));
  }
}

// Match protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
