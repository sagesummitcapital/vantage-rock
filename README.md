# Vantage Rock Financial

Fractional CFO website for AI-native companies. A Sage Summit Capital portfolio company.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript

## Pages
| Page | Purpose |
|------|---------|
| Home | Hero + problem + services + CTA |
| Services | Detailed service offerings |
| Who It's For | ICP and exclusions |
| Philosophy | Operating principles |
| About | Background and positioning |
| Request Call | HubSpot form |

## Local Development
```bash
npm install
npm run dev
```

## HubSpot Setup
1. Create form with fields: Name, Company, Email, Revenue Range, Stage, Current Financial Challenge
2. Update `/src/app/request-call/page.tsx` with HubSpot component
3. Test submission flow

## Deployment
```bash
npm run build
vercel --prod
```

## Design Tokens
- Background: #09090b (near black)
- Surface: #0c0c0e to #3f3f46
- Accent: #b8845a (muted gold)
- Text: #fafafa to #71717a
- Font: Source Serif 4 (headlines) + Inter (body)

## Deployment Checklist
- [ ] HubSpot form configured
- [ ] Mobile responsive
- [ ] CTA visible above fold
- [ ] SEO metadata complete
- [ ] Deploy to Vercel
- [ ] Connect domain
- [ ] SSL verified
