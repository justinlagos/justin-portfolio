import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Gallery } from '@/components/ui/Gallery'
import RouteToZeroCaseStudy from '@/components/case-studies/RouteToZeroCaseStudy'
import { getBrandBySlug, getProjectBySlug } from '@/lib/data'
import { getStorageUrl } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ brandSlug: string; projectSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectSlug } = await params
  try {
    const project = await getProjectBySlug(projectSlug)
    if (!project) return { title: 'Not Found' }
    return {
      title: project.title,
      description: project.seo_description || project.summary,
    }
  } catch {
    return { title: 'Project' }
  }
}

export default async function ProjectPage({ params }: Props) {
  const { brandSlug, projectSlug } = await params

  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  const project = await getProjectBySlug(projectSlug)
  if (!project) notFound()

  // Route to Zero special case study
  if (projectSlug === 'route-to-zero' || projectSlug === 'route-to-zero-brand') {
    return <RouteToZeroCaseStudy />
  }

  const coverImage = project.media?.find((m) => m.is_cover) || project.media?.[0]
  const services = Array.isArray(project.services)
    ? project.services
    : typeof project.services === 'string'
    ? project.services.split(',').map((s: string) => s.trim())
    : []

  return (
    <>
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-10">
        <Container>
          <Link
            href={`/work/${brandSlug}`}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
          >
            &larr; {brand.name}
          </Link>

          <div className="max-w-3xl">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {brand.name}
            </p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight mb-6">
              {project.title}<span className="text-accent">.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-10 mt-10 pt-8 border-t border-border">
            {project.year && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                  Year
                </p>
                <p className="text-text text-sm">{project.year}</p>
              </div>
            )}
            {services.length > 0 && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                  Services
                </p>
                <p className="text-text text-sm">{services.join(', ')}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                Client
              </p>
              <p className="text-text text-sm">{brand.name}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cover Image */}
      {coverImage && (
        <section className="pb-16 md:pb-20">
          <Container wide>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-bg-elevated">
              <Image
                src={getStorageUrl(coverImage.image_url)}
                alt={coverImage.alt_text || project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Case Study Content */}
      {project.type === 'case-study' && project.case_study && (
        <section className="py-16 md:py-24">
          <Container narrow>
            {project.case_study.overview && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Overview
                  </p>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {project.case_study.overview}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {project.case_study.context && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Context
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {project.case_study.context}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {project.case_study.objective && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Objective
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {project.case_study.objective}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {project.case_study.approach && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Approach
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {project.case_study.approach}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {project.case_study.execution && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Execution
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {project.case_study.execution}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {project.case_study.outcome && (
              <ScrollReveal>
                <div className="mb-16">
                  <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    Outcome
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {project.case_study.outcome}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {/* Metrics */}
            {project.case_study.metrics && project.case_study.metrics.length > 0 && (
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
                  {project.case_study.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="font-display text-3xl font-bold text-accent tracking-tight">
                        {metric.value}
                      </p>
                      <p className="text-sm text-text-muted mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </Container>
        </section>
      )}

      {/* Gallery */}
      {project.media && project.media.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <ScrollReveal>
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-10">
                Project Gallery
              </p>
              <Gallery images={project.media} />
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Back link */}
      <section className="pb-20 md:pb-28">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            &larr; Back to all work
          </Link>
        </Container>
      </section>
    </>
  )
}
