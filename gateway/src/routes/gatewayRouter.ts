import { Router } from "oak/mod.ts";
import { authController } from "../controllers/authController.ts";
import { tradeController } from "../controllers/tradeController.ts";
import { itemsController } from "../controllers/itemsController.ts";
import { magesController } from "../controllers/magesController.ts";
import { categoriesController } from "../controllers/categoriesController.ts";

const gatewayRouter = new Router();

gatewayRouter.get("/items", itemsController.getAllItems);

gatewayRouter.get("/items/:id", itemsController.getItemById);

gatewayRouter.get(
  "/items/category/:category",
  itemsController.getItemsByCategory
);

gatewayRouter.get("/categories", categoriesController.getAllCategories);

gatewayRouter.get("/mages", magesController.getAllMages);

gatewayRouter.get("/mages/:id", magesController.getMageById);

gatewayRouter.post("/trade", tradeController.tradeItem);

gatewayRouter.post("/login", authController.login);

export default gatewayRouter;
