# Velocita Logistics — marketing site

Premium, enterprise-grade logistics company website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Shadcn/UI primitives**, **React Hook Form + Zod**, **Prisma + PostgreSQL**, and **NextAuth/Auth.js v5**.

## Features

- 14 marketing pages (Home, About, Services, Fleet, Tracking, Pricing, Industries, Testimonials, Careers, FAQ, Blog, Contact, Privacy, Terms) plus admin dashboard
- Animated hero, sticky glass nav, dark/light mode, responsive everywhere
- Real shipment tracking UI backed by Prisma (try `VEL-DEMO-1001`)
- Quote request, contact, and newsletter forms — server-validated with Zod and rate-limited
- Auth.js with credentials + Google OAuth, Prisma adapter, role-gated `/admin`
- SEO: dynamic metadata, OG image, sitemap, robots, JSON-LD organization/website/FAQ schema
- Performance: server components by default, `next/font`, image optimization, prefetching, security headers

## Tech stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack dev)                        |
| Runtime      | Node.js 20+                                                   |
| UI           | React 19, Tailwind CSS, Shadcn-style primitives, Framer Motion |
| Forms        | React Hook Form + Zod                                         |
| Database     | PostgreSQL 14+ via Prisma 5                                   |
| Auth         | NextAuth (Auth.js v5) — credentials + Google                  |
| Email (TODO) | Resend (placeholder hook in `/api/contact`)                   |

## Folder structure

```
.
├── prisma/
│   ├── schema.prisma          # Users, Quotes, Contacts, Shipments, Newsletter, Blog, Jobs
│   └── seed.ts                # Demo shipment + post + job
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root: theme + session + chrome
│   │   ├── page.tsx           # Home
│   │   ├── globals.css        # Tokens, glass, gradients, grid bg
│   │   ├── sitemap.ts | robots.ts | manifest.ts | opengraph-image.tsx
│   │   ├── about/, services/, fleet/, pricing/, industries/, testimonials/
│   │   ├── careers/[slug]/, blog/[slug]/
│   │   ├── tracking/[number]/  # Dynamic shipment tracking page
│   │   ├── faq/, contact/, privacy/, terms/
│   │   ├── login/             # Credentials sign-in
│   │   ├── admin/             # Role-gated dashboard
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── contact/route.ts
│   │       ├── quote/route.ts
│   │       ├── newsletter/route.ts
│   │       └── tracking/[number]/route.ts
│   ├── components/
│   │   ├── ui/                # shadcn primitives (Button, Input, Card, ...)
│   │   ├── layout/            # Navbar, Footer, ThemeProvider, Logo, WhatsApp
│   │   ├── home/              # Hero, Features, ServicesGrid, Stats, Coverage, CTA
│   │   ├── forms/             # QuoteForm, ContactForm, NewsletterForm, TrackingForm
│   │   ├── tracking/          # ShipmentTimeline
│   │   └── shared/            # SectionHeading, PageHeader, AnimatedCounter
│   ├── content/               # Static marketing content (services, testimonials, ...)
│   ├── lib/                   # db, auth, seo, utils, validations, rate-limit
│   └── middleware.ts          # /admin guard
├── components.json            # shadcn config
├── tailwind.config.ts | next.config.ts | tsconfig.json | postcss.config.mjs
└── .env.example
```

## Quick start

```bash
# 1. Install dependencies
pnpm install            # or: npm install / yarn install / bun install

# 2. Configure env
cp .env.example .env
#    Edit .env: set DATABASE_URL and AUTH_SECRET (openssl rand -base64 32)

# 3. Initialize the database
pnpm db:push            # for prototyping (or: pnpm db:migrate for migrations)
pnpm db:seed            # loads VEL-DEMO-1001 shipment + a blog post + a job

# 4. Run the dev server
pnpm dev                # http://localhost:3000
```

## Useful scripts

| Command            | What it does                          |
| ------------------ | ------------------------------------- |
| `pnpm dev`         | Start Next.js with Turbopack          |
| `pnpm build`       | Generate Prisma client + production build |
| `pnpm start`       | Serve the production build            |
| `pnpm lint`        | ESLint                                |
| `pnpm typecheck`   | `tsc --noEmit`                        |
| `pnpm db:push`     | Sync schema to DB without migrations  |
| `pnpm db:migrate`  | Create + apply a migration            |
| `pnpm db:studio`   | Open Prisma Studio                    |
| `pnpm db:seed`     | Run `prisma/seed.ts`                  |

