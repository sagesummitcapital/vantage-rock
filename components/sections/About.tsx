import Image from "next/image";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import {
  CONTACT_EMAIL,
  FOUNDER_NAME,
  FOUNDER_TITLE,
  FOUNDER_LINKEDIN,
  COMPANY_LINKEDIN,
  X_URL,
} from "@/lib/site";

const depth = [
  "FP&A, budgeting and forecasting",
  "Controllership and financial reporting",
  "Cash flow, profitability and pricing",
  "Management and KPI reporting",
  "Revenue and finance operations",
  "Multi-entity finance",
  "Financial systems and process improvement",
  "M&A integration and due diligence",
];

const links = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, external: false },
  { label: "LinkedIn — Stavros", href: FOUNDER_LINKEDIN, external: true },
  { label: "LinkedIn — Vantage Rock", href: COMPANY_LINKEDIN, external: true },
  { label: "@VantageRock", href: X_URL, external: true },
];

export default function About() {
  return (
    <section id="about" className="border-b border-line bg-bg-sunken">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-28">
        <SectionHead
          number="07"
          label="Who you're working with"
          heading="You talk to the"
          dim="operator."
        />

        <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[340px] md:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-bg-raised soft-shadow">
                <Image
                  src="/founder.jpg"
                  alt={`${FOUNDER_NAME}, ${FOUNDER_TITLE} at Vantage Rock Financial`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover"
                />
              </div>
              <div
                className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border border-teal/30"
                aria-hidden
              />

              <div className="mt-6">
                <div className="font-display text-[21px] tracking-tighter2 text-ink">
                  {FOUNDER_NAME}
                </div>
                <div className="mono-label mt-1.5">{FOUNDER_TITLE}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="max-w-[600px] space-y-5 text-[16.5px] leading-[1.7] text-ink-muted">
              <p>
                I&apos;m a finance and operations leader with over a decade across
                healthcare, technology and SaaS, startups, and private-equity-backed
                businesses — from early-stage companies through acquisition and
                post-acquisition integration, to multi-entity portfolio groups.
              </p>
              <p>
                I&apos;ve built finance and operations functions from the ground up,
                supported fundraising and due diligence, led accounting-system
                migrations, and taken a month-end close from fifteen days to three.
              </p>
              <p className="text-ink">
                The focus of my work now is the practical application of AI inside
                finance: cutting repetitive work, sharpening reporting and analysis,
                surfacing risk sooner, and giving leadership faster and clearer answers
                — without adding complexity nobody asked for.
              </p>
              <p>
                The strongest finance organizations combine sound controls, operational
                discipline, business judgment, and modern technology. Most firms bring
                one or two. The whole premise of Vantage Rock is bringing all four.
              </p>
            </div>

            <div className="mt-9">
              <div className="mono-label mb-4">Depth across</div>
              <div className="flex flex-wrap gap-2">
                {depth.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-line bg-bg-raised px-3.5 py-1.5 text-[12.5px] text-ink-muted"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-7 text-[14px]">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-medium text-teal transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
