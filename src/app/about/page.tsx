import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'

export const metadata = {
  title: 'About - Justin Ukaegbu',
  description:
    'Designer working across brand, product, and interaction design. Twelve years of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.',
}

const credentials = [
  {
    title: 'Webby Award Nomination, 2023',
    description: 'TBTM Interactive Festival',
  },
  {
    title: 'Mastercard Partnership',
    description: 'Digital card product design',
  },
  {
    title: '1.1 Billion Impressions',
    description: 'Campaign reach across fifty countries',
  },
  {
    title: 'Government-Level Work',
    description: 'Route to Zero brand and communications',
  },
  {
    title: 'Fintech Platforms',
    description: 'Product design for payment systems',
  },
  {
    title: 'International Scope',
    description: 'Practice spanning multiple countries and regions',
  },
]

const products = [
  {
    name: 'Art Director Studio',
    description: 'Platform for creative direction work.',
  },
  {
    name: 'Draw in the Air',
    description: 'Gesture-based learning platform for children.',
  },
]

export default function AboutPage() {
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
            <p>
              Designer working across brand, product, and interaction design. Twelve years
              of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.
            </p>
            <p>
              Built platforms used by hundreds of thousands. Designed campaigns that reached
              1.1 billion impressions. Led brand work for organisations operating at
              government level.
            </p>
            <p>
              Now focused on building products that combine design, technology, and learning.
              Also running Art Director Studio, a platform for creative direction work.
            </p>
          </div>
        </Container>
      </Section>

      {/* Design Practice */}
      <Section className="bg-white-warm">
        <Container narrow>
          <Eyebrow className="mb-4">Design Practice</Eyebrow>
          <div className="space-y-6 text-ink-soft leading-relaxed">
            <p>
              Started in Nigeria, studied in the UK, and worked across the Middle East and
              Europe. Early career covered print, brand identity, and editorial design before
              shifting into digital product and interaction work.
            </p>
            <p>
              Take Back The Mic was a defining project. Three seasons of brand, digital
              product, interactive festival, and campaign work spanning virtual environments,
              crypto rewards, and a Mastercard partnership. The campaign reached over 1.1
              billion impressions across 50+ countries and earned a Webby nomination in 2023.
            </p>
            <p>
              In the UK, created the brand identity, website, and communications design for
              Route to Zero, a business-led membership organisation operating at government
              level, engaging Westminster and industry leaders on net zero policy.
            </p>
            <p>
              Holds an MA in Graphic Design (Distinction) from University of Hertfordshire
              and B.Sc. in Computer Science and Education from Enugu University of Science
              and Technology. Member of Chartered Society of Designers and Design Research
              Society.
            </p>
          </div>
        </Container>
      </Section>

      {/* Credentials */}
      <Section>
        <Container>
          <Eyebrow className="mb-10">Credentials</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {credentials.map((item, i) => (
              <div key={i} className="py-4 border-b border-rule">
                <p className="font-serif text-lg text-ink mb-1">{item.title}</p>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Independent Products */}
      <Section className="bg-white-warm">
        <Container>
          <Eyebrow className="mb-10">Independent Products</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((item, i) => (
              <div key={i}>
                <p className="font-serif text-xl text-ink mb-2">{item.name}</p>
                <p className="text-ink-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
