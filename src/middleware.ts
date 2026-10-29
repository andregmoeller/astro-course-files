import { defineMiddleware } from "astro:middleware";
import {
  SESSION_COOKIE_NAME,
  deleteSessionCookie,
  setSessionCookie,
  validateSessionToken,
} from "@/lib/session";

const PUBLIC_API = new Set(["/api/auth/register", "/api/auth/login"]);
const PROTECTED_PAGES = [/^\/new$/, /^\/book\//];
const AUTH_PAGES = new Set(["/login", "/register"]);

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
  const result = token ? await validateSessionToken(token) : null;

  if (token && !result) {
    deleteSessionCookie(context.cookies);
  }
  if (token && result) {
    setSessionCookie(context.cookies, token, result.session.expiresAt);
  }

  context.locals.user = result?.user ?? null;
  context.locals.session = result?.session ?? null;

  const { pathname } = context.url;
  const isApi = pathname.startsWith("/api/");
  const requiresAuth = isApi
  ? context.request.method !== "GET" && !PUBLIC_API.has(pathname)
  : PROTECTED_PAGES.some((pattern) => pattern.test(pathname));

  if (requiresAuth && !context.locals.user) {
    return isApi
      ? Response.json(
          { data: null, error: "Authentication required" },
          { status: 401 }
        )
      : context.redirect("/login");
  }

  if (context.locals.user && AUTH_PAGES.has(pathname)) {
    return context.redirect("/");
  }

  return next();
});