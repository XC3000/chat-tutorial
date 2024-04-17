import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  UPSTASH_REDIS_REST_URL: z.string(),
  PORT: z.string(),
  HOST: z.string(),
  CORS_ORIGIN: z.string(),
});

export const env = envSchema.parse(process.env);
