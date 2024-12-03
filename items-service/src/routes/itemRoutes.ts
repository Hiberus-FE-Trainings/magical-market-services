import { Router } from "oak/mod.ts";
import { itemController } from "../controllers/itemController.ts";

const router = new Router();

router.get("/items", itemController.getAllItems);

router.get("/items/:id", itemController.getItemById);

router.put("/items/:id", itemController.updateItemById);

router.post("/items", itemController.createItem);

router.delete("/items/:id", itemController.deleteItem);

router.get("/items/category/:category", itemController.getItemsByCategory);

export default router;
