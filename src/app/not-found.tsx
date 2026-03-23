import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function NotFound() {
  return (
    <Section className="pt-32 pb-32 flex items-center">
      <Container>
        <div className="text-center">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-ink mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl text-ink-soft mb-8">
            Page not found
          </p>
          <p className="text-lg text-ink-muted mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on
            track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-accent text-white-warm font-medium rounded hover:bg-accent-light transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
