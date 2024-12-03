import { Context, Router } from "oak/mod.ts";
import { generateTokenController } from "../controllers/gatewayController.ts";

const gatewayRouter = new Router();

// gatewayRouter.get("/items", itemController.getAllItems);

gatewayRouter.get("/test", (ctx: Context) => {
  ctx.response.body = "hola";
});

// gatewayRouter.get("/items/:id", itemController.getItemById);

// gatewayRouter.put("/items/:id", itemController.updateItemById);

// gatewayRouter.post("/items", itemController.createItem);

// gatewayRouter.delete("/items/:id", itemController.deleteItem);

gatewayRouter.post("/generateToken", generateTokenController.generateToken);

export default gatewayRouter;
