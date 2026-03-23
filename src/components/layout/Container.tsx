import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  narrow?: boolean
}

export default function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-6 md:px-10',
        narrow ? 'max-w-[860px]' : 'max-w-[1280px]',
        className
      )}
    >
      {children}
    </div>
  )
}
