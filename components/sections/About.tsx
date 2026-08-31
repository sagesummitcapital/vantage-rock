import Image from "next/image";
import Reveal from "../Reveal";
import { CONTACT_EMAIL, FOUNDER_NAME, FOUNDER_LINKEDIN, X_URL } from "@/lib/site";

const domains = [
  "FP&A and controllership",
  "Financial reporting & close",
  "Budgeting, forecasting & cash flow",
  "Profitability & pricing",
  "Revenue operations",
  "Financial systems & implementation",
];

export default function About() {
  return (
    <section id="about" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Photo */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-bg-raised soft-shadow">
                <Image
                  src="/founder.jpg"
                  alt={FOUNDER_NAME}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              {/* Accent frame */}
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border border-teal/30"
                aria-hidden
              />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.12}>
            <span className="mono-label">05 — Who you&apos;re working with</span>
            <h2 className="mt-6 font-display text-display-lg">
              <span className="text-ink">You talk to the </span>
              <span className="gradient-text-teal">operator.</span>
            </h2>

            <p className="mt-6 max-w-[540px] text-[16px] leading-[1.65] text-ink-muted">
              {FOUNDER_NAME}. Finance and operations, 10+ years across
              healthcare, technology, startups, and PE-backed shops.
              Engagements are scoped and led at that level.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-teal transition-colors hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>
              <a href={FOUNDER_LINKEDIN} target="_blank" rel="noopener noreferrer" className="font-medium text-teal transition-colors hover:text-ink">LinkedIn</a>
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-teal transition-colors hover:text-ink">@VantageRock</a>
            </div>

            <div className="mt-8">
              <div className="mono-label mb-3 !text-[10px]">Depth across</div>
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-line bg-bg-raised px-3 py-1.5 text-[12.5px] text-ink-muted"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "10+ yrs", v: "Finance & operations leadership" },
                { k: "4 sectors", v: "Healthcare, tech, startups, PE-backed" },
                { k: "End to end", v: "Strategy through implementation" },
              ].map((c) => (
                <div key={c.k} className="bg-bg-raised px-5 py-4">
                  <div className="tabular font-display text-[20px] leading-none text-ink">
                    {c.k}
                  </div>
                  <div className="mt-1.5 text-[12.5px] leading-[1.4] text-ink-muted">
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
