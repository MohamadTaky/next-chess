import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.has("userid");
  const response = NextResponse.next();
  if (!userId) response.cookies.set("userid", crypto.randomUUID());
  return response;
}

export const config = {
  matcher: "/room/:path*",
};
