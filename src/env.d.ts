declare namespace App {
  interface Locals {
    user: import("@/lib/session").SessionUser | null;
    session: import("@/lib/session").SessionData | null;
  }
}
