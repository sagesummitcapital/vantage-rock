'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, BulletList, CTASection } from '@/components'

export default function Home() {
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
      {/* Hero */}
      <section className="section relative">
        <div className="absolute inset-0 bg-gradient-subtle" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="label animate-initial animate-fade-up">Fractional CFO</span>
            <h1 className="mt-4 animate-initial animate-fade-up animate-delay-100 text-balance">
              Strategic Financial Leadership for AI-Native Companies.
            </h1>
            <p className="mt-6 text-lg text-content-400 max-w-2xl animate-initial animate-fade-up animate-delay-200">
              Fractional CFO support for founders navigating scale, capital, and disciplined growth.
            </p>
            <div className="mt-10 animate-initial animate-fade-up animate-delay-300">
              <Link href="/request-call" className="btn-primary">
                Request Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section border-t border-surface-800">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 scroll-fade">
              <span className="label">The Problem</span>
              <h2 className="mt-4">Growth Without Financial Discipline Is Fragile.</h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="scroll-fade">
                <BulletList items={[
                  'Runway uncertainty creates reactive decision-making',
                  'Unstructured reporting obscures true performance',
                  'Capital inefficiency limits growth options',
                  'Lack of financial leadership delays strategic moves'
                ]} />
              </div>
              <p className="mt-8 text-content-400 scroll-fade">
                Fast-moving AI companies need financial infrastructure that matches their technical sophistication. 
                Most don't have it — and the cost compounds over time.
              </p>
              <div className="mt-8 scroll-fade">
                <Link href="/request-call" className="btn-text">
                  Build financial discipline
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="section border-t border-surface-800 bg-surface-900">
        <div className="container-wide">
          <div className="text-center mb-16 scroll-fade">
            <span className="label">What We Provide</span>
            <h2 className="mt-4">Financial Leadership, Not Bookkeeping.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Financial Modeling & Forecasting', desc: 'Scenario planning, runway modeling, and performance forecasting that informs real decisions — not spreadsheet theater.' },
              { title: 'Cash & Runway Management', desc: 'Disciplined cash management with clear visibility into burn rate, runway, and the levers that affect both.' },
              { title: 'Fundraising & Capital Strategy', desc: 'Preparation for institutional capital: data rooms, financial narratives, and the metrics investors actually evaluate.' }
            ].map((item, i) => (
              <div key={item.title} className="card-hover scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                <h3 className="text-lg text-content-100">{item.title}</h3>
                <p className="mt-3 text-sm text-content-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vantage Rock */}
      <section className="section border-t border-surface-800">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 scroll-fade">
              <span className="label">Why Vantage Rock</span>
              <h2 className="mt-4">Built for AI Builders.</h2>
              <p className="mt-4 text-content-400">
                We understand the specific financial dynamics of AI-native companies — the capital intensity, 
                the unit economics, the fundraising environment.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Operator-First Approach', desc: 'We work alongside founders, not above them.' },
                  { title: 'PE-Level Rigor', desc: 'Institutional financial discipline without the bureaucracy.' },
                  { title: 'Clear Reporting', desc: 'Dashboards and metrics that drive action.' },
                  { title: 'Long-Term Alignment', desc: 'We optimize for sustainable growth, not vanity metrics.' }
                ].map((item, i) => (
                  <div key={item.title} className="card scroll-fade" style={{ transitionDelay: `${i * 75}ms` }}>
                    <h4 className="text-content-100 font-medium">{item.title}</h4>
                    <p className="mt-2 text-sm text-content-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection headline="Ready for financial leadership?" description="Tell us about your company and current challenges." />
    </>
  )
}
