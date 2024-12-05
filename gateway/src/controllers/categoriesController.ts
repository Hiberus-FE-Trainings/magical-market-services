import { Context } from "oak/context.ts";
import { ENV } from "../../config/env.ts";

export const categoriesController = {
  getAllCategories: async (ctx: Context) => {
    const response = await fetch(ENV.CATEGORIES_URL);
    ctx.response.body = await response.json();
  },
};
