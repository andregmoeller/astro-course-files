import { createHash, randomBytes } from "node:crypto";
import type { AstroCookies } from "astro";
import { eq } from "drizzle-orm";
import { db, Session, User } from "@/db/client";

const DAY_MS = 24 * 60 * 60 * 1000;
const SESSION_LIFETIME_MS = 30 * DAY_MS;
const SESSION_RENEWAL_THRESHOLD_MS = 15 * DAY_MS;

export const SESSION_COOKIE_NAME = "session";

export type SessionData = typeof Session.$inferSelect;
export type SessionUser = Pick<typeof User.$inferSelect, "id" | "username">;

export const generateSessionToken = () => randomBytes(20).toString("base64url");

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export async function createSession(token: string, userId: string): Promise<SessionData> {
  const session: SessionData = {
    id: hashToken(token),
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME_MS),
  };
  await db.insert(Session).values(session);
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<{ session: SessionData; user: SessionUser } | null> {
  const [row] = await db
    .select({ session: Session, user: { id: User.id, username: User.username } })
    .from(Session)
    .innerJoin(User, eq(Session.userId, User.id))
    .where(eq(Session.id, hashToken(token)));

  if (!row) {
    return null;
  }

  const now = Date.now();

  if (now >= row.session.expiresAt.getTime()) {
    await db.delete(Session).where(eq(Session.id, row.session.id));
    return null;
  }

  if (now >= row.session.expiresAt.getTime() - SESSION_RENEWAL_THRESHOLD_MS) {
    row.session.expiresAt = new Date(now + SESSION_LIFETIME_MS);
    await db
      .update(Session)
      .set({ expiresAt: row.session.expiresAt })
      .where(eq(Session.id, row.session.id));
  }

  return row;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(Session).where(eq(Session.id, sessionId));
}

export function setSessionCookie(cookies: AstroCookies, token: string, expiresAt: Date) {
  cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    path: "/",
    expires: expiresAt,
  });
}

export function deleteSessionCookie(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
}
