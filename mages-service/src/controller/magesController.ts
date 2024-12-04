import { Context, Status } from "oak/mod.ts";
import { ContextWithParams } from "../types.ts";
import { magesService } from "../services/magesService.ts";

export const magesController = {
  getAllMages: async (ctx: Context) => {
    const mages = await magesService.getMages();

    ctx.response.status = 200;
    ctx.response.body = mages;
  },

  getMage: async (ctx: Context & ContextWithParams) => {
    try {
      const mageId = ctx.params.id;

      const mage = await magesService.getMageById(mageId);

      ctx.response.status = 200;
      ctx.response.body = mage;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      console.log("Error getting mage by id in controller:", error);

      throw new Error(`${error}`);
    }
  },

  getMageByEmail: async (ctx: Context & ContextWithParams) => {
    try {
      const mageEmail = ctx.params.email;
      const mage = await magesService.getMageByEmail(mageEmail);

      ctx.response.status = 200;
      ctx.response.body = mage;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      throw new Error(`${error}`);
    }
  },

  createMage: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const newMage = await magesService.createMage(await body.value);

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
      const updatedMage = await magesService.updateMageById(await body.value, mageId);

      ctx.response.status = 200;
      ctx.response.body = updatedMage;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      return;
    }
  },
  deleteMage: async (ctx: Context & ContextWithParams) => {
    try {
      const mageId = ctx.params.id;
      await magesService.deleteMageById(mageId);

      ctx.response.status = 200;
      ctx.response.body = `Mage with id: ${mageId} has been susscesfully deleted!`;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { message: `${error}` };
      return;
    }
  },
};
