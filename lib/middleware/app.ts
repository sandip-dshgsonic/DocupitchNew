import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export default async function AppMiddleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  console.log('------middleware app.ts 8-----',url,path)
  console.log(process.env.NEXTAUTH_SECRET,"--------------9 middleare app.ts 9")
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  })) as {
    email?: string;
    user?: {
      createdAt?: string;
    };
  };

  console.log('------middleware app.ts 19-----',token)
  console.log('------middleware app.ts 20-----',token?.email)
  console.log('------middleware app.ts 21-----',token?.user)

  if (
    token?.email &&
    token?.user?.createdAt &&
    new Date(token?.user?.createdAt).getTime() > Date.now() - 10000 &&
    path !== "/welcome"
  ) {
    console.log('------middleware app.ts 42-----',req.url)

    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  // AUTHENTICATED if the path is /login, redirect to "/documents"
  if (token?.email && path === "/login") {
    console.log('------middleware app.ts 50-----',req.url)

    const nextPath = url.searchParams.get("next") || "/documents"; // Default redirection to "/documents" if no next parameter
    return NextResponse.redirect(
      new URL(decodeURIComponent(nextPath), req.url),
    );
  }
}
