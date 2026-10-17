# Volt — premium gadgets storefront

A standalone Next.js App Router + Tailwind CSS e-commerce starter for electronics and gadgets. Includes 60 seeded products, category and product pages, persistent cart, Paystack checkout, email/password authentication, account order history, and order confirmation emails through Resend.

## Stack

- Next.js 15 / React 19 / TypeScript
- Tailwind CSS v4
- Prisma ORM + PostgreSQL
- `iron-session` signed, HttpOnly cookie sessions
- `bcryptjs` password hashing
- Paystack Transactions API + HMAC-SHA512 signed webhook verification
- Resend transactional email for order confirmations

## 1. Requirements

Install Node.js 20.9+ (Node 22 LTS recommended) and npm.

## 2. Set up PostgreSQL

Create a PostgreSQL database named `volt_store` locally, or create a database with a hosted provider such as [Neon](https://neon.tech/) or [Supabase](https://supabase.com/). Copy its PostgreSQL connection string into `DATABASE_URL` in `.env`. The URL should begin with `postgresql://` and include the database name; hosted providers may require SSL parameters such as `?sslmode=require`.

Example for a local PostgreSQL installation:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/volt_store?schema=public"
```

Use your actual database username, password, host, and database name. Do not commit `.env` or share database credentials.

## 3. Install

```bash
npm install
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

Edit `.env`. Generate a strong session secret, for example:

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

Edit `.env`. Generate a strong session secret, for example:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output into `SESSION_PASSWORD`. Keep `.env` private and never commit it.

## 4. Configure Paystack test mode

1. Sign in to the [Paystack Dashboard](https://dashboard.paystack.com/) and use test keys.
2. Put your test secret key (`sk_test_...`) in `PAYSTACK_SECRET_KEY`. Never expose the secret key in browser code or commit it.
3. `PAYSTACK_CURRENCY=USD` matches the seeded catalog's integer-cent prices. Set this to a currency enabled for your Paystack business only after updating product display/price handling and confirming that currency is supported by your account.
4. Paystack checkout is initialized server-side. The server uses the product prices in the database, then redirects to the Paystack authorization URL.

For local webhook testing, expose your local server with a secure tunnel (for example, ngrok or Cloudflare Tunnel), then set the webhook URL in Paystack Dashboard to:

`https://YOUR-PUBLIC-TUNNEL/api/paystack/webhook`

The webhook validates `x-paystack-signature` using HMAC-SHA512, then verifies the transaction against Paystack's Verify Transaction API and checks the order ID, amount, currency, and reference before marking an order paid. Paystack cannot deliver webhooks to a plain localhost URL.

The callback endpoint `/api/paystack/callback` independently verifies the payment as well. The app does not trust the browser redirect alone. Duplicate callback/webhook processing will not send multiple confirmation emails for the same pending-to-paid transition.

Official references: [Initialize/verify transactions](https://paystack.com/docs/api/transaction/), [Accept payments](https://paystack.com/docs/payments/accept-payments/), [Webhooks](https://paystack.com/docs/payments/webhooks/).

## 5. Configure email delivery (Resend)

The project uses [Resend](https://resend.com) to send order confirmation emails after Paystack payment is verified. Create an API key in the Resend dashboard and verify the domain you want to send from.

Add these values to `.env`: 

```env
RESEND_API_KEY=re_your_api_key
EMAIL_FROM="Volt Store <orders@your-verified-domain.com>"
```

Use a sender address on a domain verified in Resend. Keep the API key server-side and never expose it with a `NEXT_PUBLIC_` prefix. If email is not configured, the order remains recorded but no confirmation email is sent. For production-grade delivery, use a durable job queue/outbox with retries.
## 6. Create database and seed 60 products

```bash
npm run db:push
npm run db:seed
```

The seed script creates 60 sample products across Audio, Wearables, Mobile, Computing, Gaming, and Home Tech. Product images are remote Unsplash URLs; an internet connection is required for those images to load.

## 7. Run the website

```bash
npm run dev
```

Open http://localhost:3000. Routes include `/`, `/shop`, `/categories`, `/categories/[slug]`, `/products/[slug]`, `/cart`, `/checkout`, `/login`, `/signup`, and `/account`.

## Security and production notes

This is a starter, not a finished production commerce platform. Before accepting real money:

- Add rate limiting and abuse protection to login/signup/checkout endpoints.
- Add CSRF/origin protections for mutation routes and password reset/email verification flows.
- Add a durable email outbox/queue and retry monitoring.
- Add inventory reservation/decrement in a transaction to prevent concurrent overselling.
- Add shipping address collection, tax calculation, shipping rules, refunds, cancellation, and customer support workflows.
- Configure a public HTTPS webhook endpoint and test successful, failed, duplicate, and delayed Paystack events.
- Review privacy policy, terms, cookie requirements, and local consumer/payment regulations.
- The sample product photos are remote Unsplash URLs; verify licensing and replace with approved product photography before commercial launch.

## Currency and prices

Seed prices are integer cents displayed as USD. Paystack expects the amount in the currency's minor unit. The configured default is USD to match those values; only use it if USD is enabled for your Paystack account. If using NGN, update the product price data, currency formatting in `src/lib/money.ts`, and the `PAYSTACK_CURRENCY` value together so the displayed amount and charged amount match.

## Useful commands

```bash
npm run dev
npm run db:push
npm run db:seed
npm run lint
npm run build
npm start
```
