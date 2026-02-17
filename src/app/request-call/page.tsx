import { PlaceholderForm } from '@/components/PlaceholderForm'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Request Strategy Call | Vantage Rock Financial',
  description: 'Tell us about your company and current financial challenges.',
}

export default function RequestCall() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="label">Get Started</span>
            <h1 className="mt-4 text-3xl md:text-4xl">Request a Financial Strategy Call</h1>
            <p className="mt-6 text-lg text-content-400">
              Tell us about your current stage and challenges. We'll assess fit and, if appropriate, 
              schedule a focused conversation about your financial needs.
            </p>

            <div className="mt-10 card">
              <h4 className="text-content-200 font-medium">What to Expect</h4>
              <ul className="mt-4 space-y-3">
                {[
                  'We review submissions within 2 business days',
                  'If there\'s potential fit, we schedule a 30-minute call',
                  'We discuss your situation and assess alignment',
                  'No commitment required — just an honest conversation'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-content-400">
                    <span className="w-1 h-1 mt-2 rounded-full bg-accent-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="card">
              <PlaceholderForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
