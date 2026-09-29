import { PrismaClient } from "@prisma/client";

// Reuse the clients across hot reloads in dev instead of opening a new pool each time.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; prismaDirect?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Interactive transactions (`prisma.$transaction(async (tx) => ...)`) need to hold
// the SAME physical connection open across every statement inside the callback.
// Neon's pooled DATABASE_URL runs through PgBouncer in transaction-pooling mode,
// which can hand that connection back to the pool between statements — Prisma then
// loses track of it mid-transaction and throws P2028 "Transaction not found".
// DIRECT_URL bypasses the pooler, so interactive transactions go there instead.
export const prismaDirect =
  globalForPrisma.prismaDirect ??
  new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaDirect = prismaDirect;
}
