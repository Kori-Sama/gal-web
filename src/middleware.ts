import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/session";
import { isAdmin } from "./lib/utils";

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
    session && session?.id && session.exp > Date.now() / 1000;

  // Redirect to /login if the user is not authenticated
  if ((isProtectedRoute || isAdminRoute) && !isSessionValid) {
    return NextResponse.redirect(
      new URL("/login?is_redirected=true", req.nextUrl)
    );
  }

  if (isAdminRoute && !isAdmin(session?.role)) {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  return await updateSession(req);
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
