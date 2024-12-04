import { Context } from "oak/context.ts";
import { ENV } from "../../config/env.ts";
import { ContextWithParams } from "../types.ts";

export const magesController = {
  getAllMages: async (ctx: Context) => {
    const response = await fetch(ENV.MAGES_URL);
    ctx.response.body = await response.json();
  },

  getMageById: async (ctx: Context & ContextWithParams) => {
    const id = ctx.params.id;
    const response = await fetch(`${ENV.MAGES_URL}/${id}`);
    ctx.response.body = await response.json();
  },
};
