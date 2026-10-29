import type { APIRoute } from "astro";
import { deleteSessionCookie, invalidateSession } from "@/lib/session";

export const POST: APIRoute = async ({ locals, cookies }) => {
  if (!locals.session) {
    return Response.json(
      { data: null, error: "Authentication required" },
      { status: 401 }
    );
  }

  await invalidateSession(locals.session.id);
  deleteSessionCookie(cookies);

  return Response.json({ data: null, error: null });
};
