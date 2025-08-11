
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  // Protected routes
  const protectedRoutes = ['/dashboard'];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));

  }
console.log("Middleware triggered: ", pathname, "Token:", token);

  return NextResponse.next();
}

// Apply middleware only to matching routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
