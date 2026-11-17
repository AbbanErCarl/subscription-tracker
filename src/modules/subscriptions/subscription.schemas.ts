import { z } from "zod";

export const createUserBody = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(8).max(128),
});

export const userIdParams = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, "Must be a 24-character hex id"),
});

export type CreateUserBody = z.infer<typeof createUserBody>;
