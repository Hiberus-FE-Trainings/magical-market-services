import { Item } from "../types.ts";
import { client } from "../db/index.ts";
import { ScanCommand, UpdateItemCommand } from "client-dynamodb";
import { marshall, unmarshall } from "util-dynamodb";
import { unmarshallDataFromDB } from "../utils/utils.ts";
import { validateItemFromRequest } from "../utils/validators.ts";

export const itemsService = {
  getAllItems: async (): Promise<Item[]> => {
    const command = new ScanCommand({
      TableName: "Items",
    });

    const data = await client.send(command);

    if (data.Items) {
      return unmarshallDataFromDB(data) as Item[];
    } else {
      return [];
    }
  },

  getItemById: async (id: string): Promise<Item | undefined> => {
    const command = new ScanCommand({
      TableName: "Items",
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
    });
    const data = await client.send(command);

    if (data.Items && data.Items?.length > 0) {
      return unmarshallDataFromDB(data) as Item;
    } else {
      return undefined;
    }
  },

  updateItemById: async (id: string, updatedItemFromRequest: Partial<Item>): Promise<Item | undefined> => {
    const validAttributes = validateItemFromRequest(updatedItemFromRequest);
    if (validAttributes.UpdateExpression.length === 0) throw new Error(`Failed to update item with id:${id}`);

    const command = new UpdateItemCommand({
      TableName: "Items",
      Key: { id: { S: id } },
      UpdateExpression: `SET ${validAttributes.UpdateExpression.join(", ")}`,
      ExpressionAttributeNames: validAttributes.ExpressionAttributeNames,
      ExpressionAttributeValues: marshall(validAttributes.ExpressionAttributeValues),
      ReturnValues: "ALL_NEW",
    });

    const data = await client.send(command);

    return unmarshall(data.Attributes ?? {}) as Item;
  },

  createItem: (newItem: Item): Item => {
    newItem.id = "106";
    newItem.approval_status = "Pending";
    items.push(newItem);
    return newItem;
  },
};
