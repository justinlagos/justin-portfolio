import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export default function SectionTitle({
  children,
  className,
  subtitle,
}: SectionTitleProps) {
  return (
    <div>
      <h2
        className={cn(
          "font-serif text-3xl md:text-5xl text-ink",
          className
        )}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-ink-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}
