import Link from 'next/link'
import './(site)/site.css'
import Header from '@/components/site/Header'

export default function NotFound() {
  return (
    <div className="site">
      <Header />
      <main className="wrap case lost">
        <div className="case__head">
          <h1 className="case__title">Not here.</h1>
          <p className="case__summary">
            This page has moved or never existed. The work is all on the <Link href="/#work" className="link">home page</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
