'use client'

import { useEffect } from 'react'
import { CTASection, ServiceCard } from '@/components'

const services = [
  {
    title: 'Fractional CFO',
    description: 'Strategic financial leadership on a fractional basis. We integrate with your team to provide the financial oversight typically found in later-stage companies.',
    items: ['Strategic planning and board preparation', 'Financial decision support', 'Investor relations management', 'Team financial literacy']
  },
  {
    title: 'Financial Systems Design',
    description: 'Build the financial infrastructure that scales with your company. Reporting, forecasting, and analysis systems designed for AI-native operations.',
    items: ['Chart of accounts and reporting structure', 'KPI dashboards and metrics', 'Budgeting and variance analysis', 'Cash flow management systems']
  },
  {
    title: 'Board Reporting',
    description: 'Clear, actionable board materials that demonstrate financial competence and strategic clarity. No template decks — materials built for your specific situation.',
    items: ['Monthly financial packages', 'Board deck preparation', 'Narrative development', 'Q&A preparation']
  },
  {
    title: 'Fundraising Support',
    description: 'Preparation for institutional capital. We help you build the financial foundation investors expect and the materials they need to evaluate your business.',
    items: ['Data room preparation', 'Financial model development', 'Due diligence support', 'Term sheet analysis']
  }
]

export default function Services() {
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
            <span className="label">Services</span>
            <h1 className="mt-4 text-3xl md:text-4xl">Financial Leadership for Every Stage.</h1>
            <p className="mt-6 text-lg text-content-400">
              Structured engagement models that match your current needs and scale as you grow.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className="scroll-fade" style={{ transitionDelay: `${i * 100}ms` }}>
                <ServiceCard title={service.title} description={service.description} items={service.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to discuss your needs?" description="Every engagement starts with understanding your specific situation." />
    </>
  )
}
