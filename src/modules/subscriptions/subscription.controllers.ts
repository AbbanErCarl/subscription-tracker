import type { RequestHandler } from "express";

export const getAllSubscriptions: RequestHandler = (_req, res) => {
  res.send("Get all subscriptions");
};

export const getSubscriptionById: RequestHandler = (_req, res) => {
  res.send("Get subscription details by ID");
};

export const createSubscription: RequestHandler = (_req, res) => {
  res.send("Create a new subscription");
};
export const updateSubscription: RequestHandler = (_req, res) => {
  res.send("Update a subscription's details");
};
export const deleteSubscription: RequestHandler = (_req, res) => {
  res.send("Delete a subscription");
};

export const cancelSubscription: RequestHandler = (_req, res) => {
  res.send("Cancel a subscription");
};

export const getAllSubscriptionsForUser: RequestHandler = (_req, res) => {
  res.send("Get all subscriptions for a user");
};

export const getAllUpcomingRenewals: RequestHandler = (_req, res) => {
  res.send("Get all subscriptions for a user");
};
