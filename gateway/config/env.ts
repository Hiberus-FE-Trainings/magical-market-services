import { config } from "dotenv";

const env = config();

export const ENV = {
  PORT: Deno.env.get("PORT") || env.PORT,
  AWS_ACCESS_KEY_ID: Deno.env.get("AWS_ACCESS_KEY_ID") || env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY:
    Deno.env.get("AWS_SECRET_ACCESS_KEY") || env.AWS_SECRET_ACCESS_KEY,
  MAGES_URL: Deno.env.get("MAGES_URL") || env.MAGES_URL,
  ITEMS_URL: Deno.env.get("ITEMS_URL") || env.ITEMS_URL,
  CATEGORIES_URL: Deno.env.get("CATEGORIES_URL") || env.CATEGORIES_URL,
};
