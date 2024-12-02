import { Context, Router } from "oak/mod.ts";

const magesRouter = new Router();

magesRouter.get("/mages", (ctx: Context) => (ctx.response.body = "all mages"));

export default magesRouter;
