import { Router } from "oak/mod.ts";
import { authController } from "../controllers/authController.ts";
import { tradeController } from "../controllers/tradeController.ts";

const gatewayRouter = new Router();

gatewayRouter.post("/trade", tradeController.tradeItem);
gatewayRouter.post("/login", authController.login);

export default gatewayRouter;
