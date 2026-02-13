'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Who It\'s For', href: '/who-its-for' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded overflow-hidden">
              <Image src="/logos/Vantage_rock_logo.jpg" alt="Vantage Rock Financial" fill className="object-cover" priority />
            </div>
            <span className="hidden sm:block font-serif text-lg text-content-100">Vantage Rock</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-content-400 hover:text-content-200 transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/request-call" className="btn-primary text-sm px-4 py-2">
              Request Strategy Call
            </Link>
            <button type="button" className="lg:hidden p-2 -mr-2 text-content-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-surface-800">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="block py-3 text-content-300 hover:text-content-100" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
