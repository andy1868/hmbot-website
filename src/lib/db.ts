/**
 * Cloudflare D1 database adapter.
 *
 * Replaces Prisma for Cloudflare Workers runtime.
 * D1 binding "hmbot_db" is injected via wrangler.toml.
 */

// Cloudflare Workers D1 types (no @cloudflare/workers-types dep needed)
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[]; success: boolean }>;
  run(): Promise<{ success: boolean }>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

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

function getD1(): D1Database {
  const binding = (process.env as Record<string, unknown>)["hmbot_db"];
  if (!binding || typeof binding !== "object") {
    throw new Error("D1 binding 'hmbot_db' not found. Check wrangler.toml.");
  }
  return binding as D1Database;
}

let cuidCounter = 0;
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  cuidCounter = (cuidCounter + 1) % 0xffff;
  return `${timestamp}${random}${cuidCounter.toString(36)}`;
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRow> {
  const db = getD1();
  const id = generateId();

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
