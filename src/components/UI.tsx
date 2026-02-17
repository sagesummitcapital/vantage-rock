import Link from 'next/link'

export function ArrowRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

interface CTASectionProps {
  headline?: string
  description?: string
  buttonText?: string
}

export function CTASection({ 
  headline = 'Ready to build financial discipline?',
  description,
  buttonText = 'Request Strategy Call'
}: CTASectionProps) {
  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
      <div className="container-wide relative text-center">
        <h3 className="text-2xl md:text-3xl">{headline}</h3>
        {description && <p className="mt-4 text-content-400 max-w-xl mx-auto">{description}</p>}
        <div className="mt-8">
          <Link href="/request-call" className="btn-primary">
            {buttonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  items?: string[]
}

export function ServiceCard({ title, description, items }: ServiceCardProps) {
  return (
    <div className="card-hover">
      <h3 className="text-xl text-content-100">{title}</h3>
      <p className="mt-3 text-sm text-content-400">{description}</p>
      {items && (
        <ul className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-content-400">
              <span className="w-1 h-1 mt-2 rounded-full bg-accent-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-500 flex-shrink-0" />
          <span className="text-content-300">{item}</span>
        </li>
      ))}
    </ul>
  )
}

