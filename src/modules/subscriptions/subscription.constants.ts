// One list per enum, shared by the Mongoose model and the zod schemas so they can't drift apart.
export const CURRENCIES = ["GHS", "USD", "EUR", "GBP", "JPY", "CAD", "AUD"] as const;
export const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"] as const;
export const CATEGORIES = ["Entertainment", "Productivity", "Education", "Health", "Other"] as const;
export const STATUSES = ["active", "cancelled", "expired"] as const;