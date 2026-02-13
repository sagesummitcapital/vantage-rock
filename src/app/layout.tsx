import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vantage Rock Financial | Fractional CFO for AI-Native Companies',
  description: 'Strategic financial leadership for AI-native companies navigating growth, runway, and capital allocation.',
  keywords: ['fractional CFO', 'AI startups', 'financial strategy', 'startup finance', 'CFO services'],
  openGraph: {
    title: 'Vantage Rock Financial | Fractional CFO for AI-Native Companies',
    description: 'Strategic financial leadership for AI-native companies.',
    siteName: 'Vantage Rock Financial',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
