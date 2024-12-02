import { Context } from "oak/mod.ts"
import { itemsService } from "../services/itemService.ts"
import { ContextWithParams, Item } from "../types.ts"

export const validateItemData = (item: Partial<Item>) => {
  if (item.name && typeof item.name !== "string") return

  if (item.description && typeof item.description !== "string") return

  if (item.category && typeof item.category !== "string") return

  if (item.price && typeof item.price !== "number") return

  if (item.approval_status && typeof item.approval_status !== "string") return

  if (item.image_url && typeof item.image_url !== "string") return

  return item
}

export const itemController = {
  getAllItems: async (ctx: Context) => {
    try {
      const items = await itemsService.getAllItems()
      ctx.response.body = items
    } catch (error) {
      ctx.response.status = 500
      ctx.response.body = { message: "Internal server error", error }
    }
  },
  getItemById: async (ctx: Context & ContextWithParams) => {
    const id = ctx.params.id ?? ""

    const item = await itemsService.getItemById(id)

    if (!item) {
      ctx.response.status = 404
      ctx.response.body = { message: "Item not found" }
      return
    }

    ctx.response.body = item
  },

  updateItemById: async (ctx: Context & ContextWithParams) => {
    const id = ctx.params.id ?? ""

    const body = await ctx.request.body().value

    if (!body) {
      ctx.response.status = 400
      ctx.response.body = {
        message: "Invalid data to update, data must be in JSON format",
      }
      return
    }

    const updatedItem = itemsService.updateItemById(id, body)

    if (!updatedItem) {
      ctx.response.status = 404
      ctx.response.body = { message: "Item not found" }
      return
    }

    ctx.response.body = updatedItem
  },

  createItem: async (ctx: Context) => {
    const body = await ctx.request.body().value
    console.log(body)

    if (!body) {
      ctx.response.status = 400
      ctx.response.body = {
        message: "Invalid data to update, data must be in JSON format",
      }
      return
    }

    const newItem = itemsService.createItem(body)

    ctx.response.status = 201
    ctx.response.body = newItem
  },
}
