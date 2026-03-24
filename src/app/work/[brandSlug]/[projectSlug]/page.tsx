import { notFound } from 'next/navigation'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Eyebrow from '@/components/ui/Eyebrow'
import CaseStudySection from '@/components/ui/CaseStudySection'
import MetricsGrid from '@/components/ui/MetricsGrid'
import { Gallery } from '@/components/ui/Gallery'
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
    if (!project) return { title: 'Project Not Found' }
    return {
      title: `${project.title} - Justin Ukaegbu`,
      description: project.seo_description || project.summary,
    }
  } catch {
    return { title: 'Project - Justin Ukaegbu' }
  }
}

export default async function ProjectPage({ params }: Props) {
  const { brandSlug, projectSlug } = await params

  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  const project = await getProjectBySlug(projectSlug)
  if (!project) notFound()

  const coverImage = project.media?.find((m) => m.is_cover) || project.media?.[0]

  return (
    <>
      {/* Breadcrumb */}
      <Section className="pt-32 pb-0">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Work', href: '/work' },
              { label: brand.name, href: `/work/${brandSlug}` },
              { label: project.title },
            ]}
          />
        </Container>
      </Section>

      {/* Project Header */}
      <Section className="pt-8 pb-12">
        <Container>
          <Eyebrow className="mb-4">
            {project.type === 'case-study' ? 'Case Study' : 'Gallery'}
          </Eyebrow>
          <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-ink leading-[1.1] mb-5 max-w-3xl">
            {project.title}
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-10">
            {project.summary}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-10 pt-8 border-t border-rule">
            {project.year && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                  Year
                </p>
                <p className="text-ink">{project.year}</p>
              </div>
            )}
            {project.services && (project.services as any).length > 0 && (
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                  Services
                </p>
                <p className="text-ink">
                  {Array.isArray(project.services)
                    ? project.services.join(', ')
                    : String(project.services)}
                </p>
              </div>
            )}
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                Client
              </p>
              <p className="text-ink">{brand.name}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cover Image */}
      {coverImage && (
        <Section className="pt-0 pb-16">
          <Container>
            <div className="relative w-full aspect-video overflow-hidden bg-cream-dark">
              <Image
                src={getStorageUrl(coverImage.image_url)}
                alt={coverImage.alt_text || project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Case Study Sections */}
      {project.type === 'case-study' && project.case_study && (
        <>
          {project.case_study.overview && (
            <CaseStudySection title="Overview" content={project.case_study.overview} />
          )}
          {project.case_study.context && (
            <CaseStudySection title="Context" content={project.case_study.context} />
          )}
          {project.case_study.objective && (
            <CaseStudySection title="Objective" content={project.case_study.objective} />
          )}
          {project.case_study.approach && (
            <CaseStudySection title="Approach" content={project.case_study.approach} />
          )}
          {project.case_study.execution && (
            <CaseStudySection title="Execution" content={project.case_study.execution} />
          )}
          {project.case_study.outcome && (
            <CaseStudySection title="Outcome" content={project.case_study.outcome} />
          )}

          {/* Metrics */}
          {project.case_study.metrics && project.case_study.metrics.length > 0 && (
            <Section className="bg-white-warm">
              <Container>
                <Eyebrow className="mb-8">Key Metrics</Eyebrow>
                <MetricsGrid metrics={project.case_study.metrics} />
              </Container>
            </Section>
          )}
        </>
      )}

      {/* Gallery */}
      {project.media && project.media.length > 0 && (
        <Section>
          <Container>
            {project.type === 'gallery' && (
              <Eyebrow className="mb-10">Gallery</Eyebrow>
            )}
            {project.type === 'case-study' && (
              <Eyebrow className="mb-10">Project Images</Eyebrow>
            )}
            <Gallery images={project.media} />
          </Container>
        </Section>
      )}
    </>
  )
}
