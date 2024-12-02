import { Router } from "oak/mod.ts"
import { itemController } from "../controllers/itemController.ts"

const router = new Router()

router.get("/items", itemController.getAllItems)

export default router
