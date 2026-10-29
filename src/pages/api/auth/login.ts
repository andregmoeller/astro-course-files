import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { db, User } from "@/db/client";
import { CredentialsSchema } from "@/lib/credentials";
import { verifyPassword } from "@/lib/password";
import { createSession, generateSessionToken, setSessionCookie } from "@/lib/session";

// Valid Argon2id hash of a throwaway password. Verified against when the
// username is unknown, so the response time does not reveal whether it exists.
const DUMMY_HASH =
  "$argon2id$v=19$m=19456,t=2,p=1$YR/Fu7V4t+2pPWGoPeQiGQ$+9Q9hsHHjlpPxowDq2qVgIwxnFUULbykom4HayXJkDY";

const invalidCredentials = () =>
  Response.json(
    { data: null, error: "Incorrect username or password" },
    { status: 401 }
  );

export const POST: APIRoute = async ({ request, cookies }) => {
  const parsed = CredentialsSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return invalidCredentials();
  }

  const { username, password } = parsed.data;
  const [user] = await db.select().from(User).where(eq(User.username, username));

  const valid = await verifyPassword(user?.passwordHash ?? DUMMY_HASH, password);

  if (!user || !valid) {
    return invalidCredentials();
  }

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  setSessionCookie(cookies, token, session.expiresAt);

  return Response.json({ data: { username: user.username }, error: null });
};
