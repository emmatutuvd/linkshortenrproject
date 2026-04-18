import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicHome = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect authenticated users away from home
  if (isPublicHome(req) && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect /dashboard — Clerk will redirect to sign-in automatically
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
