import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Strategy Call | Vantage Rock Financial',
  description: 'Tell us about your company and current financial challenges.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
