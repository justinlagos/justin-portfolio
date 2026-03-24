'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

// Hardcoded fallback in case CMS data fails to load
const FALLBACK_LINKS: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

interface HeaderProps {
  navLinks?: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const links = navLinks && navLinks.length > 0 ? navLinks : FALLBACK_LINKS

  // Don't render header on admin routes
  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (isAdmin) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-rule'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-ink hover:text-accent transition-colors"
        >
          Justin Ukaegbu
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors ${
                pathname === link.href || pathname?.startsWith(link.href + '/')
                  ? 'text-ink'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-ink"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-cream border-t border-rule px-6 pb-8 pt-4 fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-[15px] font-medium tracking-wide transition-colors ${
                pathname === link.href
                  ? 'text-accent'
                  : 'text-ink-soft hover:text-accent'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
