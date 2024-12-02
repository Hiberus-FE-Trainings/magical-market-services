export const ENV = {
  PORT: Deno.env.get("PORT") || "8000",
  AWS_ACCESS_KEY_ID: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
  AWS_SECRET_ACCESS_KEY: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
  AWS_TABLE_REGION: Deno.env.get("AWS_TABLE_REGION") || "",
}
