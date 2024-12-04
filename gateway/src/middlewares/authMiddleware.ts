import { Context } from "oak/mod.ts";
import { verify } from "djwt/mod.ts";
import { generateKey } from "../utils/auth.ts";

export const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  const excludedRoutes = ["/login"];

  if (excludedRoutes.includes(ctx.request.url.pathname)) {
    await next();
    return;
  }

  const headers = ctx.request.headers.get("Authorization");
  if (!headers || !headers.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = headers.slice(7);
  if (!token) {
    throw new Error("Invalid token");
  }

  const cryptoKey = await generateKey();
  const payload = await verify(token, cryptoKey);

  ctx.state.user = payload;
  await next();
};
