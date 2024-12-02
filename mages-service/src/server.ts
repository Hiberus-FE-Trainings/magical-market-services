import app from "./app.ts";

//import { ENV } from "../config/env.ts";

// Obtiene el puerto desde las variables de entorno definidas en ENV.ENV.PORT.
// Este puerto será el que usará el servidor para escuchar las solicitudes.
const PORT = 8000;

// Imprime en consola un mensaje indicando que el servidor está corriendo en el puerto especificado.
console.log(`Server running on http://localhost:${PORT}`);

// Inicia la aplicación y escucha en el puerto especificado (el puerto es convertido a número usando '+PORT').
// El servidor está esperando solicitudes HTTP en ese puerto.
await app.listen({ port: +PORT });
