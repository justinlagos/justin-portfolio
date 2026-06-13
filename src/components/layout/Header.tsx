'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  navLinks: { label: string; href: string }[]
}

export default function Header({ navLinks }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) return null

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-display text-lg font-bold tracking-tight text-text">
              JU<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                  pathname === link.href || pathname?.startsWith(link.href + '/')
                    ? 'text-text'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:mrjustinukaegbu@gmail.com"
              className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent hover:text-accent-hover transition-colors duration-300"
            >
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-10">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-4xl font-bold tracking-tight transition-all duration-500 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                } ${
                  pathname === link.href ? 'text-accent' : 'text-text hover:text-accent'
                }`}
                style={{ transitionDelay: isOpen ? `${0.1 + i * 0.05}s` : '0s' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:mrjustinukaegbu@gmail.com"
              className={`font-display text-4xl font-bold tracking-tight text-accent hover:text-accent-hover transition-all duration-500 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: isOpen ? `${0.1 + navLinks.length * 0.05}s` : '0s' }}
            >
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
