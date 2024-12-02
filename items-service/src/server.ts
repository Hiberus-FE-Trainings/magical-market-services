import app from "./app.ts"

const PORT = 8000

console.log(`Server running on port ${PORT}`)
await app.listen({ port: PORT })
