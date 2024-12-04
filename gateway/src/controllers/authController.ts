import { Context } from "oak/mod.ts";
import { authService } from "../services/authService.ts";

export const authController = {
  login: async (ctx: Context) => {
    try {
      const { mageEmail, magePassword } = await ctx.request.body().value;
      console.log(mageEmail, magePassword);

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
