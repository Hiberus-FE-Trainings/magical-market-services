import { Item } from "../types.ts"
import { client } from "../db/index.ts"
import { ScanCommand } from "client-dynamodb"
import { unmarshall } from "util-dynamodb"
import { unmarshallDataFromDB } from "../utils/utils.ts"

export const items: Item[] = [
  {
    id: "101",
    name: "Elder Wand",
    description: "The most powerful wand in existence.",
    category: "Wands",
    price: 1000,
    approval_status: "Pending",
    image_url: "images/wands/imperial_grey_and_silver.webp",
    seller_id: 2,
  },
  {
    id: "102",
    name: "Polyjuice Potion",
    description: "Allows temporary transformation into another person.",
    category: "Potions",
    price: 300,
    approval_status: "Approved",
    image_url: "images/potions/edurus.webp",
    seller_id: 2,
  },
  {
    id: "103",
    name: "Advanced Spellbook",
    description: "Contains advanced spells for expert wizards.",
    category: "Books",
    price: 150,
    approval_status: "Rejected",
    image_url: "images/books/generic_book.webp",
    seller_id: 4,
  },
  {
    id: "104",
    name: "Dragon Egg",
    description: "A rare magical creature egg.",
    category: "Creatures",
    price: 500,
    approval_status: "Pending",
    image_url: "images/creatures/graphorn.webp",
    seller_id: 5,
  },
  {
    id: "105",
    name: "Invisibility Cloak",
    description: "Grants the wearer complete invisibility.",
    category: "Wands",
    price: 750,
    approval_status: "Approved",
    image_url: "images/wands/regal_black.webp",
    seller_id: 2,
  },
]

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

    console.log(data)

    if (data.Items && data.Items?.length > 0) {
      return unmarshallDataFromDB(data) as Item
    } else {
      return undefined
    }
  },

  updateItemById: (id: string, updatedItemFromRequest: Partial<Item>): Item => {
    const itemToUpdate = items.find((item) => item.id === id)
    if (!itemToUpdate) throw new Error(`Item with ID ${id} not found`)
    const updatedItem = { ...itemToUpdate, ...updatedItemFromRequest }
    items.map((item) => (item.id === id ? updatedItem : item))
    return updatedItem
  },

  createItem: (newItem: Item): Item => {
    newItem.id = "106"
    newItem.approval_status = "Pending"
    items.push(newItem)
    return newItem
  },
}
