import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SERVER_PORT: z.coerce.number().int().positive().default(5500),
  MONGODB_URI: z.url(),
});

export type Env = z.infer<typeof envSchema>;

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(`❌ Invalid environment variables: \n${z.prettifyError(result.error)}`);
  process.exit(1);
}

export const env: Env = result.data;
