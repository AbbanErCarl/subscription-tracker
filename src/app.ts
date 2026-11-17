import express from "express";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import userRouter from "./modules/users/user.routes.js";
import subscriptionRouter from "./modules/subscriptions/subscription.routes.js";
import authRouter from "./modules/auth/auth.routes.js";

export default function createApp() {
  const app = express();

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false }));

  // Health check endpoint
  app.get("/", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Modular routes
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/subscriptions", subscriptionRouter);
  app.use("/api/v1/users", userRouter);

  app.use(notFound);
  app.use(errorHandler); //must be last middleware

  return app;
}
