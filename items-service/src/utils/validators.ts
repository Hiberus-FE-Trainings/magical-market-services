import { marshall } from "util-dynamodb";
import { Item, ITEM_KEYS } from "../types.ts";

const isValidKey = (key: string): key is keyof Item =>
  ITEM_KEYS.includes(key as keyof Item) && key !== "id";

export const validateItemFromRequest = (itemFromRequest: Partial<Item>) => {
  const itemFromRequestEntries = Object.entries(itemFromRequest);
  if (itemFromRequestEntries.length === 0) {
    throw new Error("No item data to update");
  }
  return itemFromRequestEntries.reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        if (!isValidKey(key)) throw new Error(`Invalid attribute: ${key}`);
        acc.UpdateExpression.push(`#${key} = :${key}`);
        acc.ExpressionAttributeNames[`#${key}`] = key;
        acc.ExpressionAttributeValues[`:${key}`] = value;
      }
      return acc;
    },
    {
      UpdateExpression: [] as string[],
      ExpressionAttributeNames: {} as Record<string, string>,
      // deno-lint-ignore no-explicit-any
      ExpressionAttributeValues: {} as Record<string, any>,
    },
  );
};
export const validateNewItemFromRequest = (
  newItemFromRequest: Partial<Item>,
) => {
  const newItemFromRequestKeys = Object.keys(newItemFromRequest);
  if (newItemFromRequestKeys.length === 0) {
    throw new Error("No item data to update");
  }

  newItemFromRequestKeys.forEach((key) => isValidKey(key));

  return newItemFromRequest;
};
