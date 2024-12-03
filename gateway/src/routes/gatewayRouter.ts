import { Router } from "oak/mod.ts"
import { generateTokenController } from "../controllers/authController.ts"
import { tradeController } from "../controllers/tradeController.ts"

const gatewayRouter = new Router()

gatewayRouter.post("/generateToken", generateTokenController.generateToken)

gatewayRouter.post("/trade", tradeController.tradeItem)

export default gatewayRouter
