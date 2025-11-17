import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TEMPORARILY DISABLED: Clerk middleware disabled for testing
// To re-enable: uncomment the code below and install @clerk/nextjs
/*
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/legal",
  "/stories",
  "/partners",
  "/family(.*)",
  "/share(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/contact",
  "/help",
  "/privacy",
  "/terms",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  try {
    const authObj = await auth();
    if (!authObj.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  } catch (error) {
    console.warn("Clerk middleware error:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
});
*/

// Temporary: Allow all routes without authentication
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

