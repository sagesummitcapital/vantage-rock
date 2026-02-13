'use client'

import { useEffect } from 'react'
import { CTASection } from '@/components'

export default function About() {
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
        <div className="container-narrow">
          <span className="label">About</span>
          <h1 className="mt-4 text-3xl md:text-4xl">Capital Allocation Meets Operator Experience.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="space-y-8 scroll-fade">
            <p className="text-lg text-content-300">
              Vantage Rock Financial was built from the intersection of capital allocation and company operations. 
              We've sat on both sides of the table — evaluating companies as investors and building companies as operators.
            </p>
            <p className="text-content-400">
              This dual perspective shapes how we approach financial leadership. We understand what institutional 
              investors look for because we've been in those rooms. We understand what founders need because 
              we've built companies ourselves.
            </p>
            <p className="text-content-400">
              We're part of the Sage Summit Capital portfolio — a holding company focused on building AI-native 
              businesses with discipline and long-term intent. Vantage Rock extends that financial discipline 
              to founders outside the portfolio who share our commitment to sustainable growth.
            </p>
          </div>

          <div className="mt-16 pt-16 border-t border-surface-800 scroll-fade">
            <span className="label">Our Position</span>
            <h2 className="mt-4 text-2xl">What We Believe</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Financial infrastructure is a competitive advantage, not overhead.',
                'Founders deserve financial partners, not financial gatekeepers.',
                'Clarity enables speed. Structure enables scale.',
                'Long-term thinking is the ultimate edge in a short-term market.'
              ].map((belief, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-500 flex-shrink-0" />
                  <span className="text-content-300">{belief}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
