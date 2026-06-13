interface ContainerProps {
  children: React.ReactNode
  className?: string
  narrow?: boolean
  wide?: boolean
}

export default function Container({ children, className = '', narrow, wide }: ContainerProps) {
  const maxWidth = narrow
    ? 'max-w-3xl'
    : wide
    ? 'max-w-[1600px]'
    : 'max-w-[1440px]'

  return (
    <div className={`${maxWidth} mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </div>
  )
}
