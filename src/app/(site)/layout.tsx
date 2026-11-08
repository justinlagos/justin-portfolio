import './site.css'
import Header from '@/components/site/Header'
import Contact from '@/components/site/Contact'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Contact />
    </div>
  )
}
