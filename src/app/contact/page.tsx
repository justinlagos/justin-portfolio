import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getPage, getSocialLinks } from '@/lib/data'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getPage('contact')
  return {
    title: page?.seo_title || 'Contact — Justin Ukaegbu',
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

  const content = (page?.content as Record<string, any>) || {}
  const email = content.email || 'mrjustinukaegbu@gmail.com'
  const phone = content.phone || '+44 7577 627621'
  const linkedin =
    content.linkedin || 'https://linkedin.com/in/justin-ukaegbu'
  const location = content.location || 'London, United Kingdom'

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6 animate-fade-up">
            Contact
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-6 animate-fade-up">
            Let&apos;s build<br />something great<span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl leading-relaxed animate-fade-up-delay">
            Open to new projects, collaborations, and conversations.
            Interested in design leadership, product work, and research partnerships.
          </p>
        </Container>
      </section>

      {/* Contact Details */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl">
            <ScrollReveal>
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
                  Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="font-display text-xl font-semibold text-text hover:text-accent transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            </ScrollReveal>

            {phone && (
              <ScrollReveal delay={0.05}>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
                    Phone
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-display text-xl font-semibold text-text hover:text-accent transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </ScrollReveal>
            )}

            {linkedin && (
              <ScrollReveal delay={0.1}>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
                    LinkedIn
                  </p>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl font-semibold text-text hover:text-accent transition-colors"
                  >
                    {linkedin.replace('https://', '')}
                  </a>
                </div>
              </ScrollReveal>
            )}

            {/* Additional social links from CMS */}
            {socialLinks.map((link, i) => (
              <ScrollReveal key={link.id} delay={0.15 + i * 0.05}>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
                    {link.platform}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl font-semibold text-text hover:text-accent transition-colors"
                  >
                    {link.url.replace('https://', '')}
                  </a>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
                  Location
                </p>
                <p className="font-display text-xl font-semibold text-text">
                  {location}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border">
        <Container>
          <ScrollReveal>
            <p className="text-text-muted text-sm max-w-lg leading-relaxed">
              Whether it&apos;s a new brand from scratch, a product redesign, or a
              campaign that needs to hit — I&apos;m always up for work that
              challenges the ordinary.
            </p>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
