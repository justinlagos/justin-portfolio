interface SectionProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
  light?: boolean
  id?: string
}

export default function Section({ children, className = '', dark, light, id }: SectionProps) {
  const bg = dark
    ? 'bg-bg-elevated'
    : light
    ? 'bg-bg-light text-text-dark'
    : ''

  return (
    <section id={id} className={`py-20 md:py-28 ${bg} ${className}`}>
      {children}
    </section>
  )
}
