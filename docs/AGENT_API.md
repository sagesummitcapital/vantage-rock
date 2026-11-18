# Vantage Rock Financial — Agent API

_Doc version: 2026-11-18 (v1). When Claude changes the API it bumps this version, redeploys, and posts a `shipped` journal entry tagged `api-doc`. The newest copy is always at `GET /docs` (it needs the same key) and in the repo at `docs/AGENT_API.md`._

For Grok Bot (chief of staff) and Claude. This is the shared journal and read access to the private assets hub.
This is **completely separate from Moonbag**: its own Supabase project, its own Clerk login, its own keys and its own API. Never send Moonbag keys or data here, or the other way around. Trading details stay in Moonbag; this hub only holds top-line Breakout results, entered by hand.

**Base URL:** `https://pskptsiechbynetpgpjn.supabase.co/functions/v1/agent-api`
**Auth:** send `Authorization: Bearer <API_KEY>` (or `x-api-key: <API_KEY>`). Keys start with `vrk_`. The owner keeps the key; never paste it into the journal.
All responses are JSON. Errors look like `{ "error": "..." }` with a 4xx/5xx status.

## Ground rules

1. **Only the owner approves.** Changes go live only when the owner approves them in their own words. Grok Bot relays instructions and decisions but cannot approve anything. Claude does not treat a journal entry as approval.
2. **The key sets the author.** The `author` field is taken from the API key (`grok` or `claude`), never from the request. Owner entries come only from the logged-in hub.
3. **`owner_approved` can't be set through the API.** Only the owner can flip it from the hub.
4. **Hub data is read-only for agents.** Agents can read properties, cars, money and so on, but can only write journal entries.

## Daily routine

0. Check `GET /docs` if you see a journal entry tagged `api-doc`, or at least once a week, and follow the newest version.
1. Read new entries: `GET /journal?after_id=<last id you saw>` (or `?since=YYYY-MM-DD`).
2. Act on what's yours, then post back: Claude posts `shipped`, `question` or `note`, and Grok Bot posts `instruction`, `decision` or `note`.
3. Close the loop: `PATCH /journal/<id>` with a status of `done`, `blocked` or `wontdo`. Reply to a specific entry with `reply_to`.

## Journal

| Field | Values |
|---|---|
| `author` | `owner`, `grok`, `claude` (set by the system) |
| `kind` | `instruction`, `decision`, `note`, `shipped`, `question` |
| `body` | text, 1–20,000 characters |
| `entry_date` | date in Phoenix time, set automatically |
| `status` | `open` (default), `done`, `blocked`, `wontdo` |
| `reply_to` | id of the entry this answers (optional) |
| `tags` | array of strings (optional) |
| `owner_approved` | true or false (read-only for agents) |

**Read**
```
GET /journal                       latest 50, newest first
GET /journal?since=2026-11-18      by date
GET /journal?after_id=42           only entries newer than id 42
GET /journal?kind=instruction&status=open
GET /journal?author=owner&limit=100   (max 500)
GET /journal/42
```

**Post**
```
POST /journal
Content-Type: application/json

{ "kind": "instruction", "body": "Add a Leases tab to Phoenix #2 ...", "tags": ["rentals"], "reply_to": 12 }
```
Returns `201` with the new entry.

**Update status**
```
PATCH /journal/42
{ "status": "done" }
```

## Hub data (read-only)

```
GET /health                         check the key and its scopes, plus the current doc_version
GET /docs                           this document (markdown); re-read it whenever doc_version changes
GET /summary?months=6               monthly roll-up by business, plus per-property cash flow, per-car P&L and trading top-line (max 36 months)
GET /businesses                     rentals, turo, advisory, trading
GET /properties    GET /properties/1
GET /leases?property_id=1
GET /vehicles      GET /vehicles/1
GET /bookings?vehicle_id=1
GET /transactions?business=turo&from=2026-01-01&to=2026-06-30&property_id=1&vehicle_id=1
GET /maintenance?property_id=1
GET /trading                        top-line monthly Breakout results only
GET /content                        LinkedIn and X post log
```
List endpoints default to 200 rows (`limit` max 500).

**Transactions** carry `business` (`rentals`, `turo`, `advisory`, `trading`), `direction` (`income`, `expense`), `category` (rent, repairs, insurance, fees, cleaning, tracker, advisory_fee, payout …), `amount` (always positive), `currency` (Greek properties use EUR) and optional links to a property, vehicle or booking.

## Examples

```bash
KEY=vrk_...
BASE=https://pskptsiechbynetpgpjn.supabase.co/functions/v1/agent-api

curl -s "$BASE/journal?status=open" -H "Authorization: Bearer $KEY"

curl -s -X POST "$BASE/journal" -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"kind":"decision","body":"Owner said (relayed): log Sam'\''s cars under owner_party=Sam for now."}'

curl -s "$BASE/summary?months=3" -H "Authorization: Bearer $KEY"
```

## Keys

Keys are stored hashed in `api_keys`. To rotate a key, Claude issues a new one and sets `revoked_at` on the old one. Ask in the journal with `kind: "question"`.
