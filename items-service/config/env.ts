import { config } from "dotenv";

const env = config();
export const ENV = {
  PORT: env.PORT || "8000",
  AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY || "",
  AWS_TABLE_REGION: env.AWS_TABLE_REGION || "",
};
