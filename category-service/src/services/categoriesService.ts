import { client } from "../db/index.ts";
import { ScanCommand } from "client-dynamodb";
import { unmarshallDataFromDB } from "../utils/utils.ts";
import { Category } from "../types.ts";

export const categoriesService = {
  getAllCategories: async (): Promise<Category[]> => {
    const command = new ScanCommand({
      TableName: "Categories",
    });
    const data = await client.send(command);

    if (data.Items) {
      return unmarshallDataFromDB(data) as Category[];
    } else {
      return [];
    }
  },
};
