import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

export default function WorkLoading() {
  return (
    <Section className="pt-36 md:pt-44 pb-20">
      <Container>
        <div className="animate-pulse space-y-8">
          <div className="h-4 w-32 rounded bg-cream-dark" />
          <div className="h-12 w-48 rounded bg-cream-dark" />
          <div className="h-6 w-80 max-w-full rounded bg-cream-dark" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/3] rounded bg-cream-dark" />
                <div className="h-5 w-40 rounded bg-cream-dark" />
                <div className="h-4 w-56 rounded bg-cream-dark" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
