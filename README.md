# Gewathu.lk — PERN e-commerce

Online store for plants, seeds, tools and garden supplies (Sri Lanka). Stack: **P**ostgres (Neon) + **E**xpress + **R**eact (Next.js) + **N**ode, in TypeScript.

## Structure

```
client/   Next.js storefront + admin dashboard (/admin)
server/   Express API (products, orders, auth, admin CRUD, email notifications)
```

The client and server are separate apps that talk over HTTP — run both at once while developing.

## Features

- **Storefront**: home page, category browsing, search, product pages, cart (persisted in the browser), guest or logged-in checkout, order confirmation, customer account with order history.
- **Admin dashboard** (`/admin`): sign in with an admin account to view stats, manage orders (with status updates), and CRUD products/categories.
- **Email notifications**: order confirmation, admin new-order alert, and order status-update emails, sent via [Resend](https://resend.com). Without a `RESEND_API_KEY`, emails are just logged to the server console instead of sent — handy for local dev.
- **Online payment**: [PayHere](https://www.payhere.lk) checkout (onsite popup, no redirect) alongside Cash on Delivery / Bank Transfer. Without `PAYHERE_MERCHANT_ID`/`PAYHERE_MERCHANT_SECRET`, the "Pay online" option is simply hidden at checkout — COD/bank transfer keep working either way.

## Prerequisites

- Node.js 20+ and npm
- A free [Neon](https://neon.tech) Postgres project
- (Optional) A free [Resend](https://resend.com) account, for real emails

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

   Fill in `server/.env`:
   - `DATABASE_URL` / `DIRECT_URL` — your Neon connection strings.
   - `JWT_SECRET` — any long random string (e.g. `openssl rand -hex 32`), used to sign admin/customer session cookies.
   - `RESEND_API_KEY` / `EMAIL_FROM` / `ADMIN_NOTIFY_EMAIL` — optional; leave `RESEND_API_KEY` blank to just log emails to the console in dev.
   - `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — the admin account created by the seed script. **Change the password after your first admin login.**
   - `PAYHERE_MERCHANT_ID` / `PAYHERE_MERCHANT_SECRET` / `PAYHERE_MODE` / `PAYHERE_NOTIFY_URL` — optional; see [Setting up PayHere](#setting-up-payhere) below.

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

   This seeds 6 categories, ~15 sample products, and the admin user.

## Running in development

In two terminals, from the repo root:

```bash
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:3000
```

- Storefront: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin/login` (use `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`)
- API health check: `http://localhost:4000/api/health`

## Database schema

Defined in [`server/prisma/schema.prisma`](server/prisma/schema.prisma): `Category`, `Product`, `User` (with `role`: `CUSTOMER`/`ADMIN`), `Order` (supports guest checkout — `userId` is optional; `paymentMethod` is `COD`/`BANK_TRANSFER`/`PAYHERE`), `OrderItem`, `Payment` (one row per PayHere order, tracking gateway status/reference), `Subscriber`.

After changing the schema:

```bash
npm run prisma:migrate
```

To inspect data in a GUI: `npm run prisma:studio -w server`.

## Setting up PayHere

1. Sign up for a free account at [payhere.lk](https://www.payhere.lk) — no business verification needed to get **sandbox** credentials.
2. In your PayHere dashboard, find your sandbox **Merchant ID** and **Merchant Secret**, and set them in `server/.env` as `PAYHERE_MERCHANT_ID` / `PAYHERE_MERCHANT_SECRET`. Leave `PAYHERE_MODE="sandbox"` for testing.
3. `PAYHERE_NOTIFY_URL` **must be a publicly reachable HTTPS URL** — PayHere calls it server-to-server to confirm payment, so `localhost` won't work. For local testing, run a tunnel (e.g. `ngrok http 4000`) and set this to `https://<your-tunnel>.ngrok.io/api/payhere/notify`. Once deployed, point it at your real domain.
4. Restart the server after changing these — the "Pay online (Card / PayHere)" option will then appear at checkout automatically.

Without a tunnel, you can still verify everything except the final webhook: checkout will open PayHere's real sandbox popup and validate your hash, just stopping short of confirming payment back to your order (since PayHere can't reach `localhost`).

## Notes

- Never commit `.env` / `.env.local` — they're already gitignored.
- The client fetches the API via `NEXT_PUBLIC_API_URL`; update it (and the server's `CLIENT_ORIGIN`) when you deploy.
- Product photos aren't included — the storefront uses styled gradient placeholders with category icons. Set a product's `imageUrl` (in the admin dashboard) to use a real photo instead.
- To send real emails, sign up at [resend.com](https://resend.com), verify a sending domain (or use their `onboarding@resend.dev` test address), and set `RESEND_API_KEY` in `server/.env`.
