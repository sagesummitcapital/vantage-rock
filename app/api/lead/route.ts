import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadPayload = {
  name: string;
  email: string;
  title: string;
  company: string;
  revenue: string;
  message?: string;
  /** Honeypot — if filled, the submitter is a bot. */
  website?: string;
};

function validate(data: Partial<LeadPayload>): string | null {
  const required: (keyof LeadPayload)[] = [
    "name",
    "email",
    "title",
    "company",
    "revenue",
  ];
  for (const key of required) {
    if (!data[key] || typeof data[key] !== "string" || !String(data[key]).trim()) {
      return `${key} is required`;
    }
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(String(data.email))) return "Invalid email";
  return null;
}

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
// Good enough for a marketing site. For multi-region scale, swap in
// Upstash Redis or Vercel KV.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<LeadPayload>;

    // Honeypot: silently accept so bots don't learn they were caught.
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const lead: LeadPayload = {
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      title: String(body.title).trim(),
      company: String(body.company).trim(),
      revenue: String(body.revenue).trim(),
      message: body.message ? String(body.message).trim() : "",
    };

    // ── Email delivery via Resend ──────────────────────────────
    // Setup (2 minutes):
    //   1. Create a free account at https://resend.com
    //   2. Create an API key (Dashboard → API Keys)
    //   3. Set env vars (locally in .env.local, and in Vercel →
    //      Settings → Environment Variables):
    //        RESEND_API_KEY=re_xxxxxxxx
    //        LEAD_TO_EMAIL=you@yourdomain.com
    //
    // The default from-address `onboarding@resend.dev` works without
    // any domain verification (delivers to the email on your Resend
    // account). Once you verify your domain in Resend, set:
    //        LEAD_FROM_EMAIL=Vantage Rock <leads@vantagerockfinancial.com>
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      const from =
        process.env.LEAD_FROM_EMAIL || "Vantage Rock <onboarding@resend.dev>";

      const { error: sendError } = await resend.emails.send({
        from,
        to: toEmail,
        replyTo: lead.email,
        subject: `New Finance Systems Review request — ${lead.company}`,
        html: `
          <h2 style="margin:0 0 12px">New Finance Systems Review request</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td style="padding:4px 0"><b>${lead.name}</b></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Title</td><td style="padding:4px 0">${lead.title}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td style="padding:4px 0"><b>${lead.company}</b></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td style="padding:4px 0"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Revenue</td><td style="padding:4px 0">${lead.revenue}</td></tr>
          </table>
          ${lead.message ? `<p style="font-family:sans-serif;font-size:14px"><b>#1 finance problem:</b><br>${lead.message.replace(/</g, "&lt;")}</p>` : ""}
          <p style="font-family:sans-serif;font-size:12px;color:#999">Reply directly to this email to respond to ${lead.name.split(" ")[0]}.</p>
        `,
      });

      if (sendError) {
        console.error("Resend error:", sendError);
        // Don't fail the user's submission over a mail hiccup — log it.
      }
    } else {
      // No email configured yet — log so submissions aren't lost in dev.
      console.log("[lead] (email not configured — set RESEND_API_KEY + LEAD_TO_EMAIL)", lead);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
