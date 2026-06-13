'use client'

import Container from '@/components/layout/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="pt-36 md:pt-44 pb-20">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text mb-4">
            Something went wrong
          </h1>
          <p className="text-text-secondary mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-block rounded-sm bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Try again
          </button>
        </div>
      </Container>
    </section>
  )
}
