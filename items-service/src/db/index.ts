import { DynamoDBClient } from "client-dynamodb";

export const client = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "XXX",
    secretAccessKey: "XXX",
  },
});
