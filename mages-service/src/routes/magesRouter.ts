import { Router } from "oak/mod.ts";
import { magesController } from "../controller/magesController.ts";

const magesRouter = new Router();

magesRouter.get("/mages", magesController.getAllMages);
magesRouter.get("/mages/:id", magesController.getMage);

magesRouter.post("/mages", magesController.createMage);
magesRouter.put("/mages/:id", magesController.updateMage);

magesRouter.delete("/mages/:id", magesController.deleteMage);
export default magesRouter;
