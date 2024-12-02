import { DynamoDBClient } from "dynamodb";

const DynamodbClient = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export default DynamodbClient;
