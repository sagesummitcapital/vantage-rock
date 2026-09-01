import Image from "next/image";
import { FOUNDER_LINKEDIN, COMPANY_LINKEDIN, X_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "linear-gradient(180deg, #0B1A2A 0%, #081421 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        {/* Identity band */}
        <div
          className="mb-12 border-b pb-10"
          style={{ borderColor: "rgba(240,244,248,0.1)" }}
        >
          <p
            className="max-w-[720px] font-display text-[clamp(1.25rem,2.6vw,1.85rem)] leading-[1.25] tracking-[-0.02em]"
            style={{ color: "#F0F4F8" }}
          >
            AI-enabled finance. A human between the systems and the decisions.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/logo.png"
              alt="Vantage Rock Financial"
              width={1042}
              height={459}
              unoptimized
              className="h-14 w-auto"
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-wrap gap-6 text-[13px]" style={{ color: "#C5D2DD" }}>
              <a href="/#services" className="transition-colors hover:text-[#2EE6C9]">Services</a>
              <a href="/#how" className="transition-colors hover:text-[#2EE6C9]">How it works</a>
              <a href="/#engagements" className="transition-colors hover:text-[#2EE6C9]">Engagements</a>
              <a href="/insights" className="transition-colors hover:text-[#2EE6C9]">Insights</a>
              <a href="/#about" className="transition-colors hover:text-[#2EE6C9]">About</a>
              <a href="/#book" className="transition-colors hover:text-[#2EE6C9]">Book a call</a>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href="mailto:info@vantagerockfinancial.com"
                className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                info@vantagerockfinancial.com
              </a>
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                LinkedIn — Stavros
              </a>
              <a
                href={COMPANY_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                LinkedIn — Vantage Rock
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                @VantageRock
              </a>
              <span className="font-mono text-[12px] tracking-[0.04em]" style={{ color: "#8FA3B5" }}>
                vantagerockfinancial.com
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col justify-between gap-3 border-t pt-6 font-mono text-[10px] tracking-[0.12em] md:flex-row"
          style={{ borderColor: "rgba(240,244,248,0.1)", color: "#5A6B7B" }}
        >
          <div>VANTAGE ROCK FINANCIAL © 2026</div>
          <div className="uppercase">AI-Native Financial Leadership</div>
        </div>
      </div>
    </footer>
  );
}
