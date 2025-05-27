import { NextRequest, NextResponse } from "next/server";

import { BLOCKED_PATHNAMES, PAPERMARK_HEADERS } from "@/lib/constants";

export default async function DomainMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const host = req.headers.get("host");

  // clone the URL so we can modify it
  const url = req.nextUrl.clone();

  // if there's a path and it's not "/" then we need to check if it's a custom domain
  if (path !== "/") {
    if (BLOCKED_PATHNAMES.includes(path) || path.includes(".")) {
      url.pathname = "/404";
      return NextResponse.rewrite(url, { status: 404 });
    }
    // Subdomain available, rewriting
    // >>> Rewriting: ${path} to /view/domains/${host}${path}`
    url.pathname = `/view/domains/${host}${path}`;
    return NextResponse.rewrite(url, PAPERMARK_HEADERS);
  } else {
    // redirect plain custom domain to papermark.io, eventually to it's own landing page
    return NextResponse.redirect(
      new URL("https://docupitch.com/home", req.url),
    );
  }
}

// by aniket

// import { NextRequest, NextResponse } from "next/server";
// import { BLOCKED_PATHNAMES, PAPERMARK_HEADERS } from "@/lib/constants";

// export default async function DomainMiddleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const host = req.headers.get("host") || "";

//   // Clone URL to modify it
//   const url = req.nextUrl.clone();

//   console.log(`Incoming request - Host: ${host}, Path: ${path}`);

//   // Handle blocked paths
//   if (BLOCKED_PATHNAMES.includes(path) || path.includes(".")) {
//     url.pathname = "/404";
//     return NextResponse.rewrite(url, { status: 404 });
//   }

//   // Handle docupitch.com separately
//   if (host.includes("docupitch.com")) {
//     console.log("Serving docupitch.com correctly");
//     url.pathname = `/view/domains/${host}${path}`;
//     return NextResponse.rewrite(url, PAPERMARK_HEADERS);
//   }

//   // If it's the root domain and not docupitch.com, redirect to papermark.io/home
//   if (path === "/" && host.includes("papermark.io")) {
//     console.log("Redirecting papermark.io to home");
//     return NextResponse.redirect(new URL("https://www.papermark.io/home", req.url));
//   }

//   // Default fallback to Next.js default behavior
//   return NextResponse.next();
// }
