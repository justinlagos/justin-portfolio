import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getBrandBySlug, getProjectsForBrand } from '@/lib/data'
import { getStorageUrl } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ brandSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params
  try {
    const brand = await getBrandBySlug(brandSlug)
    if (!brand) return { title: 'Not Found' }
    return {
      title: brand.name,
      description: brand.seo_description || brand.description,
    }
  } catch {
    return { title: 'Work' }
  }
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params
  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  const projects = await getProjectsForBrand(brand.id)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
          >
            &larr; All work
          </Link>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight mb-6">
            {brand.name}<span className="text-accent">.</span>
          </h1>
          {brand.long_description && (
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              {brand.long_description}
            </p>
          )}
        </Container>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="pb-24 md:pb-32">
          <Container>
            <div className="space-y-8 md:space-y-12">
              {projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.05}>
                  <Link
                    href={`/work/${brandSlug}/${project.slug}`}
                    className="group block"
                  >
                    {/* Project image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-bg-elevated img-hover mb-5">
                      {project.featured_image ? (
                        <Image
                          src={getStorageUrl(project.featured_image)}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display text-6xl font-bold text-text-muted/20">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Project info */}
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h2 className="font-display text-xl md:text-2xl font-bold text-text tracking-tight mb-2 group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-sm text-text-secondary max-w-lg">
                          {project.summary}
                        </p>
                      </div>
                      {project.year && (
                        <p className="text-sm text-text-muted whitespace-nowrap">{project.year}</p>
                      )}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
