import { Context } from "oak/mod.ts";
import { authService } from "../services/authService.ts";

export const generateTokenController = {
  generateToken: async (ctx: Context) => {
    try {
      const payload = await ctx.request.body().value;
      const token = await authService.generateToken(payload);
      ctx.response.status = 200;
      ctx.response.body = { token };
    } catch (_err) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Token error" };
    }
  },
};
