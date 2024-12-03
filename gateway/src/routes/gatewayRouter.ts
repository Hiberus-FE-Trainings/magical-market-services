import { Router } from "oak/mod.ts";

const gatewayRouter = new Router();

gatewayRouter.get("/items", itemController.getAllItems);

gatewayRouter.get("/items/:id", itemController.getItemById);

gatewayRouter.put("/items/:id", itemController.updateItemById);

gatewayRouter.post("/items", itemController.createItem);

gatewayRouter.delete("/items/:id", itemController.deleteItem);

gatewayRouter.get("/items/category/:category", itemController.getItemsByCategory);

export default gatewayRouter;