'use client'

import { useEffect } from 'react'
import { CTASection, BulletList } from '@/components'

export default function WhoItsFor() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="section-sm border-b border-surface-800">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="label">Who It's For</span>
            <h1 className="mt-4 text-3xl md:text-4xl">AI Founders Building Real Companies.</h1>
            <p className="mt-6 text-lg text-content-400">
              We work with a specific type of founder and company. This clarity helps us deliver better outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Ideal Client */}
            <div className="scroll-fade">
              <div className="card">
                <span className="label text-accent-400">Ideal Client Profile</span>
                <h2 className="mt-4 text-2xl">Companies We Serve</h2>
                <div className="mt-8">
                  <BulletList items={[
                    'AI-native founders building technology-first businesses',
                    'Technical CEOs who need financial partnership, not oversight',
                    'Seed to Series B stage companies',
                    'Revenue between $1M and $20M (or clear path to it)',
                    'Founders who value structure and long-term thinking'
                  ]} />
                </div>
              </div>
            </div>

            {/* Not For */}
            <div className="scroll-fade" style={{ transitionDelay: '100ms' }}>
              <div className="card border-surface-700">
                <span className="label text-content-500">Explicit Exclusions</span>
                <h2 className="mt-4 text-2xl">Not the Right Fit</h2>
                <div className="mt-8">
                  <ul className="space-y-3">
                    {[
                      'Pre-revenue hobby projects or side businesses',
                      'Very early idea-stage startups without product',
                      'Founders unwilling to adopt financial structure',
                      'Companies looking for bookkeeping services only',
                      'Businesses without technical differentiation'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-content-500 flex-shrink-0" />
                        <span className="text-content-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-surface-800 bg-surface-900">
        <div className="container-wide">
          <div className="max-w-2xl scroll-fade">
            <span className="label">Why We're Selective</span>
            <h2 className="mt-4">Fit Matters for Both Sides.</h2>
            <p className="mt-6 text-content-400">
              Financial leadership requires deep engagement. We limit our client count to ensure each company 
              receives the attention required to build genuine financial infrastructure. This means we're 
              selective about who we work with — and transparent about who we're not the right fit for.
            </p>
            <p className="mt-4 text-content-400">
              If you're not sure whether your company fits, the strategy call is the right place to find out. 
              No pressure, no commitment — just an honest conversation about what you need and whether we can provide it.
            </p>
          </div>
        </div>
      </section>

      <CTASection headline="Think you're a fit?" description="Let's have a conversation about your company and financial needs." />
    </>
  )
}
