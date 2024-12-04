import { Context } from "oak/context.ts";
import { ENV } from "../../config/env.ts";
import { ContextWithParams } from "../types.ts";

export const itemsController = {
  getAllItems: async (ctx: Context) => {
    const response = await fetch(ENV.ITEMS_URL);
    ctx.response.body = await response.json();
  },

  getItemById: async (ctx: Context & ContextWithParams) => {
    const id = ctx.params.id;
    const response = await fetch(`${ENV.ITEMS_URL}/${id}`);
    ctx.response.body = await response.json();
  },
};
