import {
  AppStoreServerAPI,
  Environment,
  decodeNotificationPayload,
} from "app-store-server-api";
import fastify from "fastify";

const appStoreAPI = new AppStoreServerAPI(
  process.env.APPLE_APP_STORE_PRIVATE_KEY!,
  process.env.APPLE_APP_STORE_KEY_ID!,
  process.env.APPLE_APP_STORE_KEY_ISSUER!,
  process.env.APPLE_APP_STORE_BUNDLE_ID!,
  process.env.APPLE_APP_STORE_ENVIRONMENT as Environment
);

const app = fastify({
  logger: true,
});

app.post("/webhooks/apple", async (request, reply) => {
  const data = request.body as Record<string, unknown>;
  const signedPayload = data.signedPayload as string;
  if (typeof signedPayload !== "string") {
    throw new Error("signedPayload is not a string");
  }
  const result = await decodeNotificationPayload(signedPayload);
  app.log.info({ result }, "decoded notification");
  return reply.send(result);
});

app.post("/webhooks/apple/send-test", async (request, reply) => {
  const result = await appStoreAPI.requestTestNotification();
  app.log.info({ result }, "requested test notification");
  return reply.send(result);
});

void app.listen({
  port: Number(process.env.PORT) || 4000,
  host: process.env.HOST || "::",
});
