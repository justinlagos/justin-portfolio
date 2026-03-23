import { CaseStudyMetric } from "@/types";

interface MetricsGridProps {
  metrics: CaseStudyMetric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-rule">
      {metrics.map((metric, index) => (
        <div key={index}>
          <p className="font-serif text-3xl text-accent mb-2">
            {metric.value}
          </p>
          <p className="text-sm text-ink-muted">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
