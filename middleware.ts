import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (!token && request.url.includes("/dashboard")) {
    console.log("Token is missing, redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
