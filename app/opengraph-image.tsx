import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vantage Rock Financial — AI-Native Financial Leadership";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(150deg, #0F2235 0%, #0B1A2A 60%, #081421 100%)",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontSize: 34, color: "#F0F4F8", letterSpacing: -1 }}>
            VANTAGE
          </span>
          <span style={{ width: 2, height: 30, background: "#2EE6C9" }} />
          <span style={{ fontSize: 34, color: "#F0F4F8", letterSpacing: -1 }}>
            ROCK
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              color: "#F0F4F8",
              letterSpacing: -2.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI-native financial</span>
            <span style={{ color: "#2EE6C9" }}>leadership.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#8FA3B5",
              maxWidth: 820,
            }}
          >
            Fractional CFO leadership + finance automation for founder-led
            companies.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(240,244,248,0.15)",
            paddingTop: 24,
            fontSize: 20,
            color: "#8FA3B5",
            letterSpacing: 2,
          }}
        >
          <span>CLARITY · INSIGHT · AUTOMATION</span>
          <span style={{ color: "#2EE6C9" }}>vantagerockfinancial.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
