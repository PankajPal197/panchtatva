import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ✅ If no token, only allow /login, /register
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwt.verify(token, "!@$#%^");

    // ✅ Block /login for logged-in users
    if (req.nextUrl.pathname === '/login') {
      if (decoded.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // ✅ Block /admin if role is not admin
    if (req.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    // Token invalid — redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/admin/:path*'],
};
