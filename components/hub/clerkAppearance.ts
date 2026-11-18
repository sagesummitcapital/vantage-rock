// Clerk theming for the hub and the sign-in page: limestone paper, slate navy ink,
// verdigris focus, tight engraved corners. No shadows, no gradients.
// Declared `as const` (rather than importing Clerk's Appearance type) so this file has no
// dependency on Clerk's internal type packages; it is checked where it is passed in.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#0B1A2A",
    colorText: "#0B1A2A",
    colorTextSecondary: "#4C5D6B",
    colorBackground: "#FFFFFF",
    colorInputBackground: "#FFFFFF",
    colorInputText: "#0B1A2A",
    colorDanger: "#B3322D",
    colorSuccess: "#0F7F78",
    borderRadius: "2px",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontSize: "14px",
  },
  elements: {
    rootBox: { width: "100%" },
    cardBox: {
      width: "100%",
      maxWidth: "420px",
      boxShadow: "none",
      border: "1px solid rgba(11, 26, 42, 0.13)",
      borderRadius: "3px",
    },
    card: { boxShadow: "none", borderRadius: "3px", padding: "32px 28px 28px" },
    headerTitle: {
      fontFamily: 'var(--font-display), "Iowan Old Style", Georgia, serif',
      fontWeight: 400,
      fontSize: "24px",
      letterSpacing: "-0.02em",
      color: "#0B1A2A",
    },
    headerSubtitle: { color: "#4C5D6B", fontSize: "13.5px" },
    socialButtonsBlockButton: {
      border: "1px solid rgba(11, 26, 42, 0.24)",
      boxShadow: "none",
      borderRadius: "2px",
    },
    dividerLine: { background: "rgba(11, 26, 42, 0.13)" },
    dividerText: { color: "#74838F", fontSize: "12px" },
    formFieldLabel: { color: "#4C5D6B", fontSize: "12.5px", fontWeight: 500 },
    formFieldInput: {
      border: "1px solid rgba(11, 26, 42, 0.24)",
      boxShadow: "none",
      borderRadius: "2px",
    },
    formButtonPrimary: {
      backgroundColor: "#0B1A2A",
      boxShadow: "none",
      borderRadius: "2px",
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "none",
      "&:hover": { backgroundColor: "#0A5F5A" },
      "&:focus-visible": { outline: "1px solid #0F7F78", outlineOffset: "2px" },
    },
    footerActionLink: { color: "#0A5F5A" },
    // Sign-up stays visible for the owner's first sign-up. Lock it afterwards in Clerk:
    // Configure → Restrictions → Sign-up mode → Restricted (Clerk then hides it itself).
    userButtonAvatarBox: { width: "30px", height: "30px", borderRadius: "2px" },
    userButtonPopoverCard: {
      boxShadow: "0 12px 32px rgba(11, 26, 42, 0.10)",
      border: "1px solid rgba(11, 26, 42, 0.13)",
      borderRadius: "3px",
    },
  },
} as const;
