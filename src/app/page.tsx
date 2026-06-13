import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProjects, getStats, getClients, getCredentials, getBrands } from '@/lib/data'
import { getStorageUrl } from '@/lib/utils'

export const revalidate = 60

export const metadata = {
  title: 'Justin Ukaegbu — Design Leader',
  description:
    'Design leader shaping brands and digital products across 50+ countries. 1.1B+ impressions. Webby-nominated.',
}

export default async function Home() {
  const [featuredProjects, stats, clients, credentials, brands] = await Promise.all([
    getFeaturedProjects(),
    getStats(),
    getClients(),
    getCredentials(),
    getBrands(),
  ])

  // Get brands that have featured images for the work section
  const visualBrands = brands.filter((b) => b.featured_image && b.is_featured)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-end pb-16 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg-elevated" />

        <Container className="relative z-10">
          <div className="mb-16 md:mb-24">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6 animate-fade-up">
              Design Leader
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight mb-8 animate-fade-up">
              Justin<br />
              Ukaegbu<span className="text-accent">.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg animate-fade-up-delay">
              Shaping brands and digital products that reach billions.
              12+ years across 50+ countries.
            </p>
          </div>

          {/* Stats strip */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-10 border-t border-border animate-fade-up-delay">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <p className="font-display text-3xl md:text-4xl font-bold text-text tracking-tight">
                    {stat.number}
                  </p>
                  <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Scroll</p>
          <div className="w-[1px] h-8 bg-gradient-to-b from-text-muted to-transparent" />
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══ */}
      <section className="py-20 md:py-32 bg-bg">
        <Container>
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 md:mb-20">
              <div>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                  Selected Work
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                  Recent projects
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden md:inline-block text-sm text-text-secondary hover:text-accent transition-colors"
              >
                View all &rarr;
              </Link>
            </div>
          </ScrollReveal>

          {/* Work grid — large alternating images */}
          <div className="space-y-6 md:space-y-8">
            {visualBrands.slice(0, 5).map((brand, i) => (
              <ScrollReveal key={brand.id} delay={i * 0.05}>
                <Link href={`/work/${brand.slug}`} className="group block">
                  <div className="relative w-full aspect-[16/9] md:aspect-[2.2/1] overflow-hidden rounded-sm bg-bg-elevated img-hover">
                    {brand.featured_image && (
                      <Image
                        src={getStorageUrl(brand.featured_image)}
                        alt={brand.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    )}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">
                            {brand.name}
                          </h3>
                          <p className="text-sm md:text-base text-white/70 max-w-lg">
                            {brand.description}
                          </p>
                        </div>
                        <span className="hidden md:block text-sm text-white/50 group-hover:text-accent transition-colors">
                          View project &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/work"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              View all work &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* ═══ CLIENTS MARQUEE ═══ */}
      {clients.length > 0 && (
        <section className="py-10 md:py-14 border-t border-b border-border overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`${client.id}-${i}`}
                className="mx-8 md:mx-12 text-sm md:text-base font-medium tracking-[0.1em] uppercase text-text-muted"
              >
                {client.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="py-20 md:py-32 bg-bg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Portrait */}
            <ScrollReveal className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="/assets/about/justin-portrait.jpg"
                  alt="Justin Ukaegbu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>

            {/* Text */}
            <div className="md:col-span-7 md:pl-8">
              <ScrollReveal>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6">
                  The Designer
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.05]">
                  Twelve years of making
                  things people remember.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                  From Lagos to London, Dubai to the world — I&apos;ve built brands that move culture,
                  products that serve millions, and campaigns that hit 1.1 billion impressions.
                  Webby-nominated. Chartered designer. Perpetually curious.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  More about me &rarr;
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ RECOGNITION ═══ */}
      {credentials.length > 0 && (
        <section className="py-20 md:py-28 bg-bg-elevated">
          <Container>
            <ScrollReveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-12">
                Recognition
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {credentials.map((cred, i) => (
                <ScrollReveal key={cred.id} delay={i * 0.05}>
                  <div className="py-6 border-t border-border">
                    <p className="font-display text-lg font-bold text-text mb-1 tracking-tight">
                      {cred.title}
                    </p>
                    {cred.description && (
                      <p className="text-sm text-text-secondary">{cred.description}</p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-36 bg-bg relative overflow-hidden">
        {/* Accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <Container className="relative z-10 text-center">
          <ScrollReveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6">
              Available for select projects
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.0]">
              Got a vision? Let&apos;s make it real.
            </h2>
            <a
              href="mailto:mrjustinukaegbu@gmail.com"
              className="inline-block text-lg md:text-xl text-accent hover:text-accent-hover transition-colors"
            >
              mrjustinukaegbu@gmail.com
            </a>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
