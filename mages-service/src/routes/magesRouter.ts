import { Context, Router } from "oak/mod.ts";
import { magesController } from "../controller/magesController.ts";

const magesRouter = new Router();

magesRouter.get("/mages", magesController.getAllMages);
magesRouter.get("/mage/:id", magesController.getMage);

magesRouter.post("/mages", magesController.createMage);
magesRouter.put("/mages/:id", magesController.updateMage);

export default magesRouter;
