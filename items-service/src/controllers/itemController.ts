import { Context } from "oak/mod.ts";
import { itemsService } from "../services/itemService.ts";
import { ContextWithParams, Item } from "../types.ts";

export const validateItemData = (item: Partial<Item>) => {
  if (item.name && typeof item.name !== "string") return;

  if (item.description && typeof item.description !== "string") return;

  if (item.category && typeof item.category !== "string") return;

  if (item.price && typeof item.price !== "number") return;

  if (item.approval_status && typeof item.approval_status !== "string") return;

  if (item.image_url && typeof item.image_url !== "string") return;

  return item;
};

export const itemController = {
  getAllItems: async (ctx: Context) => {
    try {
      const items = await itemsService.getAllItems();
      ctx.response.body = items;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { message: "Internal server error", error };
    }
  },
  getItemById: async (ctx: Context & ContextWithParams) => {
    const id = ctx.params.id ?? "";

    const item = await itemsService.getItemById(id);

    if (!item) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Item not found" };
      return;
    }

    ctx.response.body = item;
  },
  getItemsByCategory: async (ctx: Context & ContextWithParams) => {
    try {
      const category = ctx.params.category ?? "";
      const items = await itemsService.getItemsByCategory(category);
      ctx.response.status = 200;
      ctx.response.body = items;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
    }
  },
  updateItemById: async (ctx: Context & ContextWithParams) => {
    try {
      const id = ctx.params.id ?? "";

      const body = await ctx.request.body().value;
      const updatedItem = await itemsService.updateItemById(id, body);

      ctx.response.status = 201;
      ctx.response.body = updatedItem;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
    }
  },
  createItem: async (ctx: Context) => {
    try {
      const body = await ctx.request.body().value;
      const newItem = await itemsService.createItem(body);

      ctx.response.status = 201;
      ctx.response.body = newItem;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
    }
  },
  deleteItem: async (ctx: Context & ContextWithParams) => {
    try {
      const id = ctx.params.id ?? "";

      await itemsService.deleteItemById(id);

      ctx.response.status = 200;
      ctx.response.body = { Item: `${id} has been deleted succesfully` };
    } catch (error) {
      ctx.response.status = 404;
      ctx.response.body = { message: `${error}` };
    }
  },
};
