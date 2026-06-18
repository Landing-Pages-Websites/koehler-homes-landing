import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Map of 404 paths to actual existing folder structures in src/app
const redirectMap: Record<string, string> = {
  "/replacement-windows": "/window-replacement",
  "/entry-door-installation": "/front-entry-doors",
  "/what-makes-us-different": "/about",
  "/shower-replacement": "/shower-and-bath-replacement",
  "/bathtub-replacement": "/shower-and-bath-replacement",
  "/tub-to-shower-conversion": "/shower-and-bath-replacement",
  "/one-day-bath": "/shower-and-bath-replacement",
  "/terms": "/privacy-policy",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname in redirectMap) {
    const destinationPath = redirectMap[pathname];
    // Creates a valid internal destination URL based on the request's original host domain
    const redirectUrl = new URL(destinationPath, request.url);
    
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

// Limits the middleware to ONLY process these exact routes for speed optimization
export const config = {
  matcher: [
    "/replacement-windows",
    "/entry-door-installation",
    "/what-makes-us-different",
    "/shower-replacement",
    "/bathtub-replacement",
    "/tub-to-shower-conversion",
    "/one-day-bath",
    "/terms",
  ],
};
