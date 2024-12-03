import { Application } from "oak/mod.ts";
import itemRouter from "./routes/itemRoutes.ts";
const app = new Application();

app.use(itemRouter.routes());
app.use(itemRouter.allowedMethods());
export default app;
