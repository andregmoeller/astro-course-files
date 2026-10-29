import z from "zod";

export const CredentialsSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(31)
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, digits, - and _"),
  password: z.string().min(8).max(255),
});
