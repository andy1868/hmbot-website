import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db";
import { orderSchema } from "@/lib/validation";

/**
 * Allowed origins for CSRF protection.
 */
const ALLOWED_ORIGINS = new Set<string>([
  "https://hmbot.net",
  "https://www.hmbot.net",
  // Cloudflare Pages preview URLs
]);

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true;
  // Allow any Cloudflare Pages preview URL (*.pages.dev)
  if (origin.endsWith(".pages.dev")) return true;
  return ALLOWED_ORIGINS.has(origin);
}

/**
 * Simple in-memory rate limiter for Cloudflare Workers.
 * Uses a global Map (shared across requests in the same isolate).
 */
interface Bucket {
  tokens: number;
  lastRefill: number;
}

const CAPACITY = 5;
const REFILL_RATE_MS = 60_000;

const buckets = new Map<string, Bucket>();

function checkRateLimit(ip: string): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket) {
    buckets.set(ip, { tokens: CAPACITY - 1, lastRefill: now });
    return { ok: true, retryAfterMs: 0 };
  }

  const elapsed = now - bucket.lastRefill;
  const refilled = Math.floor(elapsed / REFILL_RATE_MS);
  if (refilled > 0) {
    bucket.tokens = Math.min(CAPACITY, bucket.tokens + refilled);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return { ok: true, retryAfterMs: 0 };
  }

  const msUntilNextToken = REFILL_RATE_MS - (elapsed % REFILL_RATE_MS);
  return { ok: false, retryAfterMs: msUntilNextToken };
}

function getClientIP(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  // Cloudflare-specific header
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  // 1. CSRF check
  const origin = req.headers.get("origin");
  if (!isOriginAllowed(origin)) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 }
    );
  }

  // 2. Rate limit
  const ip = getClientIP(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    const retryAfterSec = Math.ceil(rl.retryAfterMs / 1000);
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfter: retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSec) },
      }
    );
  }

  // 3. Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // 4. Persist to D1
  try {
    const record = await createOrder({
      type: parsed.data.type,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company ?? null,
      country: parsed.data.country ?? null,
      productId: parsed.data.productId ?? null,
      productName: parsed.data.productName ?? null,
      quantity: parsed.data.quantity,
      budget: parsed.data.budget ?? null,
      timeline: parsed.data.timeline ?? null,
      message: parsed.data.message,
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("[POST /api/orders] persist error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "HMbot order API. Use POST to submit an order or custom request.",
  });
}
