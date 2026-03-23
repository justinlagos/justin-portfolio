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
  const paragraphs = content.split("\n\n");

  return (
    <section className={cn("mb-12", className)}>
      <Eyebrow className="block mb-4">
        {title}
      </Eyebrow>
      <div className="prose prose-sm max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-ink mb-4 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
