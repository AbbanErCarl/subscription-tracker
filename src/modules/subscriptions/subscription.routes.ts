import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getAllSubscriptionsForUser,
  getAllUpcomingRenewals,
  getSubscriptionById,
  updateSubscription,
} from "./subscription.controllers.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.get("/upcoming-renewals", getAllUpcomingRenewals);

subscriptionRouter.get("/:subscriptionId", getSubscriptionById);

subscriptionRouter.get("/user/:userId", getAllSubscriptionsForUser);

subscriptionRouter.post("/", createSubscription);

subscriptionRouter.put("/:subscriptionId", updateSubscription);

subscriptionRouter.delete("/:subscriptionId", deleteSubscription);

subscriptionRouter.put("/:id/cancel", cancelSubscription);

export default subscriptionRouter;
