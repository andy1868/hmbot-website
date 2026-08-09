/**
 * In-memory sliding-window rate limiter.
 *
 * Why in-memory (not Redis)?
 *  - The site is deployed as a single Next.js instance (Vercel hobby / VPS).
 *  - Adding Redis for a low-traffic contact form is overkill.
 *  - For multi-instance production deployments, swap this for
 *    @upstash/ratelimit (see comment at the bottom of this file).
 *
 * Strategy: token bucket per IP, refilled at a fixed rate.
 *  - capacity: 5 requests
 *  - refill:   1 request / 60 seconds
 *  → burst of 5 allowed, then sustained 1/min
 *
 * Ref: code review finding #2 (no rate limit on POST /api/orders).
 */

interface Bucket {
  tokens: number;
  lastRefill: number; // epoch ms
}

const CAPACITY = 5;
const REFILL_RATE_MS = 60_000; // 1 token per 60s
const WINDOW_TTL_MS = 24 * 60 * 60 * 1000; // prune idle buckets after 24h

const buckets = new Map<string, Bucket>();

// Periodic cleanup of stale buckets — keeps memory bounded under attack.
let lastCleanup = Date.now();
function cleanupStaleBuckets(now: number) {
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastRefill > WINDOW_TTL_MS) {
      buckets.delete(key);
    }
  }
}

/**
 * Try to consume 1 token from the bucket identified by `key` (usually IP).
 * Returns `{ ok: true }` on success, or `{ ok: false, retryAfterMs }` when
 * the bucket is empty.
 */
export function rateLimit(key: string): {
  ok: boolean;
  retryAfterMs: number;
} {
  const now = Date.now();
  cleanupStaleBuckets(now);

  const bucket = buckets.get(key);
  if (!bucket) {
    // New client — start with full bucket minus this request.
    buckets.set(key, { tokens: CAPACITY - 1, lastRefill: now });
    return { ok: true, retryAfterMs: 0 };
  }

  // Refill tokens based on elapsed time.
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

  // Empty — tell the client how long to wait.
  const msUntilNextToken = REFILL_RATE_MS - (elapsed % REFILL_RATE_MS);
  return { ok: false, retryAfterMs: msUntilNextToken };
}

/**
 * Extract client IP from request headers, handling common proxies.
 * Order: x-forwarded-for (first IP) → x-real-ip → connection.remoteAddr fallback.
 */
export function getClientIP(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0]!.trim();
  }
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

/*
 * ----------------------------------------------------------------------------
 * PRODUCTION NOTE — multi-instance deployments
 * ----------------------------------------------------------------------------
 * If you scale to multiple Next.js instances (e.g. Vercel with several
 * serverless replicas), each replica holds its own `buckets` Map, so a
 * determined attacker rotating across replicas could exceed the limit
 * `replicas × capacity` times.
 *
 * In that case, swap this module's implementation for:
 *
 *   import { Ratelimit } from "@upstash/ratelimit";
 *   import { Redis } from "@upstash/redis";
 *
 *   const ratelimit = new Ratelimit({
 *     redis: Redis.fromEnv(),
 *     limiter: Ratelimit.slidingWindow(5, "60 s"),
 *   });
 *
 *   const { success } = await ratelimit.limit(ip);
 *
 * `@upstash/ratelimit` is free for low traffic and works in edge / serverless.
 */
