import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "linear-gradient(180deg, #0B1A2A 0%, #081421 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10">
        {/* Tagline band */}
        <div
          className="mb-12 border-b pb-10"
          style={{ borderColor: "rgba(240,244,248,0.1)" }}
        >
          <p
            className="font-mono text-[12px] uppercase tracking-[0.2em]"
            style={{ color: "#2EE6C9" }}
          >
            Clarity · Insight · Automation
          </p>
          <p
            className="mt-3 max-w-[640px] font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.02em]"
            style={{ color: "#F0F4F8" }}
          >
            Financial leadership that drives growth.
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
              <a href="#diagnostic" className="transition-colors hover:text-[#2EE6C9]">Diagnostic</a>
              <a href="#packages" className="transition-colors hover:text-[#2EE6C9]">Packages</a>
              <a href="#about" className="transition-colors hover:text-[#2EE6C9]">About</a>
              <a href="#book" className="transition-colors hover:text-[#2EE6C9]">Book</a>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href="mailto:info@vantagerockfinancial.com"
                className="font-mono text-[12px] tracking-[0.04em] transition-colors hover:text-[#2EE6C9]"
                style={{ color: "#F0F4F8" }}
              >
                info@vantagerockfinancial.com
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
