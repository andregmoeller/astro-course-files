import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";
import { db, User } from "@/db/client";
import { isUniqueViolation } from "@/db/errors";
import { CredentialsSchema } from "@/lib/credentials";
import { hashPassword } from "@/lib/password";
import { createSession, generateSessionToken, setSessionCookie } from "@/lib/session";

export const POST: APIRoute = async ({ request, cookies }) => {
  const parsed = CredentialsSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return Response.json(
      { data: null, error: "Invalid username or password" },
      { status: 400 }
    );
  }

  const { username, password } = parsed.data;
  const id = randomUUID();

  try {
    await db.insert(User).values({
      id,
      username,
      passwordHash: await hashPassword(password),
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return Response.json(
        { data: null, error: "Username is already taken" },
        { status: 409 }
      );
    }
    console.error(error);
    return Response.json(
      { data: null, error: "Failed to create account" },
      { status: 500 }
    );
  }

  const token = generateSessionToken();
  const session = await createSession(token, id);
  setSessionCookie(cookies, token, session.expiresAt);

  return Response.json({ data: { username }, error: null }, { status: 201 });
};
