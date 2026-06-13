import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { BrandCard } from '@/components/ui/BrandCard'
import { getBrands } from '@/lib/data'

export const revalidate = 60

export const metadata = {
  title: 'Work',
  description: 'Design leadership across brand identity, digital product, and campaign design.',
}

export default async function WorkPage() {
  const brands = await getBrands()

  return (
    <>
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-6 animate-fade-up">
            Portfolio
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-6 animate-fade-up">
            Selected<br />Work<span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl leading-relaxed animate-fade-up-delay">
            Brand, product, and campaign work for companies that want to be remembered.
          </p>
        </Container>
      </section>

      {/* Brands Grid */}
      <section className="pb-24 md:pb-32">
        <Container>
          {brands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {brands.map((brand, i) => (
                <ScrollReveal key={brand.id} delay={i * 0.04}>
                  <BrandCard brand={brand} index={i} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-center py-20">
              Projects loading...
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
