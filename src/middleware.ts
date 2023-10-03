import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.has("userid");
  const username = req.cookies.has("username");
  const response = NextResponse.next();
  if (!userId) response.cookies.set("userid", crypto.randomUUID());
  if (!username)
    response.cookies.set("username", "guest", { expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000) });
  return response;
}

export const config = {
  matcher: "/room/:path*",
};
