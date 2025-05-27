import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import AppMiddleware from "@/lib/middleware/app";
import DomainMiddleware from "@/lib/middleware/domain";

import { BLOCKED_PATHNAMES } from "./lib/constants";
import PostHogMiddleware from "./lib/middleware/posthog";

function isAnalyticsPath(path: string) {
  // Create a regular expression
  // ^ - asserts position at start of the line
  // /ingest/ - matches the literal string "/ingest/"
  // .* - matches any character (except for line terminators) 0 or more times
  const pattern = /^\/ingest\/.*/;
 
  console.log('middleware middleware ---------16 ',path)

  return pattern.test(path);
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api/|_next/|_static|vendor|_icons|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  const host = req.headers.get("host");

  // console.log("Request Headers:", Object.fromEntries(req.headers.entries()));
// console.log("Host:", req.headers.get("host"));
// console.log("Next URL:", req.nextUrl.href);

  console.log('middleware middleware ---------36',req.nextUrl)
  console.log('middleware middleware ---------37',path)
  console.log('middleware middleware ---------38',host)

  if (isAnalyticsPath(path)) {
    console.log('middleware middleware ---------41',path,req)
    return PostHogMiddleware(req);
  }

  if (
    (process.env.NODE_ENV === "development" && host?.includes(".local")) ||
    (process.env.NODE_ENV !== "development" &&
      !(
        host?.includes("localhost") ||
        host?.includes("docupitch.com") ||  // by aniket
        // host?.includes("papermark.io") ||
        host?.endsWith(".vercel.app")
      ))
  ) {
    console.log('middleware middleware ---------54',path,req.nextUrl)
    return DomainMiddleware(req);
  }

  if (!path.startsWith("/view/")) {
    console.log('middleware middleware ---------60 view')
    return AppMiddleware(req);
  }

  const url = req.nextUrl.clone();
  console.log('middleware middleware ---------64',url)

  if (
    path.startsWith("/view/") &&
    (BLOCKED_PATHNAMES.some((blockedPath) => path.includes(blockedPath)) ||
      path.includes("."))
  ) {
    url.pathname = "/404";
    console.log('middleware middleware ---------72',path,url)
    return NextResponse.rewrite(url, { status: 404 });
  }
  console.log('middleware middleware ---------75')
  return NextResponse.next();
}
