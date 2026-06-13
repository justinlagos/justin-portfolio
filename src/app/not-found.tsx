import Link from "next/link";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="pt-32 pb-32 flex items-center min-h-[60vh]">
      <Container>
        <div className="text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-text mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl text-text-secondary mb-8">
            Page not found
          </p>
          <p className="text-lg text-text-muted mb-12 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on
            track.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-accent text-white font-medium rounded-sm hover:bg-accent-hover transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
