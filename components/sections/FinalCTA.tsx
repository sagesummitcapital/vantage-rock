import BookingForm from "../BookingForm";
import Reveal from "../Reveal";
import {
  CONTACT_EMAIL,
  FOUNDER_LINKEDIN,
  COMPANY_LINKEDIN,
  X_URL,
} from "@/lib/site";

const assurances = [
  "You talk to the founder, not a salesperson",
  "Reply within one business day",
  "Nothing to prepare",
];

export default function FinalCTA() {
  return (
    <section id="book" className="relative overflow-hidden bg-bg-sunken">
      <div className="aurora-glow" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Framing */}
          <div>
            <Reveal>
              <span className="mono-label">09 — Next step</span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-[520px] font-display text-display-xl">
                <span className="text-ink">Book a </span>
                <span className="gradient-text">30-minute call.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-7 max-w-[480px] text-[17px] leading-[1.7] text-ink-muted">
                We&apos;ll cover where your finance function is now, what&apos;s slow,
                and what you&apos;re deciding without the numbers you&apos;d want. If
                it&apos;s a fit, I&apos;ll tell you what I&apos;d do first. If it
                isn&apos;t, I&apos;ll tell you that too.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-9 space-y-3">
                {assurances.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[14.5px] text-ink-muted">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="7" stroke="#17A89A" strokeWidth="1.1" />
                      <path
                        d="M5 8l2 2 4-4.5"
                        stroke="#17A89A"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 border-t border-line pt-7">
                <div className="mono-label mb-4">Or reach out directly</div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-teal transition-colors hover:text-ink"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal transition-colors hover:text-ink"
                  >
                    LinkedIn — Stavros
                  </a>
                  <a
                    href={COMPANY_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal transition-colors hover:text-ink"
                  >
                    LinkedIn — Vantage Rock
                  </a>
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-teal transition-colors hover:text-ink"
                  >
                    @VantageRock
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
