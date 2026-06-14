'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => el.classList.add('visible')

    // No IntersectionObserver support (or reduced motion): show immediately so
    // content is never left hidden.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion) {
      reveal()
      return
    }

    // Reveal right away if the element is already within (or above) the viewport
    // on mount — otherwise above-the-fold content could stay invisible.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      // threshold 0 fires as soon as a single pixel enters, which is far more
      // reliable than a higher threshold during fast scrolling.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)

    // Safety net: if the observer somehow never fires (a known cross-browser
    // flakiness), ensure the content still becomes visible on any scroll.
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal()
        cleanup()
      }
    }
    const cleanup = () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return cleanup
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}
