import { DeleteItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "dynamodb";
import { marshall } from "dynamodbUtil";
import { v1 } from "uuid";
import { hash } from "bcrypt";
import { Mage, MageFromRequest } from "../types.ts";
import { toNewMageEntry } from "../validations/validations.ts";
import DynamodbClient from "../db/db.ts";
import { cleanItems } from "../utils/utils.ts";

export const magesService = {
  getMages: async (): Promise<Mage[] | []> => {
    const command = new ScanCommand({
      TableName: "Mages",
    });

    try {
      const data = await DynamodbClient.send(command);
      return cleanItems(data.Items);
    } catch (error) {
      console.error("Error getting mages:", error);
      return [];
    }
  },

  getMageById: async (id: string | undefined): Promise<Mage | undefined> => {
    if (!id) throw new Error(`No id was provided`);
    const command = new ScanCommand({
      TableName: "Mages",
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
    });

    try {
      const data = await DynamodbClient.send(command);
      if (!data.Items || data.Items.length === 0) {
        throw new Error(`No mage has been found by id:${id}`);
      }
      return cleanItems(data.Items)[0];
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  },

  getMageByEmail: async (mageEmail: string | undefined): Promise<Mage | undefined> => {
    if (!mageEmail) throw new Error(`No email was provided`);
    const command = new ScanCommand({
      TableName: "Mages",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: mageEmail },
      },
    });

    try {
      const data = await DynamodbClient.send(command);
      if (!data.Items || data.Items.length === 0) {
        throw new Error(`No mage has been found by email:${mageEmail}`);
      }
      return cleanItems(data.Items)[0];
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  },

  createMage: async (mage: MageFromRequest): Promise<Mage | undefined> => {
    const newMage: Mage = {
      id: `${v1.generate()}`,
      roles: [],
      balance: 100,
      magic_level: 1,
      ...toNewMageEntry(mage),
    };

    const newMageWithPassword = {
      ...newMage,
      password: await hash(mage.password),
    };

    const command = new PutItemCommand({
      TableName: "Mages",
      Item: marshall(newMageWithPassword),
      ReturnValues: "NONE",
      ConditionExpression: "attribute_not_exists(id)",
    });

    try {
      await DynamodbClient.send(command);
      return newMage;
    } catch (error) {
      console.error("Error creating new mage:", error);
      return;
    }
  },

  updateMageById: async (mageFromRequest: MageFromRequest, id: string | undefined): Promise<Mage> => {
    if (!id) throw new Error(`No id was provided`);
    const updateExpressionParts = [];
    // deno-lint-ignore no-explicit-any
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    for (const [attr, value] of Object.entries(marshall(mageFromRequest))) {
      const placeholder = `:${attr}`;
      const attrNamePlaceholder = `#${attr}`;
      updateExpressionParts.push(`${attrNamePlaceholder} = ${placeholder}`);
      expressionAttributeValues[placeholder] = value;
      expressionAttributeNames[attrNamePlaceholder] = attr;
    }

    const updateExpression = `SET ${updateExpressionParts.join(", ")}`;

    try {
      const command = new UpdateItemCommand({
        TableName: "Mages",
        Key: { id: { S: id } },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "ALL_NEW",
      });
      const response = await DynamodbClient.send(command);

      return cleanItems([response.Attributes])[0];
    } catch (error) {
      console.error("Error al actualizar el ítem:", error);
      throw error;
    }
  },

  deleteMageById: async (id: string | undefined) => {
    if (!id) throw new Error(`No id was provided`);

    const command = new DeleteItemCommand({
      TableName: "Mages",
      Key: {
        id: { S: id },
      },
    });

    try {
      await DynamodbClient.send(command);
    } catch (error) {
      throw new Error(`No mage has been found by id:${id}`);
    }
  },
};
