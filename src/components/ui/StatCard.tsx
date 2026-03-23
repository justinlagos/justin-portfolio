interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div>
      <p className="font-serif text-2xl md:text-3xl text-ink mb-2">
        {value}
      </p>
      <p className="text-sm text-ink-muted">
        {label}
      </p>
    </div>
  );
}
