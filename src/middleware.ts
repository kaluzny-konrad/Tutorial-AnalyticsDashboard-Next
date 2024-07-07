import { NextResponse, NextRequest } from "next/server";
import { analytics } from "./utils/analytics";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    try {
        await analytics.track("pageview", {
            page: '/',
            country: req.geo?.country,
        });
    } catch (error) {
        console.error(error);
    }
  }

  return NextResponse.next();
}

export const matcher = {
  matcher: ["/"],
};
