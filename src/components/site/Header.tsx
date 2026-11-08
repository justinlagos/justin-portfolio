import Link from 'next/link'
import { site } from '@/content/site'

export default function Header() {
  return (
    <header className="nav">
      <Link href="/" className="nav__pill nav__name">
        {site.name}
      </Link>
      <nav className="nav__pill nav__links" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#try">Try it</Link>
        <Link href="/#how">How I work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <a href={`mailto:${site.email}`} className="nav__pill nav__cta">
        Email me
      </a>
    </header>
  )
}
