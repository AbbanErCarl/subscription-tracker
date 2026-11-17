import express from "express";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

export default function createApp() {
  const app = express();

  app.use(express.json({ limit: "10kb" }));

  // Health check endpoint
  app.get("/", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(notFound);
  app.use(errorHandler); //must be last middleware

  return app;
}
