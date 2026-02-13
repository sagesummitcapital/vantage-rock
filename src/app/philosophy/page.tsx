'use client'

import { useEffect } from 'react'
import { CTASection } from '@/components'

const principles = [
  {
    title: 'Discipline Over Speed',
    content: `The instinct to move fast is valuable in product development. It's often destructive in financial management. Quick financial decisions made without adequate information create problems that compound over time.

We build systems that enable faster, better decisions — not by cutting corners, but by ensuring the right information is available when decisions need to be made. This requires upfront investment in structure. The payoff is sustainable velocity instead of reactive firefighting.`
  },
  {
    title: 'Clarity Before Capital',
    content: `Many founders raise capital before they have financial clarity. This creates a dependency on external validation and often leads to suboptimal terms. More importantly, it obscures the fundamental question of whether the business model actually works.

We help founders build financial clarity first. Understand your unit economics. Know your real runway. See which levers actually move the business. From this position of clarity, capital becomes a strategic choice rather than a survival necessity.`
  },
  {
    title: 'Long-Term Alignment',
    content: `The incentives in startup finance are often misaligned. Advisors optimizing for transaction fees. Metrics designed to impress rather than inform. Short-term thinking that sacrifices sustainable growth for temporary optics.

We structure our engagements around long-term outcomes. Our success is tied to your company's success — not to transactions, not to vanity metrics, not to outcomes that look good on paper but fail in practice.`
  }
]

export default function Philosophy() {
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
          <span className="label">Operating Philosophy</span>
          <h1 className="mt-4 text-3xl md:text-4xl">How We Think About Financial Leadership.</h1>
          <p className="mt-6 text-lg text-content-400">
            Our approach is shaped by experience — what we've seen work, what we've seen fail, 
            and the principles that separate sustainable growth from fragile success.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="space-y-20">
            {principles.map((principle, i) => (
              <article key={principle.title} className={`scroll-fade ${i > 0 ? 'pt-20 border-t border-surface-800' : ''}`}>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-2xl md:text-3xl">{principle.title}</h2>
                <div className="mt-8 space-y-4 text-content-400">
                  {principle.content.split('\n\n').map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Aligned with how we think?" description="Let's discuss how these principles apply to your situation." />
    </>
  )
}
