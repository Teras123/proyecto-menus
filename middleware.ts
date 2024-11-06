import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Si no hay token, redirige a /login
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en rutas específicas
export const config = {
  matcher: ["/(menus)/:path*", "/"], // Aplica el middleware a /dashboard y /
};
