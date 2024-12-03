import app from "./app.ts";

import { ENV } from "../config/env.ts";

const PORT = ENV.PORT;

console.log(`Server running on http://localhost:${PORT}`);

await app.listen({ port: +PORT });
