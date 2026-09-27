# Gewathu.lk — PERN e-commerce

Online store for plants, seeds, tools and garden supplies (Sri Lanka). Stack: **P**ostgres (Neon) + **E**xpress + **R**eact (Next.js) + **N**ode, in TypeScript.

## Structure

```
client/   Next.js app (storefront, SEO-friendly pages)
server/   Express API (products, orders, auth, payment webhooks)
```

The client and server are separate apps that talk over HTTP — run both at once while developing.

## Prerequisites

- Node.js 20+ and npm
- A free [Neon](https://neon.tech) Postgres project

## First-time setup

1. **Install dependencies** (run once, from the repo root):

   ```bash
   npm install
   ```

2. **Create a Neon database** at [neon.tech](https://neon.tech) (free tier is fine). From your Neon project dashboard, copy the **pooled connection string** and the **direct connection string**.

3. **Configure the server env**:

   ```bash
   cp server/.env.example server/.env
   ```

   Paste your Neon connection strings into `server/.env` as `DATABASE_URL` (pooled) and `DIRECT_URL` (direct).

4. **Configure the client env**:

   ```bash
   cp client/.env.example client/.env.local
   ```

   Defaults are fine for local dev (`NEXT_PUBLIC_API_URL=http://localhost:4000`).

5. **Create the database tables and seed starter data**:

   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

## Running in development

In two terminals, from the repo root:

```bash
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:3000
```

Check the API is up: open `http://localhost:4000/api/health`.

## Database schema

Defined in [`server/prisma/schema.prisma`](server/prisma/schema.prisma): `Category`, `Product`, `User`, `Order`, `OrderItem`, `Payment`. The `Payment` model is a placeholder ready for a gateway integration (e.g. PayHere for LKR) — it just needs a webhook route in `server/src/routes` that updates `Payment.status`.

After changing the schema:

```bash
npm run prisma:migrate
```

To inspect data in a GUI: `npm run prisma:studio -w server`.

## Notes

- Never commit `.env` / `.env.local` — they're already gitignored.
- The client fetches the API via `NEXT_PUBLIC_API_URL`; update it (and the server's `CLIENT_ORIGIN`) when you deploy.
