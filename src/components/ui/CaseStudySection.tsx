import Container from "@/components/layout/Container";
import Eyebrow from "./Eyebrow";
import { cn } from "@/lib/utils";

interface CaseStudySectionProps {
  title: string;
  content: string;
  className?: string;
}

export default function CaseStudySection({
  title,
  content,
  className,
}: CaseStudySectionProps) {
  if (!content) return null;

  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <Container narrow>
        <Eyebrow className="block mb-4">{title}</Eyebrow>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
