# Vantage Rock Financial

AI-native financial leadership. Production site with brand logo, animated ambient background, cinematic intro, and integrated lead capture form.

## Stack

- Next.js 14.2.35 (security-patched) · App Router
- TypeScript · strict
- Tailwind CSS · brand tokens
- Framer Motion · scroll reveals, intro, ambient dots
- Fraunces (serif display) via `next/font/google`
- Geist Sans + Mono (body + data)
- Vercel-ready

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx                    Root layout · fonts · metadata
  page.tsx                      Composes all sections
  globals.css                   Brand tokens · animations
  icon.png                      Favicon (auto-detected by Next.js)
  api/
    lead/
      route.ts                  Lead submission endpoint (Supabase + Resend ready)
components/
  AmbientDots.tsx               Fixed background · drifting teal dots
  IntroLoader.tsx               Cinematic first-load · uses real VR icon
  Nav.tsx                       Sticky nav · real logo
  Footer.tsx                    Real logo · tagline
  CTAButton.tsx                 Magnetic hover · teal glow
  BookingForm.tsx               Full lead form · client-side validation
  Reveal.tsx                    Scroll-triggered fade-up
  SectionHead.tsx               Reusable section number + heading
  LiveMetricsPanel.tsx          Animated KPI dashboard for hero
  sections/
    Hero.tsx                    Staggered entrance · aurora · live panel
    Ticker.tsx                  Authority signals · seamless loop
    Problem.tsx                 4 pain points
    Reframe.tsx                 "Systems problem" — the conversion hinge
    Solution.tsx                4 pillars with line-art icons
    WhatWeDo.tsx                4 disciplines · magnetic hover rows
    HowItWorks.tsx              Audit · Build · Operate
    Outcomes.tsx                90-day change
    Diagnostic.tsx              $2K paid audit · credited toward setup
    WhoFor.tsx                  ICP cards
    FinalCTA.tsx                Booking form wrapper
public/
  logo.jpg                      Brand logo (used in Nav + Footer)
  icon.jpg                      VR icon monogram (used in IntroLoader)
lib/
  utils.ts                      cn() helper
```

## Supabase + Resend integration

The lead form at `/api/lead` is wired end-to-end on the frontend and validates server-side. The Supabase insert and Resend emails are stubbed with detailed TODO blocks — uncomment them after you add credentials.

### 1. Install the SDKs

```bash
npm install @supabase/supabase-js resend
```

### 2. Create the Supabase table

In your Supabase SQL editor:

```sql
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  title text not null,
  company text not null,
  company_size text not null,
  revenue text not null,
  message text
);

-- Only allow inserts via the service role (not public)
alter table public.leads enable row level security;
```

### 3. Add environment variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
LEAD_FROM_EMAIL=Vantage Rock <hello@vantagerockfinancial.com>
LEAD_NOTIFICATION_EMAIL=you@vantagerockfinancial.com
```

Add `.env.local` to `.gitignore` (already set).

### 4. Verify your sending domain in Resend

In Resend dashboard: Domains → Add Domain → add DNS records shown. This is required for delivery — emails from unverified domains will land in spam or be rejected.

### 5. Uncomment the integration code

Open `app/api/lead/route.ts`. Uncomment the two TODO blocks (Supabase insert and Resend emails). The code is already correct — it just needs to be activated.

### 6. Test

```bash
npm run dev
```

Submit the form at `/#book`. Check:
- Supabase `leads` table for the row
- Your notification email
- Resend dashboard → Emails for delivery status
- Lead's inbox for the auto-reply

Until you uncomment, submissions are logged to the dev console and return success.

## Brand palette

| Token | Hex | Usage |
|---|---|---|
| Deep Slate Navy | `#0B1A2A` | Primary background |
| Graphite Black | `#0F1115` | High-contrast surface |
| Steel Gray | `#3A4A5A` | Mid-tone / dividers |
| Soft Silver | `#D9E1E8` | Ink / body text |
| Electric Teal | `#2EE6C9` | Accent · data · CTAs |

Typography: Fraunces (display), Geist Sans (body), Geist Mono (labels/data).

## Business model encoded in the site

**The Diagnostic — $2,000 paid audit, fully credited** toward any setup engagement if the client moves forward. Filters tire-kickers, aligns incentives, trains the repeatable system.

Setup: $5K–$15K. Monthly retainer: $3K–$10K. Pricing is intentionally **not on the public site**.

## Deploy to Vercel

```bash
npx vercel
```

In the Vercel dashboard, add the environment variables from step 3 above. Zero config otherwise.

## Principles

- Ship fast. Don't overbuild.
- Clarity > complexity.
- No fluff. No buzzwords without substance.
- If it feels like a generic agency site, cut it.
