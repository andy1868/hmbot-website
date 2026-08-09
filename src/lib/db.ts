/**
 * Cloudflare D1 database adapter.
 *
 * Replaces Prisma for Cloudflare Workers runtime (Prisma requires Node.js).
 * Uses D1 binding injected by @opennextjs/cloudflare at runtime.
 *
 * The D1 binding name "hmbot_db" is configured in wrangler.toml.
 */

interface OrderRow {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  country: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: number;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface CreateOrderInput {
  type: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  country?: string | null;
  productId?: string | null;
  productName?: string | null;
  quantity: number;
  budget?: string | null;
  timeline?: string | null;
  message: string;
}

function getD1() {
  // @opennextjs/cloudflare exposes bindings via process.env
  const binding = (process.env as Record<string, unknown>)["hmbot_db"];
  if (!binding || typeof binding !== "object") {
    throw new Error("D1 binding 'hmbot_db' not found. Check wrangler.toml.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return binding as any as D1Database;
}

/** Generate a unique ID (Cloudflare-compatible, no crypto dependency issues). */
function cuid(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  const counter = cuid.counter++ % 0xffff;
  cuid.counter = cuid.counter % 0xffff;
  return `${timestamp}${random}${counter.toString(36)}`;
}
cuid.counter = 0;

export async function createOrder(input: CreateOrderInput): Promise<OrderRow> {
  const db = getD1();
  const id = cuid();

  const stmt = db
    .prepare(
      `INSERT INTO orders 
       (id, type, name, email, phone, company, country, product_id, product_name, quantity, budget, timeline, message)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)
       RETURNING *`
    )
    .bind(
      id,
      input.type,
      input.name,
      input.email,
      input.phone,
      input.company ?? null,
      input.country ?? null,
      input.productId ?? null,
      input.productName ?? null,
      input.quantity,
      input.budget ?? null,
      input.timeline ?? null,
      input.message
    );

  const result = await stmt.first<OrderRow>();
  if (!result) {
    throw new Error("Failed to insert order");
  }
  return result;
}
