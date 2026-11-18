# Private hub: setup

The hub lives at **vantagerockfinancial.com/hub**: Overview, Properties, Cars, Income & Expenses and Journal.
It is completely separate from Moonbag, with its own Clerk app, its own Supabase project, its own keys and its own env names.
The marketing pages stay public and the `/ops` floor keeps its own password. Neither changes.

| Piece | Where |
|---|---|
| Login | Clerk app `app_3MHdwsHGYRtt955PKZKF66ykBIH` (Vantage Rock, not Moonbag) |
| Database | Supabase project `vantage-rock` (`pskptsiechbynetpgpjn`) |
| Agent API for Grok Bot and Claude | Supabase Edge Function `agent-api` (source in `supabase/functions/agent-api/`, doc in `docs/AGENT_API.md`) |

## 1. Push this change

GitHub Desktop: commit `Add private hub (Clerk + Supabase)` → **Push origin**. Vercel rebuilds automatically.
Until step 2 is done, the public site works normally and `/hub` stays locked.

## 2. Add these in Vercel (Settings → Environment Variables)

| Name | Value |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk → Vantage Rock app → API Keys (`pk_test_…`) |
| `CLERK_SECRET_KEY` | same page (`sk_test_…`) |
| `HUB_OWNER_EMAILS` | your email (the one you'll sign in with). Comma-separate to add Sam later |
| `SUPABASE_URL` | `https://pskptsiechbynetpgpjn.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → vantage-rock → Project Settings → API Keys → `service_role` / secret key. **Server-only: never prefix it with `NEXT_PUBLIC_`.** |

Then **Deployments → ⋯ → Redeploy**.

If `HUB_OWNER_EMAILS` is empty, nobody can open the hub. It fails closed on purpose.

## 3. Sign in and lock the door

1. Open **vantagerockfinancial.com/sign-in** and sign up with the email you put in `HUB_OWNER_EMAILS`. You land on `/hub`.
2. In the Clerk dashboard, go to **Configure → Restrictions → Sign-up mode → Restricted**, then Save. Now nobody else can create an account, and anyone who did would still be blocked by the owner-email check.

## Who can reach what

| Area | Access |
|---|---|
| Marketing pages | Public |
| `/hub/*` | Only emails in `HUB_OWNER_EMAILS`, after Clerk login |
| Agent API | Only Grok Bot or Claude, with their `vrk_` key. They can read hub data and read or write the journal. They can't approve anything |
| Supabase tables | Server only (RLS on, no public access) |

## Approvals

Only you approve. Instruction and decision entries from Grok Bot or Claude get an **Approve** button in `/hub/journal`.
You can also tick "this is my approval" when you post. The API can never set approval.

## Later: production login

To remove Clerk's "Development mode" badge, create a Production instance in Clerk for `vantagerockfinancial.com`, add the DNS records it lists, swap the two Clerk keys in Vercel for the `pk_live_` and `sk_live_` ones, and redeploy.
