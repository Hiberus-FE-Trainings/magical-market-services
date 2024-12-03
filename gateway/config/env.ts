import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();

console.log("env from .env");
console.log(env);
export const ENV = {
  PORT: Deno.env.get("PORT") || env.PORT,
  MONGO_URI: Deno.env.get("MONGO_URI") || env.MONGO_URI,
  HOUSES_URL: Deno.env.get("HOUSES_URL") || env.HOUSES_URL,
  MAGES_URL: Deno.env.get("MAGES_URL") || env.MAGES_URL,
};
