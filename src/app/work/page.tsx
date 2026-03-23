import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import { BrandCard } from '@/components/ui/BrandCard'
import { getBrands } from '@/lib/data'
import type { Brand } from '@/types'

export const metadata = {
  title: 'Work - Justin Ukaegbu',
  description:
    'Design leadership and creative direction across brand identity, digital product, campaign, and interaction design.',
}

export default async function WorkPage() {
  let brands: Brand[] = []

  try {
    brands = await getBrands()
  } catch {
    // Will render empty state
  }

  return (
    <>
      {/* Header */}
      <Section className="pt-36 md:pt-44 pb-16">
        <Container>
          <Eyebrow className="mb-5">Design Across Brands</Eyebrow>
          <h1 className="font-serif text-[2.75rem] md:text-[4rem] text-ink leading-[1.08] mb-6 max-w-3xl">
            Work
          </h1>
          <p className="text-lg text-ink-soft max-w-2xl leading-relaxed">
            Design leadership and creative direction across brand identity, digital product,
            campaign, and interaction design. Explore the clients and brands below.
          </p>
        </Container>
      </Section>

      {/* Brands Grid */}
      <Section className="pt-0">
        <Container>
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <p className="text-ink-muted text-center py-20">
              Projects loading or not yet available.
            </p>
          )}
        </Container>
      </Section>
    </>
  )
}
