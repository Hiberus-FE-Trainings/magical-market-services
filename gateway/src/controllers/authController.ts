import { Context } from "oak/mod.ts";
import { authService } from "../services/authService.ts";

export const authController = {
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
  login: async (ctx: Context) => {
    try {
      const { mageEmail, magePassword } = await ctx.request.body().value;

      const loginResponse = await authService.login(mageEmail, magePassword);
      if (loginResponse.success) {
        const { success, email, token } = loginResponse;
        ctx.response.status = 200;
        ctx.cookies.set("authToken", token);
        ctx.response.body = { token, email, success };
      } else {
        const { success, errorMessage } = loginResponse;
        ctx.response.status = 401;
        ctx.response.body = { success, errorMessage };
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { message: `Failed to login: ${error}` };
    }
  },
};
