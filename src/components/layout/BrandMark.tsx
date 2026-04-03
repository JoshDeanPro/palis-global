import { cn } from '../../lib/cn'

type BrandMarkProps = {
  className?: string
}

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn('h-10 w-10 text-ochre', className)}>
      <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.28" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.34" />
      <path d="M23 60h74" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <path d="M60 23v74" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <path d="M35 79c6-15 14-23 25-23c11 0 19 8 25 23" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.46" />
      <path d="M39 41l21-18l21 18" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.42" />
      <circle cx="60" cy="46" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.35" opacity="0.64" />
      <circle cx="60" cy="46" r="1.8" fill="currentColor" opacity="0.8" />
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
    </svg>
  )
}
