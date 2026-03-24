import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import { getPage, getSocialLinks } from '@/lib/data'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getPage('contact')
  return {
    title: page?.seo_title || 'Contact',
    description:
      page?.seo_description ||
      'Open to new projects, collaborations, and conversations. Design leadership, product work, and research partnerships.',
  }
}

export default async function ContactPage() {
  const [page, socialLinks] = await Promise.all([
    getPage('contact'),
    getSocialLinks(),
  ])

  const content = page?.content as Record<string, any> || {}
  const email = content.email || 'mrjustinukaegbu@gmail.com'
  const phone = content.phone || '+44 7577 627621'
  const linkedin = content.linkedin || 'https://linkedin.com/in/justin-ukaegbu'
  const location = content.location || 'London, United Kingdom'

  return (
    <>
      {/* Hero */}
      <Section className="pt-36 md:pt-44 pb-16">
        <Container>
          <Eyebrow className="mb-5">Get in Touch</Eyebrow>
          <h1 className="font-serif text-[2.75rem] md:text-[4rem] text-ink leading-[1.08] mb-6 max-w-2xl">
            Let&apos;s work together
          </h1>
          <p className="text-lg text-ink-soft max-w-xl leading-relaxed">
            Open to new projects, collaborations, and conversations.
            Interested in design leadership, product work, and research partnerships.
          </p>
        </Container>
      </Section>

      {/* Contact Details */}
      <Section className="pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl">
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="font-serif text-xl text-ink hover:text-accent transition-colors break-all"
              >
                {email}
              </a>
            </div>

            {phone && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                  Phone
                </p>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-serif text-xl text-ink hover:text-accent transition-colors"
                >
                  {phone}
                </a>
              </div>
            )}

            {linkedin && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                  LinkedIn
                </p>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl text-ink hover:text-accent transition-colors"
                >
                  {linkedin.replace('https://', '')}
                </a>
              </div>
            )}

            {/* Additional social links from CMS */}
            {socialLinks.map((link) => (
              <div key={link.id}>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                  {link.platform}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl text-ink hover:text-accent transition-colors"
                >
                  {link.url.replace('https://', '')}
                </a>
              </div>
            ))}

            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                Location
              </p>
              <p className="font-serif text-xl text-ink">
                {location}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
