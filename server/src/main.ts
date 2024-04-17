import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyIO from "fastify-socket.io";
import { env } from "./config/env";
import fastifySocketIO from "./utils/fastify-socket";
import { Server } from "socket.io";

async function buildServer() {
  const app = fastify({ logger: true });

  app.register(fastifyCors, {
    origin: env.CORS_ORIGIN,
  });

  await app.register(fastifySocketIO);

  app.io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });

  app.get("/healthcheck", () => {
    return { status: "ok", port: env.PORT };
  });

  return app;
}

async function main() {
  const app = await buildServer();

  try {
    await app.listen({
      port: parseInt(env.PORT),
      host: env.HOST,
    });

    console.log(`Server listening on http://${env.HOST}:${env.PORT}`);
  } catch (error) {
    console.log(error);
  }
}

main();

declare module "fastify" {
  interface FastifyInstance {
    io: Server<{ hello: string }>;
  }
}
