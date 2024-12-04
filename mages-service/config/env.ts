import { config } from "dotenv";

const env = config();

export const ENV = {
  PORT: Deno.env.get("PORT") || env.PORT,
  AWS_ACCESS_KEY_ID: Deno.env.get("AWS_ACCESS_KEY_ID") || env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: Deno.env.get("AWS_SECRET_ACCESS_KEY") || env.AWS_SECRET_ACCESS_KEY,
  AWS_TABLE_REGION: Deno.env.get("AWS_TABLE_REGION") || env.AWS_TABLE_REGION,
};
