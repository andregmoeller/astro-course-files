import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname === "/") {
    const response = await next();
    const html = await response.text();
    const redactedHtml = html.replaceAll("PRIVATE INFO", "REDACTED");

    return new Response(redactedHtml, {
      status: 200,
      headers: response.headers,
    });
  }
  
  return next();
});
