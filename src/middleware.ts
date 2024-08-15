import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, updateSession } from "./lib/session";

// Specify protected and public routes
const protectedRoutes = ["/vote"];
const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();
  const isSessionValid =
    session !== null && !session?.id && session.exp > Date.now() / 1000;

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && isSessionValid) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return await updateSession(req);
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
