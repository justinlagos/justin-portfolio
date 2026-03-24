import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

export default function Loading() {
  return (
    <Section className="pt-36 md:pt-44 pb-20">
      <Container>
        <div className="animate-pulse space-y-8">
          <div className="h-4 w-24 rounded bg-cream-dark" />
          <div className="h-12 w-80 max-w-full rounded bg-cream-dark" />
          <div className="h-6 w-96 max-w-full rounded bg-cream-dark" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="aspect-[3/2] rounded bg-cream-dark" />
            <div className="aspect-[3/2] rounded bg-cream-dark" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
