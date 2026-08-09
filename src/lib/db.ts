import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma singleton.
 *
 * Log levels are environment-aware:
 *  - dev: `query` + `error` + `warn` — useful for debugging SQL.
 *  - prod: `error` only — never log query text, because order rows contain
 *          PII (name, email, phone) submitted by customers.
 *
 * Ref: security review finding #1.
 */
const logLevels: ('query' | 'info' | 'warn' | 'error')[] =
  process.env.NODE_ENV === 'production'
    ? ['error']
    : ['query', 'warn', 'error']

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logLevels,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db