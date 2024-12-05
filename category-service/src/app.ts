import { Application } from "oak/mod.ts";
import categoriesRouter from "./routes/categoriesRoutes.ts";
const app = new Application();

app.use(categoriesRouter.routes());
app.use(categoriesRouter.allowedMethods());
export default app;
