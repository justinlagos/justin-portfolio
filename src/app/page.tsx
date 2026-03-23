import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import StatCard from '@/components/ui/StatCard'
import { BrandCard } from '@/components/ui/BrandCard'
import Link from 'next/link'

export const metadata = {
  title: 'Justin Ukaegbu - Design Leader',
  description:
    'Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.',
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-36 md:pt-44 pb-20 md:pb-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="mb-5">Design Leader</Eyebrow>
            <h1 className="font-serif text-[2.75rem] md:text-[4rem] lg:text-[4.5rem] text-ink leading-[1.08] mb-6">
              Justin Ukaegbu
            </h1>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mb-16">
              Brand, product, and interaction design across 12+ years and 50+ countries.
              Building design systems and digital products that work at scale.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10 border-t border-rule">
              <StatCard value="1.1B" label="Impressions" />
              <StatCard value="50+" label="Countries" />
              <StatCard value="12+" label="Years" />
              <StatCard value="200+" label="Projects" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Selected Work */}
      <Section className="bg-white-warm">
        <Container>
          <div className="flex items-end justify-between mb-14">
            <div>
              <Eyebrow className="mb-4">Selected Work</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Featured brands
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-block text-sm font-medium text-accent hover:text-ink transition-colors"
            >
              View all work
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10" id="featured-brands">
            {/* These will be populated from Supabase. For static build, show placeholder structure */}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/work"
              className="text-sm font-medium text-accent hover:text-ink transition-colors"
            >
              View all work
            </Link>
          </div>
        </Container>
      </Section>

      {/* About Preview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <Eyebrow className="mb-4">About</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
                Twelve years across brand, product, and interaction design
              </h2>
            </div>
            <div>
              <p className="text-ink-soft leading-relaxed mb-6">
                Practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.
                Building design systems and digital products that work at scale.
                Now focused on products that combine design, technology, and learning.
              </p>
              <Link
                href="/about"
                className="text-sm font-medium text-accent hover:text-ink transition-colors"
              >
                Read more
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-ink">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow className="mb-4 !text-accent-light">Available for the right work</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-white-warm mb-5">
              Design leadership, product collaboration, research partnerships, and speaking.
            </h2>
            <a
              href="mailto:mrjustinukaegbu@gmail.com"
              className="inline-block mt-4 text-sm font-medium tracking-wide text-accent-light hover:text-white-warm transition-colors"
            >
              mrjustinukaegbu@gmail.com
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
