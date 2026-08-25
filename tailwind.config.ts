import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#0B1A2A", // Deep Slate Navy — primary text / dark accents
          deep: "#081421",
          soft: "#1E3346",
        },
        teal: {
          DEFAULT: "#17A89A", // slightly deepened teal for contrast on light bg
          bright: "#2EE6C9", // electric teal — for dark panels / glows
          deep: "#0E7C72",
        },
        // Light surfaces
        paper: {
          DEFAULT: "#FAFBFC", // off-white page background
          raised: "#FFFFFF", // cards
          sunken: "#F2F5F7", // subtle wells
          contrast: "#0B1A2A", // dark panels (AI oversight, CTA blocks)
        },
        // Semantic
        bg: {
          DEFAULT: "#FAFBFC",
          raised: "#FFFFFF",
          sunken: "#F2F5F7",
        },
        ink: {
          DEFAULT: "#0B1A2A", // near-navy body text
          muted: "#56697A", // secondary text
          dim: "#8597A6", // tertiary / labels
          invert: "#F0F4F8", // text on dark panels
        },
        line: {
          DEFAULT: "rgba(11, 26, 42, 0.10)",
          strong: "rgba(11, 26, 42, 0.18)",
        },
        accent: {
          DEFAULT: "#17A89A",
          warn: "#D6453F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Iowan Old Style", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter2: "-0.025em",
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 6.4vw, 4.75rem)", { lineHeight: "1.03", letterSpacing: "-0.028em", fontWeight: "400" }],
        "display-xl": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "400" }],
        "display-lg": ["clamp(1.9rem, 3.9vw, 2.85rem)", { lineHeight: "1.12", letterSpacing: "-0.022em", fontWeight: "400" }],
      },
      animation: {
        ticker: "ticker 50s linear infinite",
        aurora: "aurora 20s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(2%, -2%) scale(1.05)", opacity: "0.9" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
