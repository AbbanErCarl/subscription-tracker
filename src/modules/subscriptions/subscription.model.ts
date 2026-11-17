import mongoose, { model, Schema, type HydratedDocument, type InferSchemaType } from "mongoose";

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: [3, "Subscription name must be at least 3 characters long"],
      maxlength: [80, "Subscription name must be at most 80 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Subscription currency is required"],
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"], // Add more currencies as needed
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Subscription frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: ["Entertainment", "Productivity", "Education", "Health", "Other"], // Add more categories as needed
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Subscription status is required"],
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Subscription start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      required: [true, "Subscription renewal date is required"],
      validate: {
        validator: function (value: Date) {
          return value > this.startDate;
        },
        message: "Subscription renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription must be associated with a user"],
      index: true,
    },
  },
  { timestamps: true },
);

export type Subscription = InferSchemaType<typeof subscriptionSchema>;
export type SubscriptionDocument = HydratedDocument<Subscription>;

const SubscriptionModel = model("Subscription", subscriptionSchema);

export default SubscriptionModel;
