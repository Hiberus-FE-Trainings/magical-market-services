import { Application } from "oak/mod.ts";
<<<<<<< HEAD
import gatewayRouter from "./routes/gatewayRouter.ts";
import { authMiddleware } from "./middlewares/authMiddleware.ts";
const app = new Application();

app.use(authMiddleware);
app.use(gatewayRouter.routes());
app.use(gatewayRouter.allowedMethods());
=======

import gatewayRouter from "./routes/gatewayRouter.ts";
//import { loggerMiddleware } from "./utils/logger.ts";

const app = new Application();

//app.use(loggerMiddleware)
app.use(gatewayRouter.routes());

app.use(gatewayRouter.allowedMethods());

>>>>>>> c878ae5 (feat: set up trade service)
export default app;
