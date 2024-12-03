import { Application } from 'oak/mod.ts';
import magesRouter from './routes/magesRouter.ts';

const app = new Application();

app.use(magesRouter.routes());
app.use(magesRouter.allowedMethods());

export default app;
