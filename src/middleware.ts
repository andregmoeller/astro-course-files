import { Logs, db } from "astro:db";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const request = await next();
  if (request.status !== 200) {
    console.log("logging error");
    await db.insert(Logs).values({
      url: context.url.toString(),
      date_accessed: new Date(),
    });
  }
  return request;
});
