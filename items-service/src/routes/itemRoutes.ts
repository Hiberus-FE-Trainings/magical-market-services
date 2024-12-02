import { Router } from "oak/mod.ts"
import { itemController } from "../controllers/itemController.ts"

const router = new Router()

router.get("/items", itemController.getAllItems)

router.get("/items/:id", itemController.getItemById)

//Update
router.put("/items/:id", itemController.updateItemById)

//Create
router.post("/items", itemController.createItem)

//Delete

//Get by approval status

//Get by category

export default router
