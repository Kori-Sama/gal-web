import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, updateSession } from "./lib/session";

// Specify protected and public routes
const publicRoutes = ["/login", "/"];
const protectedRoutes = ["/vote"];
const adminRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  const session = await getSession();
  const isSessionValid =
    session !== null && !session?.id && session.exp > Date.now() / 1000;

  // Redirect to /login if the user is not authenticated
  if ((isProtectedRoute || isAdminRoute) && !isSessionValid) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAdminRoute && session?.role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  return await updateSession(req);
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