## API routes

| Method | Route                       | Purpose                                       |
| ------ | --------------------------- | --------------------------------------------- |
| POST   | `/api/contact`              | Persist contact form (validated, rate-limited) |
| POST   | `/api/quote`                | Persist quote request                         |
| POST   | `/api/newsletter`           | Subscribe email (idempotent upsert)           |
| GET    | `/api/tracking/:number`     | Fetch shipment + events by tracking number    |
| —      | `/api/auth/[...nextauth]`   | Auth.js handler                               |

All POST routes use Zod validation, IP-based rate limiting (in-memory; swap for Upstash in prod), and return structured JSON `{ ok, id }` or `{ error, issues }`.

## Auth & admin

- `/login` is a credentials sign-in form (Auth.js with `Credentials` and optional Google).
- `/admin/*` is gated by `middleware.ts` (cookie check) and double-checked in `app/admin/layout.tsx` (role: `ADMIN` or `STAFF`).
- To create an admin user, sign up via the credentials route or insert a row directly:

```sql
INSERT INTO "User" (id, email, name, role, "passwordHash", "createdAt", "updatedAt")
VALUES (
  'cuid_here',
  'admin@velocita.com',
  'Admin',
  'ADMIN',
  '$2a$10$<bcrypt-hash>',
  NOW(),
  NOW()
);
```

Generate the bcrypt hash with: `node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"`.

## SEO

- Dynamic per-page metadata via `lib/seo.ts → buildMetadata()`.
- Edge-runtime OG image (`/opengraph-image.tsx`) — Next.js generates a 1200×630 PNG.
- `sitemap.ts` includes static routes plus all published blog posts.
- `robots.ts` blocks `/api`, `/admin`, `/dashboard`.
- JSON-LD on root (Organization, Website) and FAQ page (FAQPage).

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import in Vercel → set framework preset to **Next.js**.
3. Add a Postgres integration (Vercel Postgres, Neon, Supabase, or RDS).
4. Set env vars in the project settings:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_URL` (e.g. `https://velocita.com`)
   - `NEXT_PUBLIC_SITE_URL`
   - Optional: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `RESEND_API_KEY`
5. **Build command** is auto-detected; the included `postinstall` runs `prisma generate`.
6. After first deploy, run a one-off migration:
   ```bash
   pnpm dlx prisma migrate deploy
   pnpm dlx tsx prisma/seed.ts
   ```

### Docker (any host)

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package.json ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
```

### Production checklist

- [ ] `AUTH_SECRET` is at least 32 random bytes (`openssl rand -base64 32`)
- [ ] `DATABASE_URL` points at managed Postgres with TLS (`?sslmode=require`)
- [ ] `NEXT_PUBLIC_SITE_URL` matches the deployed canonical origin
- [ ] Replace in-memory rate limiter (`src/lib/rate-limit.ts`) with Upstash/Redis
- [ ] Wire up real transactional email in `app/api/contact/route.ts` (Resend, SES)
- [ ] Replace placeholder logos in `/public/images/*`
- [ ] Add a custom favicon and `apple-touch-icon.png`
- [ ] Configure your domain on Vercel and verify HTTPS

## Performance notes

- Server Components for all marketing pages; client components only where needed (forms, theme, animations, tracking input).
- `next/font` (Geist Sans + Mono) — zero layout shift, no external font requests.
- `optimizePackageImports` configured for `lucide-react` and `framer-motion`.
- Image optimization via `next/image` (with `images.formats: ['avif', 'webp']`).
- Strict security headers in `next.config.ts`.
- Animation respects `prefers-reduced-motion` automatically via Framer Motion.

## Accessibility

- Skip-to-content link in the navbar.
- Focus rings on every interactive element.
- All form inputs labeled; `aria-invalid` and `role="alert"` on errors.
- Color contrast meets WCAG AA in both themes.
- Keyboard-navigable accordion, tabs, and dialogs (Radix primitives).

## License

Source code is provided for the customer per the project agreement. The Velocita name and brand assets are not licensed for reuse.
