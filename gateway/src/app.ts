import { Application } from "oak/mod.ts";
import gatewayRouter from "./routes/gatewayRouter.ts";
import { authMiddleware } from "./middlewares/authMiddleware.ts";
const app = new Application();

app.use(authMiddleware);
app.use(gatewayRouter.routes());
app.use(gatewayRouter.allowedMethods());
export default app;
