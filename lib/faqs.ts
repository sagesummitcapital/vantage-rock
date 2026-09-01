/**
 * Single source of truth for the FAQ.
 *
 * Rendered by components/sections/FAQ.tsx and emitted as FAQPage JSON-LD from
 * app/page.tsx. Keeping one array means the answers a search engine or an AI
 * assistant reads are always the answers on the page.
 *
 * Write answers so they stand alone: an assistant quoting one out of context
 * should still be saying something true and useful.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a fractional CFO, and how is it different from a bookkeeper or controller?",
    a: "A bookkeeper records what happened. A controller makes sure it was recorded correctly and closes the books. A fractional CFO uses that information to help you decide what happens next — pricing, capital, hiring, where margin is actually coming from — on a part-time basis, for companies that need the judgment but not a full-time executive salary.",
  },
  {
    q: "Do you replace my CPA or bookkeeper?",
    a: "No, and I don't do tax, audit, or bookkeeping at all. Your CPA handles compliance and tax. Your bookkeeper handles the recording. I make the finance function useful to management — forecasting, cash visibility, margin analysis, board reporting — and I keep your existing providers in the loop rather than around them.",
  },
  {
    q: "What size company do you work with?",
    a: "Founder-led and sponsor-backed companies from roughly $1M in revenue. The work is strongest in healthcare, retail, professional services, technology and SaaS, and multi-entity groups. If you don't have books yet, that is a bookkeeping engagement, and we will point you to someone who does it well.",
  },
  {
    q: "What does it cost?",
    a: "Fees are scoped after we talk, because they move with entity count, the systems you're on, and how much of the function needs rebuilding versus simply running. There's no list price, and I won't quote one before understanding the business — but you'll know exactly what you're buying before you commit to anything.",
  },
  {
    q: "How do you actually use AI, and is it safe?",
    a: "AI runs the repeating mechanical work: pulling and reconciling data, drafting accruals, tracking receivables, writing the first version of the variance narrative. It does not run your books unsupervised. Three rules never move — every figure has to trace back to a source record, nothing posts to the ledger without a person reviewing it, and a person signs anything that leaves the building. Restricted data doesn't go into any tool without an approved process, and every tool in use is named and reviewable.",
  },
  {
    q: "What happens on the 30-minute Finance Systems Review?",
    a: "It is a fit-check, not a sales call. We talk about where your finance function is now, what's slow or unreliable, and what decisions you're making without the information you'd want. We don't diagnose on the call and you don't leave with a plan. Thirty minutes tells us both whether there's work here worth doing — and if there isn't, I'll say so.",
  },
  {
    q: "How quickly would we see something change?",
    a: "The first visible win usually lands inside the first 30 days — a forward cash view, a KPI pack that updates itself, or a close that stops slipping. The structural work underneath, particularly cleaning up a chart of accounts, takes longer and is what makes the rest durable.",
  },
  {
    q: "We're not ready for a CFO. Is this still worth a conversation?",
    a: "That's usually the exact moment fractional makes sense. The alternative most companies reach for is hiring a controller to solve what is really a systems problem — twelve months and a six-figure salary before the reporting changes. A 30-minute Review costs you nothing and will tell you which problem you actually have.",
  },
];
