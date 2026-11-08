import Link from 'next/link'
import { site } from '@/content/site'

export default function Header() {
  return (
    <header className="masthead">
      <Link href="/" className="masthead__name">
        {site.name}
      </Link>
      <nav className="masthead__nav" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}
