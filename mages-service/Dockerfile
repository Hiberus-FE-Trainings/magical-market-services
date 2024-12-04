FROM denoland/deno:2.1.1

WORKDIR /app

COPY deno.json import_map.json deno.lock ./
COPY src ./src

COPY config ./config
COPY .env ./

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--import-map=import_map.json", "src/server.ts"]