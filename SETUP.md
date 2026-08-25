# Setup — Vantage Rock

## 1. Run locally

    npm install
    npm run dev          # http://localhost:3000

## 2. Get lead emails working (2 minutes)

The form works immediately — but to receive submissions by email:

1. Create a free account at https://resend.com
2. Dashboard → API Keys → create a key
3. Create `.env.local` in the project root:

        RESEND_API_KEY=re_your_key_here
        LEAD_TO_EMAIL=you@yourdomain.com

4. Restart `npm run dev` and submit the form.

The default sender `onboarding@resend.dev` works with no domain setup, but
only delivers to the email on your Resend account. Once you verify your
domain in Resend (Domains → Add Domain → add the DNS records), add:

        LEAD_FROM_EMAIL=Vantage Rock <leads@vantagerockfinancial.com>

Until the env vars are set, submissions are logged to the server console so
nothing is lost in development.

## 3. Deploy to Vercel

    git init && git add . && git commit -m "Vantage Rock site"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main

Then https://vercel.com/new → import the repo → Deploy (all settings default).

**Important:** `package.json` must be at the root of the repo. Verify with
`git ls-files | grep package.json` — it should print `package.json`, not
`some-folder/package.json`.

In Vercel → Settings → Environment Variables, add:

    RESEND_API_KEY
    LEAD_TO_EMAIL
    NEXT_PUBLIC_SITE_URL=https://yourdomain.com   (for correct sitemap/OG URLs)

## 4. Things to personalize

| What | Where |
|---|---|
| Your name + bio | `components/sections/About.tsx` (set FOUNDER_NAME) |
| Contact email | `lib/site.ts` |
| Site URL | `NEXT_PUBLIC_SITE_URL` env var, or `lib/site.ts` fallback |
| Case study (**verify before launch**) | `components/sections/Impact.tsx` |
| FAQ answers | `components/sections/FAQ.tsx` |

To add your founder photo: drop `founder.jpg` in `/public`, then follow the
comment at the top of `components/sections/Founder.tsx`.

## What's included

- **SEO:** metadata, canonical URL, OpenGraph + Twitter cards, auto-generated
  social share image, `sitemap.xml`, `robots.txt`, JSON-LD structured data
- **Security:** CSP-adjacent headers (nosniff, frame options, HSTS,
  referrer policy, permissions policy), `poweredByHeader` disabled
- **Spam protection:** honeypot field + per-IP rate limiting (5 per 10 min)
- **Accessibility:** skip-to-content link, ARIA labels on nav/menu/FAQ,
  `prefers-reduced-motion` respected throughout
- **Mobile:** responsive nav with animated hamburger menu
- **Performance:** self-hosted Newsreader + Geist (no external fetch), static prerendering,
  ~145 kB first-load JS


## ⚠️ Before you go live — two things only you can do

1. **About section** (`components/sections/About.tsx`) — set `FOUNDER_NAME`
   to your actual name and title. Photo is already in place at
   `/public/founder.jpg`.

2. **Case study** (`components/sections/Impact.tsx`) — confirm every claim is
   substantiable. If the results came from a prior role rather than a Vantage
   Rock engagement, relabel it as operator experience. Never publish a client
   result without permission.

There is deliberately **no pricing** on the site and **no invented metrics**.
Both are conversion decisions: pricing gets set on the call after scope, and
fabricated proof is the fastest way to lose a CFO-level buyer.
