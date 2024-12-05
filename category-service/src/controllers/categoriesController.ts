import { Context } from "oak/mod.ts";
import { categoriesService } from "../services/categoriesService.ts";

export const categoriesController = {
  getAllCategories: async (ctx: Context) => {
    try {
      const items = await categoriesService.getAllCategories();
      ctx.response.body = items;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { message: "Internal server error", error };
    }
  },
};
