import { LibsqlError } from "@libsql/client";
import { DrizzleQueryError } from "drizzle-orm";

const UNIQUE_VIOLATION_CODES = new Set([
  "SQLITE_CONSTRAINT_PRIMARYKEY",
  "SQLITE_CONSTRAINT_UNIQUE",
]);

export const isUniqueViolation = (error: unknown) =>
  error instanceof DrizzleQueryError &&
  error.cause instanceof LibsqlError &&
  typeof error.cause.extendedCode === "string" &&
  UNIQUE_VIOLATION_CODES.has(error.cause.extendedCode);
