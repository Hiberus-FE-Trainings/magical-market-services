import { DynamoDBClient } from "client-dynamodb";
import { ENV } from "../../config/env.ts";

export const client = new DynamoDBClient({
  region: ENV.AWS_TABLE_REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});
