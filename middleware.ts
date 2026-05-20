import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session")?.value;

    const { pathname } = request.nextUrl;

    const isAuthPage =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/tasks") ||
        pathname.startsWith("/admin");

    // ❌ Nëse s’ka session dhe po tenton protected route
    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ❌ Nëse është loguar dhe shkon në login/register
    if (session && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}