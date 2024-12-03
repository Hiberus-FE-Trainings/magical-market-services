import { Item } from "../types.ts"
import { client } from "../db/index.ts"
import {
  DeleteItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from "client-dynamodb"
import { marshall, unmarshall } from "util-dynamodb"
import { unmarshallDataFromDB } from "../utils/utils.ts"
import {
  validateItemFromRequest,
  validateNewItemFromRequest,
} from "../utils/validators.ts"
import { v1 } from "uuid"

export const itemsService = {
  getAllItems: async (): Promise<Item[]> => {
    const command = new ScanCommand({
      TableName: "Items",
    })

    const data = await client.send(command)

    if (data.Items) {
      return unmarshallDataFromDB(data) as Item[]
    } else {
      return []
    }
  },

  getItemById: async (id: string): Promise<Item | undefined> => {
    const command = new ScanCommand({
      TableName: "Items",
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
    })
    const data = await client.send(command)

    if (data.Items && data.Items?.length > 0) {
      return unmarshallDataFromDB(data)[0] as Item
    } else {
      return undefined
    }
  },
  getItemsByCategory: async (category: string): Promise<Item[]> => {
    const command = new ScanCommand({
      TableName: "Items",
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": { S: category },
      },
    })
    const data = await client.send(command)

    return data.Items
      ? (data.Items.map((item) => unmarshall(item)) as Item[])
      : []
  },
  updateItemById: async (
    id: string,
    updatedItemFromRequest: Partial<Item>
  ): Promise<Item | undefined> => {
    const validAttributes = validateItemFromRequest(updatedItemFromRequest)
    if (validAttributes.UpdateExpression.length === 0) {
      throw new Error(`Failed to update item with id:${id}`)
    }

    const command = new UpdateItemCommand({
      TableName: "Items",
      Key: { id: { S: id } },
      UpdateExpression: `SET ${validAttributes.UpdateExpression.join(", ")}`,
      ExpressionAttributeNames: validAttributes.ExpressionAttributeNames,
      ExpressionAttributeValues: marshall(
        validAttributes.ExpressionAttributeValues
      ),
      ReturnValues: "ALL_NEW",
    })

    const data = await client.send(command)

    return unmarshall(data.Attributes ?? {}) as Item
  },

  createItem: async (newItemFromRequest: Item): Promise<Item> => {
    const newItem = marshall({
      ...validateNewItemFromRequest(newItemFromRequest),
      id: `${v1.generate()}`,
    })

    const command = new PutItemCommand({
      TableName: "Items",
      Item: newItem,
      ReturnValues: "NONE",
    })

    await client.send(command)
    return unmarshall(newItem ?? {}) as Item
  },

  deleteItemById: async (id: string) => {
    const command = new DeleteItemCommand({
      TableName: "Items",
      Key: {
        id: { S: id },
      },
      ConditionExpression: "attribute_exists(id)",
    })

    try {
      await client.send(command)
      // deno-lint-ignore no-explicit-any
    } catch (error: any) {
      if (error.name === "ConditionalCheckFailedException")
        throw new Error(`Could not find item by id ${id}`)
    }
  },
}
