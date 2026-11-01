# 3rd Millennium Technologies — Corporate AI Training & Implementation website

A responsive, accessible, SEO-ready marketing website for a Nigerian B2B company that trains employees to use AI, teaches AI-assisted creative production, and implements AI workflows. Built from the project brief (`CLAUDE.md`).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · plain CSS with design tokens. No UI framework, CMS, analytics or form provider is locked in.

---

## Quick start

Requires Node.js 18.18+ (tested on Node 24).

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server with hot reload |
| `npm run build` | Production build (pre-renders all 48 pages) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — all 12 sections from the brief |
| `/corporate-training` | For organisations: buyers, departments, **how it works** (`#how-it-works`), delivery formats |
| `/programmes` | Filterable catalogue (type, level, keyword search). Filters are kept in the URL, e.g. `/programmes?category=creative` |
| `/programmes/[slug]` | 31 programme detail pages, generated from data |
| `/ai-implementation` | Automation, integrations/MCP/agents, advisory, governance |
| `/pricing` | Engagement options, pricing factors and what's included — **no prices published** |
| `/about` | Approach and principles; founder/instructor placeholders |
| `/contact` | Enquiry form (proposal or consultation). Accepts `?type=`, `?programme=<slug>`, `?engagement=monthly\|three-month\|six-month` to pre-fill |
| `/privacy`, `/terms` | Clearly marked placeholders (not indexed) |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated automatically |

---

## Where to edit things

| What | File |
| --- | --- |
| Company name, contact details, LinkedIn, booking link, site URL | `src/config/site.ts` |
| Programme catalogue (add/edit/remove programmes) | `src/data/programmes.ts` |
| Services, FAQs, process steps, engagements, sectors, pricing rules | `src/data/content.ts` |
| Colours, fonts, spacing (design tokens) | top of `src/app/globals.css` (`:root`) |
| Navigation items | `mainNav` in `src/config/site.ts` |
| Logo | `src/components/BrandLogo.tsx` (colours set per background in `globals.css` via `--logo-fg` / `--logo-on-fg`) and `src/app/icon.svg` (favicon) |
| Social-sharing image | `src/app/opengraph-image.tsx` (or replace with a static `opengraph-image.png`) |

Setting a value in `site.ts` (e.g. `email: "hello@yourdomain.com"`) replaces the placeholder everywhere it appears. Leave values as `null` to keep showing the labelled placeholder.

### Adding a programme

Add an entry to `programmes` in `src/data/programmes.ts` using `define({...})`. Its card, filters, detail page, sitemap entry and metadata are created automatically. `slug` must be unique and URL-safe.

---

## Enquiry form — needs configuration before launch

The form posts to `/api/enquiry`, a server route that:

1. Validates every field again on the server (same rules as the browser).
2. Applies basic spam protection: a hidden honeypot field, a minimum fill time (3s) and a simple per-IP rate limit (5 per 10 minutes, per server instance).
3. Forwards the enquiry as JSON to **`ENQUIRY_WEBHOOK_URL`**.

**Until `ENQUIRY_WEBHOOK_URL` is set, no enquiry is delivered.** The form tells the visitor clearly that their enquiry was *not* sent and keeps their answers. The success message only appears after the webhook confirms receipt (HTTP 2xx).

To connect it:

```bash
cp .env.example .env.local
# then set:
ENQUIRY_WEBHOOK_URL=https://...      # CRM / email service / Zapier / Make / serverless function
ENQUIRY_WEBHOOK_SECRET=some-long-random-string   # optional, sent as X-Webhook-Secret header
```

On your host, set the same values as environment variables (server-side only — never prefix them with `NEXT_PUBLIC_`).

Payload sent to the webhook:

```json
{
  "enquiryType": "proposal | consultation",
  "fullName": "...", "workEmail": "...", "companyName": "...", "jobTitle": "...",
  "teams": ["Finance & accounting"], "participants": "11–25",
  "engagement": "Monthly | Three months | Six months | Not sure yet",
  "deliveryFormat": "In-person | Virtual | Hybrid | Not sure",
  "goals": "...",
  "phone": "...", "industry": "...", "programmesOfInterest": "...",
  "startDate": "YYYY-MM-DD", "existingTools": "...", "additionalInfo": "...",
  "consent": true,
  "source": "website-enquiry-form",
  "submittedAt": "ISO timestamp"
}
```

Optional fields are omitted when empty. For stronger spam protection at higher volume, add a CAPTCHA service (e.g. Cloudflare Turnstile) or a shared rate-limit store; the in-memory limiter resets when the server restarts.

---

## Analytics (not enabled)

No tracking is installed. `src/lib/analytics.ts` fires the events listed in the brief:

`click_book_consultation`, `click_request_proposal`, `view_programme`, `filter_programmes`, `start_enquiry_form`, `submit_enquiry_form`, `click_email`, `click_phone`

Each event is pushed to `window.dataLayer` **if** a tag manager creates it, and dispatched as a browser `analytics` event. Once an analytics tool and a cookie-consent approach are chosen, load the tool (after consent) and these events start flowing without code changes elsewhere.

---

## Deployment (Vercel)

The site needs a **Node.js runtime** because of the `/api/enquiry` route, which Vercel provides automatically. No settings need changing: Vercel detects Next.js.

