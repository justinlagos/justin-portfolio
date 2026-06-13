import Link from 'next/link'

interface FooterProps {
  navLinks: { label: string; href: string }[]
  socialLinks: { platform: string; url: string }[]
}

export default function Footer({ navLinks, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold tracking-tight text-text">
                Justin Ukaegbu<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Design leader shaping brands and products across 50+ countries.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:mrjustinukaegbu@gmail.com"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                mrjustinukaegbu@gmail.com
              </a>
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Justin Ukaegbu. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            London, United Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}
