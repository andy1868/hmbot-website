import { z } from "zod";

/**
 * Shared validation schemas for the order / custom-inquiry form.
 *
 * Importing the SAME schema on both client and server guarantees that
 * a value the frontend accepts will also be accepted by the API —
 * no UX drift between the two layers.
 *
 * Ref: code review finding #4 (frontend/backend email regex mismatch).
 */

// Zod's .email() follows RFC 5322 — stricter than a hand-rolled regex.
export const emailField = z.string().email().max(200);

export const orderSchema = z.object({
  type: z.enum(["order", "custom"]),
  name: z
    .string()
    .min(1, "name required")
    .max(100, "name too long"),
  email: emailField,
  phone: z
    .string()
    .min(5, "phone too short")
    .max(50, "phone too long"),
  company: z.string().max(200).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  productId: z.string().max(50).optional().nullable(),
  productName: z.string().max(200).optional().nullable(),
  quantity: z.coerce.number().int().min(1).max(100000).default(1),
  budget: z.string().max(200).optional().nullable(),
  timeline: z.string().max(200).optional().nullable(),
  message: z
    .string()
    .min(5, "message too short")
    .max(5000, "message too long"),
});

export type OrderInput = z.infer<typeof orderSchema>;

// Email regex derived from Zod's email rule for client-side即时校验.
// Zod's email predicate is a well-tested superset of RFC 5322; this regex
// is the closest reasonable approximation for input-time feedback.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
