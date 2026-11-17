import createApp from "./app.js";
import { env } from "./config/env.js";

createApp().listen(env.SERVER_PORT, () => {
  console.log(`Listening on http://localhost:${String(env.SERVER_PORT)} (${env.NODE_ENV})`);
});
