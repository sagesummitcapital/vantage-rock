import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#0B1A2A", // Deep Slate Navy — primary text / dark accents
          deep: "#06111C",
          soft: "#1E3346",
        },
        teal: {
          DEFAULT: "#0F7F78", // verdigris — reads as ink on the limestone page
          bright: "#7FD9CC", // pale verdigris — for text and line work on navy
          deep: "#0A5F5A",
        },
        // Light surfaces
        paper: {
          DEFAULT: "#F4F5F2", // off-white page background
          raised: "#FFFFFF", // cards
          sunken: "#E9ECE8", // subtle wells
          contrast: "#0B1A2A", // dark panels (AI oversight, CTA blocks)
        },
        // Semantic
        bg: {
          DEFAULT: "#F4F5F2",
          raised: "#FFFFFF",
          sunken: "#E9ECE8",
        },
        ink: {
          DEFAULT: "#0B1A2A", // near-navy body text
          muted: "#4C5D6B", // secondary text
          dim: "#74838F", // tertiary / labels
          invert: "#EEF0EC", // text on dark panels
        },
        line: {
          DEFAULT: "rgba(11, 26, 42, 0.13)",
          strong: "rgba(11, 26, 42, 0.24)",
        },
        // Warm metal, used only for hairlines and small marks
        brass: {
          DEFAULT: "#A8895A",
          soft: "#C9B48C",
        },
        accent: {
          DEFAULT: "#0F7F78",
          warn: "#D6453F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Iowan Old Style", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Small labels are set in the sans; a monospace face is not part of the identity.
        mono: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Tight corners: closer to engraved stationery than to app cards.
      borderRadius: {
        md: "2px",
        lg: "3px",
        xl: "4px",
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter2: "-0.025em",
      },
      fontSize: {
        "display-2xl": ["clamp(2.9rem, 7vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.034em", fontWeight: "300" }],
        "display-xl": ["clamp(2.3rem, 5.2vw, 4.1rem)", { lineHeight: "1.03", letterSpacing: "-0.03em", fontWeight: "300" }],
        "display-lg": ["clamp(2rem, 4.3vw, 3.3rem)", { lineHeight: "1.06", letterSpacing: "-0.028em", fontWeight: "350" }],
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
