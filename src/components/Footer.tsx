import Link from 'next/link'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Who It\'s For', href: '/who-its-for' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'About', href: '/about' },
]

export function Footer() {
  return (
    <footer className="border-t border-surface-800">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="font-serif text-lg text-content-100">Vantage Rock Financial</span>
            <p className="mt-3 text-sm text-content-500 max-w-xs">
              Strategic financial leadership for AI-native companies navigating growth and capital allocation.
            </p>
            <p className="mt-4 text-xs text-content-500">
              A <span className="text-accent-400">Sage Summit Capital</span> portfolio company.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <span className="label">Navigate</span>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-content-500 hover:text-content-200 transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="label">Connect</span>
            <div className="mt-4">
              <Link href="/request-call" className="btn-primary text-sm">Request Strategy Call</Link>
            </div>
          </div>
        </div>

        <div className="divider mt-12" />
        <p className="mt-6 text-xs text-content-500">© {new Date().getFullYear()} Vantage Rock Financial</p>
      </div>
    </footer>
  )
}
