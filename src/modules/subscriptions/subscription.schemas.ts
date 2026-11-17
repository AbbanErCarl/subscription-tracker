import { z } from "zod";
import { CATEGORIES, CURRENCIES, FREQUENCIES, STATUSES } from "./subscription.constants.js";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Must be a 24-character hex id");

// "2026-11-17" in, a Date out. Rejects null, numbers and other strings that new Date() would accept.
const isoDate = z.iso.date().transform((value) => new Date(value));

// The fields a client may send. No defaults here: .partial() for updates would fill them in.
// No `user` (it comes from the signed-in user) and no `status` (changed only by /cancel or expiry).
const subscriptionFields = z.strictObject({
  name: z.string().trim().min(2).max(80),
  price: z.number().nonnegative().multipleOf(0.01),
  currency: z.enum(CURRENCIES),
  frequency: z.enum(FREQUENCIES),
  category: z.enum(CATEGORIES),
  paymentMethod: z.string().trim().min(1).max(50),
  startDate: isoDate,
  renewalDate: isoDate,
});

export const createSubscriptionBody = subscriptionFields
  .extend({
    currency: subscriptionFields.shape.currency.default("USD"),
    frequency: subscriptionFields.shape.frequency.default("monthly"),
    renewalDate: subscriptionFields.shape.renewalDate.optional(),
  })
  .refine((s) => s.startDate <= new Date(), {
    message: "Start date cannot be in the future",
    path: ["startDate"],
  })
  .refine((s) => s.renewalDate === undefined || s.renewalDate > s.startDate, {
    message: "Renewal date must be after start date",
    path: ["renewalDate"],
  });

// Every field optional, but at least one required. Cross-field date checks need the stored
// document, so the controller does them after loading it.
export const updateSubscriptionBody = subscriptionFields
  .partial()
  .refine((body) => Object.keys(body).length > 0, { message: "Send at least one field to update" });

export const subscriptionIdParams = z.object({ subscriptionId: objectId });

export const listSubscriptionsQuery = z.object({
  status: z.enum(STATUSES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const upcomingRenewalsQuery = z.object({
  days: z.coerce.number().int().min(1).max(90).default(7),
});

export type CreateSubscriptionBody = z.infer<typeof createSubscriptionBody>;
export type UpdateSubscriptionBody = z.infer<typeof updateSubscriptionBody>;
export type ListSubscriptionsQuery = z.infer<typeof listSubscriptionsQuery>;