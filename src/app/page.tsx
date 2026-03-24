import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import StatCard from '@/components/ui/StatCard'
import { ProjectCard } from '@/components/ui/ProjectCard'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProjects, getStats, getClients, getCredentials, getProducts, getPage } from '@/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Justin Ukaegbu - Design Leader',
  description:
    'Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.',
}

export default async function Home() {
  const [featuredProjects, stats, clients, credentials, products] = await Promise.all([
    getFeaturedProjects(),
    getStats(),
    getClients(),
    getCredentials(),
    getProducts(),
  ])

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-36 md:pt-44 pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Column */}
            <div>
              <Eyebrow className="mb-5">Design Leader</Eyebrow>
              <h1 className="font-serif text-[2.75rem] md:text-[4rem] lg:text-[4.5rem] text-ink leading-[1.08] mb-6">
                Justin Ukaegbu
              </h1>
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-xl mb-16">
                Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.
              </p>

              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 md:gap-10 pt-10 border-t border-rule">
                  {stats.map((stat) => (
                    <StatCard key={stat.id} value={stat.number} label={stat.label} />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Portrait */}
            <div className="hidden md:block">
              <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/assets/about/justin-portrait.png"
                  alt="Justin Ukaegbu"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 50vw, 640px"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Client Logos Bar */}
      {clients.length > 0 && (
        <Section className="py-12 md:py-16 border-t border-b border-rule">
          <Container>
            <div className="text-center">
              <p className="text-xs md:text-sm font-medium tracking-[0.15em] uppercase text-ink-muted">
                {clients.map((c) => c.name).join('   ')}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* Selected Work */}
      <Section className="bg-white-warm">
        <Container>
          <div className="flex items-end justify-between mb-14">
            <div>
              <Eyebrow className="mb-4">Selected Work</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Featured projects
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-block text-sm font-medium text-accent hover:text-ink transition-colors"
            >
              View all work
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  brandSlug={project.brand?.slug}
                />
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-16">
              Featured work coming soon.
            </p>
          )}

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

      {/* Practice Overview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <Eyebrow className="mb-4">About</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
                Twelve years across brand, product, and interaction design
              </h2>
            </div>
            <div>
              <p className="text-ink-soft leading-relaxed mb-6">
                Practice shaped across Nigeria, the UK, Dubai, and fifty countries. Work that has reached over a billion people, earned a Webby nomination, and operated at government level. Building design systems and digital products that work at scale.
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

      {/* Recognition and Credentials */}
      {credentials.length > 0 && (
        <Section className="bg-white-warm">
          <Container>
            <Eyebrow className="mb-6 block">Recognition</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {credentials.map((cred) => (
                <div key={cred.id}>
                  <h3 className="font-serif text-lg text-ink mb-2">
                    {cred.title}
                  </h3>
                  {cred.description && (
                    <p className="text-sm text-ink-muted">
                      {cred.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Independent Products */}
      {products.length > 0 && (
        <Section>
          <Container>
            <Eyebrow className="mb-6 block">Products</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-10 max-w-2xl">
              Beyond client work
            </h2>
            <p className="text-ink-soft leading-relaxed max-w-2xl mb-12">
              Building tools and platforms at the intersection of design, technology, and learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {products.map((product) => (
                <div key={product.id} className="border border-rule rounded-sm p-6 md:p-8">
                  <h3 className="font-serif text-xl text-ink mb-3">
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {product.title}
                      </a>
                    ) : (
                      product.title
                    )}
                  </h3>
                  {product.description && (
                    <p className="text-ink-soft leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Contact CTA */}
      <Section className="bg-ink">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow className="mb-4 text-accent-light">Available for the right work</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-white-warm mb-6 leading-tight">
              Design leadership, product collaboration, research partnerships, and speaking.
            </h2>
            <div className="space-y-2">
              <a
                href="mailto:mrjustinukaegbu@gmail.com"
                className="inline-block text-sm font-medium tracking-wide text-accent-light hover:text-white-warm transition-colors"
              >
                mrjustinukaegbu@gmail.com
              </a>
              <p className="text-sm text-accent-light">
                London, United Kingdom
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
