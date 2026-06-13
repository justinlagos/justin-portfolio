import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getPage, getCredentials, getProducts } from '@/lib/data'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getPage('about')
  return {
    title: page?.seo_title || 'About — Justin Ukaegbu',
    description:
      page?.seo_description ||
      'Designer working across brand, product, and interaction design. Twelve years of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.',
  }
}

export default async function AboutPage() {
  const [page, credentials, products] = await Promise.all([
    getPage('about'),
    getCredentials(),
    getProducts(),
  ])

  const content = (page?.content as Record<string, any>) || {}
  const introParagraphs: string[] = content.intro_paragraphs || [
    'Designer working across brand, product, and interaction design. Twelve years of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.',
    'Built platforms used by hundreds of thousands. Designed campaigns that reached 1.1 billion impressions. Led brand work for organisations operating at government level.',
    'Now focused on building products that combine design, technology, and learning.',
  ]
  const storyTitle: string = content.story_title || 'Design Practice'
  const storyParagraphs: string[] = content.story_paragraphs || []

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6 animate-fade-up">
            About
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-8 animate-fade-up">
            Justin<br />Ukaegbu<span className="text-accent">.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed animate-fade-up-delay">
            Designer, creative director, and builder — shaping brands and products that matter.
          </p>
        </Container>
      </section>

      {/* Intro */}
      <section className="pb-20 md:pb-28">
        <Container narrow>
          <div className="space-y-6">
            {introParagraphs.map((p: string, i: number) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {p}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Design Practice */}
      {storyParagraphs.length > 0 && (
        <Section light>
          <Container narrow>
            <ScrollReveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                {storyTitle}
              </p>
            </ScrollReveal>
            <div className="space-y-6">
              {storyParagraphs.map((p: string, i: number) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <p className="text-text-dark-secondary leading-relaxed">{p}</p>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Credentials */}
      {credentials.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <ScrollReveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-10">
                Credentials
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
              {credentials.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.04}>
                  <div className="py-5 border-b border-border">
                    <p className="font-display text-lg font-semibold text-text tracking-tight mb-1">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-sm text-text-muted">{item.description}</p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Independent Products */}
      {products.length > 0 && (
        <Section dark>
          <Container>
            <ScrollReveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-10">
                Independent Products
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {products.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.06}>
                  <div>
                    <p className="font-display text-xl font-semibold text-text tracking-tight mb-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </p>
                    {item.description && (
                      <p className="text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
