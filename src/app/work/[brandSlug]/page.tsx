import { notFound } from 'next/navigation'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { getBrandBySlug, getProjectsForBrand } from '@/lib/data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ brandSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params
  try {
    const brand = await getBrandBySlug(brandSlug)
    if (!brand) return { title: 'Brand Not Found' }
    return {
      title: `${brand.name} - Justin Ukaegbu`,
      description: brand.seo_description || brand.description,
    }
  } catch {
    return { title: 'Work - Justin Ukaegbu' }
  }
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params

  const brand = await getBrandBySlug(brandSlug)
  if (!brand) notFound()

  const projects = await getProjectsForBrand(brand.id)

  return (
    <>
      {/* Breadcrumb */}
      <Section className="pt-32 pb-0">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Work', href: '/work' },
              { label: brand.name },
            ]}
          />
        </Container>
      </Section>

      {/* Brand Header */}
      <Section className="pt-8 pb-16">
        <Container>
          <h1 className="font-serif text-[2.5rem] md:text-[3.5rem] text-ink leading-[1.1] mb-5 max-w-3xl">
            {brand.name}
          </h1>
          {brand.long_description && (
            <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">
              {brand.long_description}
            </p>
          )}
        </Container>
      </Section>

      {/* Projects */}
      {projects.length > 0 && (
        <Section className="pt-0">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  brandSlug={brandSlug}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
