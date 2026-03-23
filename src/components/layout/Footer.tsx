import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule bg-cream">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-semibold text-ink mb-3">
              Justin Ukaegbu
            </p>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Brand, product, and interaction design across 12+ years and 50+ countries.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Work', href: '/work' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink-soft hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:mrjustinukaegbu@gmail.com"
                className="text-sm text-ink-soft hover:text-accent transition-colors"
              >
                mrjustinukaegbu@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/justin-ukaegbu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-soft hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule">
          <p className="text-xs text-ink-muted">
            &copy; {year} Justin Ukaegbu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
