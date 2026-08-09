import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orderSchema } from "@/lib/validation";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

/**
 * Allowed origins for CSRF protection.
 *  - Same-origin requests in browsers may omit the Origin header on same-site
 *    navigations, but POSTs from fetch() always include it.
 *  - Empty Origin is allowed for older clients / curl / server-to-server.
 *
 * Ref: code review finding #3 (no CSRF protection).
 */
const ALLOWED_ORIGINS = new Set<string>([
  "https://hmbot.net",
  "https://www.hmbot.net",
  "http://localhost:3000", // dev
]);

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // no Origin header — non-browser / curl
  return ALLOWED_ORIGINS.has(origin);
}

export async function POST(req: NextRequest) {
  // 1. CSRF — Origin header check
  const origin = req.headers.get("origin");
  if (!isOriginAllowed(origin)) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 }
    );
  }

  // 2. Rate limit — per IP, in-memory token bucket
  const ip = getClientIP(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    const retryAfterSec = Math.ceil(rl.retryAfterMs / 1000);
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfter: retryAfterSec },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSec),
        },
      }
    );
  }

  // 3. Parse + validate body
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
      {
        ok: false,
        error: "validation_error",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  // 4. Persist (db client already silences query logs in production)
  try {
    const record = await db.order.create({
      data: {
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
      },
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
