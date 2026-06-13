import Container from '@/components/layout/Container'

export default function Loading() {
  return (
    <section className="pt-36 md:pt-44 pb-20">
      <Container>
        <div className="animate-pulse space-y-8">
          <div className="h-4 w-24 rounded bg-bg-elevated" />
          <div className="h-12 w-80 max-w-full rounded bg-bg-elevated" />
          <div className="h-6 w-96 max-w-full rounded bg-bg-elevated" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="aspect-[3/2] rounded bg-bg-elevated" />
            <div className="aspect-[3/2] rounded bg-bg-elevated" />
          </div>
        </div>
      </Container>
    </section>
  )
}
