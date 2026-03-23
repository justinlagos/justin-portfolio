import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium tracking-[0.2em] uppercase text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
