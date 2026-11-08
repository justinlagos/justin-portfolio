import { site } from '@/content/site'
import CopyEmail from './CopyEmail'

export default function Contact() {
  return (
    <footer id="contact" className="wrap contact-wrap">
      <div className="contact card card--dark">
        <h2 className="contact__title">Have a role or a project in mind?</h2>
        <p className="contact__text">Email is the quickest way to reach me. Tell me a little about it and I’ll reply.</p>
        <a className="contact__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <div className="contact__actions">
          <a className="pill pill--light-solid" href={`mailto:${site.email}`}>
            Email me
          </a>
          <CopyEmail email={site.email} />
          <a className="pill pill--light" href={site.linkedin} rel="me">
            LinkedIn
          </a>
        </div>
      </div>
      <p className="footnote">
        © {new Date().getFullYear()} {site.name}. {site.location}.
      </p>
    </footer>
  )
}
