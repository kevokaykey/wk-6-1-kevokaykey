# Book Store App

[![CI](https://github.com/kevokaykey/wk-6-1-kevokaykey/actions/workflows/ci.yml/badge.svg)](https://github.com/kevokaykey/wk-6-1-kevokaykey/actions)

A React book store with cart, basic checkout scaffolding, configurable Paystack integration, routing, and localStorage persistence.

## Features

- 📚 Catalog at `/catalog`
- 🛒 Cart with quantity updates and subtotal at `/cart`
- 🔍 Search (Navbar and Catalog) across title/author/description
- 💳 Paystack integration (currency configurable) with post-payment verification stub
- 🔐 Admin page stub with guard at `/admin`
- 🧭 Routing via React Router: `/catalog`, `/cart`, `/checkout`, `/orders/:id`, `/admin`
- 💾 localStorage persistence for cart/orders/coupons/notifications/user (with quota-safe handling)
- 🎨 Tailwind CSS UI, responsive design

> Implemented now: routing, guarded admin stub, cart page with quantity/subtotal, localStorage persistence, Paystack util currency parameter and safe cents math, basic checkout/payment orchestration scaffold, Navbar a11y, lazy-loaded images.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Get your Paystack public key from [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)
   - Create a `.env` file in the project root with:
```bash
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
# Optional: app-level currency (Paystack supports NGN, GHS, USD, ZAR)
# Defaults to NGN if not set
# REACT_APP_CURRENCY=NGN
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## How to Use

1. Navigate to `/catalog` (homepage redirects here)
2. Use the search input to find books
3. Click "Buy Now" to add a book to the cart (the demo flow routes through cart/checkout rather than in-card payment)
4. Open `/cart` to update quantities and view subtotal
5. Proceed to `/checkout` (wizard stub) — payment orchestration lives in `src/services/CheckoutService.js`

## Demo Credentials (Test Mode)

When using test mode, you can use these test card details:
- Card Number: 4084084084084081
- CVV: Any 3 digits
- Expiry: Any future date
- PIN: Any 4 digits

## Technologies Used

- React 18
- React Router 6
- Tailwind CSS
- Paystack Inline JS
- localStorage persistence helpers

## Routes

- `/` → redirects to `/catalog`
- `/catalog` → browsing and search
- `/cart` → line items, quantity controls, subtotal
- `/checkout` → wizard placeholder
- `/orders/:id` → order details placeholder
- `/admin` → admin console (guarded; shows Unauthorized unless `app.user.role === 'admin'` in localStorage)

To test the admin guard, you can set the role in the browser console:
```js
localStorage.setItem('app.user', JSON.stringify({ role: 'admin' }));
```

## Configuration and Payment Notes

- Currency is parameterized in the Paystack util. The demo still defaults to KES for learning purposes; adjust via code or environment as needed.
- Cents conversion uses `toMinorUnits` to avoid floating point inaccuracies.
- Payment verification is mocked in `src/utils/paystack.js` and called from `src/services/CheckoutService.js`.

## Persistence and Failure Modes

- Critical state is persisted under keys: `app.cart`, `app.orders`, `app.coupons`, `app.notifications`, `app.user`.
- Quota/JSON errors are handled gracefully; you can inspect `storageErrors` via the `StoreContext` for testing.

## Accessibility & Performance

- Navbar search has a hidden label and supports ESC to clear.
- Book images are lazy-loaded with explicit dimensions to reduce LCP jank.

## Scripts

```bash
npm install   # install dependencies
npm start     # start dev server on http://localhost:3000
npm run build # production build
```

## Complexity Upgrade Plan (for teaching/testing)

This section outlines the full set of functional and non-functional requirements to evolve this demo into a realistic training app. Items marked [done] are already implemented.

### 1) Architectural & State Upgrades
- [done] Router with real pages: `/catalog`, `/cart`, `/checkout`, `/orders/:id`, `/admin` and guarded admin route
- [done] Persist critical state (cart, orders, coupons, notifications, user) in localStorage with graceful quota handling
- Cart + order lifecycle scaffolding (Pending → Paid → Fulfilled → Delivered; Cancelled/Refunded)
- Mock API layer (MSW/Mirage/service worker) to simulate latency, errors, polling

### 2) Functional Expansions
#### 2.1 Catalog & Discovery
- Faceted filters (genre, price bands, rating) + sorting (price, rating, popularity)
- Book details page: multiple images, stock, delivery ETA, related titles

#### 2.2 Cart & Checkout
- Cart: enforce stock; compute subtotal, shipping, tax, discounts; rounding rules
- Coupon engine: %/fixed, min basket, validity windows, combinable flag
- Checkout wizard: shipping → review → payment → confirmation with validation and navigation

#### 2.3 Payment Flow
- [done] Parametric currency with exact cents conversion
- Refactor to accept checkout context (cart total, email, order ref)
- Explicit success/cancel/error branches with retries and post-payment verify to update order status

#### 2.4 Orders, Returns, Refunds
- Order history with CSV export (UTF-8, RFC4180, ISO 8601)
- Return window (7 days) with reasons; admin approval → refund simulation (full/partial) + audit trail

#### 2.5 Reviews & Community
- Ratings + text reviews restricted to purchased titles; one per user/title; report/flag; admin moderation
- Q&A per book with safe markdown subset; sanitize input (no scripts)

#### 2.6 Admin Console
- Catalog CRUD; inventory adjustments (low-stock warnings)
- Orders dashboard (status changes, refunds); moderation for reviews/Q&A

#### 2.7 Notifications
- In-app bell with unread count for order updates, promos, replies; mark all read; history view

### 3) Non-Functional Requirements (test targets)
- Accessibility (WCAG 2.1 AA): labels/focus/visible rings, aria-live toasts, reduce motion
- Performance budgets: LCP ≤ 2.5s desktop/≤ 3s mobile, TTI ≤ 1s; lazy-load images [done]
- Cross-browser matrix: latest 2 Chrome/Firefox/Safari/Edge; responsive checks
- Security hygiene: sanitize UGC; whitelist URL schemes; validated checkout forms (no prompts)

### 4) Testability Hooks & Code-level tweaks
- Deterministic data in `/data/seed.json` with id/genre/rating/stock/isbn/dimensions
- BookCard: `data-testid` on title/price/button [done]; alt text with author [done]; lazy images [done]; disable when out of stock
- Navbar: hidden label [done]; ESC to clear [done]; cart link with count [done]
- App: replace prompt/alert with accessible modals; extract payment logic to `CheckoutService` [scaffolded]
- Paystack util: currency param + cents math [done]; add telemetry hooks
- Error boundaries & empty states; offline/timeout banners; skeleton loaders

### 5) Intentional Defects to Plant (for learning)
- Currency mismatch (UI shows $ while gateway uses KES)
- Rounding variance (line vs grand total)
- Return window off-by-one (accepts day 8)
- XSS via markdown link (javascript: scheme allowed)
- Stock race (quantity beyond stock from mini-cart)
- A11y: checkout modal missing aria-modal and no focus return
- CSV export uses localized decimal comma
- Notification badge not updated after mark all read
- Performance regression from non-lazy images
- Search ignores diacritics

### 6) Student-Facing FR Addendum
- FR-O01–O05 (Cart→Checkout→Payment states)
- FR-R01–R03 (Returns/Refunds)
- FR-U01–U03 (Reviews/Q&A with sanitation)
- FR-M01–M05 (Admin console)
- FR-N01–N02 (Notifications)
- FR-X01–X04 (A11y/Perf/Compatibility)
- FR-S01–S03 (Sanitization, URL scheme validation, storage errors)

### 7) Prioritized Backlog
P1 (Must)
- Router pages + guarded routes [done]
- Cart, checkout wizard, Paystack refactor; currency configurable [partially done]
- Orders list + statuses + CSV export
- A11y fixes for checkout modal
- Lazy-load images; define perf budgets [images done]

P2 (Should)
- Coupons engine; stock & backorder rules
- Reviews with purchase check; moderation queue
- Notifications bell + history; mark as read

P3 (Stretch)
- Returns/refunds with audit trail
- Admin dashboards, inventory low-stock alerts
- Q&A with safe markdown



### TRIO TESTER MARKDOWN
## Testing

### Automated Tests
```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all

# Run with coverage
npm run test:coverage