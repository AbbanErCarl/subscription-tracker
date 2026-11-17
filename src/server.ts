import createApp from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./config/database.js";
import { env } from "./config/env.js";

await connectToDatabase(env.MONGODB_URI);

const server = createApp().listen(env.SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${String(env.SERVER_PORT)} (${env.NODE_ENV})`);
});

async function shutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}. Shutting down...`);
  server.close();
  await disconnectFromDatabase();
  process.exit(0);
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