**Option A: from GitHub (recommended)**
1. Push this folder to a GitHub repository (`node_modules`, `.next` and `.env*` files are already ignored).
2. On vercel.com, click **Add New → Project**, import the repository and click **Deploy**.
3. Every later push to the main branch redeploys automatically.

**Option B: from your terminal**
```bash
npx vercel          # first run: sign in and link the project (creates a preview)
npx vercel --prod   # publish to the production address
```

**Environment variables** (Vercel → Project → Settings → Environment Variables; redeploy after changing them):

| Variable | When to set it |
| --- | --- |
| `ENQUIRY_WEBHOOK_URL` | When the form backend/CRM is chosen. Until then the form tells visitors their enquiry was not sent. |
| `ENQUIRY_WEBHOOK_SECRET` | Optional, with the webhook. |
| `NEXT_PUBLIC_SITE_URL` | Only once the real domain is connected, e.g. `https://www.yourdomain.com`. |

**Search engines:** while `NEXT_PUBLIC_SITE_URL` is empty, the site asks search engines not to index it (via `robots.txt` and a `noindex` tag), so placeholder content stays out of Google. Links and social previews use the `*.vercel.app` address in the meantime. Setting `NEXT_PUBLIC_SITE_URL` switches indexing on.

Other Node hosts also work: `npm ci && npm run build && npm start`.

---

## Design notes

The visual direction follows a reference the owner supplied (a clean "sky" consulting template):

- **Sky cards:** the homepage hero, inner page heroes and the final call-to-action sit in rounded sky-blue cards with soft CSS-drawn clouds (no image files, no licensed assets needed). The homepage header floats transparently on the hero and turns white on scroll.
- **Palette (provisional):** sky blue `#1a6fe0`, lime `#d8f36a` for primary buttons and highlights, near-black `#0c0e12`, soft grey cards `#f3f4f1`. Amber is used only for warnings and placeholders. All are tokens at the top of `globals.css`.
- **Type:** Inter Tight (headings, medium weight with tight tracking and a lighter grey second phrase), Inter (body) and DM Mono (labels, navigation and buttons), self-hosted at build time via `next/font`.
- **Buttons:** pill-shaped and monospace. Primary buttons are lime with a dark arrow disc.
- **Hero card fan:** a decorative row of illustrative UI cards (prompt library, proposal outline, storyboard, report draft, workflow automation, pitch deck), captioned as examples and hidden from screen readers.
- **Teams strip:** a slow scrolling list of the departments you train, which stands in for the template's client-logo strip. It is static when reduced motion is preferred.
- **Bento grid:** the four numbers (programmes, departments, process steps, engagement options) are calculated from the data files, so they stay accurate as the catalogue changes. There are no invented statistics, ratings, logos or testimonials.
- **Accessibility:** semantic landmarks and headings, skip link, visible focus states, keyboard-accessible mobile menu (focus trap, Escape to close), labelled form fields with linked error messages, focus moved to errors/success, reduced-motion support.

---

## What was tested

- Type-check, lint and production build pass with no warnings.
- All 40 sitemap pages return 200; all 108 unique internal links resolve; unknown routes return the 404 page.
- No horizontal overflow on any page at 320px, 375px, 768px and 1024px widths; desktop checked at 1440px.
- Mobile menu opens, closes on Escape, returns focus to the toggle.
- Programme filters, search and URL syncing work; programme CTAs pre-fill the contact form.
- Form: empty submission shows 9 field errors and focuses the first; valid submission without a webhook shows the "not sent" message; with a local test webhook, the payload and secret arrive and the success message shows. Honeypot, too-fast submissions, invalid fields and malformed JSON are rejected by the API.

Not tested: real screen readers, real mobile devices, and Safari/Firefox (only Chromium was used).

---

## Owner decisions still required

These are shown as labelled placeholders on the site or noted here:

- [x] Company name: 3rd Millennium Technologies (`site.name`)
- [ ] Domain (`NEXT_PUBLIC_SITE_URL`)
- [x] Logo: `src/components/BrandLogo.tsx` (original white file in `public/brand/3mt-logo-white.svg`); favicon in `src/app/icon.svg`
- [ ] Branded social-sharing image (`src/app/opengraph-image.tsx`)
- [ ] Brand colours and typography (tokens in `globals.css`)
- [ ] Contact email, phone, office/service locations, LinkedIn URL
- [ ] Booking method (`site.bookingUrl` — e.g. Calendly — or keep the contact form)
- [ ] Form backend / CRM (`ENQUIRY_WEBHOOK_URL`)
- [ ] Hosting platform
- [ ] Privacy Policy and Terms (legally reviewed; consider the Nigeria Data Protection Act 2023)
- [ ] Public pricing or quote-only (currently quote-only; placeholder on `/pricing`)
- [ ] In-person service locations and travel policy (`/corporate-training`)
- [ ] Founder biography, credentials and instructor profiles (`/about`)
- [ ] Which programmes are available at launch (remove or hide others in `programmes.ts`)
- [ ] Whether software licences are ever bundled (FAQ currently says "not unless agreed")
- [ ] Analytics tool and cookie consent approach
- [ ] Review the illustrative sample exercises on each programme page
