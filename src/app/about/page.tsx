import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import { getPage, getCredentials, getProducts } from '@/lib/data'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getPage('about')
  return {
    title: page?.seo_title || 'About',
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

  const content = page?.content as Record<string, any> || {}
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
      <Section className="pt-36 md:pt-44 pb-16">
        <Container>
          <Eyebrow className="mb-5">About</Eyebrow>
          <h1 className="font-serif text-[2.75rem] md:text-[4rem] text-ink leading-[1.08] mb-8 max-w-3xl">
            Justin Ukaegbu
          </h1>
        </Container>
      </Section>

      {/* Intro */}
      <Section className="pt-0 pb-20">
        <Container narrow>
          <div className="space-y-6 text-lg text-ink-soft leading-relaxed">
            {introParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Design Practice */}
      {storyParagraphs.length > 0 && (
        <Section className="bg-white-warm">
          <Container narrow>
            <Eyebrow className="mb-4">{storyTitle}</Eyebrow>
            <div className="space-y-6 text-ink-soft leading-relaxed">
              {storyParagraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Credentials */}
      {credentials.length > 0 && (
        <Section>
          <Container>
            <Eyebrow className="mb-10">Credentials</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {credentials.map((item) => (
                <div key={item.id} className="py-4 border-b border-rule">
                  <p className="font-serif text-lg text-ink mb-1">{item.title}</p>
                  {item.description && (
                    <p className="text-sm text-ink-muted">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Independent Products */}
      {products.length > 0 && (
        <Section className="bg-white-warm">
          <Container>
            <Eyebrow className="mb-10">Independent Products</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {products.map((item) => (
                <div key={item.id}>
                  <p className="font-serif text-xl text-ink mb-2">
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
                    <p className="text-ink-muted leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
