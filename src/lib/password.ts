import { hash, verify } from "@node-rs/argon2";

// OWASP recommendation for Argon2id: 19 MiB, 2 iterations, 1 thread
const options = { memoryCost: 19456, timeCost: 2, parallelism: 1, outputLen: 32 };

export const hashPassword = (password: string) => hash(password, options);

export const verifyPassword = (passwordHash: string, password: string) =>
  verify(passwordHash, password, options);
