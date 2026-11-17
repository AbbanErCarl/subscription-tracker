import express from "express";

export default function createApp() {
  const app = express();

  app.use(express.json({ limit: "10kb" }));

  app.get("/", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
