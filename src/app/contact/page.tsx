import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'

export const metadata = {
  title: 'Contact - Justin Ukaegbu',
  description:
    'Open to new projects, collaborations, and conversations. Design leadership, product work, and research partnerships.',
}

export default function ContactPage() {
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
                href="mailto:mrjustinukaegbu@gmail.com"
                className="font-serif text-xl text-ink hover:text-accent transition-colors break-all"
              >
                mrjustinukaegbu@gmail.com
              </a>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                Phone
              </p>
              <a
                href="tel:+447577627621"
                className="font-serif text-xl text-ink hover:text-accent transition-colors"
              >
                +44 7577 627621
              </a>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                LinkedIn
              </p>
              <a
                href="https://linkedin.com/in/justin-ukaegbu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl text-ink hover:text-accent transition-colors"
              >
                linkedin.com/in/justin-ukaegbu
              </a>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-3">
                Location
              </p>
              <p className="font-serif text-xl text-ink">
                London, United Kingdom
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
