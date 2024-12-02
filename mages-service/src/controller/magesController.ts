import { Context } from "oak/mod.ts";
import { ContextWithParams, MageFromRequest, NewMageEntry } from "../types.ts";
import { magesService } from "../services/magesService.ts";

export const magesController = {
  getAllMages: (ctx: Context) => {
    const mages = magesService.getMages();

    ctx.response.status = 200;
    ctx.response.body = mages;
  },

  getMage: (ctx: Context & ContextWithParams) => {
    const mageId = ctx.params.id;

    const mage = magesService.getMageById(mageId);

    if (!mage) {
      ctx.response.status = 404;
      ctx.response.body = { message: "mage not found" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = mage;
  },

  createMage: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const newMage = magesService.createMage(await body.value);

      ctx.response.status = 201;
      ctx.response.body = newMage;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      return;
    }
  },
  updateMage: async (ctx: Context & ContextWithParams) => {
    try {
      const mageId = ctx.params.id;
      const body = ctx.request.body();
      const updatedMage = magesService.updateMageById(await body.value, mageId);

      ctx.response.status = 200;
      ctx.response.body = updatedMage;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      return;
    }
  },
};
