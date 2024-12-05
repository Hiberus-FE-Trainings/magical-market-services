import { Router } from "oak/mod.ts";
import { categoriesController } from "../controllers/categoriesController.ts";

const router = new Router();

router.get("/categories", categoriesController.getAllCategories);

export default router;
