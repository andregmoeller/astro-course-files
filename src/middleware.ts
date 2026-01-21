import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url }, next) => {
  if (url.pathname === "/") {
    return Response.redirect(new URL("/redirected", url), 302);
  }
  return next();
});
