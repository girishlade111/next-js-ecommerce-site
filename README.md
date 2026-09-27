# Next.js Ecommerce Site

A complete, modern ecommerce storefront built with Next.js 15, React 19, and shadcn/ui. Browse products, filter by category, view product details, manage a cart, and walk through a full checkout flow with an order-success confirmation — all client-side, no backend required.

## Features

- **Homepage** — hero section, featured products, category highlights
- **Product catalog** (`/products`) — grid layout with search and category filtering
- **Product detail pages** (`/products/[id]`) — image, description, price, quantity, ratings
- **Shopping cart** (`/cart`) — add/remove items, quantity controls, live totals
- **Checkout flow** (`/checkout`) — shipping + payment form with validation, order success page
- **Dark/light mode** — theme toggle via `next-themes`
- **Responsive design** — mobile-first layout with Tailwind CSS
- **Toast notifications** — cart feedback via shadcn/ui toasts
- **Product carousels** — embla-powered image sliders

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components (Radix UI primitives)
- **Icons:** lucide-react
- **Carousel:** embla-carousel-react
- **Analytics:** @vercel/analytics

## Quick Start

```bash
# install dependencies
npm install

# run the dev server
npm run dev
# open http://localhost:3000

# production build (static export to ./out)
npm run build

# serve the static build
npx serve out
```

## Project Structure

```
app/                  # App Router pages
  page.tsx            # homepage
  products/           # catalog + product detail pages
  cart/page.tsx       # cart page
  checkout/           # checkout + success pages
  layout.tsx          # root layout + theme provider
components/
  ui/                 # shadcn/ui components (button, dialog, input, ...)
  header.tsx          # site header with nav + cart badge
  footer.tsx          # site footer
  product-card.tsx    # product card used in grids
lib/
  data.ts             # product data + helpers
  cart-context.tsx    # cart state (React context)
  types.ts            # TypeScript types
  utils.ts            # shadcn cn() utility
hooks/
  use-toast.ts        # toast hook
public/               # static assets
styles/globals.css    # global styles
```

## Environment Variables

None required — the storefront runs entirely client-side with local mock data in `lib/data.ts`.

## Deployment

The site builds to a fully static export (`output: 'export'`, files in `./out`), so it can be hosted on any static host: GitHub Pages, Cloudflare Pages, Netlify, or any static file server.

> **Note:** `next.config.mjs` sets `basePath: '/next-js-ecommerce-site'` for deployment under a GitHub Pages project subpath. Remove `basePath` when deploying to a root domain or Vercel.

```bash
npm run build   # emits ./out
```

## Roadmap Ideas

- Real product API / database backend
- Payment gateway integration (Razorpay / Stripe)
- Order history + user accounts

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
