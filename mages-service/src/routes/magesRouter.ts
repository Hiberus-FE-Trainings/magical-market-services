import { Context, Router } from "oak/mod.ts";
import { magesController } from "../controller/magesController.ts";

const magesRouter = new Router();

magesRouter.get("/mages", magesController.getAllMages);
magesRouter.get("/mage/:id", magesController.getMage)

export default magesRouter;
