import { site } from '@/content/site'

export default function Contact() {
  return (
    <footer id="contact" className="contact">
      <h2 className="section-title">Contact</h2>
      <a className="contact__email" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="contact__meta">
        <a href={site.linkedin} rel="me">
          LinkedIn
        </a>
        <span>{site.location}. Working with teams in the UK and Nigeria.</span>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  )
}
